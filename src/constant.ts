export const users = [
  {
    id: 101,
    role: "Guru",
    nama_lengkap: "Budi Santoso, S.Kom",
    no_wa: "081234567800",
    jenis_kelamin: "L",
    stack: "Fullstack",
    detail_siswa: null,
  },
  {
    id: 201,
    role: "Siswa",
    nama_lengkap: "Sinta Dewi",
    no_wa: "081234567801",
    jenis_kelamin: "P",
    stack: "FE",
    detail_siswa: {
      nama_sekolah: "SMAN 1 Yogyakarta",
      jurusan: "IPA",
      pendidikan: "SMA",
      pengetahuan_koding: "Dasar",
    },
  },
  {
    id: 202,
    role: "Siswa",
    nama_lengkap: "Andi Pratama",
    no_wa: "081234567802",
    jenis_kelamin: "L",
    stack: "FE",
    detail_siswa: {
      nama_sekolah: "SMK Teladan Jakarta",
      jurusan: "RPL",
      pendidikan: "SMK",
      pengetahuan_koding: "Menengah",
    },
  },
  {
    id: 203,
    role: "Siswa",
    nama_lengkap: "Rina Amelia",
    no_wa: "081234567803",
    jenis_kelamin: "P",
    stack: "BE",
    detail_siswa: {
      nama_sekolah: "Universitas Gadjah Mada",
      jurusan: "Sistem Informasi",
      pendidikan: "Kuliah",
      pengetahuan_koding: "Menengah",
    },
  },
  {
    id: 204,
    role: "Siswa",
    nama_lengkap: "Dhimas Rizky",
    no_wa: "081234567804",
    jenis_kelamin: "L",
    stack: "BE",
    detail_siswa: {
      nama_sekolah: "SMA 3 Bandung",
      jurusan: "IPS",
      pendidikan: "SMA",
      pengetahuan_koding: "Dasar",
    },
  },
];

// -----------------------------------------------------------------------------

export const materi = [
  {
    id: 1,
    id_stack: 1,
    nama_stack: "FE",
    id_guru: 101,
    judul_materi: "Pengenalan React dan Komponen Dasar",
    deskripsi_materi: "Deskripsi Materinya Disini",
  },
  {
    id: 2,
    id_stack: 1,
    nama_stack: "FE",
    id_guru: 101,
    judul_materi: "React State dan Props",
    deskripsi_materi: "Deskripsi Materinya Disini",
  },
  {
    id: 3,
    id_stack: 1,
    nama_stack: "FE",
    id_guru: 101,
    judul_materi: "Lifecycle dan Hooks (useState, useEffect)",
    deskripsi_materi: "Deskripsi Materinya Disini",
  },
  {
    id: 4,
    id_stack: 1,
    nama_stack: "FE",
    id_guru: 101,
    judul_materi: "Styling dalam React (CSS Modules, Styled Components)",
    deskripsi_materi: "Deskripsi Materinya Disini",
  },
  {
    id: 5,
    id_stack: 1,
    nama_stack: "FE",
    id_guru: 101,
    judul_materi: "Routing dengan React Router DOM",
    deskripsi_materi: "Deskripsi Materinya Disini",
  },
  {
    id: 6,
    id_stack: 2,
    nama_stack: "BE",
    id_guru: 101,
    judul_materi: "Konsep RESTful API dengan Node.js",
    deskripsi_materi: "Deskripsi Materinya Disini",
  },
  {
    id: 7,
    id_stack: 2,
    nama_stack: "BE",
    id_guru: 101,
    judul_materi: "Pengenalan Database NoSQL (MongoDB)",
    deskripsi_materi: "Deskripsi Materinya Disini",
  },
  {
    id: 8,
    id_stack: 2,
    nama_stack: "BE",
    id_guru: 101,
    judul_materi: "Middleware dan Autentikasi JWT di Express",
    deskripsi_materi: "Deskripsi Materinya Disini",
  },
  {
    id: 9,
    id_stack: 2,
    nama_stack: "BE",
    id_guru: 101,
    judul_materi: "CRUD Operations dengan Mongoose/Sequelize",
    deskripsi_materi: "Deskripsi Materinya Disini",
  },
  {
    id: 10,
    id_stack: 2,
    nama_stack: "BE",
    id_guru: 101,
    judul_materi: "Testing Backend (Unit dan Integration Testing)",
    deskripsi_materi: "Deskripsi Materinya Disini",
  },
];

