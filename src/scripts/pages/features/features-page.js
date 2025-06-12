const FeaturesPage = {
  async render() {
    return `
      <section class="features-section">
        <h2>Kenapa Harus NutriKids?</h2>
        <p class="subtitle">Platform rekomendasi makanan anak berbasis AI yang memberikan solusi praktis dan sehat untuk orang tua modern.</p>

        <div class="feature-cards">
          <div class="feature-card">
            <i class="fas fa-brain icon"></i>
            <h3>AI-Powered</h3>
            <p>Menggunakan teknologi AI untuk memberikan rekomendasi personalisasi berdasarkan bahan, usia, dan preferensi anak Anda.</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-carrot icon"></i>
            <h3>Gizi Seimbang</h3>
            <p>Semua rekomendasi telah disesuaikan dengan kebutuhan gizi harian anak dari usia 0 bulan hingga 12 tahun.</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-wallet icon"></i>
            <h3>Hemat Budget</h3>
            <p>Atur budget harian/mingguan, dan kami akan carikan menu terbaik sesuai anggaran Anda.</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-clock icon"></i>
            <h3>Cepat & Mudah</h3>
            <p>Dapatkan ide menu hanya dalam hitungan detik — hemat waktu dan tenaga untuk para orang tua sibuk.</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-baby icon"></i>
            <h3>Usia Spesifik</h3>
            <p>Rekomendasi disesuaikan dengan tahap perkembangan anak Anda, dari bayi hingga pra remaja.</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-shield-alt icon"></i>
            <h3>Aman & Terpercaya</h3>
            <p>Kami memastikan semua rekomendasi aman dikonsumsi dan tidak mengandung bahan berbahaya untuk anak-anak.</p>
          </div>
        </div>
      </section>
    `;
  },

  afterRender() {},
};

export default FeaturesPage;
