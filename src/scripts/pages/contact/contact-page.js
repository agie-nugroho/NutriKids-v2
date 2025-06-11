// src/pages/contact/contact-page.js
import Swal from 'sweetalert2';
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

        Swal.fire({
          title: 'Mengirim Pesan...',
          text: 'Mohon tunggu sebentar.',
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
        try {
          const response = await ApiBackend.post('/comments', {
            nama,
            email_comment,
            pesan
          });
          Swal.fire({
            icon: 'success',
            title: 'Komentar Berhasil Dikirim',
            text: 'Terima kasih atas pesan Anda!',
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
          form.reset();
        } catch (error) {
          console.error("Gagal mengirim komentar:", error.message);
          Swal.fire({
            icon: 'error',
            title: 'Gagal Mengirim Pesan',
            text: 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.',
            allowEscapeKey: false,
            allowOutsideClick: false
          });
        }
      });
    }
  },
};

export default ContactPage;
