import React, { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import NavBar from './NavBar';

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { isDark, user, setView, toggleTheme, logout } = useApp();

    return (
        <div className={`min-h-screen transition-colors duration-500 font-sans ${isDark ? 'bg-[#050505] text-slate-300' : 'bg-[#fff0f5] text-slate-700'}`}>

            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 ${isDark ? 'bg-fuchsia-600' : 'bg-fuchsia-300'}`}></div>
                <div className={`absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 ${isDark ? 'bg-rose-600' : 'bg-rose-300'}`}></div>
            </div>

            <NavBar
                user={user}
                onNavigate={setView}
                isDark={isDark}
                toggleTheme={toggleTheme}
                onLogout={logout}
            />

            <div className="relative z-10">
                {children}
            </div>

            <footer className={`border-t pt-20 pb-10 px-6 sm:px-12 mt-auto relative z-10 ${isDark ? 'border-white/5 bg-[#030303]' : 'border-neutral-200 bg-white'}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-5 h-5 text-fuchsia-400" />
                                <span className={`font-bold text-lg tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>O&A Blog</span>
                            </div>
                            <p className="text-xs text-neutral-500">Powered by Oliver.O</p>
                        </div>
                        <div className="text-neutral-500 text-sm">
                            © 2026 Sisterhood & Stories.
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default MainLayout;
