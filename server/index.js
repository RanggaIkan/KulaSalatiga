// server/index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import { GoogleGenAI } from "@google/genai";
import { salatigaSystemInstruction } from "./response.js"; //[cite: 6]

const app = express(); //[cite: 6]
const upload = multer({
  limits: { fileSize: 25 * 1024 * 1024 }, // Naikkan limit ke 25MB untuk audio/dokumen
});

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); //[cite: 6]
const GEMINI_MODEL = "gemini-3.5-flash"; //[cite: 6]

app.use(cors()); //[cite: 6]
app.use(express.json()); //[cite: 6]

// 1. Health Check
app.get("/", (req, res) => {
  res.send("🚀 Server HaloSalatiga AI Siap Berjalan!"); //[cite: 6]
});

// 2. Chatbot Endpoint (Multi-turn)
app.post("/api/chat", async (req, res) => {
  const { conversation } = req.body; //[cite: 6]

  try {
    if (!Array.isArray(conversation) || conversation.length === 0) {
      return res.status(400).json({ error: "Conversation must be a non-empty array" }); //[cite: 6]
    }

    const contents = conversation.map(({ role, text }) => ({
      role: role === "user" ? "user" : "model", //[cite: 6]
      parts: [{ text: String(text || "") }], //[cite: 6]
    }));

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL, //[cite: 6]
      contents, //[cite: 6]
      config: {
        temperature: 0.7, //[cite: 6]
        systemInstruction: salatigaSystemInstruction, //[cite: 6]
      },
    });

    res.status(200).json({ result: response.text }); //[cite: 6]
  } catch (e) {
    console.error("Chat Error:", e); //[cite: 6]
    res.status(500).json({ error: e.message || "Gagal memproses percakapan dengan AI" }); //[cite: 6]
  }
});

// 3. Analisis Gambar (Image)
app.post("/generate-from-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File gambar wajib diunggah!" }); //[cite: 6]
    }

    const { prompt } = req.body; //[cite: 6]
    const base64Image = req.file.buffer.toString("base64"); //[cite: 6]
    const mimeType = req.file.mimetype || "image/jpeg"; //[cite: 6]

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL, //[cite: 6]
      contents: [
        {
          inlineData: {
            data: base64Image, //[cite: 6]
            mimeType: mimeType, //[cite: 6]
          },
        },
        prompt || "Tolong jelaskan tempat wisata atau kuliner pada gambar ini, kaitkan dengan rekomendasi terbaik di Kota Salatiga!", //[cite: 6]
      ],
      config: {
        temperature: 0.7, //[cite: 6]
        systemInstruction: salatigaSystemInstruction, //[cite: 6]
      },
    });

    res.status(200).json({ result: response.text }); //[cite: 6]
  } catch (e) {
    console.error("Image Analysis Error:", e); //[cite: 6]
    res.status(500).json({ message: e.message || "Gagal menganalisis gambar" }); //[cite: 6]
  }
});

// 4. Analisis Dokumen (PDF/Text)
app.post("/generate-from-document", upload.single("document"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File dokumen wajib diunggah!" });
    }

    const { prompt } = req.body;
    const base64Doc = req.file.buffer.toString("base64");
    let mimeType = req.file.mimetype;
    if (!mimeType || mimeType === "application/octet-stream") {
      mimeType = "application/pdf";
    }

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        {
          inlineData: {
            data: base64Doc,
            mimeType: mimeType,
          },
        },
        prompt || "Tolong ringkas dokumen ini dan beri rekomendasi atau catatan penting terkait wisata/kuliner Salatiga.",
      ],
      config: {
        temperature: 0.5,
        systemInstruction: salatigaSystemInstruction,
      },
    });

    res.status(200).json({ result: response.text });
  } catch (e) {
    console.error("Document Analysis Error:", e);
    res.status(500).json({ message: e.message || "Gagal memproses dokumen" });
  }
});

// 5. Transkripsi & Analisis Audio (Voice Note / Audio Record)
app.post("/generate-from-audio", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File audio wajib diunggah!" });
    }

    const { prompt } = req.body;
    const base64Audio = req.file.buffer.toString("base64");
    let mimeType = req.file.mimetype;
    if (!mimeType || mimeType === "application/octet-stream") {
      mimeType = "audio/mp3";
    }

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        {
          inlineData: {
            data: base64Audio,
            mimeType: mimeType,
          },
        },
        prompt || "Dengarkan rekaman audio ini. Buatkan transkrip singkat lalu jawab pertanyaan/keinginan liburan pengguna di Kota Salatiga sesuai panduanmu!",
      ],
      config: {
        temperature: 0.7,
        systemInstruction: salatigaSystemInstruction,
      },
    });

    res.status(200).json({ result: response.text });
  } catch (e) {
    console.error("Audio Analysis Error:", e);
    res.status(500).json({ message: e.message || "Gagal memproses audio" });
  }
});

const PORT = process.env.PORT || 3000; //[cite: 6]
app.listen(PORT, () => {
  console.log(`🌿 Server Sobat Salatiga berjalan di http://localhost:${PORT}`); //[cite: 6]
});