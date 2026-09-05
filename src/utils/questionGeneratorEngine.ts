import { GeneratedExam, QuestionItem, QuestionType, KopConfig } from '../types';
import { generateKopSuratHtml, generateSignatureBlockHtml } from './moduleGeneratorEngine';

// Database Rekomendasi Tujuan Pembelajaran (TP) Standar Kemendikdasmen RI
export const RECOMMENDED_TPS: Record<string, { topic: string; tpList: string[] }[]> = {
  'IPAS': [
    {
      topic: 'Bagian Tubuh Tumbuhan & Fotosintesis',
      tpList: [
        'Peserta didik menganalisis hubungan antara bentuk serta fungsi bagian tubuh pada tumbuhan (akar, batang, daun, bunga).',
        'Peserta didik mengidentifikasi proses fotosintesis dan mengaitkan peran pentingnya bagi kelangsungan makhluk hidup di bumi.',
        'Peserta didik melakukan penyelidikan sederhana mengenai faktor-faktor yang memengaruhi fotosintesis (cahaya, air, klorofil).',
      ],
    },
    {
      topic: 'Wujud Zat dan Perubahannya',
      tpList: [
        'Peserta didik mendeskripsikan karakteristik wujud zat (padat, cair, dan gas) berdasarkan sifat dan susunan partikelnya.',
        'Peserta didik mengidentifikasi berbagai perubahan wujud zat dalam kehidupan sehari-hari (mencair, membeku, menguap, mengembun, menyublim).',
        'Peserta didik menganalisis peristiwa perpindahan kalor dan dampaknya pada perubahan wujud benda di lingkungan sekitar.',
      ],
    },
    {
      topic: 'Gaya dan Gerak di Sekitar Kita',
      tpList: [
        'Peserta didik mengidentifikasi ragam gaya yang terlibat dalam aktivitas sehari-hari (gaya otot, gesek, magnet, pegas, dan gravitasi).',
        'Peserta didik menganalisis pengaruh gaya terhadap bentuk, arah, dan kecepatan gerak suatu benda.',
        'Peserta didik memanfaatkan prinsip gaya gesek dan gaya magnet untuk memecahkan masalah sederhana dalam kehidupan.',
      ],
    },
    {
      topic: 'Ekosistem dan Rantai Makanan',
      tpList: [
        'Peserta didik menganalisis hubungan antarmakhluk hidup dalam jaring-jaring makanan pada suatu ekosistem.',
        'Peserta didik memprediksi dampak kepunahan salah satu komponen rantai makanan terhadap keseimbangan lingkungan.',
        'Peserta didik merancang upaya pelestarian keanekaragaman hayati di lingkungan terdekat.',
      ],
    },
    {
      topic: 'Peta dan Bentang Alam Daerahku',
      tpList: [
        'Peserta didik membaca dan menafsirkan komponen-komponen utama pada peta lingkungan setempat.',
        'Peserta didik mengidentifikasi bentang alam permukaan bumi dan pengaruhnya terhadap mata pencaharian masyarakat.',
        'Peserta didik menjelaskan kearifan lokal masyarakat dalam memanfaatkan kekayaan alam secara berkelanjutan.',
      ],
    },
  ],
  'Matematika': [
    {
      topic: 'Bilangan Cacah Besar & Operasi Hitung',
      tpList: [
        'Peserta didik dapat membaca, menulis, menentukan nilai tempat, dan membandingkan bilangan cacah sampai 10.000.',
        'Peserta didik dapat melakukan operasi penjumlahan dan pengurangan bilangan cacah besar dengan teknik bersusun dan nalar kritis.',
        'Peserta didik dapat menyelesaikan masalah kontekstual sehari-hari yang melibatkan perkalian dan pembagian bilangan cacah.',
      ],
    },
    {
      topic: 'Pecahan Senilai & Operasi Pecahan',
      tpList: [
        'Peserta didik dapat menyajikan dan membandingkan pecahan senilai menggunakan representasi gambar dan benda konkret.',
        'Peserta didik dapat mengubah bentuk pecahan biasa ke bentuk desimal dan persen atau sebaliknya.',
        'Peserta didik dapat menyelesaikan soal cerita yang melibatkan penjumlahan dan pengurangan pecahan berpenyebut sama.',
      ],
    },
    {
      topic: 'Geometri: Bangun Datar & Sudut',
      tpList: [
        'Peserta didik dapat mengidentifikasi ciri-ciri berbagai jenis segitiga dan segi empat berdasarkan sisi dan sudutnya.',
        'Peserta didik dapat mengukur besar sudut menggunakan busur derajat serta mengklasifikasikan jenis sudut (lancip, siku-siku, tumpul).',
        'Peserta didik dapat menghitung keliling dan luas bangun datar (persegi dan persegi panjang) dalam pemecahan masalah nyata.',
      ],
    },
    {
      topic: 'Pengukuran Panjang, Berat, & Waktu',
      tpList: [
        'Peserta didik dapat mengonversi satuan baku panjang (km, m, cm) dan berat (kg, g) dalam situasi praktis.',
        'Peserta didik dapat menghitung durasi waktu suatu kegiatan dengan menggunakan satuan jam dan menit.',
      ],
    },
    {
      topic: 'Analisis Data & Diagram Batang',
      tpList: [
        'Peserta didik dapat mengumpulkan, mengurutkan, dan menyajikan data frekuensi dalam bentuk tabel dan diagram batang.',
        'Peserta didik dapat menafsirkan informasi penting serta menarik simpulan dari data diagram batang.',
      ],
    },
  ],
  'Bahasa Indonesia': [
    {
      topic: 'Teks Eksplanasi & Ide Pokok',
      tpList: [
        'Peserta didik mampu mengidentifikasi ide pokok dan ide pendukung dalam setiap paragraf teks eksplanasi ilmiah.',
        'Peserta didik mampu menemukan arti kosakata baru berdasarkan konteks kalimat dan penggunaan Kamus Besar Bahasa Indonesia (KBBI).',
        'Peserta didik dapat menyimpulkan informasi tersirat dalam teks bacaan faktual dengan bahasa sendiri.',
      ],
    },
    {
      topic: 'Teks Prosedur & Petunjuk Kerja',
      tpList: [
        'Peserta didik dapat mengidentifikasi struktur teks prosedur (tujuan, alat/bahan, dan langkah-langkah kerja urut).',
        'Peserta didik dapat menulis teks prosedur membuat atau melakukan sesuatu dengan kalimat imperatif yang jelas dan efektif.',
      ],
    },
    {
      topic: 'Teks Cerita Narasi & Karakter Tokoh',
      tpList: [
        'Peserta didik dapat menganalisis unsur intrinsik cerita (tema, tokoh, latar, alur, dan amanat moral) dari teks fabel/cerpen.',
        'Peserta didik dapat membedakan kalimat langsung dan tidak langsung serta menulis dialog yang sesuai kaidah PUEBI/EYD.',
      ],
    },
    {
      topic: 'Fakta dan Opini & Surat Pribadi',
      tpList: [
        'Peserta didik dapat membedakan antara kalimat fakta dan opini dalam berbagai artikel atau berita anak.',
        'Peserta didik mampu menulis surat pribadi kepada teman atau guru dengan format dan pilihan kata yang santun.',
      ],
    },
  ],
  'Pendidikan Pancasila': [
    {
      topic: 'Penerapan Nilai-Nilai Pancasila',
      tpList: [
        'Peserta didik dapat mengidentifikasi makna sila-sila Pancasila dan simbol Garuda Pancasila secara utuh.',
        'Peserta didik dapat memberikan contoh penerapan nilai ketuhanan, kemanusiaan, persatuan, kerakyatan, dan keadilan di lingkungan sekolah.',
        'Peserta didik dapat membiasakan sikap musyawarah untuk mencapai mufakat dalam pengambilan keputusan kelas.',
      ],
    },
    {
      topic: 'Norma, Hak, dan Kewajiban',
      tpList: [
        'Peserta didik dapat membedakan antara hak dan kewajiban sebagai anak di rumah serta sebagai peserta didik di sekolah.',
        'Peserta didik dapat menjelaskan pentingnya mematuhi norma dan tata tertib yang berlaku di masyarakat.',
      ],
    },
    {
      topic: 'Keragaman Budaya Nusantara (Bhinneka Tunggal Ika)',
      tpList: [
        'Peserta didik dapat menghargai keragaman suku bangsa, bahasa daerah, pakaian adat, dan agama di Indonesia.',
        'Peserta didik dapat menunjukkan perilaku toleransi dan gotong royong dalam kehidupan bermasyarakat yang majemuk.',
      ],
    },
  ],
  'Pendidikan Agama Islam': [
    {
      topic: "Al-Qur'an dan Hadis (Surat Pendek Pilihan)",
      tpList: [
        "Peserta didik dapat membaca dan menghafal Surat At-Tin / Al-Ma'un dengan makhraj dan tajwid yang tartil.",
        "Peserta didik dapat menjelaskan pesan pokok dan kandungan ayat Surat At-Tin dalam membangun pribadi yang bersyukur.",
      ],
    },
    {
      topic: 'Asmaul Husna & Keimanan',
      tpList: [
        'Peserta didik dapat menjelaskan makna Asmaul Husna (Al-Malik, Al-Quddus, As-Salam, Al-Mu’min, Al-Aziz) beserta contoh perilakunya.',
        'Peserta didik dapat meneladani sifat Asmaul Husna dalam menjaga kedamaian dan kebersihan lingkungan.',
      ],
    },
    {
      topic: 'Akhlak Terpuji & Adab Islami',
      tpList: [
        'Peserta didik dapat mempraktikkan adab santun kepada orang tua, guru, dan teman sebaya sesuai tuntunan Rasulullah SAW.',
        'Peserta didik dapat mengidentifikasi hikmah perilaku jujur, amanah, dan menghargai perbedaan keyakinan.',
      ],
    },
  ],
  'Bahasa Inggris': [
    {
      topic: 'Daily Routines and Activities',
      tpList: [
        'Students can identify and express daily activities using simple present tense verbs correctly.',
        'Students can tell the time and schedule of their daily routines in English with good pronunciation.',
      ],
    },
    {
      topic: 'Food, Drinks, and Preferences',
      tpList: [
        'Students can ask and respond to questions about likes and dislikes regarding foods and beverages.',
        'Students can describe tastes and qualities of food (sweet, sour, salty, spicy) in simple English sentences.',
      ],
    },
  ],
  'PJOK': [
    {
      topic: 'Kombinasi Gerak Dasar Permainan Bola',
      tpList: [
        'Peserta didik mempraktikkan variasi dan kombinasi pola gerak dasar lokomotor, nonlokomotor, dan manipulatif dalam permainan bola besar.',
        'Peserta didik menunjukkan sikap sportivitas, kerja sama regu, dan mematuhi aturan keselamatan saat berolahraga.',
      ],
    },
  ],
  'Seni Rupa': [
    {
      topic: 'Eksplorasi Unsur Rupa dan Komposisi',
      tpList: [
        'Peserta didik dapat menganalisis unsur rupa (garis, bidang, bentuk, warna primer/sekunder, tekstur) pada karya seni dua dimensi.',
        'Peserta didik dapat menciptakan motif hias tradisional dengan prinsip keseimbangan dan irama yang harmonis.',
      ],
    },
  ],
};

