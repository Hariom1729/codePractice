require('dotenv').config({ path: require('path').join(__dirname, '.env') });
if (process.env.GOOGLE_API_KEY) delete process.env.GOOGLE_API_KEY;
const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const modelsToTest = [
  'gemini-3.5-flash',
  'gemini-flash-latest',
  'gemma-4-31b-it',
  'gemini-3.1-flash-lite',
  'gemini-pro-latest'
];

async function testModels() {
  for (const model of modelsToTest) {
    try {
      console.log(`Testing ${model}...`);
      const res = await ai.models.generateContent({
        model: model,
        contents: 'Hello',
      });
      console.log(`✅ ${model} SUCCESS!`);
    } catch (err) {
      console.log(`❌ ${model} FAILED: ${err.message.substring(0, 100)}...`);
    }
  }
}
testModels();
