// JavaScript
const idSheets = "1kMfONdlnYgFyR25YmZ3QKrAjE9HHVsmyrfPjwZ3rke8";

// Buat instance dari kelas AmbilData dengan kolom yang sesuai
let nama_code = "B",
kas_code = "C",
kurang_code = "D",
tambah_kurang_code = "E",
total_code = "F";
let nama = new AmbilData(idSheets, nama_code);
let kas = new AmbilData(idSheets, kas_code);
let totals = new AmbilData(idSheets, total_code);
let kurang = new AmbilData(idSheets, kurang_code);
let edit = new AmbilData(idSheets, tambah_kurang_code);
let bulan_Kemarin = new AmbilData(idSheets, "F")
let bulan_Kemarin_Edit = new AmbilData(idSheets, "G")
const totalKas = 52 * 2000;
let list = ""; // Variabel list sebagai variabel global
let searchText = ""; // Variabel untuk menyimpan nilai dari input search
const code_Admin = "mse1683y24r3q2fk1c8daniq58pxftzp";
let mode_Admin = false;
// Ambil elemen input dengan id "cari"
const btnSearch = document.getElementById("button-addon2");
const searchInput = document.getElementById("cari");
const datalistOptions = document.getElementById("datalistOptions")



// Tambahkan event listener untuk click event pada btnSearch
btnSearch.addEventListener("click", () => {
  // Panggil fungsi tampilkan untuk menampilkan data sesuai dengan pencarian
  searchText = searchInput.value;
  if (searchText.includes(code_Admin)) {
    mode_Admin = true;
    document.querySelector(".kurangi_tmbh").style.display = "block";
    
    if (searchText.includes(`${code_Admin}#`)) {
      searchText = searchText.substring(searchText.indexOf('#') + 1).toLowerCase();
    } else {
      searchText = "";
    }
  } else {
    mode_Admin = false;
    document.querySelector(".kurangi_tmbh").style.display = "none";
  }
  tampilkan();
});


// Tunggu hingga data berhasil diambil (fetch selesai)
let dataFetchInterval = setInterval(() => {
  tampilkan(); // Update the data display periodically
}, 500); // Ganti angka 500 dengan waktu yang sesuai untuk menunggu fetch selesai

setTimeout(()=>{
  for(let i = 1; i < nama.result.length; i++){
    datalistOptions.innerHTML += `
    <option value="${nama.result[i].value}">
    `
  }
}, 1000)