// Generic generator for questions when Gemini API is offline or returns fallback
export function generateOfflineQuestions(
  subject: string,
  grade: string,
  tp: string,
  topic: string,
  questionType: QuestionType,
  count: number,
  cognitiveLevel: string
): QuestionItem[] {
  const safeCount = Math.max(1, Math.min(40, count));
  const questions: QuestionItem[] = [];

  // Deterministic seed topics based on subject & TP
  const effectiveTopic = topic || (tp.length > 30 ? tp.slice(0, 30) + '...' : tp) || subject;

  for (let i = 1; i <= safeCount; i++) {
    let type: QuestionItem['type'] = 'Pilihan Ganda';

    if (questionType === 'Campuran') {
      if (i <= Math.ceil(safeCount * 0.6)) {
        type = 'Pilihan Ganda';
      } else if (i <= Math.ceil(safeCount * 0.85)) {
        type = 'Isian Singkat';
      } else {
        type = 'Uraian';
      }
    } else if (questionType === 'Pilihan Ganda') {
      type = 'Pilihan Ganda';
    } else if (questionType === 'Pilihan Ganda Kompleks') {
      type = 'Pilihan Ganda Kompleks';
    } else if (questionType === 'Isian Singkat') {
      type = 'Isian Singkat';
    } else if (questionType === 'Uraian') {
      type = 'Uraian';
    } else if (questionType === 'Menjodohkan') {
      type = 'Menjodohkan';
    } else if (questionType === 'Benar/Salah') {
      type = 'Benar/Salah';
    }

    const cognLevel: QuestionItem['cognitiveLevel'] =
      i % 3 === 0 ? 'C4' : i % 3 === 1 ? 'C3' : 'C2';

    let qItem: QuestionItem;

    if (type === 'Pilihan Ganda') {
      qItem = generateSamplePG(i, subject, grade, effectiveTopic, tp, cognLevel);
    } else if (type === 'Pilihan Ganda Kompleks') {
      qItem = generateSamplePGK(i, subject, grade, effectiveTopic, tp, cognLevel);
    } else if (type === 'Isian Singkat') {
      qItem = generateSampleIsian(i, subject, grade, effectiveTopic, tp, cognLevel);
    } else if (type === 'Uraian') {
      qItem = generateSampleUraian(i, subject, grade, effectiveTopic, tp, cognLevel);
    } else if (type === 'Menjodohkan') {
      qItem = generateSampleMenjodohkan(i, subject, grade, effectiveTopic, tp, cognLevel);
    } else {
      qItem = generateSampleBenarSalah(i, subject, grade, effectiveTopic, tp, cognLevel);
    }

    questions.push(qItem);
  }

  return questions;
}

