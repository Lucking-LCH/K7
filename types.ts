// Data structures for the raw inputs
export interface Comment {
    author: string;
    text: string;
    likes: number;
}

export interface VideoData {
    id: string;
    title: string;
    channel: string;
    views: number;
    type: 'long' | 'short';
    comments: Comment[];
    thumbnail: string;
}

export interface BlogData {
    id: string;
    title: string;
    blogName: string;
    snippet: string;
    content: string; // Full simulated content
    visits: number;
    platform: 'Naver' | 'Tistory';
}

// Data structures for the AI Analysis Result
export interface SentimentAnalysis {
    positive: number;
    neutral: number;
    negative: number;
    summary: string;
}

export interface ProductTrend {
    name: string;
    store: 'Seven Eleven' | 'CU' | 'GS25' | 'Emart24' | 'Other';
    mentions: number;
    keywords: string[];
    sentiment: 'Positive' | 'Mixed' | 'Negative';
}

export interface StoreComparison {
    sevenEleven: {
        score: number; // 0-100
        strengths: string[];
        weaknesses: string[];
        topProduct: string;
    };
    competitors: {
        score: number;
        strengths: string[];
        weaknesses: string[];
        topProduct: string;
    };
    verdict: string;
}

export interface AnalysisReport {
    generatedAt: string;
    topTrends: ProductTrend[];
    youtubeSentiment: SentimentAnalysis;
    blogSentiment: SentimentAnalysis;
    storeComparison: StoreComparison;
    viralKeywords: string[];
    insights: string;
}
