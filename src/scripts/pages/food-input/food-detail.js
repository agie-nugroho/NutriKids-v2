import { ApiBackend } from "../../../api";

const foodDetail = {
  async render() {
    return `
      <div class="food-detail">
        <h1>Rekomendasi yang Sudah Disimpan</h1>
        <div id="food-info">Memuat data...</div>
      </div>
    `;
  },

  async afterRender() {
  const container = document.getElementById("food-info");

  try {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?.id_user || userData?.id || userData?.userId;

    if (!userId) {
      container.innerHTML = `<p>❌ User belum login.</p>`;
      return;
    }

    const response = await ApiBackend.get(`/save-menu/${userId}`);

    if (response.status === 200) {
      const menus = response.data.data;

      if (menus.length === 0) {
        container.innerHTML = `<p>📭 Tidak ada menu tersimpan.</p>`;
        return;
      }

      container.innerHTML = menus.map(menu => `
        <div class="menu-info" data-id="${menu.id}">
          <p class="menu-name">${menu.menuName}</p>
          <p class="menu-detail">Bahan: ${menu.ingredients}</p>
          <p class="menu-detail">Harga: Rp ${Number(menu.price).toLocaleString("id-ID")}</p>
          <div class="nutrisi-details">
            <p><strong>Protein:</strong> ${menu.protein} mg</p>
            <p><strong>Karbohidrat:</strong> ${menu.karbohidrat} mg</p>
            <p><strong>Serat:</strong> ${menu.serat} mg</p>
            <p><strong>Kalsium:</strong> ${menu.kalsium} mg</p>
            <p><strong>Fosfor:</strong> ${menu.fosfor} mg</p>
            <p><strong>Zat Besi:</strong> ${menu.zat_besi} mg</p>
            <p><strong>Natrium:</strong> ${menu.natrium} mg</p>
            <p><strong>Kalium:</strong> ${menu.kalium} mg</p>
            <p><strong>Tembaga:</strong> ${menu.tembaga} mg</p>
            <p><strong>Seng:</strong> ${menu.seng} mg</p>
            <p><strong>Vitamin C:</strong> ${menu.vit_c} mg</p>
            <p><strong>Air:</strong> ${menu.air} mg</p>
            <p><strong>Energi:</strong> ${menu.energi} kal</p>
            <p><strong>Lemak Total:</strong> ${menu.lemak_total} mg</p>
          </div>
          <button class="delete-btn" data-id="${menu.id}">Hapus</button>
        </div>
      `).join("");

      const deleteButtons = document.querySelectorAll(".delete-btn");
      deleteButtons.forEach(button => {
        button.addEventListener("click", async (e) => {
          const savedMenuId = e.target.dataset.id;
          const confirmDelete = confirm("Yakin ingin menghapus menu ini?");
          if (!confirmDelete) return;

          try {
            const response = await ApiBackend.delete(`/save-menu/${savedMenuId}`);
            if (response.status === 200) {
              alert("✅ Menu berhasil dihapus!");
              e.target.closest(".menu-info").remove();
            } else {
              alert("⚠️ Gagal menghapus menu.");
            }
          } catch (err) {
            console.error("❌ Gagal hapus menu:", err);
            alert("❌ Terjadi kesalahan saat menghapus menu.");
          }
        });
      });

    } else {
      container.innerHTML = `<p>⚠️ Gagal memuat data. Status: ${response.status}</p>`;
    }
  } catch (error) {
    console.error("❌ Error saat mengambil data:", error);
    container.innerHTML = `<p>❌ Terjadi kesalahan saat mengambil menu.</p>`;
  }
}

};
export default foodDetail;