function generateSamplePG(
  num: number,
  subject: string,
  grade: string,
  topic: string,
  tp: string,
  cognLevel: QuestionItem['cognitiveLevel']
): QuestionItem {
  if (subject === 'Matematika') {
    const a = 125 * num;
    const b = 75 + num * 5;
    const ans = a + b;
    return {
      id: `q-${num}`,
      number: num,
      type: 'Pilihan Ganda',
      stimulus: `Pak Budi memiliki ${a} buah buku di perpustakaan sekolah. Kemudian beliau menerima kiriman sumbangan buku baru sebanyak ${b} buah.`,
      question: `Berdasarkan cerita di atas, berapakah jumlah seluruh buku di perpustakaan Pak Budi sekarang?`,
      options: [
        `A. ${ans - 10} buah`,
        `B. ${ans} buah`,
        `C. ${ans + 10} buah`,
        `D. ${ans + 20} buah`,
      ],
      correctAnswer: `B. ${ans} buah`,
      discussion: `Jumlah seluruh buku dihitung dengan operasi penjumlahan: ${a} + ${b} = ${ans} buah buku.`,
      cognitiveLevel: cognLevel,
      indicator: `Disajikan soal cerita kontekstual materi ${topic}, peserta didik dapat menentukan hasil operasi hitung dengan tepat.`,
      score: 1,
    };
  }

  if (subject === 'Bahasa Indonesia') {
    return {
      id: `q-${num}`,
      number: num,
      type: 'Pilihan Ganda',
      stimulus: `"Hutan bakau di pesisir pantai memiliki fungsi sangat penting. Akar tunjang bakau yang kokoh mampu menahan deburan ombak laut sehingga mencegah terjadinya abrasi pantai. Selain itu, hutan bakau menjadi habitat alami tempat berkembang biak ikan-ikan kecil dan kepiting."`,
      question: `Gagasan pokok atau ide utama dari kutipan teks bacaan di atas adalah...`,
      options: [
        `A. Keberadaan ikan-ikan kecil dan kepiting di pesisir pantai`,
        `B. Peran penting dan manfaat hutan bakau bagi lingkungan pesisir pantai`,
        `C. Cara menanam pohon bakau yang memiliki akar tunjang kokoh`,
        `D. Bahaya deburan ombak laut yang menyebabkan bencana abrasi`,
      ],
      correctAnswer: `B. Peran penting dan manfaat hutan bakau bagi lingkungan pesisir pantai`,
      discussion: `Kalimat utama terletak di awal paragraf ('Hutan bakau di pesisir pantai memiliki fungsi sangat penting'), sedangkan kalimat berikutnya adalah kalimat penjelas mengenai fungsi menahan ombak dan tempat habitat satwa.`,
      cognitiveLevel: cognLevel,
      indicator: `Disajikan paragraf bacaan terkait ${topic}, peserta didik dapat menemukan ide pokok teks dengan benar.`,
      score: 1,
    };
  }

  if (subject === 'Pendidikan Pancasila') {
    return {
      id: `q-${num}`,
      number: num,
      type: 'Pilihan Ganda',
      stimulus: `Di kelas 4, sedang diadakan musyawarah untuk menentukan ketua kelas dan pembagian regu piket kebersihan. Siti dan Made memiliki pendapat yang berbeda mengenai susunan jadwal piket.`,
      question: `Sikap yang paling tepat sesuai dengan pengamalan nilai-nilai sila ke-4 Pancasila adalah...`,
      options: [
        `A. Memaksakan pendapat pribadi agar jadwal yang dibuat disetujui teman-teman`,
        `B. Menghargai perbedaan pendapat dan menerima hasil keputusan musyawarah dengan ikhlas serta tanggung jawab`,
        `C. Keluar dari kelas dan menolak melaksanakan jadwal piket kebersihan`,
        `D. Menyerahkan seluruh keputusan hanya kepada guru tanpa mau berpendapat`,
      ],
      correctAnswer: `B. Menghargai perbedaan pendapat dan menerima hasil keputusan musyawarah dengan ikhlas serta tanggung jawab`,
      discussion: `Sila ke-4 menekankan musyawarah untuk mufakat yang dilandasi semangat kekeluargaan, saling menghargai pendapat, dan bertanggung jawab terhadap hasil mufakat bersama.`,
      cognitiveLevel: cognLevel,
      indicator: `Disajikan studi kasus musyawarah kelas, peserta didik dapat menentukan sikap yang mencerminkan pengamalan sila ke-4 Pancasila.`,
      score: 1,
    };
  }

  // Default IPAS / Sains umum
  return {
    id: `q-${num}`,
    number: num,
    type: 'Pilihan Ganda',
    stimulus: `Sekelompok peserta didik kelas ${grade} mengamati tanaman cabai di kebun sekolah. Mereka melihat daun tanaman berwarna hijau segar karena menyerap sinar matahari dan air untuk memproduksi makanan sendiri.`,
    question: `Organel atau zat warna pada daun yang berfungsi menyerap energi cahaya matahari dalam proses fotosintesis adalah...`,
    options: [
      `A. Stomata`,
      `B. Klorofil (zat hijau daun)`,
      `C. Floem`,
      `D. Xilem`,
    ],
    correctAnswer: `B. Klorofil (zat hijau daun)`,
    discussion: `Klorofil adalah pigmen hijau yang menangkap energi foton matahari untuk mereaksikan air dan karbon dioksida menjadi glukosa dan oksigen pada fotosintesis.`,
    cognitiveLevel: cognLevel,
    indicator: `Disajikan narasi fenomena alam terkait ${topic}, peserta didik dapat mengidentifikasi komponen penting yang terlibat secara tepat.`,
    score: 1,
  };
}