// -----------------------------------------------------------------------------

export const tugas = [
  {
    id: 1,
    id_stack: 1,
    nama_stack: "FE",
    id_guru: 101,
    soal: "Buat komponen formulir login responsif.",
    deskripsi:
      "Buat komponen formulir login lengkap (username/email, password, tombol submit). Komponen ini harus responsif, menyesuaikan tampilan di berbagai ukuran layar (desktop, tablet, mobile) menggunakan CSS (media queries, flexbox/grid).",
  },
  {
    id: 2,
    id_stack: 1,
    nama_stack: "FE",
    id_guru: 101,
    soal: "Implementasikan to-do list sederhana menggunakan state.",
    deskripsi:
      "Buat aplikasi To-Do List fungsional yang dapat menambahkan, menghapus, dan menandai tugas (sebagai selesai). Data tugas harus dikelola menggunakan lokal state komponen (e.g., useState di React).",
  },
  {
    id: 3,
    id_stack: 1,
    nama_stack: "FE",
    id_guru: 101,
    soal: "Redesain halaman utama menggunakan Styled Components.",
    deskripsi:
      "Ambil halaman utama yang sudah ada atau buat satu, lalu aplikasikan styling secara eksklusif menggunakan pustaka Styled Components. Pastikan styling komponen terisolasi (scoped).",
  },
  {
    id: 4,
    id_stack: 2,
    nama_stack: "BE",
    id_guru: 101,
    soal: "Buat 5 endpoint RESTful API untuk manajemen user.",
    deskripsi:
      "Buat server (e.g., Node.js/Express) dan definisikan minimal 5 endpoint standar RESTful (GET, POST, PUT, DELETE) untuk mengelola entitas Pengguna (User).",
  },
  {
    id: 5,
    id_stack: 2,
    nama_stack: "BE",
    id_guru: 101,
    soal: "Implementasikan autentikasi login dengan JWT.",
    deskripsi:
      "Terapkan proses login dan registrasi di server. Setelah login berhasil, server harus membuat dan mengirimkan JSON Web Token (JWT). Lindungi endpoint sensitif agar hanya dapat diakses dengan JWT yang valid.",
  },
  {
    id: 6,
    id_stack: 2,
    nama_stack: "BE",
    id_guru: 101,
    soal: "Hubungkan API ke database MongoDB dan lakukan operasi CRUD.",
    deskripsi:
      "Integrasikan server API dengan database MongoDB (e.g., menggunakan Mongoose). Modifikasi endpoint yang ada untuk menyimpan, mengambil, memperbarui, dan menghapus data (operasi CRUD) secara persisten di MongoDB.",
  },
];

// -----------------------------------------------------------------------------

