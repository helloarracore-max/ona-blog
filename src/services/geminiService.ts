import { GoogleGenAI } from "@google/genai";

const getClient = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
        throw new Error("API Key not found in environment variables");
    }
    return new GoogleGenAI({ apiKey });
};

export const generateGhibliImage = async (prompt: string): Promise<string> => {
    try {
        const ai = getClient();

        // We act as a prompt engineer to ensure the style is Ghibli/Anime
        // Specifically targeting Asian/Northeast Indian aesthetic as requested
        const enhancedPrompt = `
            Generate a masterpiece anime illustration in the style of Studio Ghibli (Hayao Miyazaki).
            Subject: ${prompt}.
            
            Key Visual Elements:
            - Characters: Northeast Indian or Japanese features, expressive eyes, traditional yet modern clothing.
            - Setting: Detailed, hand-painted background style (clouds, lush greenery, or cozy interiors).
            - Lighting: Warm, magical golden hour or soft morning light.
            - Mood: Nostalgic, peaceful, "slice of life".
            - Medium: Digital art mimicking watercolor and gouache.
            
            Do not include text in the image.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { text: enhancedPrompt }
                ]
            },
            config: {
                imageConfig: {
                    aspectRatio: "16:9",
                }
            }
        });

        // Loop to find the image part
        for (const candidate of response.candidates || []) {
            for (const part of candidate.content.parts) {
                if (part.inlineData && part.inlineData.data) {
                    return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                }
            }
        }

        console.error("Gemini Response did not contain image data:", JSON.stringify(response, null, 2));
        throw new Error("No image data generated.");
    } catch (error) {
        console.error("Gemini Image Generation Error:", error);
        throw error;
    }
};

export const generateBlogContent = async (topic: string): Promise<{ title: string, content: string, excerpt: string, tags: string[] }> => {
    try {
        const ai = getClient();
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Write a blog post for "O&A: The Glow-Log", a blog about two cousins growing up, travel, and sisterhood in Asia.
            Topic: ${topic}.
            The tone should be cozy, Gen-Z but poetic, and personal.
            Return JSON only with keys: title, content (HTML format, roughly 3 paragraphs), excerpt (1 sentence), tags (array of 3 strings).`,
            config: {
                responseMimeType: "application/json"
            }
        });

        const text = response.text;
        if (!text) throw new Error("No text generated");
        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini Text Generation Error", error);
        throw error;
    }
}