function generateSamplePGK(
  num: number,
  subject: string,
  grade: string,
  topic: string,
  tp: string,
  cognLevel: QuestionItem['cognitiveLevel']
): QuestionItem {
  return {
    id: `q-${num}`,
    number: num,
    type: 'Pilihan Ganda Kompleks',
    stimulus: `Perhatikan beberapa pernyataan tentang fenomena materi '${topic}' berikut ini!`,
    question: `Pilihlah DUA atau TIGA pernyataan yang BENAR dengan memberi tanda centang (✓) pada kotak yang tersedia!`,
    options: [
      `[ ] A. Terjadi perubahan wujud yang memerlukan kalor pada saat es mencair`,
      `[ ] B. Volume benda padat selalu berubah-ubah mengikuti wadahnya`,
      `[ ] C. Pengembunan terjadi saat gas melepaskan energi panas ke lingkungan sekitar`,
      `[ ] D. Bentuk benda gas tetap dan tidak dapat dimampatkan`,
    ],
    correctAnswer: `Pilihan A dan C Benar`,
    discussion: `Pernyataan A benar karena peleburan membutuhkan kalor. Pernyataan C benar karena kondensasi melepaskan kalor. Pernyataan B dan D salah karena bentuk dan volume benda padat konstan, sedangkan gas bentuk dan volumenya berubah mengikuti wadah.`,
    cognitiveLevel: 'C4',
    indicator: `Disajikan sekumpulan pernyataan ilmiah tentang ${topic}, peserta didik dapat menganalisis pernyataan yang valid secara mandiri.`,
    score: 2,
  };
}

function generateSampleIsian(
  num: number,
  subject: string,
  grade: string,
  topic: string,
  tp: string,
  cognLevel: QuestionItem['cognitiveLevel']
): QuestionItem {
  return {
    id: `q-${num}`,
    number: num,
    type: 'Isian Singkat',
    stimulus: `Dalam siklus air alami di bumi, air permukaan laut dan danau memanas oleh sinar matahari sehingga berubah menjadi uap air yang naik ke atmosfer.`,
    question: `Peristiwa perubahan air menjadi uap air akibat pemanasan matahari tersebut dinamakan peristiwa ....................................................`,
    correctAnswer: `Evaporasi (atau Penguapan)`,
    discussion: `Evaporasi adalah proses penguapan air dari permukaan bumi ke atmosfer akibat peningkatan suhu energi panas matahari.`,
    cognitiveLevel: cognLevel,
    indicator: `Disajikan deskripsi proses alam pada materi ${topic}, peserta didik dapat melengkapi istilah ilmiah dengan tepat.`,
    score: 2,
  };
}

function generateSampleUraian(
  num: number,
  subject: string,
  grade: string,
  topic: string,
  tp: string,
  cognLevel: QuestionItem['cognitiveLevel']
): QuestionItem {
  return {
    id: `q-${num}`,
    number: num,
    type: 'Uraian',
    stimulus: `Siti melakukan percobaan meletakkan dua pot tanaman sejenis di halaman rumahnya. Pot pertama ditaruh di bawah pohon rindang yang teduh dan jarang terkena sinar matahari, sedangkan pot kedua ditaruh di tempat terbuka dengan pencahayaan matahari penuh. Kedua tanaman disiram dengan takaran air yang sama setiap hari selama dua minggu.`,
    question: `Berdasarkan percobaan Siti di atas:\na. Prediksikan perbedaan kondisi fisik (warna daun dan tinggi batang) kedua tanaman tersebut setelah 2 minggu!\nb. Jelaskan alasan ilmiah mengapa perbedaan tersebut dapat terjadi mengaitkannya dengan materi ${topic}!`,
    correctAnswer: `Rubrik Jawaban:\na. Pot kedua (cahaya cukup) daunnya hijau tua segar dan tumbuh kokoh. Pot pertama daunnya tampak pucat kekuningan dan batangnya cenderung lemah/etiolasi (Skor 2).\nb. Sinar matahari adalah energi utama untuk fotosintesis. Tanpa cahaya yang cukup, klorofil tidak dapat memproduksi makanan optimal sehingga pertumbuhan terhambat (Skor 3).`,
    discussion: `Soal analisis mendalam (HOTS C4-C5) menguji keterampilan sains proses: mengamati variabel bebas (cahaya) dan memprediksi variabel terikat (pertumbuhan tanaman).`,
    cognitiveLevel: 'C4',
    indicator: `Disajikan studi eksperimen sains sederhana tentang ${topic}, peserta didik dapat menganalisis hubungan sebab-akibat dan menyimpulkan hasil percobaan.`,
    score: 5,
  };
}