export const ujian = [
  {
    id: 10,
    id_stack: 1,
    nama_stack: "FE",
    id_guru: 101,
    soal: "Ujian Tahap 1 Frontend: HTML & CSS Dasar dan Konsep Flexbox/Grid.",
    keterangan:
      "Ujian format pilihan ganda/esai singkat yang menguji pemahaman dasar struktur web dan layouting.",
  },
  {
    id: 11,
    id_stack: 1,
    nama_stack: "FE",
    id_guru: 101,
    soal: "Ujian Tahap 2 Frontend: Pengelolaan State dan Data Fetching Dasar di React.",
    keterangan:
      "Ujian praktik yang melibatkan pembuatan komponen fungsional dan penggunaan hooks dasar (useState, useEffect) untuk mengambil dan memanipulasi data dummy.",
  },
  {
    id: 1,
    id_stack: 1,
    nama_stack: "FE",
    id_guru: 101,
    soal: "Ujian Akhir Modul Frontend: State Management (Contoh: Redux/Context API).",
    keterangan:
      "Tugas akhir yang berfokus pada implementasi solusi State Management yang kompleks pada aplikasi mini (e.g., e-commerce sederhana).",
  },
  {
    id: 20,
    id_stack: 2,
    nama_stack: "BE",
    id_guru: 101,
    soal: "Ujian Tahap 1 Backend: Konsep Dasar Node.js, Express, dan Protokol HTTP.",
    keterangan:
      "Ujian pilihan ganda/esai untuk menguji pemahaman arsitektur server, request/response cycle, dan middleware di Express.",
  },
  {
    id: 21,
    id_stack: 2,
    nama_stack: "BE",
    id_guru: 101,
    soal: "Ujian Tahap 2 Backend: Integrasi Database dan Operasi CRUD.",
    keterangan:
      "Ujian praktik untuk membuat API yang terhubung dengan database (misal: MongoDB/PostgreSQL) dan mampu menjalankan operasi Create, Read, Update, Delete secara fungsional.",
  },
  {
    id: 2,
    id_stack: 2,
    nama_stack: "BE",
    id_guru: 101,
    soal: "Ujian Akhir Modul Backend: Design Database dan Security (Autentikasi JWT).",
    keterangan:
      "Tugas akhir yang berfokus pada perancangan skema database yang efisien, implementasi autentikasi menggunakan JWT, dan penanganan otorisasi pada seluruh endpoint API.",
  },
];

// -----------------------------------------------------------------------------

export const progresMateri = [
  {
    id: 1,
    id_pengguna: 201,
    nama_pengguna: "Sinta Dewi",
    id_materi: 1,
    nama_materi: "Pengenalan React dan Komponen Dasar",
    status: "sudah",
  },
  {
    id: 2,
    id_pengguna: 202,
    nama_pengguna: "Andi Pratama",
    id_materi: 1,
    nama_materi: "Pengenalan React dan Komponen Dasar",
    status: "sudah",
  },
  {
    id: 3,
    id_pengguna: 202,
    nama_pengguna: "Andi Pratama",
    id_materi: 2,
    nama_materi: "React State dan Props",
    status: "sudah",
  },
  {
    id: 4,
    id_pengguna: 203,
    nama_pengguna: "Rina Amelia",
    id_materi: 6,
    nama_materi: "Konsep RESTful API dengan Node.js",
    status: "sudah",
  },
  {
    id: 5,
    id_pengguna: 204,
    nama_pengguna: "Dhimas Rizky",
    id_materi: 6,
    nama_materi: "Konsep RESTful API dengan Node.js",
    status: "sudah",
  },
];

// -----------------------------------------------------------------------------

export const hasilTugas = [
  {
    id: 1,
    id_pengguna: 201,
    nama_pengguna: "Sinta Dewi",
    id_tugas: 1,
    soal_tugas: "Buat komponen formulir login responsif.",
    nilai: 85,
  },
  {
    id: 2,
    id_pengguna: 202,
    nama_pengguna: "Andi Pratama",
    id_tugas: 1,
    soal_tugas: "Buat komponen formulir login responsif.",
    nilai: 90,
  },
  {
    id: 3,
    id_pengguna: 203,
    nama_pengguna: "Rina Amelia",
    id_tugas: 4,
    soal_tugas: "Buat 5 endpoint RESTful API untuk manajemen user.",
    nilai: 78,
  },
  {
    id: 4,
    id_pengguna: 204,
    nama_pengguna: "Dhimas Rizky",
    id_tugas: 4,
    soal_tugas: "Buat 5 endpoint RESTful API untuk manajemen user.",
    nilai: 82,
  },
];

