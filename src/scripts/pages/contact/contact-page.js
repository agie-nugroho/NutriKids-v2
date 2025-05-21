// src/pages/contact/contact-page.js

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
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        document.querySelector(".success-message").style.display = "block";
        form.reset();
      });
    }
  },
};

export default ContactPage;
