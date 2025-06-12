# NutriKids-v2
Sebuah website untuk rekomendasi makanan anak usia 0 - 12 tahun dengan menggunakan HTML, CSS, JS yang diintegrasikan dengan backend Python dengan Flask


npm i -> untuk install package yang belum 
npx prisma generate -> untuk menyesuaikan database yang ada di prisma
npm run dev -> untuk running backend 
npm run start -> untuk running front end
uvicorn app:app --reload -> untuk running ml


kalau merubah project deploy di railway harus push github karena sudah terkait github

ML: uvicorn app:app --host=0.0.0.0 --port=8000
