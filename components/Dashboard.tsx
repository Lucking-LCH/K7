import React from 'react';
import { AnalysisReport } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DashboardProps {
    data: AnalysisReport | null;
    isLoading: boolean;
    onGenerate: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, isLoading, onGenerate }) => {
    if (!data && !isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] bg-white rounded-lg shadow-sm border border-slate-200 p-8 text-center">
                <div className="bg-slate-100 p-6 rounded-full mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">No Weekly Report Generated</h2>
                <p className="text-slate-500 mb-8 max-w-md">The system collects data on weekdays. Generate your weekly AI trend report to see insights from YouTube and Blogs.</p>
                <button 
                    onClick={onGenerate}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center shadow-lg shadow-indigo-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    Generate AI Report
                </button>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                <p className="text-slate-600 font-medium animate-pulse">Gemini 2.5 Pro is analyzing social trends...</p>
                <p className="text-slate-400 text-sm">Processing 200+ comments and blog posts</p>
            </div>
        );
    }

    // Prepare chart data
    const comparisonData = [
        { name: 'Brand Score', SevenEleven: data!.storeComparison.sevenEleven.score, Competitors: data!.storeComparison.competitors.score },
    ];
    
    const sentimentData = [
        { name: 'Positive', value: data!.youtubeSentiment.positive, color: '#10B981' }, // emerald-500
        { name: 'Neutral', value: data!.youtubeSentiment.neutral, color: '#94A3B8' }, // slate-400
        { name: 'Negative', value: data!.youtubeSentiment.negative, color: '#EF4444' }, // red-500
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Total Viral Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                        {data!.viralKeywords.slice(0, 5).map((kw, i) => (
                            <span key={i} className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-semibold">#{kw}</span>
                        ))}
                    </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow-sm border border-green-100">
                    <h3 className="text-sm font-medium text-green-700 uppercase tracking-wider mb-1">7-Eleven Strength</h3>
                    <p className="text-xl font-bold text-green-900">{data!.storeComparison.sevenEleven.topProduct}</p>
                    <p className="text-xs text-green-600 mt-2">{data!.storeComparison.sevenEleven.strengths[0]}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl shadow-sm border border-purple-100">
                    <h3 className="text-sm font-medium text-purple-700 uppercase tracking-wider mb-1">Competitor Lead</h3>
                    <p className="text-xl font-bold text-purple-900">{data!.storeComparison.competitors.topProduct}</p>
                    <p className="text-xs text-purple-600 mt-2">{data!.storeComparison.competitors.strengths[0]}</p>
                </div>
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Brand Comparison */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">7-Eleven vs Competitors (AI Score)</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={comparisonData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                <XAxis type="number" domain={[0, 100]} />
                                <YAxis type="category" dataKey="name" hide />
                                <Tooltip cursor={{fill: 'transparent'}} />
                                <Legend />
                                <Bar dataKey="SevenEleven" fill="#008060" name="7-Eleven" radius={[0, 4, 4, 0]} barSize={40} />
                                <Bar dataKey="Competitors" fill="#6366f1" name="Others (CU/GS25)" radius={[0, 4, 4, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 p-4 bg-slate-50 rounded-lg text-sm text-slate-600">
                        <p className="font-semibold mb-1">Verdict:</p>
                        {data!.storeComparison.verdict}
                    </div>
                </div>

                {/* Sentiment Analysis */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Consumer Sentiment (YouTube)</h3>
                    <div className="h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sentimentData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {sentimentData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-center text-sm text-slate-500 mt-2">{data!.youtubeSentiment.summary}</p>
                </div>
            </div>

            {/* Top Trending Products Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                    <h3 className="text-lg font-bold text-slate-800">🔥 Top 5 Trending Products</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-slate-500 text-xs uppercase tracking-wider">
                                <th className="px-6 py-3 font-medium">Product</th>
                                <th className="px-6 py-3 font-medium">Store</th>
                                <th className="px-6 py-3 font-medium">Mentions</th>
                                <th className="px-6 py-3 font-medium">Sentiment</th>
                                <th className="px-6 py-3 font-medium">Key Feature</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {data!.topTrends.map((trend, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-slate-800">{trend.name}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                            trend.store === 'Seven Eleven' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                                        }`}>
                                            {trend.store}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{trend.mentions}</td>
                                    <td className="px-6 py-4">
                                        <span className={`flex items-center ${
                                            trend.sentiment === 'Positive' ? 'text-green-600' : 
                                            trend.sentiment === 'Negative' ? 'text-red-600' : 'text-yellow-600'
                                        }`}>
                                            <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                                            {trend.sentiment}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{trend.keywords[0]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
