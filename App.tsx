import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import YoutubeView from './components/YoutubeView';
import BlogView from './components/BlogView';
import { generateTrendReport } from './services/geminiService';
import { MOCK_BLOG_DATA, MOCK_YOUTUBE_DATA } from './constants';
import { AnalysisReport } from './types';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [reportData, setReportData] = useState<AnalysisReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateTrendReport(MOCK_YOUTUBE_DATA, MOCK_BLOG_DATA);
      setReportData(result);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate report. Please check your API Key or try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard data={reportData} isLoading={isLoading} onGenerate={handleGenerateReport} />;
      case 'youtube':
        return <YoutubeView data={reportData} />;
      case 'blog':
        return <BlogView data={reportData} />;
      default:
        return <div className="p-8 text-slate-500">Settings coming soon...</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar currentTab={currentTab} setTab={setCurrentTab} />
      
      <main className="ml-64 flex-1 p-8">
        {/* Top Bar */}
        <header className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">
                    {currentTab === 'dashboard' ? 'Overview' : 
                     currentTab === 'youtube' ? 'YouTube Trends' : 
                     currentTab === 'blog' ? 'Blog Analysis' : 'Settings'}
                </h1>
                <p className="text-sm text-slate-500">
                    {reportData ? `Last updated: ${new Date(reportData.generatedAt).toLocaleString()}` : 'No active report'}
                </p>
            </div>
            
            <div className="flex items-center space-x-4">
                {reportData && (
                     <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-medium flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                        AI Analysis Complete
                    </span>
                )}
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
                    A
                </div>
            </div>
        </header>

        {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        {renderContent()}
      </main>
    </div>
  );
};

export default App;
