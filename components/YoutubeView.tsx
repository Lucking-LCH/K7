import React from 'react';
import { MOCK_YOUTUBE_DATA } from '../constants';
import { AnalysisReport } from '../types';

interface YoutubeViewProps {
    data: AnalysisReport | null;
}

const YoutubeView: React.FC<YoutubeViewProps> = ({ data }) => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">YouTube Analysis</h2>
                    <p className="text-slate-500">Monitoring: 'Convenience Store New Item', 'Mukbang', 'Combinations'</p>
                </div>
                {data && (
                    <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg text-sm font-semibold flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                        Overall Sentiment: {data.youtubeSentiment.summary}
                    </div>
                )}
            </div>

            {/* Video List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_YOUTUBE_DATA.map((video) => (
                    <div key={video.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative h-40 bg-slate-200">
                             <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                             <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                {video.type === 'short' ? 'Shorts' : 'Video'}
                             </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-slate-800 line-clamp-2 mb-2">{video.title}</h3>
                            <div className="flex justify-between items-center text-sm text-slate-500 mb-3">
                                <span>{video.channel}</span>
                                <span>{video.views.toLocaleString()} views</span>
                            </div>
                            
                            <div className="bg-slate-50 p-3 rounded text-xs space-y-2">
                                <p className="font-semibold text-slate-700">Top Comment Analysis:</p>
                                {video.comments.slice(0, 2).map((c, i) => (
                                    <div key={i} className="flex items-start">
                                        <span className="text-slate-400 mr-2">•</span>
                                        <p className="text-slate-600 line-clamp-2">"{c.text}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* AI Insight Box */}
            {data && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-indigo-900 mb-2">Gemini AI Insight</h3>
                    <p className="text-indigo-800 leading-relaxed">
                        Analysis of the top videos shows a strong preference for "combinations" (modisumer trend) specifically at GS25, while 7-Eleven is gaining traction with new high-quality bento boxes but suffering from price perception issues in the comment sections. Shorts featuring quick recipes are driving 3x more engagement than standard reviews.
                    </p>
                </div>
            )}
        </div>
    );
};

export default YoutubeView;
