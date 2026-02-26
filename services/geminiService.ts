
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const generateProjectDraft = async (prompt: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are an expert creative project planner. Generate a structured project plan for: ${prompt}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          materials: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          estimatedTime: { type: Type.STRING }
        },
        required: ["title", "description", "steps"]
      }
    }
  });
  return JSON.parse(response.text);
};

export const chatWithAssistant = async (history: { role: string; parts: { text: string }[] }[], message: string) => {
  const ai = getAIClient();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: 'You are StitchFlow Assistant, a helpful AI guide for creators, designers, and makers. Be concise, inspiring, and practical.'
    }
  });
  
  const response = await chat.sendMessage({ message });
  return response.text;
};

export const generateInspirationImage = async (prompt: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: `High quality, aesthetic inspiration image for a creative project: ${prompt}` }]
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};
