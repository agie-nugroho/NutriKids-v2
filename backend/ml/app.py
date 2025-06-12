from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import tensorflow as tf
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import Optional, List
from pydantic import BaseModel, Field

app = FastAPI()

# --- CORS Middleware (biar bisa diakses dari browser/localhost frontend) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ganti ke domain frontend saat produksi
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Load model klasifikasi dan preprocessing ---
model = tf.keras.models.load_model("model/model_klasifikasi.h5")
scaler = joblib.load("model/scaler.pkl")
label_encoder = joblib.load("model/label_encoder.pkl")

# --- Load dataset untuk rekomendasi ---
menu_df = pd.read_csv("https://raw.githubusercontent.com/dfin12/capstone_project/refs/heads/main/menu_makanan.csv")
nutrition_content_df = pd.read_csv("https://raw.githubusercontent.com/dfin12/capstone_project/refs/heads/main/gizi_nutrition.csv")

nutrition_cols = [
    "protein", "karbohidrat", "serat",
    "kalsium", "fosfor", "zat_besi",
    "natrium", "kalium", "tembaga",
    "seng", "vit_c"
]

# --- TF-IDF preparation untuk bahan_makanan ---
tfidf = TfidfVectorizer()
tfidf_matrix = tfidf.fit_transform(menu_df["bahan_makanan"].fillna(""))


# --- Schema input gizi dari user ---
class NutritionInput(BaseModel):
    protein: float
    karbohidrat: float
    serat: float
    kalsium: float
    fosfor: float
    zat_besi: float
    natrium: float
    kalium: float
    tembaga: float
    seng: float
    vit_c: float


# --- Schema: Rekomendasi Menu Completed ---
class UserInput(BaseModel):
    user_ingredients: str
    user_rasa: Optional[str] = None
    user_meal_time: Optional[str] = None
    user_budget: int
    usia: int
    jenis_kelamin: str


# --- Schema input cek kecukupan gizi ---
class GiziCheckRequest(BaseModel):
    menu_selected: List[dict]
    usia: int
    jenis_kelamin: str
    meal_time: str


# --- Fungsi: cek kecukupan gizi ---
def cek_kecukupan_gizi(total, usia, jenis_kelamin, meal_time, nutrition_content_df):
    kebutuhan = nutrition_content_df[
        (nutrition_content_df['usia (tahun)'] == usia) &
        (nutrition_content_df['jenis_kelamin'] == jenis_kelamin) &
        (nutrition_content_df['meal_time'] == meal_time)
    ]

    if kebutuhan.empty:
        return None, []

    kebutuhan = kebutuhan.iloc[0]
    zat_gizi = [col for col in nutrition_content_df.columns if col not in ['usia (tahun)', 'jenis_kelamin', 'meal_time']]

    status_list = []
    zat_kurang = []

    for zat in zat_gizi:
        total_asupan = total[zat].sum()
        kebutuhan_zat = kebutuhan[zat]
        status = "✔️ Cukup" if total_asupan >= kebutuhan_zat else "❌ Kurang"
        if status == "❌ Kurang":
            zat_kurang.append(zat)

        status_list.append({
            'Zat Gizi': zat,
            'Asupan': round(total_asupan, 2),
            'Kebutuhan': round(kebutuhan_zat, 2),
            'Status': status
        })

    hasil_df = pd.DataFrame(status_list)
    return hasil_df, zat_kurang


# --- Endpoint: Prediksi kategori gizi ---
@app.post("/predict-kategori")
def predict_kategori(data: NutritionInput):
    user_input = [[getattr(data, col) for col in nutrition_cols]]
    scaled_input = scaler.transform(user_input)
    pred_probs = model.predict(scaled_input)
    pred_class = int(tf.argmax(pred_probs[0]))
    kategori = label_encoder.inverse_transform([pred_class])[0]
    return {
        "kategori_gizi": kategori,
        "confidence": float(pred_probs[0][pred_class])
    }


