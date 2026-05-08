import { GoogleGenerativeAI } from '@google/generative-ai';
import { aiConfig } from './aiConfig';

const genAI = new GoogleGenerativeAI(aiConfig.apiKey);

export async function callGemini(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({model: aiConfig.model,});

  const result = await model.generateContent(prompt);
  return result.response.text();
}