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

Aplikasi ini menggabungkan antarmuka interaktif bertema **Nusantara Vintage Glassmorphism** dengan arsitektur backend multimodal bertenaga **Google GenAI SDK (Gemini)**. Pengguna dapat berinteraksi tidak hanya melalui teks percakapan dinamis (*multi-turn conversation*), tetapi juga dengan mengunggah foto makanan/tempat wisata, dokumen itinerary perjalanan (PDF), maupun rekaman suara (*voice note*).

---

## ✨ Fitur Utama

### 1. 🤖 Pemandu Cerdas & Guardrails Lokal Ketat
* **Persona Sobat Salatiga:** Berbahasa santun, ramah, kasual, serta menyisipkan kosakata lokal khas Jawa secara natural.
* **Domain Guardrails:** AI secara konsisten hanya menjawab topik seputar Kota Salatiga dan sekitarnya (lereng Merbabu, Kopeng, Tingkir, Senjoyo). Permintaan di luar topik akan ditolak secara santai dan diarahkan kembali ke eksplorasi lokal.
* **Token History Slicing:** Mengoptimalkan konsumsi token dan menjaga batas memori dengan algoritma pemotongan riwayat obrolan aktif (8 percakapan terakhir).

### 2. 📸 Pipeline Multimodal Lengkap
* **Analisis Foto (`/generate-from-image`):** AI mengenali kuliner khas (seperti Ronde Jago, Tumpang Koyor, Gethuk Kethek) atau spot pemandangan alam dari gambar yang diunggah dan memberikan ulasan sejarah, rekomendasi harga, serta lokasinya.
* **Pemrosesan Dokumen (`/generate-from-document`):** Mengunggah dokumen rencana perjalanan (PDF) untuk dirangkum dan diselaraskan dengan spot wisata lokal terbaik.
* **Transkripsi & Analisis Audio (`/generate-from-audio`):** Menerima rekaman suara pengguna, membuatkan transkrip teks, dan memberikan rekomendasi liburan secara instan.

### 3. 🎨 UI/UX Interaktif & Sinematik
* **Sinematik Video Background:** Menampilkan keindahan visual lokal dengan *overlay* elegan dan efek *focus-reveal animation*.
* **Dual-Mode Antarmuka:** 
  * *Katalog Terpadu (`salatiga.html`)* dengan filter kategori instan (*Spot Alam*, *Kuliner Khas*, *Hidden Gems*), pencarian cepat, dan *Floating Chat Widget*.
  * *Halaman Percakapan Penuh (`chat.html`)* khusus untuk eksplorasi multimodal menyeluruh.
* **Natural Response Rendering:** Dukungan `marked.js` untuk format teks terstruktur (Markdown) yang dipadukan dengan *Typewriter Effect* bertahap serta indikator pemikiran AI (*bouncing dots*).
* **Manajemen Sesi & Error Handling:** Dilengkapi tombol *Reset Percakapan* instan dan *friendly error card* yang memungkinkan pengiriman ulang (*retry*) saat terjadi kendala jaringan.

---

## 🛠️ Tech Stack

| Lapisan | Teknologi / Library | Fungsi Utama |
| :--- | :--- | :--- |
| **Frontend** | HTML5, Tailwind CSS CDN | Struktur semantik & antarmuka responsif mobile |
| | Marked.js | Parser Markdown ke HTML terformat |
| | Vanilla JavaScript (ES6+) | Manajemen state, interaksi DOM, & async fetch |
| **Backend** | Node.js & Express.js | Server REST API & middleware routing |
| | Multer | Penanganan file upload (Image, PDF, Audio) |
| | CORS & Dotenv | Keamanan lintas domain & pengelolaan environment variable |
| **AI Integration**| `@google/genai` SDK | Konektor resmi Google Gemini API |
| | Gemini 2.0 Flash / 1.5 Flash | Model bahasa & pemrosesan multimodal utama |

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