# --- Endpoint: Rekomendasi Menu Berdasarkan Bahan dan Budget ---
@app.get("/recommend")
def recommend(bahan: str = Query(...), budget: int = Query(...)):
    user_vec = tfidf.transform([bahan])
    cos_sim = cosine_similarity(user_vec, tfidf_matrix).flatten()

    temp_df = menu_df.copy()
    temp_df["similarity"] = cos_sim

    filtered = temp_df[temp_df["price (100 gr)"] <= budget]
    top5 = filtered.sort_values(by="similarity", ascending=False).head(5)

    return top5[
        ["menu_makanan", "bahan_makanan", "price (100 gr)", "similarity"]
    ].to_dict(orient="records")


# --- Endpoint: Rekomendasi Menu Lengkap ---
@app.post("/recommend-full")
def recommend_full(input_data: UserInput):
    user_vec = tfidf.transform([input_data.user_ingredients])
    cos_sim = cosine_similarity(user_vec, tfidf_matrix).flatten()

    temp_df = menu_df.copy()
    temp_df["similarity"] = cos_sim
    filtered = temp_df[temp_df["price (100 gr)"] <= input_data.user_budget]

    if input_data.user_rasa:
        filtered = filtered[filtered["rasa"].str.contains(input_data.user_rasa, case=False, na=False)]
    if input_data.user_meal_time:
        filtered = filtered[filtered["meal_time"].str.contains(input_data.user_meal_time, case=False, na=False)]

    top5 = filtered.sort_values(by="similarity", ascending=False).head(10)

    return top5[
            ["menu_makanan", "bahan_makanan", "price (100 gr)", "meal_time", "rasa", "protein", "karbohidrat", "serat",
     "kalsium", "fosfor", "zat_besi", "natrium", "kalium", "tembaga", "seng", "vit_c", "air (ml)",
     "energi (kal)", "lemak_total", "similarity"]
    ].to_dict(orient="records")


# --- Endpoint: Cek kecukupan gizi berdasarkan menu yang dipilih user ---
@app.post("/cek-kecukupan")
def cek_kecukupan(data: GiziCheckRequest):
    total_df = pd.DataFrame(data.menu_selected)
    hasil_df, zat_kurang = cek_kecukupan_gizi(
        total=total_df,
        usia=data.usia,
        jenis_kelamin=data.jenis_kelamin,
        meal_time=data.meal_time,
        nutrition_content_df=nutrition_content_df
    )

    if hasil_df is None:
        return {
            "message": "⚠️ Data kebutuhan gizi tidak ditemukan untuk kombinasi tersebut.",
            "zat_kurang": []
        }

    return {
        "status_gizi": hasil_df.to_dict(orient="records"),
        "zat_kurang": zat_kurang
    }



def saran_bertahap(menu_df, zat_kurang_dict, menu_sudah_dipilih, max_per_zat=3):
    menu_terpilih = []
    zat_tersisa = zat_kurang_dict.copy()

    for zat, target in zat_tersisa.items():
        if zat not in menu_df.columns:
            continue

        # Filter menu yang belum dipilih
        kandidat = menu_df[~menu_df['menu_makanan'].isin(menu_sudah_dipilih + [m["menu_makanan"] for m in menu_terpilih])].copy()

        # Hitung skor berdasarkan zat ini
        kandidat["skor"] = (target - kandidat[zat]).apply(lambda x: max(0, x) ** 2)

        # Ambil top menu untuk zat ini
        top_menu = kandidat.sort_values(by="skor").head(max_per_zat)
        menu_terpilih.extend(top_menu.to_dict(orient="records"))

        # Update kekurangan (anggap menu baru langsung dikonsumsi)
        total_asupan = sum(m[zat] for m in menu_terpilih if zat in m)
        if total_asupan >= target:
            continue  # zat ini selesai, lanjut zat berikutnya

    return menu_terpilih



class SaranTambahanRequest(BaseModel):
    menu_sudah_dipilih: List[str]  # List of nama menu
    zat_kurang_dict: dict          # Dict zat gizi: nilai target


@app.post("/saran-menu-bertahap")
def saran_menu_bertahap_endpoint(data: SaranTambahanRequest):
    hasil = saran_bertahap(
        menu_df=menu_df,
        zat_kurang_dict=data.zat_kurang_dict,
        menu_sudah_dipilih=data.menu_sudah_dipilih
    )
    return hasil  # bentuk: list of menu tambahan (urutan sesuai kebutuhan)

