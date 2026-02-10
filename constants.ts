import { BlogData, VideoData } from "./types";

// Simulate collected YouTube Data (5 Long, 10 Shorts)
export const MOCK_YOUTUBE_DATA: VideoData[] = [
    {
        id: 'yt-l-1',
        title: 'Reviewing EVERY New Item at Seven Eleven Korea! 🥪',
        channel: 'ConvenienceKing',
        views: 150000,
        type: 'long',
        thumbnail: 'https://picsum.photos/400/225?random=1',
        comments: [
            { author: 'UserA', text: 'The new kimbap at 7-11 is actually really good.', likes: 120 },
            { author: 'UserB', text: 'Seven Eleven lunch boxes are getting expensive...', likes: 45 },
            { author: 'UserC', text: 'CU desserts are still better honestly.', likes: 300 }
        ]
    },
    {
        id: 'yt-l-2',
        title: 'GS25 vs CU: The Ultimate Dessert Battle 🍰',
        channel: 'SweetTooth',
        views: 200000,
        type: 'long',
        thumbnail: 'https://picsum.photos/400/225?random=2',
        comments: [
            { author: 'UserD', text: 'GS25 Cream bread is legendary.', likes: 500 },
            { author: 'UserE', text: 'I wish 7-11 had more dessert options.', likes: 50 }
        ]
    },
    {
        id: 'yt-s-1',
        title: '7-11 HACK: Mark Tali Set 🍜',
        channel: 'QuickBites',
        views: 1200000,
        type: 'short',
        thumbnail: 'https://picsum.photos/200/350?random=3',
        comments: [
            { author: 'UserF', text: 'Tried this, it was amazing!', likes: 2000 },
            { author: 'UserG', text: 'Too salty for me.', likes: 100 }
        ]
    },
    {
        id: 'yt-s-2',
        title: 'CU Yonsei Cream Bread New Flavor?!',
        channel: 'TrendHunter',
        views: 900000,
        type: 'short',
        thumbnail: 'https://picsum.photos/200/350?random=4',
        comments: [
            { author: 'UserH', text: 'Running to CU right now.', likes: 4000 },
            { author: 'UserI', text: 'Seven Eleven needs to step up their game.', likes: 250 }
        ]
    }
];

// Simulate collected Blog Data (10 entries)
export const MOCK_BLOG_DATA: BlogData[] = [
    {
        id: 'blog-1',
        title: 'Seven Eleven New Benton Review: Is it worth 5000 won?',
        blogName: 'DailyEats',
        platform: 'Naver',
        visits: 5000,
        snippet: 'Today I tried the new 11-찬 Bento from 7-11. It has a lot of variety but the rice was a bit dry.',
        content: 'Full review of the 7-11 11-side dish bento. Price is 5500 won. The meat was good, but compared to GS25 Hyeja bento, the portion feels smaller. However, the taste is cleaner.'
    },
    {
        id: 'blog-2',
        title: 'CU Highball Trends 2024',
        blogName: 'TrendSetter',
        platform: 'Tistory',
        visits: 8200,
        snippet: 'CU is releasing so many canned highballs. The Lemon flavor is viral right now.',
        content: 'I compared all the convenience store highballs. CU has the best variety. 7-11 has a few imported ones but they are expensive. GS25 serves good beer discounts.'
    },
    {
        id: 'blog-3',
        title: 'Hidden Gems at Seven Eleven',
        blogName: 'SnackArchive',
        platform: 'Naver',
        visits: 3000,
        snippet: 'Everyone talks about CU, but 7-11 has the best triangular kimbap (Samgak Kimbap).',
        content: 'Specifically the Jeonju Bibim flavor at 7-11 is superior. The rice quality is better maintained than competitors.'
    }
];
