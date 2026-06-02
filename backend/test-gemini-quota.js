require('dotenv').config({ path: require('path').join(__dirname, '.env') });
if (process.env.GOOGLE_API_KEY) delete process.env.GOOGLE_API_KEY;
const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function test() {
  try {
    console.log("Testing gemini-2.5-flash-lite...");
    const res = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: 'Hello',
    });
    console.log("Success:", res.text);
  } catch (err) {
    console.log("Error Status:", err.status);
    console.log("Error Message:", err.message);
  }
}
test();
