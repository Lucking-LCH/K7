import React from 'react';

interface SidebarProps {
    currentTab: string;
    setTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentTab, setTab }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Overview Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
        { id: 'youtube', label: 'YouTube Trends', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
        { id: 'blog', label: 'Blog Analysis', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
        { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    ];

    return (
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0">
            <div className="p-6">
                <div className="flex items-center gap-2 text-white font-bold text-xl">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        AI
                    </div>
                    ConveniTrend
                </div>
            </div>
            
            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setTab(item.id)}
                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                            currentTab === item.id 
                            ? 'bg-indigo-600 text-white' 
                            : 'hover:bg-slate-800 text-slate-400'
                        }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="bg-slate-800 rounded-lg p-4">
                    <p className="text-xs text-slate-400 uppercase font-semibold mb-2">System Status</p>
                    <div className="flex items-center justify-between text-sm">
                        <span>Data Collection</span>
                        <span className="text-green-400 flex items-center">
                            <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                            Active
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                        <span>Gemini 2.5 Pro</span>
                        <span className="text-green-400 flex items-center">
                            <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                            Ready
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
