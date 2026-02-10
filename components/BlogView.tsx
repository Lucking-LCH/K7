import React from 'react';
import { MOCK_BLOG_DATA } from '../constants';
import { AnalysisReport } from '../types';

interface BlogViewProps {
    data: AnalysisReport | null;
}

const BlogView: React.FC<BlogViewProps> = ({ data }) => {
    return (
        <div className="space-y-6 animate-fade-in">
             <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Blog Ecosystem Analysis</h2>
                    <p className="text-slate-500">Source: Naver Blogs, Tistory (Top Visit Count)</p>
                </div>
                 {data && (
                    <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-semibold">
                        Blog Sentiment: {data.blogSentiment.summary}
                    </div>
                )}
            </div>

             <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 font-medium text-slate-500">Platform</th>
                            <th className="px-6 py-4 font-medium text-slate-500">Blog Title</th>
                            <th className="px-6 py-4 font-medium text-slate-500">Snippet</th>
                            <th className="px-6 py-4 font-medium text-slate-500 text-right">Visits</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {MOCK_BLOG_DATA.map((blog) => (
                            <tr key={blog.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                                        blog.platform === 'Naver' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                                    }`}>
                                        {blog.platform}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-semibold text-slate-800 w-1/4">{blog.title}</td>
                                <td className="px-6 py-4 text-slate-600 text-sm">{blog.snippet}</td>
                                <td className="px-6 py-4 text-right text-slate-500 font-mono">{blog.visits.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>

             {/* Keywords Cloud (Visual representation) */}
             {data && (
                 <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                    <h3 className="font-bold text-slate-800 mb-4">Viral Keywords (Blogosphere)</h3>
                    <div className="flex flex-wrap gap-3">
                        {data.viralKeywords.map((kw, i) => (
                            <span 
                                key={i} 
                                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-indigo-100 hover:text-indigo-700 transition-colors cursor-default"
                                style={{ fontSize: `${Math.max(0.8, 1.5 - (i * 0.1))}rem`, fontWeight: i < 3 ? 700 : 400 }}
                            >
                                #{kw}
                            </span>
                        ))}
                    </div>
                 </div>
             )}
        </div>
    );
};

export default BlogView;