function generateSampleMenjodohkan(
  num: number,
  subject: string,
  grade: string,
  topic: string,
  tp: string,
  cognLevel: QuestionItem['cognitiveLevel']
): QuestionItem {
  return {
    id: `q-${num}`,
    number: num,
    type: 'Menjodohkan',
    stimulus: `Pasangkanlah konsep pada Kolom A dengan penjelasan atau contoh yang tepat pada Kolom B!`,
    question: `Tariklah garis lurus atau tuliskan huruf pasangan yang sesuai di dalam tanda kurung!`,
    options: [
      `1. Fotosintesis   ( ... )  -->  a. Pembuluh pengangkut air dari akar ke daun`,
      `2. Stomata        ( ... )  -->  b. Proses pembuatan makanan pada tumbuhan hijau`,
      `3. Xilem          ( ... )  -->  c. Pori-pori daun tempat pertukaran udara`,
      `4. Floem          ( ... )  -->  d. Pembuluh pengedar hasil fotosintesis ke seluruh tubuh`,
    ],
    correctAnswer: `1 - b, 2 - c, 3 - a, 4 - d`,
    discussion: `Fotosintesis (b), Stomata (c), Xilem (a), Floem (d).`,
    cognitiveLevel: cognLevel,
    indicator: `Disajikan konsep dasar terkait ${topic}, peserta didik dapat menjodohkan istilah dengan definisi fungsinya.`,
    score: 4,
  };
}

function generateSampleBenarSalah(
  num: number,
  subject: string,
  grade: string,
  topic: string,
  tp: string,
  cognLevel: QuestionItem['cognitiveLevel']
): QuestionItem {
  return {
    id: `q-${num}`,
    number: num,
    type: 'Benar/Salah',
    stimulus: `Tentukan apakah pernyataan berikut BENAR (B) atau SALAH (S) dengan melingkari huruf B atau S!`,
    question: `"Oksigen adalah salah satu bahan utama yang diserap oleh tumbuhan hijau untuk melakukan proses fotosintesis."  ( B  /  S )`,
    correctAnswer: `SALAH (S)`,
    discussion: `Salah. Bahan utama yang diserap tumbuhan untuk fotosintesis adalah gas Karbon Dioksida (CO2) dan air (H2O). Gas Oksigen (O2) adalah hasil fotosintesis yang dikeluarkan ke udara.`,
    cognitiveLevel: cognLevel,
    indicator: `Disajikan pernyataan ilmiah terkait ${topic}, peserta didik dapat mengevaluasi kebenaran konsep dengan tepat.`,
    score: 1,
  };
}

