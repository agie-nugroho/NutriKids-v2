// src/pages/about/about-page.js

const AboutPage = {
  async render() {
    return `
      <section class="about-section">
        <h2>Tentang NutriKids</h2>
        <p>NutriKids adalah platform rekomendasi makanan anak berbasis AI yang dirancang untuk membantu orang tua memberikan nutrisi terbaik bagi anak-anak mereka.</p>

        <div class="about-features">
          <div class="feature-card">
            <h3>💡 Solusi Cerdas</h3>
            <p>Menggunakan Content-Based Filtering untuk menemukan menu terbaik berdasarkan bahan yang tersedia.</p>
          </div>
          <div class="feature-card">
            <h3>💰 Sesuai Budget</h3>
            <p>Menyesuaikan rekomendasi berdasarkan anggaran harian atau mingguan Anda.</p>
          </div>
          <div class="feature-card">
            <h3>👶 Usia Spesifik</h3>
            <p>Rekomendasi disesuaikan dengan kebutuhan gizi anak berdasarkan usia mereka.</p>
          </div>
        </div>

        <h3>Misi Kami</h3>
        <p>Kami percaya bahwa setiap anak berhak mendapatkan makanan bergizi, sehat, dan lezat tanpa repot mencari ide sendiri.</p>
      </section>
    `;
  },

  afterRender() {
    // Jika ada interaksi JS tambahan, bisa ditambahkan di sini
  },
};

export default AboutPage;
