import { GoogleGenAI, Type, Schema } from "@google/genai";
import { PoemData } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const poemSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "The title of the poem in Traditional Chinese (as per chinese-poetry repo)" },
    author: { type: Type.STRING, description: "The name of the poet" },
    dynasty: { type: Type.STRING, description: "The dynasty (e.g., Tang, Song)" },
    introduction: { type: Type.STRING, description: "A brief 2-3 sentence introduction/background context for the poem." },
    themes: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of tags/themes found in the metadata (e.g., 咏史, 写景, 怀古)"
    },
    lines: {
      type: Type.ARRAY,
      description: "The poem split line by line.",
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          original: { type: Type.STRING, description: "The original text in Traditional Chinese (繁體)." },
          pinyin: { type: Type.STRING, description: "Pinyin with tone marks." },
          translation: { type: Type.STRING, description: "Modern Chinese translation (Vernacular)." },
          analysis: { type: Type.STRING, description: "Genius-style deep annotation explaining allusions (典故) and meaning." }
        },
        required: ["id", "original", "pinyin", "translation", "analysis"]
      }
    }
  },
  required: ["title", "author", "dynasty", "lines", "introduction", "themes"]
};

export const fetchPoemData = async (query: string): Promise<PoemData> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Explicitly instructing the model to use the knowledge from the chinese-poetry repo
    const prompt = `
      You are the engine for "GuYun", a Genius.com-style interface for the "chinese-poetry/chinese-poetry" open source database.
      The user is searching for: "${query}".
      
      Task:
      1. Identify the most relevant poem from the 'chinese-poetry' GitHub repository corpus (Tang, Song, Shijing, etc.).
      2. Extract the canonical Traditional Chinese text for the 'original' field.
      3. Generate "Genius.com" style annotations for each line. These annotations should be:
         - Deep and scholarly.
         - Explain historical allusions (典故).
         - Analyze specific character choices (炼字).
      
      If the exact poem isn't explicitly in the repo (rare), find the closest classical match and note it.
      
      Format the output as valid JSON matching the schema.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: poemSchema,
        temperature: 0.3, 
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as PoemData;
    } else {
      throw new Error("Empty response from AI");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};