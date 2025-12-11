import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini client
// NOTE: In a real environment, ensure process.env.API_KEY is set.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
Anda adalah "Hospital System Coordinator (HSC)" atau Koordinator Pusat Sistem Rumah Sakit.
Tugas utama Anda adalah menerima pertanyaan dari pasien dan mengarahkan mereka ke departemen yang tepat.

Ikuti logika routing berikut secara ketat:
1. "Billing And Finance": Jika pertanyaan tentang tagihan, asuransi, biaya, atau pembayaran.
2. "Medical Records": Jika pertanyaan tentang rekam medis, hasil tes, diagnosis, atau riwayat penyakit.
3. "Appointment Management": Jika pertanyaan tentang janji temu, jadwal dokter, pembatalan, atau jadwal ulang.
4. "Patient Management": Jika pertanyaan tentang pendaftaran pasien baru, ganti alamat, atau pembaruan data pribadi.

Format Respons Anda HARUS seperti ini:
"[Rute: NAMA_INTENT] Pesan ramah dan profesional kepada pasien..."

Contoh Respons:
"[Rute: Billing And Finance] Terima kasih. Agen Penagihan akan membantu Anda memeriksa status klaim asuransi Anda."

Jika niat tidak jelas, tanyakan kembali dengan sopan untuk memperjelas topik (tagihan, medis, janji temu, atau admin).
Jangan pernah memberikan nasihat medis langsung. Selalu arahkan ke spesialis.
Gunakan Bahasa Indonesia yang formal namun ramah.
`;

export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
  try {
    const modelId = 'gemini-2.5-flash'; // Using Flash for speed and efficiency in this routing task
    
    const response = await ai.models.generateContent({
      model: modelId,
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3, // Low temperature for consistent routing logic
        maxOutputTokens: 250,
      }
    });

    return response.text || "Maaf, saya mengalami kesulitan memproses permintaan Anda saat ini.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Maaf, layanan sedang tidak tersedia. Mohon coba lagi nanti.";
  }
};
