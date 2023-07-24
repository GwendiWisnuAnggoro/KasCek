const idSheets = "1kMfONdlnYgFyR25YmZ3QKrAjE9HHVsmyrfPjwZ3rke8";

// Buat instance dari kelas AmbilData dengan kolom yang sesuai
let nama = new AmbilData(idSheets, "B");
let kas = new AmbilData(idSheets, "C");
let kurang = new AmbilData(idSheets, "D");
const totalKas = 52 * 2000;

// Panggil fungsi tampilkan untuk menampilkan data
tampilkan();

function tampilkan(){
    // Tunggu hingga data berhasil diambil (fetch selesai)
    setInterval(() => {
        let list = ""; // Variabel list diinisialisasi dengan string kosong

        for (let i = 1; i < nama.result.length; i++){
            // Gunakan indeks i untuk mengakses nilai pada setiap iterasi
            list += `
            <li>
                <div>
                    <h1>${nama.result[i].value}</h1>
                    <p>Kamu Kas: ${kas.result[i].value}</p>
                    <p>Kamu Kurang: ${kurang.result[i].value}</p>
                </div>
            </li>`;
        }

        // Setelah loop selesai, tambahkan semua konten ke dalam elemen <ul>
        document.getElementById("uls").innerHTML = list;
    }, 500); // Ganti angka 2000 dengan waktu yang sesuai untuk menunggu fetch selesai
}