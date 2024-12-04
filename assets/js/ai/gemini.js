'use strict';

// CDN (Content Delivery Network): A global server network that delivers content
// quickly by serving it from the nearest server to the user.
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from 'https://cdn.skypack.dev/@google/generative-ai';

//const question = 'are you an ai?';
const apiKey = 'AIzaSyAm_74u3wa-uWi5SENJdzvW0rJIQUOJzBk';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(question, type) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(`${question} (${type})`);
  const text = await result.response.text();
  return text; 
}

export async function getResponse(question, type) {
  return await run(question, type);
}
