import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisReport, BlogData, VideoData } from "../types";

// In a real Next.js app, this would happen server-side to protect the key.
// Since this is a frontend-only demo, we use the env var directly.
const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API_KEY is missing from environment variables");
    }
    return new GoogleGenAI({ apiKey });
};

export const generateTrendReport = async (
    youtubeData: VideoData[],
    blogData: BlogData[]
): Promise<AnalysisReport> => {
    const ai = getClient();
    
    // Prepare the input context for the model
    const context = `
    Analyze the following data collected from YouTube (Videos + Comments) and Blogs regarding Convenience Store Food Trends in Korea.
    
    Target: Compare "Seven Eleven" vs "Other Competitors" (CU, GS25, Emart24).
    
    YouTube Data:
    ${JSON.stringify(youtubeData.map(v => ({
        title: v.title,
        type: v.type,
        views: v.views,
        top_comments: v.comments.map(c => c.text)
    })), null, 2)}

    Blog Data:
    ${JSON.stringify(blogData.map(b => ({
        title: b.title,
        snippet: b.snippet,
        content: b.content
    })), null, 2)}
    `;

    // Schema definition for structured output
    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            generatedAt: { type: Type.STRING },
            topTrends: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        store: { type: Type.STRING },
                        mentions: { type: Type.INTEGER },
                        keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                        sentiment: { type: Type.STRING, enum: ["Positive", "Mixed", "Negative"] }
                    }
                }
            },
            youtubeSentiment: {
                type: Type.OBJECT,
                properties: {
                    positive: { type: Type.NUMBER },
                    neutral: { type: Type.NUMBER },
                    negative: { type: Type.NUMBER },
                    summary: { type: Type.STRING }
                }
            },
            blogSentiment: {
                type: Type.OBJECT,
                properties: {
                    positive: { type: Type.NUMBER },
                    neutral: { type: Type.NUMBER },
                    negative: { type: Type.NUMBER },
                    summary: { type: Type.STRING }
                }
            },
            storeComparison: {
                type: Type.OBJECT,
                properties: {
                    sevenEleven: {
                        type: Type.OBJECT,
                        properties: {
                            score: { type: Type.INTEGER },
                            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
                            topProduct: { type: Type.STRING }
                        }
                    },
                    competitors: {
                        type: Type.OBJECT,
                        properties: {
                            score: { type: Type.INTEGER },
                            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
                            topProduct: { type: Type.STRING }
                        }
                    },
                    verdict: { type: Type.STRING }
                }
            },
            viralKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            insights: { type: Type.STRING }
        }
    };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: [
                { role: 'user', parts: [{ text: context }] },
                { role: 'user', parts: [{ text: "Generate a detailed trend analysis report in JSON based on the schema provided." }] }
            ],
            config: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
                systemInstruction: "You are a Senior Data Analyst specializing in Korean Retail and Food Trends. Provide critical, data-backed insights."
            }
        });

        const jsonText = response.text || "{}";
        const result = JSON.parse(jsonText) as AnalysisReport;
        
        // Ensure date is set if model hallucinates a weird date format or misses it
        result.generatedAt = new Date().toISOString();
        
        return result;

    } catch (error) {
        console.error("Gemini Analysis Failed:", error);
        throw new Error("Failed to generate report");
    }
};
