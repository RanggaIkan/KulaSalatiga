# 🌿 KulaSalatiga — Digital Heritage & AI Multimodal Travel Companion

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/Google_Gemini-Multimodal_AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-Modern_UI-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Hacktiv8-AI_Engineering-E53E3E?style=for-the-badge" alt="Hacktiv8" />
</p>

---

## 📌 Ringkasan Proyek

**KulaSalatiga** (Sobat Salatiga AI) adalah platform pemandu wisata cerdas berbasis kecerdasan buatan (*Generative AI*) yang didesain khusus untuk mengeksplorasi keindahan alam lereng Gunung Merbabu, kekayaan kuliner legendaris, serta *hidden gems* di Kota Salatiga, Jawa Tengah.

Aplikasi ini menggabungkan antarmuka interaktif bertema **Nusantara Vintage Glassmorphism** dengan arsitektur backend multimodal bertenaga **Google GenAI SDK (Gemini)**[cite: 1, 5, 6]. Pengguna dapat berinteraksi tidak hanya melalui teks percakapan dinamis (*multi-turn conversation*), tetapi juga dengan mengunggah foto makanan/tempat wisata, dokumen itinerary perjalanan (PDF), maupun rekaman suara (*voice note*)[cite: 4, 6].

---

## ✨ Fitur Utama

### 1. 🤖 Pemandu Cerdas & Guardrails Lokal Ketat
* **Persona Sobat Salatiga:** Berbahasa santun, ramah, kasual, serta menyisipkan kosakata lokal khas Jawa secara natural[cite: 1, 7].
* **Domain Guardrails:** AI secara konsisten hanya menjawab topik seputar Kota Salatiga dan sekitarnya (lereng Merbabu, Kopeng, Tingkir, Senjoyo). Permintaan di luar topik akan ditolak secara santai dan diarahkan kembali ke eksplorasi lokal.
* **Token History Slicing:** Mengoptimalkan konsumsi token dan menjaga batas memori dengan algoritma pemotongan riwayat obrolan aktif (8 percakapan terakhir)[cite: 4, 6].

### 2. 📸 Pipeline Multimodal Lengkap
* **Analisis Foto (`/generate-from-image`):** AI mengenali kuliner khas (seperti Ronde Jago, Tumpang Koyor, Gethuk Kethek) atau spot pemandangan alam dari gambar yang diunggah dan memberikan ulasan sejarah, rekomendasi harga, serta lokasinya[cite: 1, 6, 7].
* **Pemrosesan Dokumen (`/generate-from-document`):** Mengunggah dokumen rencana perjalanan (PDF) untuk dirangkum dan diselaraskan dengan spot wisata lokal terbaik.
* **Transkripsi & Analisis Audio (`/generate-from-audio`):** Menerima rekaman suara pengguna, membuatkan transkrip teks, dan memberikan rekomendasi liburan secara instan.

### 3. 🎨 UI/UX Interaktif & Sinematik
* **Sinematik Video Background:** Menampilkan keindahan visual lokal dengan *overlay* elegan dan efek *focus-reveal animation*[cite: 2, 5].
* **Dual-Mode Antarmuka:** 
  * *Katalog Terpadu (`salatiga.html`)* dengan filter kategori instan (*Spot Alam*, *Kuliner Khas*, *Hidden Gems*), pencarian cepat, dan *Floating Chat Widget*[cite: 3].
  * *Halaman Percakapan Penuh (`chat.html`)* khusus untuk eksplorasi multimodal menyeluruh[cite: 1].
* **Natural Response Rendering:** Dukungan `marked.js` untuk format teks terstruktur (Markdown) yang dipadukan dengan *Typewriter Effect* bertahap serta indikator pemikiran AI (*bouncing dots*).
* **Manajemen Sesi & Error Handling:** Dilengkapi tombol *Reset Percakapan* instan dan *friendly error card* yang memungkinkan pengiriman ulang (*retry*) saat terjadi kendala jaringan[cite: 4].

---

## 🛠️ Tech Stack

| Lapisan | Teknologi / Library | Fungsi Utama |
| :--- | :--- | :--- |
| **Frontend** | HTML5, Tailwind CSS CDN | Struktur semantik & antarmuka responsif mobile[cite: 1, 2, 3] |
| | Marked.js | Parser Markdown ke HTML terformat[cite: 1, 3] |
| | Vanilla JavaScript (ES6+) | Manajemen state, interaksi DOM, & async fetch[cite: 4] |
| **Backend** | Node.js & Express.js | Server REST API & middleware routing |
| | Multer | Penanganan file upload (Image, PDF, Audio) |
| | CORS & Dotenv | Keamanan lintas domain & pengelolaan environment variable |
| **AI Integration**| `@google/genai` SDK | Konektor resmi Google Gemini API |
| | Gemini 2.0 Flash / 1.5 Flash | Model bahasa & pemrosesan multimodal utama[cite: 6] |

---

## 📁 Struktur Direktori

