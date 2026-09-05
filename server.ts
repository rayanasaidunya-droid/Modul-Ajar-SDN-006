import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initialization of Gemini Client
let geminiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    try {
      geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (err) {
      console.warn('Gemini client init warning:', err);
    }
  }
  return geminiClient;
}

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// Server-side AI Generation Endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const input = req.body;
    const {
      topic,
      mapel,
      curriculum = 'merdeka',
      documentType = 'modul_ajar',
      satuanPendidikan = 'sd',
      kelas = '4',
      fase = 'Fase B',
      tahunAjaran = '2025/2026',
      semester = 1,
      namaSekolah = 'SD Negeri 006',
      namaPenyusun = 'Guru Pengampu',
      jumlahPertemuan = 2,
      jpPerPertemuan = 2,
      durasiJP = 35,
      learningModel = 'deep-learning',
      dpl8Selected = [],
      kbcTemaSelected = [],
      sesSelected = [],
      generateSupplementary = {}
    } = input;

    const totalJP = jumlahPertemuan * jpPerPertemuan;
    const totalMenit = totalJP * durasiJP;
    const ai = getGemini();

    let aiGeneratedHtml = '';

    if (ai) {
      const isRPP = documentType === 'rpp';
      const isKBC = curriculum === 'kbc' || curriculum === 'hybrid';
      const docName = isRPP ? 'RPP' : 'Modul Ajar';

      const prompt = `Anda adalah konsultan kurikulum ahli Kemendikdasmen RI dan Kemenag RI.
Buatkan ${docName} lengkap dalam format HTML murni (gunakan tag-tag semantik div, h3, h4, table, p, ul, ol, strong, em dengan class Tailwind CSS yang elegan, rapi, dan berlatar putih bersih).

PARAMETER:
- Satuan Pendidikan: ${satuanPendidikan.toUpperCase()} (${namaSekolah})
- Jenjang & Kelas: Kelas ${kelas} (${fase})
- Mata Pelajaran: ${mapel}
- Topik Materi Pokok: ${topic}
- Alokasi Waktu: ${jumlahPertemuan} Pertemuan (${totalJP} JP, ${durasiJP} menit/JP, Total ${totalMenit} menit)
- Model Pembelajaran: ${learningModel}
- Pendekatan Kurikulum: ${curriculum.toUpperCase()}
${curriculum === 'merdeka' || curriculum === 'hybrid' ? `Dasar Regulasi: Permendikdasmen No. 1/2026 & Kerangka 8334 Deep Learning (Berkesadaran/Mindful, Bermakna/Meaningful, Menggembirakan/Joyful). Fokus 8 Dimensi Profil Kelulusan: ${dpl8Selected.join(', ') || 'Keimanan, Nalar Kritis, Kolaborasi'}.` : ''}
${isKBC ? `Dasar Regulasi: Kemenag RI Kepdirjen Pendis No. 6077/2025 Kurikulum Berbasis Cinta (KBC). Panca Cinta: ${kbcTemaSelected.join(', ') || 'Cinta Allah & Rasul, Cinta Ilmu, Cinta Sesama'}. SES Prioritas: ${sesSelected.join(', ') || 'Empati, Tanggung Jawab'}. Metode: FIDS (Feel, Imagine, Do, Share). Sertakan dalil Al-Qur'an dan Hadits relevan, Hikmah & Ibrah, serta Jurnal Muhasabah.` : ''}

STRUKTUR WAJIB DOKUMEN:
1. HEADER & IDENTITAS MODUL
2. ${isKBC ? "DALIL AL-QUR'AN & HADITS TERKAIT" : "CAPAIAN PEMBELAJARAN & ELEMEN CP"}
3. ALUR TUJUAN PEMBELAJARAN (ATP) & TUJUAN PEMBELAJARAN (TP)
4. PEMAHAMAN BERMAKNA (HIKMAH/IBRAH) & PERTANYAAN PEMANTIK (TADABBUR)
5. PROFIL KELULUSAN (8 DIMENSI KERANGKA 8334 / PANCA CINTA & SES)
6. 4 KERANGKA UTAMA PEMBELAJARAN (Praktik Pedagogis, Lingkungan Belajar, Pemanfaatan Digital, Kemitraan)
7. SKENARIO KEGIATAN PEMBELAJARAN PER PERTEMUAN (Rinci pembagian menit: Pendahuluan, Kegiatan Inti merinci aktivitas guru & aktivitas siswa, Penutup Refleksi)
8. ASESMEN HOLISTIK (Diagnostik, Formatif Rubrik Sikap/Kinerja, Sumatif Kisi-kisi Soal HOTS)
9. PENGAYAAN DAN REMEDIAL
10. REFLEKSI GURU & LEMBAR KERJA
11. KOLOM TANDA TANGAN RESMI (Kepala Sekolah & Guru Penyusun)

Keluarkan HANYA kode HTML bersih (tanpa bungkus markdown \`\`\`html).`;

      const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
      let lastError: any = null;

      for (const modelName of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt
          });
          if (response.text) {
            aiGeneratedHtml = response.text.replace(/```html/gi, '').replace(/```/g, '').trim();
            break;
          }
        } catch (geminiError: any) {
          lastError = geminiError;
          console.warn(`Model ${modelName} temporary issue (${geminiError.message}), checking next candidate model...`);
        }
      }

      if (!aiGeneratedHtml && lastError) {
        console.warn('All Gemini models exhausted, local curriculum engine will handle generation:', lastError.message);
      }
    }

    res.json({
      success: true,
      hasAiContent: !!aiGeneratedHtml,
      aiHtml: aiGeneratedHtml || null
    });
  } catch (error: any) {
    console.error('API generate error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Setup Vite development server or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server ready on http://0.0.0.0:${PORT}`);
  });
}

startServer();