// -----------------------------------------------------------------------------

export const hasilUjian = [
  {
    id: 1,
    id_pengguna: 201,
    nama_pengguna: "Sinta Dewi",
    id_ujian: 1,
    soal_ujian:
      "Ujian Akhir Modul Frontend: State Management (Contoh: Redux/Context API).",
    nilai: 0,
  },
  {
    id: 2,
    id_pengguna: 202,
    nama_pengguna: "Andi Pratama",
    id_ujian: 1,
    soal_ujian:
      "Ujian Akhir Modul Frontend: State Management (Contoh: Redux/Context API).",
    nilai: 0,
  },
  {
    id: 3,
    id_pengguna: 203,
    nama_pengguna: "Rina Amelia",
    id_ujian: 2,
    soal_ujian:
      "Ujian Akhir Modul Backend: Design Database dan Security (Autentikasi JWT).",
    nilai: 0,
  },
];

// -----------------------------------------------------------------------------

export const sesiPresensi = [
  { id: 1, id_guru: 101, tanggal: "2025-11-03", token_unik: "ABC-123" },
  { id: 2, id_guru: 101, tanggal: "2025-11-04", token_unik: "XYZ-456" },
];

// -----------------------------------------------------------------------------

export const kehadiran = [
  {
    id: 1,
    id_pengguna: 201,
    id_sesi: 1,
    tanggal_sesi: "2025-11-03",
    waktu_masuk: "2025-11-03T09:05:00Z",
  },
  {
    id: 2,
    id_pengguna: 202,
    id_sesi: 1,
    tanggal_sesi: "2025-11-03",
    waktu_masuk: "2025-11-03T09:02:00Z",
  },
  {
    id: 3,
    id_pengguna: 203,
    id_sesi: 2,
    tanggal_sesi: "2025-11-04",
    waktu_masuk: "2025-11-04T10:01:00Z",
  },
];

// -----------------------------------------------------------------------------
// MOCK DATA AUTENTIKASI (Untuk simulasi proses login)
// -----------------------------------------------------------------------------

export const authMocks = [
  { id: 101, role: "Guru", token: "mock-jwt-token-budi-santoso-101" },
  { id: 201, role: "Siswa", token: "mock-jwt-token-sinta-dewi-201" },
  { id: 202, role: "Siswa", token: "mock-jwt-token-andi-pratama-202" },
  { id: 203, role: "Siswa", token: "mock-jwt-token-rina-amelia-203" },
  { id: 204, role: "Siswa", token: "mock-jwt-token-dhimas-rizky-204" },
];

export const profileMock = {
  id: 201,
  role: "Siswa",
  nama_lengkap: "Sinta Dewi",
  no_wa: "081234567801",
  stack: "FE",
  detail: {
    nama_sekolah: "SMAN 1 Yogyakarta",
    pengetahuan_koding: "Dasar",
  },
};

