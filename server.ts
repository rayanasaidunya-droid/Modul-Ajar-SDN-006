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
      geminiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    } catch {
      geminiClient = null;
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

      for (const modelName of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt
          });
          if (response?.text) {
            aiGeneratedHtml = response.text.replace(/```html/gi, '').replace(/```/g, '').trim();
            break;
          }
        } catch {
          // If a model is temporarily unavailable (e.g. 503 high demand), proceed seamlessly to next candidate
          await new Promise((r) => setTimeout(r, 400));
        }
      }
    }

    res.json({
      success: true,
      hasAiContent: !!aiGeneratedHtml,
      aiHtml: aiGeneratedHtml || null
    });
  } catch (error: any) {
    res.json({
      success: true,
      hasAiContent: false,
      aiHtml: null,
      message: 'Local curriculum generator active'
    });
  }
});

// Server-side AI Question Generator Endpoint
app.post('/api/generate-questions', async (req, res) => {
  try {
    const {
      subject = 'IPAS',
      grade = '4',
      fase = 'Fase B',
      tp = '',
      topic = '',
      questionCount = 10,
      questionType = 'Pilihan Ganda',
      cognitiveLevel = 'HOTS (C4-C6)',
      semester = 1,
      academicYear = '2024/2025'
    } = req.body;

    const count = Math.max(1, Math.min(40, Number(questionCount) || 10));
    const ai = getGemini();

    if (ai) {
      const prompt = `Anda adalah Pengembang Soal & Asesmen Standar Kemendikdasmen RI untuk jenjang Sekolah Dasar.
Tugas Anda: Susun PERSIS ${count} BUTIR SOAL yang kontekstual, mendalam, dan berkualitas tinggi.

PARAMETER ASESMEN:
- Mata Pelajaran: ${subject}
- Kelas: Kelas ${grade} (${fase})
- Semester: Semester ${semester} (Tahun Ajaran ${academicYear})
- Tujuan Pembelajaran (TP): ${tp || 'Mendalami materi esensial secara menyeluruh'}
- Topik / Materi Pokok: ${topic || tp || subject}
- Bentuk Soal: ${questionType} (Jika 'Campuran', buatlah proporsi PG 60%, Isian Singkat 25%, Uraian 15%)
- Target Level Kognitif: ${cognitiveLevel}

PEDOMAN PENYUSUNAN SOAL:
1. Berikan stimulus kontekstual berupa cerita singkat, fenomena sehari-hari, data sederhana, atau eksperimen mini pada soal.
2. Kalimat soal harus jelas, tidak ambigu, dan mendidik nalar kritis.
3. KUNCI JAWABAN harus tepat, logis, dan menyertakan pembahasan detail serta indikator soal.
4. Format respon WAJIB berupa JSON Array murni (HANYA teks JSON valid dimulai dengan [ dan diakhiri dengan ]), TANPA backticks markdown dan TANPA kata pengantar.

Format setiap objek dalam JSON array:
[
  {
    "number": 1,
    "type": "${questionType === 'Campuran' ? 'Pilihan Ganda' : questionType}",
    "stimulus": "Teks pengantar atau kasus cerita...",
    "question": "Pertanyaan inti...",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "correctAnswer": "B. ...",
    "discussion": "Penjelasan detail kunci jawaban dan konsep ilmiahnya...",
    "cognitiveLevel": "C3",
    "indicator": "Disajikan ..., peserta didik dapat ...",
    "score": 1
  }
]`;

      const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];

      for (const modelName of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt
          });
          if (response?.text) {
            const rawText = response.text
              .replace(/```json/gi, '')
              .replace(/```/g, '')
              .trim();
            const parsed = JSON.parse(rawText);
            if (Array.isArray(parsed) && parsed.length > 0) {
              const formattedQuestions = parsed.map((item: any, idx: number) => ({
                id: `ai-q-${idx + 1}`,
                number: idx + 1,
                type: item.type || (questionType === 'Campuran' ? 'Pilihan Ganda' : questionType),
                stimulus: item.stimulus || '',
                question: item.question || `Pertanyaan nomor ${idx + 1}`,
                options: Array.isArray(item.options) ? item.options : [],
                correctAnswer: item.correctAnswer || item.answer || 'Kunci terlampir',
                discussion: item.discussion || item.explanation || 'Pembahasan materi terkait konsep esensial.',
                cognitiveLevel: item.cognitiveLevel || (idx % 2 === 0 ? 'C4' : 'C3'),
                indicator: item.indicator || `Mengukur pemahaman konsep ${topic || subject}`,
                score: item.score || (item.type === 'Uraian' ? 5 : item.type === 'Isian Singkat' ? 2 : 1)
              }));

              return res.json({
                success: true,
                hasAi: true,
                questions: formattedQuestions.slice(0, count)
              });
            }
          }
        } catch {
          await new Promise((r) => setTimeout(r, 400));
        }
      }
    }

    // If Gemini offline or not configured, return signal to use local generator
    res.json({
      success: true,
      hasAi: false,
      questions: null,
      message: 'Using offline curriculum generator engine'
    });
  } catch (error: any) {
    res.json({
      success: true,
      hasAi: false,
      questions: null,
      message: error?.message || 'Fallback to client'
    });
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
