from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import tensorflow as tf
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import Optional

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

nutrition_cols = [
    "protein", "karbohidrat", "serat", "kalsium", "fosfor", "zat_besi",
    "natrium", "kalium", "tembaga", "seng", "vit_c"
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


class UserInput(BaseModel):
    user_ingredients: str
    user_rasa: Optional[str] = None
    user_meal_time: Optional[str] = None
    user_budget: int
    usia: int
    jenis_kelamin: str
    

@app.post("/recommend-full")
def recommend_full(input_data: UserInput):
    # Contoh: filter menu berdasarkan budget dan similarity bahan makanan
    user_vec = tfidf.transform([input_data.user_ingredients])
    cos_sim = cosine_similarity(user_vec, tfidf_matrix).flatten()

    temp_df = menu_df.copy()
    temp_df["similarity"] = cos_sim

    # Filter by budget
    filtered = temp_df[temp_df["price (100 gr)"] <= input_data.user_budget]

    # Contoh filter tambahan berdasarkan rasa dan waktu makan (asumsi ada kolom 'rasa', 'meal_time' di menu_df)
    if input_data.user_rasa:
        filtered = filtered[filtered["rasa"].str.contains(input_data.user_rasa, case=False, na=False)]
    if input_data.user_meal_time:
        filtered = filtered[filtered["meal_time"].str.contains(input_data.user_meal_time, case=False, na=False)]

    # Pilih top 5 berdasarkan similarity
    top5 = filtered.sort_values(by="similarity", ascending=False).head(5)

    # Kamu bisa juga tambahkan logic berdasarkan usia dan jenis kelamin jika relevan

    return top5[
        ["menu_makanan", "bahan_makanan", "price (100 gr)", "similarity"]
    ].to_dict(orient="records")