export const materis = [
  { id: 1, judul: "Materi 1", konten: "Konten 1" },
  { id: 2, judul: "Materi 2", konten: "Konten 2" },
  { id: 3, judul: "Materi 3", konten: "Konten 3" },
  {
    id: 4,
    judul: "Introduction to jQuery",
    konten: `
    <div class="max-w-none p-4 text-gray-800 dark:text-gray-200">
  <h3 class="text-2xl font-bold mt-6 mb-3">Introduction to jQuery</h3>
    <p class="mb-4">jQuery is a fast, small, and feature-rich JavaScript library. It simplifies tasks like HTML document traversal and manipulation, event handling, animation, and Ajax with an easy-to-use API that works across many browsers. Its versatility and extensibility have changed how millions write JavaScript.</p>

    <h3 class="text-2xl font-bold mt-6 mb-3">Setup</h3>
      
    <h4 class="text-xl font-semibold mt-4 mb-2">Online (CDN)</h4>
    <p class="mb-4">Insert the CDN link in your HTML head:</p>
    <pre class="bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm my-3 border border-gray-200 dark:border-gray-700"><code>&lt;script
    src="https://code.jquery.com/jquery-3.3.1.min.js"
    integrity="sha256-FgpCb/KJQlLNf0u9lta32o/NMZxltwRo8QtmkMRdAu8="
    crossorigin="anonymous"&gt;&lt;/script&gt;</code></pre>
    <p class="mb-4">The integrity and crossorigin attributes are crucial for Subresource Integrity (SRI) checking, ensuring that the library hasn't been tampered with.</p>

    <h4 class="text-xl font-semibold mt-4 mb-2">Offline</h4>
    <p class="mb-4">Download jQuery from jquery.com, save the file (e.g., jquery-3.3.1.min.js) in your project's js folder:</p>
    <pre class="bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm my-3 border border-gray-200 dark:border-gray-700"><code>&lt;head&gt;
    &lt;script src="js/jquery-3.3.1.min.js"&gt;&lt;/script&gt;
&lt;/head&gt;</code></pre>

    <h3 class="text-2xl font-bold mt-6 mb-3">First jQuery Code</h3>
    <p class="mb-4">This example hides the h1 element:</p>
    <pre class="bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm my-3 border border-gray-200 dark:border-gray-700"><code>&lt;head&gt;
    &lt;script src="js/jquery-3.3.1.min.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Belajar jQuery&lt;/h1&gt;
    &lt;script&gt;
        $(document).ready(function(){
            $('h1').hide();
            // $('h1').show();   // Uncomment to show
            // $('*').hide();    // Uncomment to hide all elements
        });
    &lt;/script&gt;
&lt;/body&gt;</code></pre>

    <h3 class="text-2xl font-bold mt-6 mb-3">Basic Selectors</h3>
    <ul class="list-disc ml-6 space-y-2 mb-4">
      <li><code class="bg-gray-200 dark:bg-gray-700 px-1 rounded text-sm">$('.iniclass')</code>: Selects elements with the class "iniclass"</li>
      <li><code class="bg-gray-200 dark:bg-gray-700 px-1 rounded text-sm">$('#iniid')</code>: Selects the element with the ID "iniid"</li>
      <li><code class="bg-gray-200 dark:bg-gray-700 px-1 rounded text-sm">$('p span')</code>: Selects span elements within p elements</li>
    </ul>

    <h4 class="text-xl font-semibold mt-4 mb-2">Example - Changing Colors</h4>
    <pre class="bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm my-3 border border-gray-200 dark:border-gray-700"><code>&lt;body&gt;
    &lt;h1 class="iniclass"&gt;Halo jQuery&lt;/h1&gt;
    &lt;h1 id="iniid"&gt;jQuery Itu Asik&lt;/h1&gt;
    &lt;p&gt;Yuk kuasai &lt;span&gt;jQuery&lt;/span&gt;!&lt;/p&gt;
    &lt;script&gt;
        $(document).ready(function(){
            $('.iniclass').css('color','pink');
            $('#iniid').css('color','blue');
            $('p span').css('color','red');
        });
    &lt;/script&gt;
&lt;/body&gt;</code></pre>

    <h4 class="text-xl font-semibold mt-4 mb-2">Multiple CSS Properties</h4>
    <pre class="bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm my-3 border border-gray-200 dark:border-gray-700"><code>&lt;body&gt;
    &lt;h1 class="iniclass"&gt;Halo&lt;/h1&gt;
    &lt;script&gt;
        $(document).ready(function(){
            $('.iniclass').css({
                color:'pink',
                background:'black'
            });
        });
    &lt;/script&gt;
&lt;/body&gt;</code></pre>
</div>
  `,
  },
];