function tampilkan() {
  // Tampilkan data sesuai dengan pencarian
  list = ""; // Variabel list diinisialisasi dengan string kosong
  document.getElementById("tampilkanTotalKas").innerText = ``
  
  let totalKas = totals.result[0].value
  document.getElementById("tampilkanTotalKas").innerText = `Total Kas: ${totalKas}`

  if (searchText) {
    // Ambil nilai dari input search
    let currentSearchText = searchText.toLowerCase();
  const searchInputs = document.getElementById('cari');
  let previousLength = searchInput.value.length;
  
  searchInputs.addEventListener('input', () => {
      const currentLength = searchInputs.value.length;

      if (currentLength < previousLength) {
        searchText = searchInputs.value;
      }
  
      // Update panjang teks sebelumnya untuk perbandingan berikutnya.
      previousLength = currentLength;
  });

  // Jika ada perubahan pada input search, update searchText
  if (currentSearchText !== searchText) {
    searchText = currentSearchText;
  }
    for (let i = 1; i < nama.result.length; i++) {
      const namaValue = nama.result[i].value.toLowerCase();
      if (namaValue.includes(searchText)) {
        if(!mode_Admin){
          list += `
          <li class="list-group-item">
          <br>
            <h1>${nama.result[i].value}</h1>
            <h2><i>Kas:</i></h2>
            <p>Kas Kamu Saat Ini: Rp.${kas.result[i].value}</p>
            <p>Keterangan: : ${Number((kurang.result[i].value)) <= 0 ? "Lunas" : "Kurang Rp." + (kurang.result[i].value).toString()}</p>
          </li>`;
        } else {
          list += `
          <li class="list-group-item">
          <br>
            <h1>${nama.result[i].value}</h1>
            <h2><i>Kas:</i></h2>
            <p>Kas Kamu Saat Ini: Rp.${kas.result[i].value}</p>
            <p>Keterangan: : ${Number((kurang.result[i].value)) <= 0 ? "Lunas" : "Kurang Rp." + (kurang.result[i].value).toString()}</p>
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
              <button type="button" class="btn btn-success" id="${nama.result[i].rows}" onclick="tambah(this, ${edit.result[i].value}, ${bulan_Kemarin.result[i].value !== 0 ? bulan_Kemarin.result[i].value : 0}, ${bulan_Kemarin_Edit.result[i].value})">+</button>
              <button type="button" class="btn btn-danger" id="${nama.result[i].rows}" onclick="kurangi(this, ${edit.result[i].value})">-</button>
            </div>
          </li>`;
        }
      }
    }
  } else {
    // Jika tidak ada input search, tampilkan semua data
    for (let i = 1; i < nama.result.length; i++) {
      if(!mode_Admin){
        list += `
        <li class="list-group-item">
        <br>
          <h1>${nama.result[i].value}</h1>
          <h2><i>Kas:</i></h2>
          <p>Kas Kamu Saat Ini: Rp.${kas.result[i].value}</p>
          <p>Keterangan: : ${Number((kurang.result[i].value)) <= 0 ? "Lunas" : "Kurang Rp." + (kurang.result[i].value).toString()}</p>
        </li>`;
      } else {
        list += `
        <li class="list-group-item">
        <br>
          <h1>${nama.result[i].value}</h1>
          <h2><i>Kas:</i></h2> 
          <p>Kas Kamu Saat Ini: Rp.${kas.result[i].value}</p>
          <p>Keterangan: : ${Number((kurang.result[i].value)) <= 0 ? "Lunas" : "Kurang Rp." + (kurang.result[i].value).toString()}</p>
          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
              <button type="button" class="btn btn-success" id="${nama.result[i].rows}" onclick="tambah(this, ${edit.result[i].value}, ${bulan_Kemarin.result[i].value !== 0 ? bulan_Kemarin.result[i].value : 0}, ${bulan_Kemarin_Edit.result[i].value})">+</button>
              <button type="button" class="btn btn-danger" id="${nama.result[i].rows}" onclick="kurangi(this, ${edit.result[i].value})">-</button>
            </div>
        </li>`;

      }
    }
  }

  // Setelah loop selesai, tambahkan semua konten ke dalam elemen <ul>
  document.getElementById("kas_list").innerHTML = list;
}

function populateDatalistOptions() {
  for (let i = 1; i < nama.result.length; i++) {
    datalistOptions.innerHTML += `
    <option value="${nama.result[i].value}">
    `;
  }
}

setTimeout(populateDatalistOptions, 2000);

function tambah(v, data, bulanK, editblnkemarin) {
  let rows = v.id;
  let code = tambah_kurang_code;
  let dataSekarang = Number(data);
  let tmbh_krng = document.getElementById("tmbh_krng");
  console.log(bulanK)

  if (bulanK === 0) {
    let tambahValue = Number(tmbh_krng.value);

    let newValue = Math.min(52, Math.round(dataSekarang + tambahValue));

    new EditValues(code, rows, newValue.toString());
  } else {
    let dataEditBulanKemarin = Number(editblnkemarin);
    let valueBaru = Math.round(dataEditBulanKemarin + Number(tmbh_krng.value));
    new EditValues("G", rows, valueBaru);
  }

  tmbh_krng.value = 0;
}


function kurangi(v, data) {
  let rows = v.id;
  let code = tambah_kurang_code;
  let dataSekarang = Number(data);
  let tmbh_krng = document.getElementById("tmbh_krng");
  let kurangValue = Number(tmbh_krng.value);

  let newValue = Math.round(dataSekarang - kurangValue);

  if (newValue < 0) {
    newValue = 0;
  }

  new EditValues(code, rows, newValue.toString());
  tmbh_krng.value = 0;
}


function getRandomColor() {
  // Generate a random hue value between 0 and 360
  const hue = Math.floor(Math.random() * 361);
  // Create an HSL color string with the random hue, and fixed saturation and lightness values
  const color = `hsl(${hue}, 70%, 60%)`;
  return color;
}

// Mencegah tindakan klik kanan
window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

// Mencegah beberapa pintasan keyboard
window.addEventListener('keydown', function (e) {
  if (e.ctrlKey && (e.key === 'Shift' || e.key === 'C' || e.key === 'I' || e.key === 'J' || e.key === 'U')) {
    e.preventDefault();
  }
});
