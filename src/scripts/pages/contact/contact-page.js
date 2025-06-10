// src/pages/contact/contact-page.js
import { ApiBackend } from '../../../api/index.js';

const ContactPage = {
  async render() {
    return `
      <section class="contact-section">
        <h2>Hubungi Kami</h2>
        <form id="contact-form" class="contact-form">
          <label>Nama:</label>
          <input type="text" name="name" placeholder="Nama Anda" required />

          <label>Email:</label>
          <input type="email" name="email" placeholder="Email Anda" required />

          <label>Pesan:</label>
          <textarea name="message" rows="5" placeholder="Tulis pesan..." required></textarea>

          <button type="submit">Kirim Pesan</button>
        </form>
        <p class="success-message" style="display:none; color:green;">Pesan berhasil dikirim!</p>
      </section>
    `;
  },

  afterRender() {
    const form = document.getElementById("contact-form");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form)
        const nama = formData.get("name");
        const email_comment = formData.get("email");
        const pesan = formData.get("message");

        try {
          const response = await ApiBackend.post('/comments', {
            nama,
            email_comment,
            pesan
          });

          console.log("Komentar Berhail Di kirim", response.data);
          form.reset();
          alert("Pesan Di kirim")
        } catch (error) {
          console.error("Gagal mengirim komentar:", error.message);
          alert("Terjadi kesalahan saat mengirim komentar.");
        }
      });
    }
  },
};

export default ContactPage;