// Generate Official Exam Paper HTML for printing / Word download
export function generateExamPaperHtml(
  exam: GeneratedExam,
  options: { showAnswers?: boolean; title?: string; showSignature?: boolean } = {}
): string {
  const { showAnswers = false, title, showSignature = false } = options;
  const kopHtml = generateKopSuratHtml(exam.kopConfig, exam.kopConfig.schoolName);
  const signatureHtml = showSignature
    ? generateSignatureBlockHtml(exam.kopConfig, exam.kopConfig.schoolName)
    : '';

  const examHeading = title || `ASESMEN SUMATIF / PENILAIAN LINGKUP MATERI`;

  return `
  <div class="exam-paper-container bg-white p-4 sm:p-8 font-serif text-black leading-relaxed" style="font-family: 'Times New Roman', Times, serif; font-size: 11pt; color: #000; width: 100%; max-width: 800px; margin: 0 auto;">
    ${kopHtml}

    <!-- JUDUL DAN IDENTITAS UJIAN -->
    <div style="text-align: center; margin-bottom: 18px;">
      <h3 style="margin: 0; font-size: 13pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; text-decoration: underline;">
        ${examHeading}
      </h3>
      <div style="font-size: 10.5pt; font-weight: 600; margin-top: 3px;">
        TAHUN AJARAN ${exam.academicYear} • SEMESTER ${exam.semester === 1 ? '1 (GANJIL)' : '2 (GENAP)'}
      </div>
    </div>

    <!-- TABEL IDENTITAS SISWA & MATA PELAJARAN -->
    <table class="no-border" style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 10pt; border: 1px solid #000; padding: 6px;">
      <tbody>
        <tr>
          <td style="width: 18%; padding: 4px 6px; font-weight: bold; border: none;">Mata Pelajaran</td>
          <td style="width: 32%; padding: 4px 6px; border: none;">: <strong>${exam.subject}</strong></td>
          <td style="width: 18%; padding: 4px 6px; font-weight: bold; border: none;">Nama Siswa</td>
          <td style="width: 32%; padding: 4px 6px; border: none;">: ....................................................</td>
        </tr>
        <tr>
          <td style="padding: 4px 6px; font-weight: bold; border: none;">Kelas / Fase</td>
          <td style="padding: 4px 6px; border: none;">: Kelas ${exam.grade} (${exam.fase})</td>
          <td style="padding: 4px 6px; font-weight: bold; border: none;">Nomor Absen</td>
          <td style="padding: 4px 6px; border: none;">: ....................................................</td>
        </tr>
        <tr>
          <td style="padding: 4px 6px; font-weight: bold; border: none;">Alokasi Waktu</td>
          <td style="padding: 4px 6px; border: none;">: ${exam.durationMinutes || 60} Menit</td>
          <td style="padding: 4px 6px; font-weight: bold; border: none;">Hari / Tanggal</td>
          <td style="padding: 4px 6px; border: none;">: ....................................................</td>
        </tr>
        <tr>
          <td style="padding: 4px 6px; font-weight: bold; border: none;">Lingkup Materi</td>
          <td style="padding: 4px 6px; border: none;" colspan="3">: <em>${exam.topic || exam.tp}</em></td>
        </tr>
      </tbody>
    </table>

    <!-- PETUNJUK UMUM -->
    <div style="background-color: #f8fafc; border: 1px dashed #64748b; padding: 8px 12px; margin-bottom: 20px; font-size: 9.5pt;">
      <strong>Petunjuk Pengerjaan:</strong>
      <ol style="margin: 3px 0 0 18px; padding: 0;">
        <li>Berdoalah sebelum memulai mengerjakan soal.</li>
        <li>Tuliskan nama lengkap, nomor absen, dan kelas pada kolom lembar identitas yang telah disediakan.</li>
        <li>Bacalah setiap stimulus bacaan dan butir pertanyaan dengan saksama sebelum menjawab.</li>
        <li>Kerjakan soal yang kamu anggap paling mudah terlebih dahulu secara mandiri dan jujur.</li>
        <li>Periksa kembali seluruh jawabanmu dengan teliti sebelum diserahkan kepada Bapak/Ibu Guru.</li>
      </ol>
    </div>

    <!-- BUTIR-BUTIR SOAL RESMI -->
    <div class="questions-list space-y-5" style="margin-top: 10px;">
      ${exam.questions
        .map((q, idx) => {
          return `
          <div class="question-block" style="margin-bottom: 18px; page-break-inside: avoid;">
            <table style="width: 100%; border-collapse: collapse; border: none;">
              <tbody>
                <tr>
                  <td style="width: 28px; vertical-align: top; font-weight: bold; border: none; padding: 0;">
                    ${idx + 1}.
                  </td>
                  <td style="vertical-align: top; border: none; padding: 0;">
                    ${
                      q.stimulus
                        ? `<div style="font-style: italic; background-color: #f1f5f9; padding: 6px 10px; border-left: 3px solid #00529C; margin-bottom: 6px; font-size: 10pt; line-height: 1.45;">
                            ${q.stimulus}
                          </div>`
                        : ''
                    }
                    <div style="font-size: 10.5pt; font-weight: 500; line-height: 1.5; color: #111;">
                      ${q.question}
                    </div>

                    ${
                      q.options && q.options.length > 0
                        ? `
                      <div class="options-grid" style="margin-top: 8px; margin-left: 4px;">
                        <table style="width: 100%; border-collapse: collapse; border: none;">
                          <tbody>
                            ${q.options
                              .map(
                                opt => `
                              <tr>
                                <td style="padding: 2px 4px; border: none; font-size: 10pt;">
                                  ${opt}
                                </td>
                              </tr>
                            `
                              )
                              .join('')}
                          </tbody>
                        </table>
                      </div>
                    `
                        : ''
                    }

                    ${
                      q.type === 'Isian Singkat'
                        ? `
                      <div style="margin-top: 12px; font-size: 10pt;">
                        <strong>Jawaban:</strong> ........................................................................................................................................................
                      </div>
                    `
                        : ''
                    }

                    ${
                      q.type === 'Uraian'
                        ? `
                      <div style="margin-top: 14px; font-size: 10pt;">
                        <strong>Ruang Jawaban:</strong>
                        <div style="border-bottom: 1px dotted #94a3b8; height: 26px;"></div>
                        <div style="border-bottom: 1px dotted #94a3b8; height: 26px;"></div>
                        <div style="border-bottom: 1px dotted #94a3b8; height: 26px;"></div>
                      </div>
                    `
                        : ''
                    }

                    ${
                      showAnswers
                        ? `
                      <div style="margin-top: 10px; padding: 6px 10px; background-color: #ecfdf5; border: 1px solid #10b981; border-radius: 4px; font-size: 9.5pt;">
                        <strong style="color: #065f46;">Kunci Jawaban:</strong> ${q.correctAnswer} <br/>
                        <strong style="color: #065f46;">Pembahasan:</strong> ${q.discussion}
                      </div>
                    `
                        : ''
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        `;
        })
        .join('')}
    </div>

    ${
      showSignature && signatureHtml
        ? `
    <!-- TANDA TANGAN PENGESAHAN GURU & KEPALA SEKOLAH -->
    <div style="margin-top: 30px;">
      ${signatureHtml}
    </div>
    `
        : ''
    }
  </div>
  `;
}

// Generate Kunci Jawaban & Rubrik Penilaian HTML
export function generateAnswerKeyHtml(exam: GeneratedExam): string {
  const kopHtml = generateKopSuratHtml(exam.kopConfig, exam.kopConfig.schoolName);
  const totalScore = exam.questions.reduce((sum, q) => sum + (q.score || 1), 0);

  return `
  <div class="answer-key-container bg-white p-4 sm:p-8 font-serif text-black leading-relaxed" style="font-family: 'Times New Roman', Times, serif; font-size: 10pt; color: #000; width: 100%; max-width: 800px; margin: 0 auto;">
    ${kopHtml}

    <div style="text-align: center; margin-bottom: 16px;">
      <h3 style="margin: 0; font-size: 12.5pt; font-weight: bold; text-transform: uppercase; text-decoration: underline;">
        KUNCI JAWABAN, PEDOMAN PENSKORAN & PEMBAHASAN
      </h3>
      <div style="font-size: 10.5pt; font-weight: 600; margin-top: 3px;">
        MATA PELAJARAN: ${exam.subject.toUpperCase()} • KELAS ${exam.grade} (${exam.fase})
      </div>
      <div style="font-size: 9.5pt; color: #334155; margin-top: 2px;">
        TP: ${exam.tp}
      </div>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 9.5pt; border: 1px solid #333;">
      <thead>
        <tr style="background-color: #f1f5f9; text-align: center;">
          <th style="border: 1px solid #333; padding: 6px 4px; width: 35px;">No</th>
          <th style="border: 1px solid #333; padding: 6px 6px; width: 100px;">Bentuk Soal</th>
          <th style="border: 1px solid #333; padding: 6px 8px; width: 180px;">Kunci Jawaban</th>
          <th style="border: 1px solid #333; padding: 6px 8px;">Pembahasan / Rubrik Penilaian</th>
          <th style="border: 1px solid #333; padding: 6px 4px; width: 45px;">Skor</th>
        </tr>
      </thead>
      <tbody>
        ${exam.questions
          .map(
            q => `
          <tr>
            <td style="border: 1px solid #333; padding: 6px 4px; text-align: center; font-weight: bold;">
              ${q.number}
            </td>
            <td style="border: 1px solid #333; padding: 6px 6px; font-size: 9pt;">
              ${q.type}<br/>
              <span style="color: #64748b; font-size: 8.5pt;">(${q.cognitiveLevel})</span>
            </td>
            <td style="border: 1px solid #333; padding: 6px 8px; font-weight: bold; color: #047857;">
              ${q.correctAnswer}
            </td>
            <td style="border: 1px solid #333; padding: 6px 8px; line-height: 1.4;">
              ${q.discussion}
            </td>
            <td style="border: 1px solid #333; padding: 6px 4px; text-align: center; font-weight: bold;">
              ${q.score || 1}
            </td>
          </tr>
        `
          )
          .join('')}
        <tr style="background-color: #f8fafc; font-weight: bold;">
          <td colspan="4" style="border: 1px solid #333; padding: 6px 8px; text-align: right;">
            TOTAL SKOR MAKSIMAL:
          </td>
          <td style="border: 1px solid #333; padding: 6px 4px; text-align: center; color: #00529C; font-size: 11pt;">
            ${totalScore}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- RUMUS PENGHITUNGAN NILAI -->
    <div style="margin-top: 16px; padding: 10px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-size: 9.5pt;">
      <strong>Rumus Konversi Nilai Akhir (Skala 100):</strong>
      <div style="margin-top: 4px; font-family: monospace; font-size: 10pt; color: #003366;">
        Nilai Akhir = (Total Skor Perolehan Siswa / ${totalScore}) × 100
      </div>
      <div style="margin-top: 4px; color: #475569; font-size: 8.5pt;">
        Kriteria Ketercapaian Tujuan Pembelajaran (KKTP): Tuntas minimal skor ≥ 75.
      </div>
    </div>
  </div>
  `;
}

// Generate Matriks Kisi-Kisi Soal Resmi HTML
export function generateKisiKisiHtml(exam: GeneratedExam): string {
  const kopHtml = generateKopSuratHtml(exam.kopConfig, exam.kopConfig.schoolName);
  const signatureHtml = generateSignatureBlockHtml(exam.kopConfig, exam.kopConfig.schoolName);

  return `
  <div class="kisi-kisi-container bg-white p-4 sm:p-8 font-serif text-black leading-relaxed" style="font-family: 'Times New Roman', Times, serif; font-size: 9.5pt; color: #000; width: 100%; max-width: 850px; margin: 0 auto;">
    ${kopHtml}

    <div style="text-align: center; margin-bottom: 16px;">
      <h3 style="margin: 0; font-size: 12pt; font-weight: bold; text-transform: uppercase; text-decoration: underline;">
        KISI-KISI PENULISAN SOAL ASESMEN SUMATIF
      </h3>
      <div style="font-size: 10pt; font-weight: bold; margin-top: 2px;">
        MATA PELAJARAN: ${exam.subject.toUpperCase()} • KELAS ${exam.grade} • TAHUN AJARAN ${exam.academicYear}
      </div>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-top: 10px; border: 1px solid #000; font-size: 9pt;">
      <thead>
        <tr style="background-color: #f1f5f9; text-align: center; font-weight: bold;">
          <th style="border: 1px solid #000; padding: 6px 3px; width: 30px;">No</th>
          <th style="border: 1px solid #000; padding: 6px 6px; width: 180px;">Capaian / Tujuan Pembelajaran (TP)</th>
          <th style="border: 1px solid #000; padding: 6px 6px; width: 130px;">Lingkup Materi</th>
          <th style="border: 1px solid #000; padding: 6px 6px;">Indikator Soal</th>
          <th style="border: 1px solid #000; padding: 6px 4px; width: 65px;">Level Kognitif</th>
          <th style="border: 1px solid #000; padding: 6px 4px; width: 75px;">Bentuk Soal</th>
          <th style="border: 1px solid #000; padding: 6px 3px; width: 35px;">No. Soal</th>
        </tr>
      </thead>
      <tbody>
        ${exam.questions
          .map(
            q => `
          <tr>
            <td style="border: 1px solid #000; padding: 5px 3px; text-align: center;">
              ${q.number}
            </td>
            <td style="border: 1px solid #000; padding: 5px 6px; line-height: 1.35;">
              ${exam.tp}
            </td>
            <td style="border: 1px solid #000; padding: 5px 6px; line-height: 1.35;">
              ${exam.topic || exam.subject}
            </td>
            <td style="border: 1px solid #000; padding: 5px 6px; line-height: 1.35;">
              ${q.indicator || `Disajikan pertanyaan tentang ${exam.topic || exam.subject}, peserta didik dapat menjawab dengan benar.`}
            </td>
            <td style="border: 1px solid #000; padding: 5px 4px; text-align: center; font-weight: bold;">
              ${q.cognitiveLevel}
            </td>
            <td style="border: 1px solid #000; padding: 5px 4px; text-align: center;">
              ${q.type}
            </td>
            <td style="border: 1px solid #000; padding: 5px 3px; text-align: center; font-weight: bold;">
              ${q.number}
            </td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>

    <div style="margin-top: 24px;">
      ${signatureHtml}
    </div>
  </div>
  `;
}

// Generate Lembar Jawaban Siswa (LJK Sederhana) HTML
export function generateStudentAnswerSheetHtml(exam: GeneratedExam): string {
  const kopHtml = generateKopSuratHtml(exam.kopConfig, exam.kopConfig.schoolName);

  return `
  <div class="answer-sheet-container bg-white p-4 sm:p-8 font-serif text-black leading-relaxed" style="font-family: 'Times New Roman', Times, serif; font-size: 10pt; color: #000; width: 100%; max-width: 800px; margin: 0 auto;">
    ${kopHtml}

    <div style="text-align: center; margin-bottom: 16px;">
      <h3 style="margin: 0; font-size: 13pt; font-weight: bold; text-transform: uppercase; text-decoration: underline;">
        LEMBAR JAWABAN ASESMEN SISWA (LJK)
      </h3>
      <div style="font-size: 10pt; font-weight: bold; margin-top: 2px;">
        MATA PELAJARAN: ${exam.subject.toUpperCase()} • KELAS ${exam.grade}
      </div>
    </div>

    <!-- KOLOM IDENTITAS SISWA -->
    <div style="border: 1px solid #000; padding: 8px 12px; margin-bottom: 18px;">
      <table style="width: 100%; border-collapse: collapse; border: none; font-size: 10pt;">
        <tbody>
          <tr>
            <td style="width: 15%; padding: 3px; border: none; font-weight: bold;">Nama Lengkap</td>
            <td style="width: 45%; padding: 3px; border: none;">: ....................................................</td>
            <td style="width: 15%; padding: 3px; border: none; font-weight: bold;">Nilai Perolehan</td>
            <td style="width: 25%; padding: 3px; border: none; text-align: center;" rowspan="2">
              <div style="border: 2px solid #000; width: 80px; height: 48px; margin: 0 auto; display: flex; align-items: center; justify-content: center; font-size: 18pt; font-weight: bold;">
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 3px; border: none; font-weight: bold;">Nomor Absen</td>
            <td style="padding: 3px; border: none;">: ....................................................</td>
            <td style="padding: 3px; border: none; font-weight: bold;">Paraf Guru</td>
          </tr>
          <tr>
            <td style="padding: 3px; border: none; font-weight: bold;">Hari / Tanggal</td>
            <td style="padding: 3px; border: none;">: ....................................................</td>
            <td style="padding: 3px; border: none; font-weight: bold;">Catatan Guru</td>
            <td style="padding: 3px; border: none;">: ...................................</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- LEMBAR PILIHAN GANDA -->
    <h4 style="font-size: 11pt; font-weight: bold; margin: 0 0 6px 0;">I. Jawaban Pilihan Ganda (Berilah tanda silang X pada huruf pilihan yang benar):</h4>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px;">
      ${Array.from({ length: Math.ceil(exam.questions.length / 2) })
        .map((_, rowIdx) => {
          const leftQ = exam.questions[rowIdx];
          const rightQ = exam.questions[rowIdx + Math.ceil(exam.questions.length / 2)];

          return `
          <div style="display: flex; flex-direction: column; gap: 4px;">
            ${
              leftQ
                ? `
              <div style="display: flex; align-items: center; gap: 10px; font-size: 10pt; border-bottom: 1px dotted #cbd5e1; padding-bottom: 2px;">
                <span style="width: 28px; font-weight: bold;">${leftQ.number}.</span>
                <span>[ A ]</span>
                <span>[ B ]</span>
                <span>[ C ]</span>
                <span>[ D ]</span>
              </div>
            `
                : ''
            }
            ${
              rightQ
                ? `
              <div style="display: flex; align-items: center; gap: 10px; font-size: 10pt; border-bottom: 1px dotted #cbd5e1; padding-bottom: 2px;">
                <span style="width: 28px; font-weight: bold;">${rightQ.number}.</span>
                <span>[ A ]</span>
                <span>[ B ]</span>
                <span>[ C ]</span>
                <span>[ D ]</span>
              </div>
            `
                : ''
            }
          </div>
        `;
        })
        .join('')}
    </div>

    <!-- LEMBAR ISIAN & URAIAN -->
    <h4 style="font-size: 11pt; font-weight: bold; margin: 16px 0 6px 0;">II. Jawaban Isian & Uraian:</h4>
    <div style="display: flex; flex-direction: column; gap: 14px;">
      <div style="font-size: 9.5pt;">
        <strong>Nomor ..... :</strong> .................................................................................................................................................................................
      </div>
      <div style="font-size: 9.5pt;">
        <strong>Nomor ..... :</strong> .................................................................................................................................................................................
      </div>
      <div style="font-size: 9.5pt;">
        <strong>Nomor ..... :</strong> .................................................................................................................................................................................
      </div>
    </div>
  </div>
  `;
}

// Download Word Document (.doc) for Exam
export function downloadExamWordDoc(
  exam: GeneratedExam,
  htmlContent: string,
  titleSuffix: string = 'Naskah_Soal'
) {
  const cleanSubject = exam.subject.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `SOAL_${cleanSubject}_Kelas${exam.grade}_${exam.questions.length}Butir_${titleSuffix}`;

  const styledHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${filename}</title>
        <style>
          body { font-family: 'Times New Roman', 'Arial', sans-serif; font-size: 11pt; line-height: 1.45; color: #111; margin: 2cm; }
          h2, h3, h4 { color: #000; text-align: center; }
          table { border-collapse: collapse; width: 100%; margin: 8px 0; }
          th, td { padding: 4px 6px; text-align: left; font-size: 10pt; }
          .no-border, .no-border td { border: none !important; }
          .kop-surat-official table, .kop-surat-official td { border: none !important; }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `;

  const blob = new Blob(['\ufeff' + styledHtml], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