```text
SALATIGA-BASECAMP/
├── client/
│   ├── background.mp4         # Video latar belakang sinematik (Welcome screen)
│   ├── pawon.mp4              # Video latar belakang katalog destinasi
│   ├── index.html             # Halaman pembuka / Landing Page
│   ├── salatiga.html          # Halaman katalog 9 sudut wisata + Floating Widget
│   ├── chat.html              # Halaman Full Chat AI & Multimodal Workspace
│   ├── style.css              # Custom styling, glassmorphism, & mobile polish
│   └── script.js              # Logika frontend, state history, & API connector
│
├── server/
│   ├── .env.example           # Template environment variable (tanpa API Key)
│   ├── .gitignore             # Pengabaian file sensitif (node_modules, .env)
│   ├── index.js               # Server Express & endpoint routing AI
│   ├── response.js            # Knowledge Base lokal Salatiga & System Instruction
│   ├── package.json           # Dependensi Node.js
│   └── package-lock.json
│
└── README.md                  # Dokumentasi resmi proyek

---

## 🚀 Panduan Menjalankan Proyek Secara Lokal

### 1. Prasyarat Sistem

* [Node.js](https://nodejs.org/) versi 18.x atau lebih baru.
* Kunci API resmi dari [Google AI Studio](https://aistudio.google.com/).

### 2. Kloning Repository

```bash
git clone [https://github.com/USERNAME_KAMU/SALATIGA-BASECAMP.git](https://github.com/USERNAME_KAMU/SALATIGA-BASECAMP.git)
cd SALATIGA-BASECAMP

```

### 3. Konfigurasi Backend Server

Masuk ke folder `server`, instal dependensi, dan atur environment:

```bash
cd server
npm install

```

Buat file `.env` di dalam folder `server`:

```env
GEMINI_API_KEY=masukkan_api_key_gemini_kamu_di_sini
PORT=3000

```

Jalankan server backend:

```bash
node index.js
# Output yang diharapkan:
# 🌿 Server Sobat Salatiga berjalan di http://localhost:3000

```

### 4. Menjalankan Frontend

Buka folder `client/` menggunakan ekstensi **Live Server** di VS Code atau buka langsung file `client/index.html` pada browser favoritmu.

---

## 📡 Dokumentasi Endpoint REST API

| Endpoint | Method | Tipe Konten | Payload / Body | Deskripsi |
| --- | --- | --- | --- | --- |
| `/` | `GET` | Text | - | Health-check status aktif server

 |
| `/api/chat` | `POST` | `application/json` | `{ "conversation": [...] }` | Percakapan teks dinamis multi-turn

 |
| `/generate-from-image` | `POST` | `multipart/form-data` | `image` (File), `prompt` (String) | Analisis foto kuliner/tempat wisata

 |
| `/generate-from-document` | `POST` | `multipart/form-data` | `document` (PDF), `prompt` (String) | Ekstraksi & ringkasan dokumen itinerary |
| `/generate-from-audio` | `POST` | `multipart/form-data` | `audio` (MP3/WAV), `prompt` (String) | Transkrip suara & tanya jawab wisata |

---

## 💡 Refleksi & Pengalaman Belajar Bersama Hacktiv8

Mengikuti rangkaian pembelajaran integrasi AI bersama **Hacktiv8** menjadi sebuah lompatan besar dalam memahami bagaimana *Generative AI* diimplementasikan ke dalam skenario produk nyata, bukan sekadar menggunakan prompt di antarmuka publik.

Melalui kurikulum bertahap yang terstruktur, ada banyak wawasan mendalam yang didapatkan:

1. **Memahami Arsitektur API AI Modern:**
Belajar bagaimana menghubungkan Google GenAI SDK `@google/genai` dengan backend Express.js, memahami penanganan parameter krusial seperti `temperature`, `systemInstruction`, serta mengelola alur data *multi-turn history* secara efisien agar respons AI tetap kontekstual namun hemat token.


2. **Kekuatan Multimodal Pipeline:**
Praktik langsung mengubah data biner gambar, PDF, dan rekaman suara menjadi format `inlineData` (Base64) dengan bantuan middleware `multer`. Hal ini membuka mata bahwa AI modern mampu mencerna berbagai modalitas input secara simultan untuk memecahkan masalah pengguna.


3. **Pentingnya Rekayasa Prompt & Guardrails:**
Menyadari bahwa AI yang baik memerlukan batasan (*guardrails*) yang kokoh. Menyusun *Knowledge Base* lokal dan aturan respon di file `response.js` membuktikan bahwa kita bisa membatasi AI agar tidak berhalusinasi (*hallucination*) dan tetap berpegang teguh pada persona lokal yang diinginkan.


4. **Sentuhan UI/UX yang Humanis:**
Integrasi fitur seperti efek mengetik bertahap (*typewriter*), parsing markdown yang rapi, indikator animasi saat model berpikir, hingga penanganan error yang solutif mengajarkan bahwa teknologi AI secanggih apa pun harus tetap nyaman dan mudah diakses oleh pengguna biasa.



Proyek **KulaSalatiga** ini menjadi wujud nyata dari kolaborasi antara pelestarian potensi daerah dan pemanfaatan teknologi mutakhir yang dipelajari selama program.

---

## 👨‍💻 Penulis & Pengembang

* **Pengembang:** Rangga Wikan Raditya
* **Program:** AI Engineering & Fullstack Integration Program — **Hacktiv8**
* **Tahun:** 2026

---
