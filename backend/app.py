# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)

# Load dataset
df_menus = pd.read_excel('CAPSTONE/backend/data/menu_makanan.xlsx')

# Mapping usia ke age_group
def map_age_to_group(age_str):
    try:
        age = int(age_str)
        if age <= 6:
            return 'Bayi (0-6 bulan)'
        elif age <= 12:
            return 'Balita (6-12 bulan)'
        elif age <= 24:
            return 'Anak Kecil (1-2 tahun)'
        elif age <= 60:
            return 'Anak Prasekolah (3-5 tahun)'
        elif age <= 96:
            return 'Anak Sekolah (6-8 tahun)'
        else:
            return 'Praremaja (9-12 tahun)'
    except:
        return 'Anak Kecil (1-2 tahun)'


# Jika kolom 'age_group' belum ada, tambahkan secara dinamis
if 'age_group' not in df_menus.columns:
    def assign_age_group(menu_name):
        # Contoh logika sederhana berdasarkan nama menu
        menu_lower = menu_name.lower()
        if any(kata in menu_lower for kata in ['puree', 'bubur']):
            return 'Bayi (0-6 bulan)'
        elif any(kata in menu_lower for kata in ['telur', 'lontong', 'gado-gado']):
            return 'Balita (6-12 bulan)'
        elif any(kata in menu_lower for kata in ['nasi', 'mi', 'roti']):
            return 'Anak Kecil (1-2 tahun)'
        elif any(kata in menu_lower for kata in ['ayam', 'ikan', 'daging']):
            return 'Anak Prasekolah (3-5 tahun)'
        else:
            return 'Anak Sekolah (6-8 tahun)'
    
    df_menus['age_group'] = df_menus['menu_makanan'].apply(assign_age_group)


# Content-Based Filtering
def recommend_menu(user_input, df):
    # Filter berdasarkan usia dan rasa
    filtered_df = df[df['rasa'] == user_input['taste']]
    if filtered_df.empty:
        filtered_df = df

    # Filter berdasarkan usia (jika cocok)
    filtered_df = filtered_df[filtered_df['age_group'] == user_input['age_group']]
    if filtered_df.empty:
        filtered_df = df[df['rasa'] == user_input['taste']] or df

    # Vektorisasi bahan makanan
    vectorizer = CountVectorizer()
    # Perbaikan: Menggunakan nama kolom yang benar 'bahan_makanan' bukan 'bahan_maka'
    feature_matrix = vectorizer.fit_transform(filtered_df['bahan_makanan'])

    # Hitung similarity matrix
    similarity_matrix = cosine_similarity(feature_matrix)

    # Ambil top 3 rekomendasi
    input_index = 0
    similar_scores = list(enumerate(similarity_matrix[input_index]))
    sorted_similar_scores = sorted(similar_scores, key=lambda x: x[1], reverse=True)[1:]

    top_recommendations = []
    for i in sorted_similar_scores[:3]:
        index = i[0]
        recommendation = {
            "menu_name": filtered_df.iloc[index]['menu_makanan'],
            "ingredients": filtered_df.iloc[index]['bahan_makanan'],
            "image": f"https://source.unsplash.com/random/300x200/? {filtered_df.iloc[index]['menu_makanan']}",
            "price": filtered_df.iloc[index]['price (100 gr)'],
            "energy": filtered_df.iloc[index]['energi (kal)'],
            "protein": filtered_df.iloc[index]['protein (g)'],
            "carbs": filtered_df.iloc[index]['karbohidrat (g)'],
            "fat": filtered_df.iloc[index]['lemak_total (g)'],
            "class": filtered_df.iloc[index]['class']
        }
        top_recommendations.append(recommendation)

    return top_recommendations


@app.route('/')
def home():
    return "NutriKidz API is running!"


@app.route('/api/recommend', methods=['POST'])
def recommend_api():
    data = request.get_json()

    name = data.get('name', '')
    age = data.get('age', '')
    gender = data.get('gender', '')
    ingredients = data.get('ingredients', '')
    taste = data.get('taste', '')
    budget = data.get('budget', '')
    meal_time = data.get('meal-time', '')

    age_group = map_age_to_group(age)

    # Validasi input user
    if 'taste' not in data or not data['taste']:
        return jsonify({"error": "Preferensi rasa tidak boleh kosong"}), 400
    
    # Periksa apakah rasa tersedia dalam dataset
    if data['taste'] not in df_menus['rasa'].unique():
        return jsonify({"error": f"Rasa '{data['taste']}' tidak tersedia dalam dataset"}), 400

    try:
        result = recommend_menu({
            'age_group': age_group,
            'taste': taste
        }, df_menus)
        
        return jsonify({"recommendations": result}), 200
    except Exception as e:
        return jsonify({"error": f"Terjadi kesalahan: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)