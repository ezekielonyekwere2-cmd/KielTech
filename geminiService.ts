import { GoogleGenAI, Type } from "@google/genai";
import { ProjectIdea, GeneratedCode } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProjectIdeas = async (technology: string): Promise<ProjectIdea[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on the technology "${technology}", generate 3 innovative project ideas. Each idea should have a catchy title and a short, one-sentence description.`,
      config: {
        systemInstruction: "You are a creative tech strategist who excels at brainstorming innovative project ideas. For any given technology, you provide concise, catchy, and inspiring ideas.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "The catchy title of the project idea.",
              },
              description: {
                type: Type.STRING,
                description: "A short, one-sentence description of the project.",
              },
            },
            required: ["title", "description"],
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const ideas: ProjectIdea[] = JSON.parse(jsonText);
    return ideas;

  } catch (error) {
    console.error("Error generating project ideas:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate ideas from Gemini API: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating project ideas.");
  }
};

export const generateWebsite = async (prompt: string): Promise<GeneratedCode> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate the code for a single-page website based on the following description: "${prompt}".
      Use modern design principles, including good color contrast, readable fonts, and a clean layout.
      The website should be visually appealing, responsive, and self-contained in a single HTML file.
      Provide the complete HTML body content, CSS styles, and any necessary JavaScript.
      Do not include the <html>, <head>, or <body> tags in the HTML response.
      The CSS should be complete and not use any external libraries.
      The JavaScript should be vanilla JS and handle any interactivity.`,
      config: {
        systemInstruction: "You are an expert web developer specializing in creating modern, visually appealing, and responsive single-page applications. Your goal is to generate clean, high-quality, and self-contained HTML, CSS, and JavaScript code based on user prompts.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            html: {
              type: Type.STRING,
              description: "The complete HTML body content for the website.",
            },
            css: {
              type: Type.STRING,
              description: "All necessary CSS styles for the website.",
            },
            js: {
              type: Type.STRING,
              description: "Any JavaScript needed for interactivity. Can be an empty string if not needed.",
            },
          },
          required: ["html", "css", "js"],
        },
      },
    });

    const jsonText = response.text.trim();
    const code: GeneratedCode = JSON.parse(jsonText);
    return code;

// FIX: Added curly braces to the catch block to correctly define its scope.
  } catch (error) {
    console.error("Error generating website:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate website from Gemini API: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the website.");
  }
};
