// src/pages/food-input/food-input-page.js

import { ApiMl } from "../../../api";

const FoodInputPage = {
  async render() {
    return `
      <section class="meal-planner-section">
        <div class="container">
          <h1>Dapatkan Rekomendasi Khusus</h1>
          <div class="subtitle">Isi formulir untuk menerima saran makanan yang disesuaikan untuk anak Anda</div>
          
          <div class="meal-planner-card">
            <h2>NutriKidz - Perencana Makanan</h2>
            
            <div id="main-form" class="form-step active">
              <div class="form-group">
                <label for="childName">Nama Anak</label>
                <input type="text" id="childName" name="name" placeholder="Masukkan nama anak" required />
              </div>
              
              <div class="form-group">
                <label for="childAge">Usia Anak</label>
                <select id="childAge" name="age">
                  <option value="">Pilih usia</option>
                  <option value="0">0 tahun</option>
                  <option value="1">1 tahun</option>
                  <option value="2">2 tahun</option>
                  <option value="3">3 tahun</option>
                  <option value="4">4 tahun</option>
                  <option value="5">5 tahun</option>
                  <option value="6">6 tahun</option>
                  <option value="7">7 tahun</option>
                  <option value="8">8 tahun</option>
                  <option value="9">9 tahun</option>
                  <option value="10">10 tahun</option>
                  <option value="11">11 tahun</option>
                  <option value="12">12 tahun</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="childGender">Jenis Kelamin</label>
                <select id="childGender" name="gender">
                  <option value="laki-laki">Laki-laki</option>
                  <option value="perempuan">Perempuan</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="mealTime">Waktu Makan</label>
                <select id="mealTime" name="mealTime">
                  <option value="">Pilih waktu makan</option>
                  <option value="breakfast">Sarapan</option>
                  <option value="lunch">Makan Siang</option>
                  <option value="dinner">Makan Malam</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="budget">Budget (Minimal pengeluaran untuk sekali makan)</label>
                <div class="budget-input-container">
                  <span class="currency-prefix">Rp</span>
                  <input type="number" id="budget" name="budget" min="15000" max="50000" step="1000" value="25000" placeholder="Masukkan budget" />
                </div>
                <small class="budget-note">Budget untuk satu kali makan (Rp 15.000 - Rp 50.000)</small>
              </div>
              
              <div class="form-group">
                <label for="taste">Preferensi Rasa</label>
                <select id="taste" name="taste">
                  <option value="gurih">Gurih</option>
                  <option value="manis">Manis</option>
                  <option value="tawar">Tawar</option>
                  <option value="sapi">Sapi</option>
                  <option value="asin">Asin</option>
                  <option value="segar">Segar</option>
                  <option value="pahit">Pahit</option>
                  <option value="pedas">Pedas</option>
                  <option value="manis asam">Manis Asam</option>
                  <option value="asam manis">Asam Manis</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>Pilih Kategori Bahan Makanan</label>
                <div id="category-tabs" class="category-tabs">
                  <button type="button" class="category-tab active" data-category="all">Semua</button>
                  <button type="button" class="category-tab" data-category="serealia">Serealia</button>
                  <button type="button" class="category-tab" data-category="daging">Daging</button>
                  <button type="button" class="category-tab" data-category="ikan">Ikan</button>
                  <button type="button" class="category-tab" data-category="sayur">Sayur</button>
                  <button type="button" class="category-tab" data-category="buah">Buah</button>
                  <button type="button" class="category-tab" data-category="kacang">Kacang</button>
                  <button type="button" class="category-tab" data-category="telur">Telur</button>
                  <button type="button" class="category-tab" data-category="susu">Susu</button>
                </div>
              </div>
              
              <div class="form-group">
                <label>Pilih Bahan Makanan <span class="required-text">(Bisa pilih banyak)</span></label>
                <div class="ingredients-search">
                  <input type="text" id="ingredient-search" placeholder="Cari bahan makanan..." />
                </div>
                <div id="ingredients-container" class="ingredients-grid">
                  <!-- Ingredients will be populated dynamically -->
                </div>
              </div>
              
              <div class="selected-ingredients-container">
                <h4>Bahan Makanan yang Dipilih:</h4>
                <div id="selected-ingredients" class="selected-items"></div>
              </div>
              
              <div class="button-container">
                <button id="submit-form" class="primary-button">Dapatkan Rekomendasi</button>
              </div>
            </div>

            <div id="recommendation-result" class="result-box"></div>
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    // Complete ingredients database with categories
    const completeIngredientsDatabase = {
      serealia: [
        { id: "beras", name: "Beras", icon: "🌾" },
        { id: "jagung", name: "Jagung", icon: "🌽" },
        { id: "jali", name: "Jali", icon: "🌾" },
        { id: "jawawut", name: "Jawawut", icon: "🌾" },
        { id: "jampang-huma", name: "Jampang Huma", icon: "🌾" },
      ],
      daging: [
        { id: "daging-sapi", name: "Daging Sapi", icon: "🥩" },
        { id: "daging-ansga", name: "Daging Angsa", icon: "🦢" },
        { id: "daging-ayam", name: "Daging Ayam", icon: "🍗" },
        { id: "darah-ayam", name: "Darah Ayam", icon: "🩸" },
        { id: "hati-ayam", name: "Hati Ayam", icon: "🫘" },
        { id: "daging-babi", name: "Daging Babi", icon: "🐖" },
        { id: "ginjal-babi", name: "Ginjal Babi", icon: "🫘" },
        { id: "hati-babi", name: "Hati Babi", icon: "🫘" },
        { id: "daging-itik", name: "Daging Itik", icon: "🦆" },
        { id: "daging-belibis", name: "Daging Belibis", icon: "🦆" },
        { id: "sarang-burung", name: "Sarang Burung", icon: "🕊️" },
        { id: "daging-domba", name: "Daging Domba", icon: "🐑" },
        { id: "ginjal-domba", name: "Ginjal Domba", icon: "🫘" },
        { id: "daging-kambing", name: "Daging Kambing", icon: "🐐" },
        { id: "daging-kelinci", name: "Daging Kelinci", icon: "🐰" },
        { id: "daging-kerbau", name: "Daging Kerbau", icon: "🐂" },
        { id: "daging-kuda", name: "Daging Kuda", icon: "🐎" },
        { id: "babat-sapi", name: "Babat Sapi", icon: "🫘" },
        { id: "delaman-ayam", name: "Delaman Ayam", icon: "🫘" },
        { id: "darah-sapi", name: "Darah Sapi", icon: "🩸" },
        { id: "ginjal-sapi", name: "Ginjal Sapi", icon: "🫘" },
        { id: "keleponan-sapi", name: "Keleponan Sapi", icon: "🫘" },
        { id: "hati-sapi", name: "Hati Sapi", icon: "🫘" },
        { id: "otak-sapi", name: "Otak Sapi", icon: "🫘" },
        { id: "usus-sapi", name: "Usus Sapi", icon: "🫘" },
        { id: "ulat-sagu", name: "Ulat Sagu", icon: "🪱" },
        { id: "daging-buaya", name: "Daging Buaya", icon: "🐊" },
        { id: "daging-menjangan", name: "Daging Menjangan", icon: "🦌" },
        { id: "daging-penyu", name: "Daging Penyu", icon: "🐢" },
      ],
      telur: [
        { id: "telur-ayam-kampung", name: "Telur Ayam Kampung", icon: "🥚" },
        { id: "telur-ayam-ras", name: "Telur Ayam Ras", icon: "🥚" },
        { id: "putih-telur-ayam", name: "Putih Telur Ayam", icon: "🥚" },
        { id: "kuning-telur-ayam", name: "Kuning Telur Ayam", icon: "🥚" },
        { id: "telur-bebek-alabio", name: "Telur Bebek Alabio", icon: "🥚" },
        { id: "kuning-telur-bebek", name: "Kuning Telur Bebek", icon: "🥚" },
        { id: "putih-telur-bebek", name: "Putih Telur Bebek", icon: "🥚" },
        { id: "telur-bebek-tambak", name: "Telur Bebek Tambak", icon: "🥚" },
        { id: "telur-burung-maleo", name: "Telur Burung Maleo", icon: "🥚" },
        { id: "telur-penyu", name: "Telur Penyu", icon: "🥚" },
        { id: "telur-burung-puyuh", name: "Telur Burung Puyuh", icon: "🥚" },
      ],
      ubi: [
        { id: "arrowroot", name: "Arrowroot", icon: "🍠" },
        { id: "batatas-gembili", name: "Batatas Gembili", icon: "🍠" },
        { id: "batatas-kelapa", name: "Batatas Kelapa", icon: "🍠" },
        { id: "talas", name: "Talas", icon: "🥔" },
        { id: "bengkuang", name: "Bengkuang", icon: "🥔" },
        { id: "gadung-kering", name: "Gadung Kering", icon: "🍠" },
        { id: "gadung", name: "Gadung", icon: "🍠" },
        { id: "ganyong", name: "Ganyong", icon: "🍠" },
        { id: "gembili", name: "Gembili", icon: "🍠" },
        { id: "ubi-hutan", name: "Ubi Hutan", icon: "🍠" },
        { id: "kaburan", name: "Kaburan", icon: "🍠" },
        { id: "kentang", name: "Kentang", icon: "🥔" },
        { id: "kentang-hitam", name: "Kentang Hitam", icon: "🥔" },
        { id: "keribang", name: "Keribang", icon: "🍠" },
        { id: "singkong", name: "Singkong", icon: "🍠" },
        { id: "ubi-rumput", name: "Ubi Rumput", icon: "🍠" },
        { id: "sagu-aren-kering", name: "Sagu Aren Kering", icon: "🍠" },
        { id: "sagu-aren", name: "Sagu Aren", icon: "🍠" },
        { id: "sagu-kasbi", name: "Sagu Kasbi", icon: "🍠" },
        { id: "sagu-lempeng", name: "Sagu Lempeng", icon: "🍠" },
        {
          id: "sagu-singkong-kering",
          name: "Sagu Singkong Kering",
          icon: "🍠",
        },
        { id: "sente", name: "Sente", icon: "🍠" },
        { id: "suweg", name: "Suweg", icon: "🍠" },
        { id: "talas-bogor", name: "Talas Bogor", icon: "🥔" },
        { id: "talas-pontianak", name: "Talas Pontianak", icon: "🥔" },
        { id: "talas-viqueque", name: "Talas Viqueque", icon: "🥔" },
        { id: "ubi-jalar-kuning", name: "Ubi Jalar Kuning", icon: "🍠" },
        { id: "ubi-jalar-manis", name: "Ubi Jalar Manis", icon: "🍠" },
        { id: "ubi-jalar-merah", name: "Ubi Jalar Merah", icon: "🍠" },
        { id: "ubi-jalar-putih", name: "Ubi Jalar Putih", icon: "🍠" },
        { id: "ubi-jalar-tinta", name: "Ubi Jalar Tinta", icon: "🍠" },
        { id: "umbi-uwi", name: "Umbi Uwi", icon: "🍠" },
      ],
      susu: [
        { id: "krim", name: "Krim", icon: "🥛" },
        { id: "susu-ibu-asi", name: "Susu Ibu - ASI", icon: "🍼" },
        { id: "susu-kambing", name: "Susu Kambing", icon: "🥛" },
        { id: "susu-kerbau", name: "Susu Kerbau", icon: "🥛" },
        { id: "susu-kuda", name: "Susu Kuda", icon: "🥛" },
        { id: "susu-sapi", name: "Susu Sapi", icon: "🥛" },
      ],
      sayur: [
        { id: "akar-tonjong", name: "Akar Tonjong", icon: "🌿" },
        { id: "ale-toge", name: "Ale Toge", icon: "🌱" },
        { id: "andaliman", name: "Andaliman", icon: "🌿" },
        { id: "andewi", name: "Andewi", icon: "🌿" },
        { id: "bakung", name: "Bakung", icon: "🌿" },
        { id: "baligo", name: "Baligo", icon: "🌿" },
        { id: "bawang-bombay", name: "Bawang Bombay", icon: "🧅" },
        { id: "bayam", name: "Bayam", icon: "🥬" },
        { id: "bayam-merah", name: "Bayam Merah", icon: "🥬" },
        { id: "bit", name: "Bit", icon: "🫑" },
        { id: "buah-kelor", name: "Buah Kelor", icon: "🍒" },
        { id: "buah-merah", name: "Buah Merah", icon: "🍒" },
        { id: "buncis", name: "Buncis", icon: "🫘" },
        { id: "bunga-pepaya", name: "Bunga Pepaya", icon: "🌸" },
        { id: "bunga-turi", name: "Bunga Turi", icon: "🌸" },
        { id: "caisin", name: "Caisin", icon: "🥬" },
        { id: "daun-bangun-bangun", name: "Daun Bangun-Bangun", icon: "🌿" },
        { id: "daun-bawang-merah", name: "Daun Bawang Merah", icon: "🌿" },
        { id: "daun-bebuas", name: "Daun Bebuas", icon: "🌿" },
        { id: "daun-belem", name: "Daun Belem", icon: "🌿" },
        { id: "daun-bluntas", name: "Daun Bluntas", icon: "🌿" },
        { id: "daun-gandaria", name: "Daun Gandaria", icon: "🌿" },
        { id: "daun-gedi-besar", name: "Daun Gedi Besar", icon: "🌿" },
        { id: "daun-gedi-kecil", name: "Daun Gedi Kecil", icon: "🌿" },
        { id: "daun-gelang", name: "Daun Gelang", icon: "🌿" },
        { id: "daun-gunda-bali", name: "Daun Gunda Bali", icon: "🌿" },
        { id: "daun-gunda-serang", name: "Daun Gunda Serang", icon: "🌿" },
        {
          id: "daun-jambu-mete-muda",
          name: "Daun Jambu Mete Muda",
          icon: "🌿",
        },
        { id: "daun-jampang", name: "Daun Jampang", icon: "🌿" },
        { id: "daun-jawaw-seluang", name: "Daun Jawaw Seluang", icon: "🌿" },
        { id: "daun-jonghe", name: "Daun Jonghe", icon: "🌿" },
        { id: "daun-kacang-ma", name: "Daun Kacang Ma", icon: "🌿" },
        { id: "daun-kacang-panjang", name: "Daun Kacang Panjang", icon: "🌿" },
        { id: "daun-singkong", name: "Daun Singkong", icon: "🌿" },
        { id: "karet", name: "Karet", icon: "🌿" },
        { id: "daun-katuk", name: "Daun Katuk", icon: "🌿" },
        { id: "daun-kecipir", name: "Daun Kecipir", icon: "🌿" },
        { id: "daun-kedondong", name: "Daun Kedondong", icon: "🌿" },
        { id: "daun-kelor", name: "Daun Kelor", icon: "🌿" },
        { id: "daun-kemang", name: "Daun Kemang", icon: "🌿" },
        { id: "daun-kenikir", name: "Daun Kenikir", icon: "🌿" },
        { id: "daun-kesum", name: "Daun Kesum", icon: "🌿" },
        { id: "daun-kol-sawi", name: "Daun Kol Sawi", icon: "🌿" },
        { id: "daun-koro", name: "Daun Koro", icon: "🌿" },
        { id: "daun-kubis", name: "Daun Kubis", icon: "🌿" },
        { id: "daun-kumak", name: "Daun Kumak", icon: "🌿" },
        { id: "daun-labu-siam", name: "Daun Labu Siam", icon: "🌿" },
        { id: "daun-labu", name: "Daun Labu", icon: "🌿" },
        { id: "waluh-kuning", name: "Waluh/Kuning", icon: "🌿" },
        { id: "daun-lamtoro", name: "Daun Lamtoro", icon: "🌿" },
        { id: "daun-leilem", name: "Daun Leilem", icon: "🌿" },
        { id: "daun-leunca", name: "Daun Leunca", icon: "🌿" },
        { id: "daun-lobak", name: "Daun Lobak", icon: "🌿" },
        { id: "daun-lompong-talas", name: "Daun Lompong Talas", icon: "🌿" },
        { id: "daun-mangkokan", name: "Daun Mangkokan", icon: "🌿" },
        { id: "daun-matel-ambon", name: "Daun Matel Ambon", icon: "🌿" },
        { id: "daun-melinjo", name: "Daun Melinjo", icon: "🌿" },
        { id: "daun-mengkudu", name: "Daun Mengkudu", icon: "🌿" },
        { id: "daun-ndusuk", name: "Daun Ndusuk", icon: "🌿" },
        { id: "daun-oyong", name: "Daun Oyong", icon: "🌿" },
        { id: "daun-pakis", name: "Daun Pakis", icon: "🌿" },
        { id: "wambateu", name: "Wambateu", icon: "🌿" },
        { id: "daun-paku", name: "Daun Paku", icon: "🌿" },
        { id: "daun-pangi", name: "Daun Pangi", icon: "🌿" },
        { id: "daun-pare", name: "Daun Pare", icon: "🌿" },
        { id: "daun-pepaya", name: "Daun Pepaya", icon: "🌿" },
        { id: "daun-pohpohan", name: "Daun Pohpohan", icon: "🌿" },
        { id: "daun-selasih", name: "Daun Selasih", icon: "🌿" },
        { id: "daun-semanggi", name: "Daun Semanggi", icon: "🌿" },
        { id: "daun-simpur", name: "Daun Simpur", icon: "🌿" },
        { id: "daun-singkil", name: "Daun Singkil", icon: "🌿" },
        { id: "daun-singkong-ambon", name: "Daun Singkong Ambon", icon: "🌿" },
        {
          id: "daun-singkong-ampenan",
          name: "Daun Singkong Amphenan",
          icon: "🌿",
        },
        {
          id: "daun-singkong-kopang",
          name: "Daun Singkong Kopang",
          icon: "🌿",
        },
        { id: "daun-sintrong", name: "Daun Sintrong", icon: "🌿" },
        { id: "daun-talas", name: "Daun Talas", icon: "🌿" },
        { id: "daun-tespong", name: "Daun Tespong", icon: "🌿" },
        { id: "daun-ubi-kuning", name: "Daun Ubi Kuning", icon: "🌿" },
        { id: "daun-ubi-merah", name: "Daun Ubi Merah", icon: "🌿" },
        { id: "daun-ubi-putih", name: "Daun Ubi Putih", icon: "🌿" },
        { id: "daun-ubi-tinta", name: "Daun Ubi Tinta", icon: "🌿" },
        { id: "eceng", name: "Eceng", icon: "🌿" },
        { id: "gambas-oyong", name: "Gambas (Oyong)", icon: "🥒" },
        { id: "genjer", name: "Genjer", icon: "🌿" },
        { id: "jagung-muda", name: "Jagung Muda / Semi", icon: "🌽" },
        { id: "jamur-encik", name: "Jamur Encik", icon: "🍄" },
        { id: "jamur-kuping", name: "Jamur Kuping", icon: "🍄" },
        { id: "jamur-merang", name: "Jamur Merang", icon: "🍄" },
        { id: "jamur-tiram", name: "Jamur Tiram", icon: "🍄" },
        { id: "jamur-sagu", name: "Jamur Sagu", icon: "🍄" },
        { id: "jantung-pisang", name: "Jantung Pisang", icon: "🍌" },
        { id: "jengkol", name: "Jengkol", icon: "🫘" },
        { id: "jotang", name: "Jotang", icon: "🌿" },
        { id: "kabau", name: "Kabau", icon: "🌿" },
        { id: "kacang-mekah", name: "Kacang Mejah", icon: "🫘" },
        { id: "polong", name: "Polong", icon: "🫘" },
        { id: "kacang-panjang", name: "Kacang Panjang", icon: "🫘" },
        { id: "kacang-ranti-polong", name: "Kacang Ranti Polong", icon: "🫘" },
        { id: "kalakai", name: "Kalakai", icon: "🌿" },
        { id: "kangkung", name: "Kangkung", icon: "🥬" },
        { id: "kangkung-tondano", name: "Kangkung Tondano", icon: "🥬" },
        { id: "kapri-muda", name: "Kapri Muda", icon: "🫘" },
        { id: "karawila", name: "Karawila", icon: "🌿" },
        { id: "kecipir-muda", name: "Kecipir Muda", icon: "🫘" },
        { id: "kecombrang", name: "Kecombrang", icon: "🌿" },
        { id: "kelawi", name: "Kelawi", icon: "🌿" },
        { id: "kembang-turi", name: "Kembang Turi", icon: "🌸" },
        { id: "kerokot", name: "Kerokot", icon: "🌿" },
        { id: "ketimun", name: "Ketimun", icon: "🥒" },
        { id: "ketimun-krai", name: "Ketimun Krai", icon: "🥒" },
        { id: "ketimun-madura", name: "Ketimun Madura", icon: "🥒" },
        { id: "komak", name: "Komak", icon: "🫘" },
        { id: "kool-kembang", name: "Kool Kembang", icon: "🥦" },
        { id: "kool-putih", name: "Kool Putih", icon: "🥦" },
        { id: "kool-merah", name: "Kool Merah", icon: "🥦" },
        { id: "koro-kerupuk", name: "Koro Kerupuk", icon: "🫘" },
        { id: "koro-wedus", name: "Koro Wedus", icon: "🫘" },
        { id: "kucai", name: "Kucai", icon: "🌿" },
        { id: "kucai-muda-lokio", name: "Kucai Muda (Lokio)", icon: "🌿" },
        { id: "kulit-melinjo", name: "Kulit Melinjo", icon: "🌿" },
        { id: "kundur", name: "Kundur", icon: "🌿" },
        { id: "labu-air", name: "Labu Air", icon: "🥒" },
        { id: "labu-kuning", name: "Labu Kuning", icon: "🎃" },
        { id: "labu-siam", name: "Labu Siam", icon: "🥒" },
        { id: "labu-waluh", name: "Labu Waluh", icon: "🎃" },
        { id: "lantar", name: "Lantar", icon: "🌿" },
        { id: "lobak", name: "Lobak", icon: "🥕" },
        { id: "lumai-leunca", name: "Lumai/Leunca", icon: "🌿" },
        { id: "melinjo", name: "Melinjo", icon: "🌿" },
        { id: "sawi", name: "Sawi", icon: "🥬" },
        { id: "nangka-muda", name: "Nangka Muda", icon: "🍏" },
        { id: "paria-putih", name: "Paria Putih", icon: "🌿" },
        { id: "pepare-ular", name: "Pepare Ular", icon: "🥒" },
        { id: "pepaya-muda", name: "Pepaya Muda", icon: "🟠" },
        { id: "petai", name: "Petai", icon: "🫘" },
        { id: "peterseli", name: "Peterseli", icon: "🌿" },
        { id: "pucuk-lumai-daun", name: "Pucuk Lumai/daun", icon: "🌿" },
        { id: "leunca", name: "Leunca", icon: "🫘" },
        { id: "putri-malu", name: "Putri Malu", icon: "🌿" },
        { id: "rebung", name: "Rebung", icon: "🎋" },
        { id: "rimbang", name: "Rimbang", icon: "🌿" },
        { id: "rumput-laut", name: "Rumput Laut", icon: "🌿" },
        { id: "sawi-putih-pecai", name: "Sawi Putih / Pecai", icon: "🥬" },
        { id: "sawi-taiwan", name: "Sawi Taiwan", icon: "🥬" },
        { id: "sawi-tanah", name: "Sawi Tanah", icon: "🥬" },
        { id: "selada", name: "Selada", icon: "🥬" },
        { id: "selada-air", name: "Selada Air", icon: "🥬" },
        { id: "seledri", name: "Seledri", icon: "🌿" },
        { id: "taoge", name: "Taoge", icon: "🌱" },
        {
          id: "taoge-kacang-kedelai",
          name: "Taoge Kacang Kedelai",
          icon: "🌱",
        },
        {
          id: "taoge-kacang-tunggak",
          name: "Taoge Kacang Tunggak",
          icon: "🌱",
        },
        { id: "tebu-terubuk-lilin", name: "Tebu Terubuk (Lilin)", icon: "🌿" },
        { id: "tekokak-kering", name: "Tekokak Kering", icon: "🌿" },
        { id: "terong", name: "Terong", icon: "🍆" },
        { id: "terong-asam", name: "Terong Asam", icon: "🍆" },
        { id: "terung-belanda", name: "Terung Belanda", icon: "🍆" },
        { id: "terung-bengkulu", name: "Terung Bengkulu", icon: "🍆" },
        { id: "terung-hintalo", name: "Terung Hintalo", icon: "🍆" },
        { id: "terung-panjang", name: "Terung Panjang", icon: "🍆" },
        { id: "tomat-air", name: "Tomat Air", icon: "🍅" },
        { id: "tomat-merah", name: "Tomat Merah", icon: "🍅" },
        { id: "tomat-muda", name: "Tomat Muda", icon: "🍅" },
        { id: "uceng-bunga-melinjo", name: "Uceng/Bunga Melinjo", icon: "🌸" },
        { id: "umbut-kelapa", name: "Umbut Kelapa", icon: "🥥" },
        { id: "umbut-rotan", name: "Umbut Rotan", icon: "🌿" },
        { id: "wortel", name: "Wortel", icon: "🥕" },
      ],
      buah: [
        { id: "alpukat", name: "Alpukat", icon: "🥑" },
        { id: "anggur-hutan", name: "Anggur Hutan", icon: "🍇" },
        { id: "apel-malang", name: "Apel Malang", icon: "🍎" },
        { id: "apel", name: "Apel", icon: "🍎" },
        { id: "arbai", name: "Arbai", icon: "🍒" },
        { id: "belimbing", name: "Belimbing", icon: "🍐" },
        { id: "biwah", name: "Biwah", icon: "🍒" },
        { id: "buah-atung", name: "Buah Atung", icon: "🍒" },
        { id: "buah-kelenting", name: "Buah Kelenting", icon: "🍒" },
        { id: "buah-kom", name: "Buah Kom", icon: "🍒" },
        { id: "buah-mentega", name: "Buah Mentega", icon: "🍒" },
        { id: "buah-naga-merah", name: "Buah Naga Merah", icon: "🍓" },
        { id: "buah-naga-putih", name: "Buah Naga Putih", icon: "🍓" },
        { id: "buah-negri", name: "Buah Negri", icon: "🍒" },
        { id: "buah-nona", name: "Buah Nona", icon: "🍐" },
        { id: "buah-rotan", name: "Buah Rotan", icon: "🍒" },
        { id: "buah-rukam", name: "Buah Rukam", icon: "🍒" },
        { id: "buah-ruruhi", name: "Buah Ruruhi", icon: "🍒" },
        { id: "buah-tuppa", name: "Buah Tuppa", icon: "🍒" },
        { id: "carica-papaya", name: "Carica Papaya", icon: "🟠" },
        { id: "cempedak", name: "Cempedak", icon: "🍐" },
        { id: "duku", name: "Duku", icon: "🍒" },
        { id: "durian", name: "Durian", icon: "🟡" },
        { id: "duwet", name: "Duwet", icon: "🍒" },
        { id: "embacang", name: "Embacang", icon: "🍒" },
        { id: "encung-asam", name: "Encung Asam", icon: "🍒" },
        { id: "erbis", name: "Erbis", icon: "🍒" },
        { id: "gandaria-masak", name: "Gandaria Masak", icon: "🍒" },
        { id: "gatep", name: "Gatep", icon: "🍒" },
        { id: "jambu-air", name: "Jambu Air", icon: "🍐" },
        { id: "jambu-biji", name: "Jambu Biji", icon: "🍐" },
        {
          id: "jambu-biji-putih-tidak-berbiji",
          name: "Jambu Biji Putih Tidak Berbiji",
          icon: "🍐",
        },
        { id: "jambu-bol", name: "Jambu Bol", icon: "🍐" },
        { id: "jambu-monyet", name: "Jambu Monyet", icon: "🍐" },
        { id: "jeruk-bali", name: "Jeruk Bali", icon: "🍊" },
        { id: "jeruk-banjar", name: "Jeruk Banjar", icon: "🍊" },
        { id: "jeruk-garut-keprok", name: "Jeruk Garut-Keprok", icon: "🍊" },
        { id: "jeruk-kalamansi", name: "Jeruk Kalamansi", icon: "🍊" },
        { id: "jeruk-manis", name: "Jeruk Manis", icon: "🍊" },
        { id: "jeruk-nipis", name: "Jeruk Nipis", icon: "🍋" },
        { id: "jeruk-ragi", name: "Jeruk Ragi", icon: "🍊" },
        { id: "kawista", name: "Kawista", icon: "🍒" },
        { id: "kedondong-masak", name: "Kedondong Masak", icon: "🍒" },
        { id: "kedondong", name: "Kedondong", icon: "🍒" },
        { id: "kelapa-hutan", name: "Kelapa Hutan", icon: "🥥" },
        { id: "kelapa-muda", name: "Kelapa Muda", icon: "🥥" },
        { id: "kemang", name: "Kemang", icon: "🍒" },
        { id: "kesemek", name: "Kesemek", icon: "🍒" },
        { id: "kokosan", name: "Kokosan", icon: "🥥" },
        { id: "kranji", name: "Kranji", icon: "🍒" },
        { id: "langsat", name: "Langsat", icon: "🍒" },
        { id: "lemon", name: "Lemon", icon: "🍋" },
        { id: "lontar", name: "Lontar", icon: "🌴" },
        { id: "mangga", name: "Mangga", icon: "🥭" },
        { id: "mangga-benggala", name: "Mangga Benggala", icon: "🥭" },
        { id: "mangga-gedung", name: "Mangga Gedung", icon: "🥭" },
        { id: "mangga-golek", name: "Mangga Golek", icon: "🥭" },
        { id: "mangga-harumanis", name: "Mangga Harumanis", icon: "🥭" },
        { id: "mangga-indramayu", name: "Mangga Indramayu", icon: "🥭" },
        { id: "mangga-kopek", name: "Mangga Kopek", icon: "🥭" },
        { id: "mangga-kwini", name: "Mangga Kwini", icon: "🥭" },
        { id: "mangga-manalagi", name: "Mangga Manalagi", icon: "🥭" },
        { id: "mangga-muda", name: "Mangga Muda", icon: "🥭" },
        { id: "manggis", name: "Manggis", icon: "🟣" },
        { id: "markisa", name: "Markisa", icon: "🟠" },
        { id: "matoa", name: "Matoa", icon: "🍒" },
        { id: "melon", name: "Melon", icon: "🍈" },
        { id: "menteng", name: "Menteng", icon: "🍒" },
        { id: "nanas-palembang", name: "Nanas Palembang", icon: "🍍" },
        { id: "nanas", name: "Nanas", icon: "🍍" },
        { id: "nangka-masak-pohon", name: "Nangka Masak Pohon", icon: "🍏" },
        { id: "pala", name: "Pala", icon: "🌰" },
        { id: "pepaya", name: "Pepaya", icon: "🟠" },
        { id: "pisang-ambon", name: "Pisang Ambon", icon: "🍌" },
        {
          id: "pisang-angleng-pisang-ampyang",
          name: "Pisang Angleng (Pisang Ampyang)",
          icon: "🍌",
        },
        { id: "pisang-ayam", name: "Pisang Ayam", icon: "🍌" },
        { id: "pisang-gapi", name: "Pisang Gapi", icon: "🍌" },
        { id: "pisang-goroho", name: "Pisang Goroho", icon: "🍌" },
        { id: "pisang-hijau", name: "Pisang Hijau", icon: "🍌" },
        { id: "pisang-kayu", name: "Pisang Kayu", icon: "🍌" },
        { id: "pisang-kepok", name: "Pisang Kepok", icon: "🍌" },
        { id: "pisang-ketip", name: "Pisang Ketip", icon: "🍌" },
        { id: "pisang-kidang", name: "Pisang Kidang", icon: "🍌" },
        { id: "pisang-lampung", name: "Pisang Lampung", icon: "🍌" },
        {
          id: "pisang-mas-bali-ampenan",
          name: "Pisang Mas Bali Amphenan",
          icon: "🍌",
        },
        {
          id: "pisang-mas-bali-kopang",
          name: "Pisang Mas Bali Kopang",
          icon: "🍌",
        },
        { id: "pisang-mas", name: "Pisang Mas", icon: "🍌" },
        { id: "pisang-raja-sereh", name: "Pisang Raja Sereh", icon: "🍌" },
        { id: "pisang-rotan", name: "Pisang Rotan", icon: "🍌" },
        { id: "pisang-talas", name: "Pisang Talas", icon: "🍌" },
        { id: "pisang-tujuh-bulan", name: "Pisang Tujuh Bulan", icon: "🍌" },
        { id: "pisang-ua", name: "Pisang Ua", icon: "🍌" },
        { id: "pisang-uli", name: "Pisang Uli", icon: "🍌" },
        { id: "purut", name: "Purut", icon: "🍋" },
        { id: "rambutan-binjai", name: "Rambutan Binjai", icon: "🔴" },
        { id: "rambutan", name: "Rambutan", icon: "🔴" },
        { id: "salak-bali", name: "Salak Bali", icon: "🥝" },
        { id: "salak-medan", name: "Salak Medan", icon: "🥝" },
        { id: "salak-pondoh", name: "Salak Pondoh", icon: "🥝" },
        { id: "salak", name: "Salak", icon: "🥝" },
        { id: "sawo-duren", name: "Sawo Duren", icon: "🍐" },
        { id: "sawo-kecil", name: "Sawo Kecil", icon: "🍐" },
        { id: "sawo-manila", name: "Sawo Manila", icon: "🍐" },
        { id: "semangka", name: "Semangka", icon: "🍉" },
        { id: "sirsak", name: "Sirsak", icon: "🍐" },
        { id: "sowa", name: "Sowa", icon: "🍐" },
        { id: "srikaya", name: "Srikaya", icon: "🍐" },
        { id: "sukun-muda", name: "Sukun Muda", icon: "🍏" },
        { id: "sukun-tua", name: "Sukun Tua", icon: "🍏" },
        { id: "vigus", name: "Vigus", icon: "🍒" },
        { id: "wani", name: "Wani", icon: "🍒" },
      ],
      ikan: [
        { id: "belut", name: "Belut", icon: "🐟" },
        { id: "belut-laut", name: "Belut Laut", icon: "🐟" },
        { id: "cumi-cumi", name: "Cumi-cumi", icon: "🦑" },
        { id: "ikan-bader", name: "Ikan Bader", icon: "🐟" },
        { id: "ikan-balong", name: "Ikan Balong", icon: "🐟" },
        { id: "ikan-bambangan", name: "Ikan Bambangan", icon: "🐟" },
        { id: "ikan-bandeng", name: "Ikan Bandeng", icon: "🐟" },
        { id: "ikan-banjar", name: "Ikan Banjar", icon: "🐟" },
        { id: "ikan-baronang", name: "Ikan Baronang", icon: "🐟" },
        { id: "ikan-batung", name: "Ikan Batung", icon: "🐟" },
        { id: "ikan-baung", name: "Ikan Baung", icon: "🐟" },
        { id: "ikan-bawal", name: "Ikan Bawal", icon: "🐟" },
        { id: "ikan-belida", name: "Ikan Belida", icon: "🐟" },
        { id: "ikan-beunteur", name: "Ikan Beunteur", icon: "🐟" },
        { id: "ikan-biawan", name: "Ikan Biawan", icon: "🐟" },
        { id: "ikan-bili", name: "Ikan Bili", icon: "🐟" },
        { id: "ikan-bubara", name: "Ikan Bubara", icon: "🐟" },
        { id: "ikan-bulan-bulan", name: "Ikan Bulan-Bulan", icon: "🐟" },
        { id: "ikan-cakalang", name: "Ikan Cakalang", icon: "🐟" },
        { id: "hati-ikan-cakalang", name: "Hati Ikan Cakalang", icon: "🫘" },
        {
          id: "jantung-ikan-cakalang",
          name: "Jantung Ikan Cakalang",
          icon: "🫀",
        },
        { id: "ikan-daun", name: "Ikan Daun", icon: "🐟" },
        { id: "ikan-ekor-kuning", name: "Ikan Ekor Kuning", icon: "🐟" },
        { id: "ikan-gabus", name: "Ikan Gabus", icon: "🐟" },
        { id: "ikan-heu", name: "Ikan Heu", icon: "🐟" },
        { id: "ikan-hitam", name: "Ikan Hitam", icon: "🐟" },
        { id: "ikan-hiu", name: "Ikan Hiu", icon: "🦈" },
        { id: "ikan-kacangan", name: "Ikan Kacangan", icon: "🐟" },
        { id: "ikan-kakap", name: "Ikan Kakap", icon: "🐟" },
        { id: "ikan-kakatua", name: "Ikan Kakatua", icon: "🐟" },
        { id: "ikan-kalaban", name: "Ikan Kalaban", icon: "🐟" },
        {
          id: "ikan-kamera-kakap-merah",
          name: "Ikan Kamera (Kakap Merah)",
          icon: "🐟",
        },
        { id: "ikan-kapar", name: "Ikan Kapar", icon: "🐟" },
        { id: "ikan-kawalinya", name: "Ikan Kawalinya", icon: "🐟" },
        { id: "ikan-keru-keru", name: "Ikan Keru-Keru", icon: "🐟" },
        { id: "ikan-kima", name: "Ikan Kima", icon: "🐚" },
        { id: "ikan-lais", name: "Ikan Lais", icon: "🐟" },
        { id: "ikan-layang", name: "Ikan Layang", icon: "🐟" },
        { id: "ikan-layur", name: "Ikan Layur", icon: "🐟" },
        { id: "ikan-lehoma", name: "Ikan Lehoma", icon: "🐟" },
        { id: "ikan-lemuru", name: "Ikan Lemuru", icon: "🐟" },
        { id: "ikan-lidah", name: "Ikan Lidah", icon: "🐟" },
        { id: "ikan-malalugis", name: "Ikan Malalugis", icon: "🐟" },
        { id: "ikan-mamar-merah", name: "Ikan Mamar Merah", icon: "🐟" },
        { id: "ikan-mas", name: "Ikan Mas", icon: "🐟" },
        { id: "ikan-mayong", name: "Ikan Mayong", icon: "🐟" },
        { id: "ikan-mujahir", name: "Ikan Mujahir", icon: "🐟" },
        { id: "ikan-nasu-metti", name: "Ikan Nasu Metti", icon: "🐟" },
        { id: "ikan-oci-kembung", name: "Ikan Oci / Kembung", icon: "🐟" },
        { id: "ikan-paling", name: "Ikan Paling", icon: "🐟" },
        { id: "ikan-papuyu", name: "Ikan Papuyu", icon: "🐟" },
        { id: "ikan-patin", name: "Ikan Patin", icon: "🐟" },
        { id: "ikan-pomo", name: "Ikan Pomo", icon: "🐟" },
        { id: "ikan-puntin", name: "Ikan Puntin", icon: "🐟" },
        { id: "ikan-saluang", name: "Ikan Saluang", icon: "🐟" },
        { id: "ikan-sarden", name: "Ikan Sarden", icon: "🐟" },
        { id: "ikan-selar", name: "Ikan Selar", icon: "🐟" },
        { id: "ikan-sepat", name: "Ikan Sepat", icon: "🐟" },
        { id: "ikan-sidat", name: "Ikan Sidat", icon: "🐟" },
        { id: "ikan-sunu", name: "Ikan Sunu", icon: "🐟" },
        { id: "ikan-tahuman", name: "Ikan Tahuman", icon: "🐟" },
        { id: "ikan-tarmon", name: "Ikan Tarmon", icon: "🐟" },
        { id: "ikan-telan", name: "Ikan Telan", icon: "🐟" },
        { id: "ikan-tembang", name: "Ikan Tembang", icon: "🐟" },
        { id: "ikan-tempahas", name: "Ikan Tempahas", icon: "🐟" },
        { id: "ikan-terbang", name: "Ikan Terbang", icon: "🐟" },
        { id: "ikan-teri", name: "Ikan Teri", icon: "🐟" },
        { id: "ikan-titang", name: "Ikan Titang", icon: "🐟" },
        { id: "ikan-tongkol", name: "Ikan Tongkol", icon: "🐟" },
        { id: "ikan-turi", name: "Ikan Turi", icon: "🐟" },
        { id: "keong", name: "Keong", icon: "🐚" },
        { id: "kepiting", name: "Kepiting", icon: "🦀" },
        { id: "kerang", name: "Kerang", icon: "🐚" },
        { id: "kodok", name: "Kodok", icon: "🐸" },
        { id: "kura-kura", name: "Kura-kura", icon: "🐢" },
        { id: "kuro", name: "Kuro", icon: "🐟" },
        { id: "lokan", name: "Lokan", icon: "🐚" },
        { id: "rajungan", name: "Rajungan", icon: "🦀" },
        { id: "rebon", name: "Rebon", icon: "🦐" },
        { id: "segar", name: "Segar", icon: "🐟" },
        { id: "rusip", name: "Rusip", icon: "🐟" },
        { id: "udang-galah", name: "Udang Galah", icon: "🦐" },
        { id: "udang-besar", name: "Udang, Besar", icon: "🦐" },
        { id: "udang", name: "Udang", icon: "🦐" },
      ],
      kacang: [
        { id: "kacang-arab-kering", name: "Kacang Arab Kering", icon: "🥜" },
        { id: "kacang-babi-kering", name: "Kacang Babi Kering", icon: "🥜" },
        {
          id: "kacang-belimbing-kering",
          name: "Kacang Belimbing Kering",
          icon: "🥜",
        },
        { id: "kacang-beracun", name: "Kacang Beracun", icon: "🥜" },
        { id: "kacang-bogor", name: "Kacang Bogor", icon: "🥜" },
        { id: "kacang-endel-kering", name: "Kacang Endel Kering", icon: "🥜" },
        { id: "kacang-ercis", name: "Kacang Ercis", icon: "🫘" },
        { id: "kacang-galing", name: "Kacang Galing", icon: "🥜" },
        { id: "kacang-gude", name: "Kacang Gude", icon: "🥜" },
        {
          id: "kacang-hijau-var-bakti",
          name: "Kacang Hijau Var Bakti",
          icon: "🫘",
        },
        {
          id: "kacang-hijau-var-siwalik",
          name: "Kacang Hijau Var Siwalik",
          icon: "🫘",
        },
        { id: "kacang-hijau-kering", name: "Kacang Hijau Kering", icon: "🫘" },
        { id: "kacang-hitam-kering", name: "Kacang Hitam Kering", icon: "🫘" },
        { id: "kacang-kapri", name: "Kacang Kapri", icon: "🫘" },
        {
          id: "kacang-kedelai-kering",
          name: "Kacang Kedelai Kering",
          icon: "🫘",
        },
        { id: "kacang-kedelai", name: "Kacang Kedelai", icon: "🫘" },
        { id: "kacang-kincai-kering", name: "Kacang Kincai Kering", icon: "🫘" },
        { id: "kacang-komak", name: "Kacang Komak", icon: "🫘" },
        { id: "kacang-kuning-kering", name: "Kacang Kuning Kering", icon: "🫘" },
        { id: "kacang-lebui-iris", name: "Kacang Lebui / Iris", icon: "🫘" },
        {
          id: "kacang-mentega-kering",
          name: "Kacang Mentega Kering",
          icon: "🫘",
        },
        { id: "kacang-merah-banda", name: "Kacang Merah / Banda", icon: "🫘" },
        {
          id: "kacang-merah-tua-kering",
          name: "Kacang Merah Tua, Kering",
          icon: "🫘",
        },
        { id: "kacang-merah", name: "Kacang Merah", icon: "🫘" },
        {
          id: "kacang-mete-biji-jambu-monyet",
          name: "Kacang Mete / Biji Jambu Monyet",
          icon: "🥜",
        },
        { id: "biji-kacang-panjang", name: "Biji Kacang Panjang", icon: "🫘" },
        { id: "kacang-tanah-sangan", name: "Kacang Tanah Sangan", icon: "🥜" },
        { id: "kacang-tanah", name: "Kacang Tanah", icon: "🥜" },
        { id: "kacang-tolo-tunggak", name: "Kacang Tolo / Tunggak", icon: "🫘" },
        { id: "kacang-tunis", name: "Kacang Tunis", icon: "🫘" },
        { id: "kacang-uci", name: "Kacang Uci", icon: "🫘" },
        { id: "kacang-urei", name: "Kacang Urei", icon: "🫘" },
        { id: "kenari-banda", name: "Kenari Banda", icon: "🥜" },
        { id: "kenari", name: "Kenari", icon: "🥜" },
        { id: "komak-polong", name: "Komak Polong", icon: "🫘" },
        { id: "koro-andong", name: "Koro Andong", icon: "🫘" },
        { id: "biji-boro-benguk", name: "Biji Boro Benguk", icon: "🫘" },
        { id: "biji-koro-kerupuk", name: "Biji Koro Kerupuk", icon: "🫘" },
        { id: "biji-koro-loke", name: "Biji Koro Loke", icon: "🫘" },
        { id: "koro-roay-kering", name: "Koro Roay Kering", icon: "🫘" },
        { id: "koro-wedus-kering", name: "Koro Wedus Kering", icon: "🫘" },
        { id: "lamtoro-biji-muda", name: "Lamtoro Biji Muda", icon: "🫘" },
        { id: "lamtoro-biji-tua", name: "Lamtoro Biji Tua", icon: "🫘" },
        { id: "saga-merah-terkupas", name: "Saga Merah Terkupas", icon: "🫘" },
        { id: "wijen", name: "Wijen", icon: "🥜" },
      ],
      minyak: [
        {
          id: "daging-kelapa-setengah-tua",
          name: "Daging Kelapa Setengah Tua",
          icon: "🫗",
        },
        { id: "daging-kelapa-tua", name: "Daging Kelapa Tua", icon: "🫗" },
        { id: "lemak-babi-lard", name: "Lemak Babi (Lard)", icon: "lard" },
        { id: "lemak-babi-bacon", name: "Lemak Babi (Bacon)", icon: "🥓" },
        { id: "lemak-ikan", name: "Lemak Ikan", icon: "🫗" },
        {
          id: "lemak-kerbau-lemak-sapi",
          name: "Lemak Kerbau (Lemak Sapi)",
          icon: "lard",
        },
        { id: "minyak-hati-hiu", name: "Minyak Hati Hiu", icon: "🫗" },
        { id: "minyak-ikan", name: "Minyak Ikan", icon: "🫗" },
        { id: "minyak-kacang-tanah", name: "Minyak Kacang Tanah", icon: "🫗" },
        { id: "minyak-kedelai", name: "Minyak Kedelai", icon: "🫗" },
        { id: "minyak-kelapa", name: "Minyak Kelapa", icon: "🫗" },
        { id: "minyak-kelapa-sawit", name: "Minyak Kelapa Sawit", icon: "🫗" },
        { id: "minyak-wijen", name: "Minyak Wijen", icon: "🫗" },
        { id: "minyak-zaitun", name: "Minyak Zaitun", icon: "🫗" },
      ],
      bumbu: [
        { id: "asam-arang-coklat", name: "Asam Arang Coklat", icon: "🍋" },
        { id: "asam-arang-merah", name: "Asam Arang Merah", icon: "🍋" },
        { id: "asan-kandis", name: "Asan Kandis", icon: "🍋" },
        { id: "asam-masak-pohon", name: "Asam Masak Pohon", icon: "🍋" },
        { id: "asam-payak", name: "Asam Payak", icon: "🍋" },
        { id: "bawang-merah", name: "Bawang Merah", icon: "🧅" },
        { id: "bawang-putih", name: "Bawang Putih", icon: "🧄" },
        { id: "boros-kunci", name: "Boros Kunci", icon: "🌿" },
        {
          id: "boros-laja-lengkuas",
          name: "Boros Laja (Lengkuas)",
          icon: "🌿",
        },
        { id: "cabai-gembor-merah", name: "Cabai Gembor Merah", icon: "🌶️" },
        { id: "cabai-hijau", name: "Cabai Hijau", icon: "🌶️" },
        { id: "cabai-merah-kering", name: "Cabai Merah Kering", icon: "🌶️" },
        { id: "cabai-merah-segar", name: "Cabai Merah Segar", icon: "🌶️" },
        { id: "cabai-rawit-segar", name: "Cabai Rawit Segar", icon: "🌶️" },
        { id: "cengkeh-kering", name: "Cengkeh Kering", icon: "🌿" },
        { id: "daun-salam-bubuk", name: "Daun Salam Bubuk", icon: "🌿" },
        { id: "jahe", name: "Jahe", icon: "🫚" },
        { id: "kemiri", name: "Kemiri", icon: "🥥" },
        { id: "ketumbar-kering", name: "Ketumbar Kering", icon: "🌿" },
        { id: "kluwek", name: "Kluwek", icon: "🌰" },
        { id: "kunyit", name: "Kunyit", icon: "🧡" },
        { id: "merica-kering", name: "Merica Kering", icon: "⚫" },
        { id: "biji-pala-kering", name: "Biji Pala Kering", icon: "🌰" },
      ],
    };

    // Meal-time specific ingredients (filtered from complete database)
    const mealTimeIngredients = {
      breakfast: [
        ...completeIngredientsDatabase.serealia.slice(0, 3),
        ...completeIngredientsDatabase.telur,
        ...completeIngredientsDatabase.susu,
        ...completeIngredientsDatabase.buah.slice(0, 6),
        { id: "roti", name: "Roti", icon: "🍞" },
        { id: "oatmeal", name: "Oatmeal", icon: "🥣" },
        { id: "sereal", name: "Sereal", icon: "🥄" },
        { id: "yogurt", name: "Yogurt", icon: "🥛" },
        { id: "madu", name: "Madu", icon: "🍯" },
      ],
      lunch: [
        ...completeIngredientsDatabase.daging.slice(0, 4),
        ...completeIngredientsDatabase.ikan.slice(0, 5),
        ...completeIngredientsDatabase.sayur.slice(0, 8),
        ...completeIngredientsDatabase.serealia.slice(0, 2),
        ...completeIngredientsDatabase.ubi.slice(0, 3),
        ...completeIngredientsDatabase.kacang.slice(0, 4),
      ],
      dinner: [
        ...completeIngredientsDatabase.daging.slice(0, 3),
        ...completeIngredientsDatabase.ikan.slice(0, 4),
        ...completeIngredientsDatabase.sayur.slice(0, 10),
        ...completeIngredientsDatabase.telur.slice(0, 2),
        ...completeIngredientsDatabase.ubi.slice(0, 4),
        { id: "pasta", name: "Pasta", icon: "🍝" },
        { id: "quinoa", name: "Quinoa", icon: "🌾" },
      ],
    };

    // References to DOM elements
    const submitFormBtn = document.getElementById("submit-form");
    const resultContainer = document.getElementById("recommendation-result");
    const ingredientsContainer = document.getElementById(
      "ingredients-container"
    );
    const selectedIngredientsContainer = document.getElementById(
      "selected-ingredients"
    );
    const categoryTabs = document.querySelectorAll(".category-tab");
    const ingredientSearch = document.getElementById("ingredient-search");

    // Form data storage
    const formData = {
      name: "",
      age: "",
      gender: "laki-laki",
      mealTime: "",
      budget: "25000",
      taste: "gurih",
      ingredients: [],
    };

    let currentMealTime = "";
    let currentCategory = "all";
    let currentIngredients = [];

    // Handle meal time selection change
    const mealTimeSelect = document.getElementById("mealTime");
    mealTimeSelect.addEventListener("change", (e) => {
      formData.mealTime = e.target.value;
      currentMealTime = e.target.value;
      updateIngredientsDisplay();
      // Clear previously selected ingredients when meal time changes
      formData.ingredients = [];
      updateSelectedIngredientsDisplay();
    });

    // Handle category tab clicks
    categoryTabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        // Remove active class from all tabs
        categoryTabs.forEach((t) => t.classList.remove("active"));
        // Add active class to clicked tab
        e.target.classList.add("active");
        currentCategory = e.target.dataset.category;
        updateIngredientsDisplay();
      });
    });

    // Handle ingredient search
    ingredientSearch.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      updateIngredientsDisplay(searchTerm);
    });

    // Update ingredients display based on meal time, category, and search
    function updateIngredientsDisplay(searchTerm = "") {
      if (!currentMealTime || !mealTimeIngredients[currentMealTime]) {
        ingredientsContainer.innerHTML =
          '<p class="select-meal-first">Pilih waktu makan terlebih dahulu</p>';
        return;
      }

      let ingredients = mealTimeIngredients[currentMealTime];

      // Filter by category if not "all"
      if (currentCategory !== "all") {
        ingredients = completeIngredientsDatabase[currentCategory] || [];
      }

      // Filter by search term
      if (searchTerm) {
        ingredients = ingredients.filter((ingredient) =>
          ingredient.name.toLowerCase().includes(searchTerm)
        );
      }

      currentIngredients = ingredients;

      if (ingredients.length === 0) {
        ingredientsContainer.innerHTML =
          '<p class="no-ingredients">Tidak ada bahan makanan yang sesuai</p>';
        return;
      }

      ingredientsContainer.innerHTML = ingredients
        .map(
          (ingredient) => `
          <div class="ingredient-item ${
            formData.ingredients.some((ing) => ing.id === ingredient.id)
              ? "selected"
              : ""
          }" 
               data-ingredient="${ingredient.id}">
            <div class="ingredient-icon">${ingredient.icon}</div>
            <div class="ingredient-name">${ingredient.name}</div>
          </div>
        `
        )
        .join("");

      // Add click event listeners to ingredient items
      ingredientsContainer
        .querySelectorAll(".ingredient-item")
        .forEach((item) => {
          item.addEventListener("click", () => {
            const ingredientId = item.dataset.ingredient;
            const ingredient = ingredients.find(
              (ing) => ing.id === ingredientId
            );

            if (item.classList.contains("selected")) {
              // Remove ingredient
              item.classList.remove("selected");
              formData.ingredients = formData.ingredients.filter(
                (ing) => ing.id !== ingredientId
              );
            } else {
              // Add ingredient
              item.classList.add("selected");
              formData.ingredients.push(ingredient);
            }

            updateSelectedIngredientsDisplay();
          });
        });
    }

    // Update selected ingredients display
    function updateSelectedIngredientsDisplay() {
      if (formData.ingredients.length === 0) {
        selectedIngredientsContainer.innerHTML =
          '<p class="no-selection">Belum ada bahan yang dipilih</p>';
        return;
      }

      selectedIngredientsContainer.innerHTML = formData.ingredients
        .map(
          (ingredient) => `
          <div class="ingredient-pill">
            ${ingredient.icon} ${ingredient.name} 
            <span class="remove-ingredient" data-ingredient="${ingredient.id}">✕</span>
          </div>
        `
        )
        .join("");

      // Add remove functionality
      selectedIngredientsContainer
        .querySelectorAll(".remove-ingredient")
        .forEach((btn) => {
          btn.addEventListener("click", (e) => {
            const ingredientId = e.target.dataset.ingredient;

            // Remove from formData
            formData.ingredients = formData.ingredients.filter(
              (ing) => ing.id !== ingredientId
            );

            // Remove selection from ingredients grid
            const ingredientItem = ingredientsContainer.querySelector(
              `[data-ingredient="${ingredientId}"]`
            );
            if (ingredientItem) {
              ingredientItem.classList.remove("selected");
            }

            updateSelectedIngredientsDisplay();
          });
        });
    }

    // Handle form input changes
    document.getElementById("childName").addEventListener("input", (e) => {
      formData.name = e.target.value;
    });

    document.getElementById("childAge").addEventListener("change", (e) => {
      formData.age = e.target.value;
    });

    document.getElementById("childGender").addEventListener("change", (e) => {
      formData.gender = e.target.value;
    });

    document.getElementById("budget").addEventListener("input", (e) => {
      formData.budget = e.target.value;
    });

    document.getElementById("taste").addEventListener("change", (e) => {
      formData.taste = e.target.value;
    });

    // Handle form submission
    if (submitFormBtn) {
      submitFormBtn.addEventListener("click", async () => {
        // Validation
        if (!formData.name.trim()) {
          alert("Mohon masukkan nama anak");
          return;
        }

        if (!formData.age) {
          alert("Mohon pilih usia anak");
          return;
        }

        if (!formData.mealTime) {
          alert("Mohon pilih waktu makan");
          return;
        }

        if (formData.ingredients.length === 0) {
          alert("Mohon pilih minimal satu bahan makanan");
          return;
        }

        const budgetValue = parseInt(formData.budget);
        if (isNaN(budgetValue) || budgetValue < 15000 || budgetValue > 50000) {
          alert("Mohon masukkan budget antara Rp 15.000 hingga Rp 50.000");
          return;
        }

        // Show loading
        resultContainer.innerHTML = `<div class="loading">🔍 Sedang mencari rekomendasi makanan...</div>`;

        // Convert meal time to Indonesian
        let mealTimeIndonesian;
        switch (formData.mealTime) {
          case "breakfast":
            mealTimeIndonesian = "sarapan";
            break;
          case "lunch":
            mealTimeIndonesian = "makan siang";
            break;
          case "dinner":
            mealTimeIndonesian = "makan malam";
            break;
          default:
            mealTimeIndonesian = formData.mealTime;
        }

        // Prepare API payload
        //   const payload = {
        //   user_ingredients: formData.ingredients.map((ing) => ing.name).join(" "),
        //   user_rasa: formData.taste,
        //   user_meal_time: formData.mealTime,
        //   user_budget: parseInt(formData.budget),
        //   usia: parseInt(formData.age),
        //   jenis_kelamin: formData.gender,
        // };


        try {
          const response = await ApiMl.post("/recommend-full", {
              user_ingredients: formData.ingredients.map((ing) => ing.name).join(", "),
              user_rasa: formData.taste,
              user_meal_time: formData.mealTime,
              user_budget: parseInt(formData.budget),
              usia: parseInt(formData.age),
              jenis_kelamin: formData.gender,
          });

          const result = response.data;

         if (Array.isArray(result) && result.length > 0) {
          const menus = result.map(menu => `
            <div class="menu-card">
              <div class="menu-info">
                <p class="menu-name">${menu.menu_makanan}</p>
                <p class="menu-detail">Bahan: ${menu.bahan_makanan}</p>
                <p class="menu-detail">Harga: Rp ${menu["price (100 gr)"].toLocaleString("id-ID")}</p>
                <p class="menu-detail">Skor Kemiripan: ${menu.similarity.toFixed(2)}</p>
              </div>
            </div>
          `).join("");

            const mealTimeDisplay = {
              breakfast: "Sarapan (6:00 - 9:00)",
              lunch: "Makan Siang (11:00 - 14:00)",
              dinner: "Makan Malam (17:00 - 20:00)",
            };

            resultContainer.innerHTML = `
              <div class="recommendation-header">
                <h3>🍽️ Rekomendasi Makanan untuk ${formData.name}</h3>
                <div class="recommendation-details">
                  <div class="detail-item">
                    <strong>Waktu Makan:</strong> ${
                      mealTimeDisplay[formData.mealTime]
                    }
                  </div>
                  <div class="detail-item">
                    <strong>Budget:</strong> Rp ${parseInt(
                      formData.budget
                    ).toLocaleString("id-ID")}
                  </div>
                  <div class="detail-item">
                    <strong>Preferensi Rasa:</strong> ${formData.taste}
                  </div>
                  <div class="detail-item">
                    <strong>Bahan Terpilih:</strong> ${formData.ingredients
                      .map((ing) => ing.name)
                      .join(", ")}
                  </div>
                </div>
              </div>
              <div class="menu-grid">
                ${menus}
              </div>
              <div class="recommendation-footer">
                <p class="footer-note">💡 Rekomendasi ini disesuaikan dengan usia ${
                  formData.age
                } tahun dan preferensi yang dipilih</p>
              </div>
            `;
          } else {
            resultContainer.innerHTML = `
              <div class="no-results-container">
                <h3>Tidak Ada Rekomendasi Ditemukan</h3>
                <div class="no-results">
                  <p>Maaf, tidak ada rekomendasi yang sesuai dengan kriteria Anda.</p>
                  <p>Silakan coba:</p>
                  <ul>
                    <li>Pilih bahan makanan yang berbeda</li>
                    <li>Ubah preferensi rasa</li>
                    <li>Sesuaikan budget</li>
                  </ul>
                </div>
              </div>
            `;
          }

          // Smooth scroll to results
          resultContainer.scrollIntoView({ behavior: "smooth" });
        } catch (error) {
          console.error("Error fetching recommendations:", error);
          resultContainer.innerHTML = `
            <div class="error-message">
              <h3>Terjadi Kesalahan</h3>
              <p>Gagal memuat rekomendasi. Silakan periksa koneksi internet Anda dan coba lagi.</p>
              <button onclick="location.reload()" class="retry-button">Coba Lagi</button>
            </div>
          `;
        }
      });
    }

    // Initialize with empty ingredients display
    updateIngredientsDisplay();
  },
};

export default FoodInputPage;
