import React, { useState } from 'react';
import { Sparkles, Sun, Moon, PenTool, LogOut, Heart, Menu, X } from 'lucide-react';
import { User, ViewState } from '../../types';

interface NavBarProps {
    user: User | null;
    onNavigate: (view: ViewState) => void;
    isDark: boolean;
    toggleTheme: () => void;
    onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({
    user,
    onNavigate,
    isDark,
    toggleTheme,
    onLogout
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleMobileNavigate = (view: ViewState) => {
        onNavigate(view);
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="w-full fixed top-0 z-50 pt-4 px-4 sm:pt-6 sm:px-8">
            <div className={`relative flex max-w-7xl mx-auto rounded-full px-6 py-3 items-center justify-between transition-all duration-300 border ${isDark ? 'bg-neutral-900/80 border-white/10' : 'bg-white/80 border-black/5'} backdrop-blur-xl shadow-lg z-50`}>
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleMobileNavigate('HOME')}
                >
                    <div className={`p-1.5 rounded-lg border ${isDark ? 'bg-fuchsia-500/20 border-fuchsia-500/20' : 'bg-fuchsia-100 border-fuchsia-200'}`}>
                        <Sparkles className="w-5 h-5 text-fuchsia-400" />
                    </div>
                    <span className={`font-display font-bold text-lg tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        O&A <span className="text-neutral-500 font-normal">Blog</span>
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
                    <button onClick={() => onNavigate('HOME')} className={`transition-colors hover:text-fuchsia-400 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Roots</button>
                    <button onClick={() => onNavigate('TRAVEL')} className={`transition-colors hover:text-fuchsia-400 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Travel</button>
                    <button onClick={() => onNavigate('STYLE')} className={`transition-colors hover:text-fuchsia-400 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Style</button>
                    <button onClick={() => onNavigate('GROWTH')} className={`transition-colors hover:text-fuchsia-400 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Growth</button>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-gray-800'}`}>
                        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>

                    {/* Mobile Hamburger */}
                    <button
                        className={`md:hidden p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-gray-800'}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>

                    {/* Desktop User Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <>
                                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Hi, {user.username}</span>
                                {user.isAdmin && (
                                    <button
                                        onClick={() => onNavigate('ADMIN')}
                                        className="p-2 bg-fuchsia-500/20 text-fuchsia-400 rounded-full hover:bg-fuchsia-500/30 transition-transform hover:scale-105"
                                        title="Admin Dashboard"
                                    >
                                        <PenTool className="w-4 h-4" />
                                    </button>
                                )}
                                <button onClick={onLogout} className="text-rose-400 hover:text-rose-500">
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => onNavigate('LOGIN')}
                                    className={`text-sm font-medium transition-colors ${isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 hover:text-black'}`}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => onNavigate('SIGNUP')}
                                    className="bg-white px-5 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 flex items-center gap-2 text-black hover:bg-fuchsia-200 shadow-lg shadow-fuchsia-500/20"
                                >
                                    Join Crew
                                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="absolute top-20 left-4 right-4 md:hidden">
                    <div className={`rounded-3xl p-6 border shadow-2xl backdrop-blur-2xl animate-in slide-in-from-top-4 fade-in duration-200 ${isDark ? 'bg-neutral-900/95 border-white/10' : 'bg-white/95 border-black/5'}`}>
                        <div className="flex flex-col gap-4">
                            <button onClick={() => handleMobileNavigate('HOME')} className={`text-left text-lg font-medium p-2 rounded-xl ${isDark ? 'text-neutral-300 hover:bg-white/5' : 'text-neutral-600 hover:bg-black/5'}`}>Roots (Home)</button>
                            <button onClick={() => handleMobileNavigate('TRAVEL')} className={`text-left text-lg font-medium p-2 rounded-xl ${isDark ? 'text-neutral-300 hover:bg-white/5' : 'text-neutral-600 hover:bg-black/5'}`}>Travel Logs</button>
                            <button onClick={() => handleMobileNavigate('STYLE')} className={`text-left text-lg font-medium p-2 rounded-xl ${isDark ? 'text-neutral-300 hover:bg-white/5' : 'text-neutral-600 hover:bg-black/5'}`}>Style Edits</button>
                            <button onClick={() => handleMobileNavigate('GROWTH')} className={`text-left text-lg font-medium p-2 rounded-xl ${isDark ? 'text-neutral-300 hover:bg-white/5' : 'text-neutral-600 hover:bg-black/5'}`}>Growth Journal</button>

                            <hr className={`border-t ${isDark ? 'border-white/10' : 'border-black/5'}`} />

                            {user ? (
                                <div className="flex flex-col gap-4">
                                    <div className={`flex items-center justify-between p-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        <span className="font-bold">@{user.username}</span>
                                        {user.isAdmin && <span className="text-xs bg-fuchsia-500/20 text-fuchsia-400 px-2 py-1 rounded-full">Admin</span>}
                                    </div>

                                    {user.isAdmin && (
                                        <button
                                            onClick={() => handleMobileNavigate('ADMIN')}
                                            className="flex items-center gap-2 p-3 bg-fuchsia-500/10 text-fuchsia-400 rounded-xl font-bold"
                                        >
                                            <PenTool className="w-5 h-5" />
                                            Open Admin Studio
                                        </button>
                                    )}

                                    <button
                                        onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                                        className="flex items-center gap-2 p-3 bg-rose-500/10 text-rose-500 rounded-xl font-bold"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={() => handleMobileNavigate('LOGIN')}
                                        className={`w-full py-3 rounded-xl font-bold border ${isDark ? 'border-white/10 text-white' : 'border-neutral-200 text-gray-900'}`}
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => handleMobileNavigate('SIGNUP')}
                                        className="w-full py-3 rounded-xl font-bold bg-white text-black shadow-lg shadow-fuchsia-500/20 flex items-center justify-center gap-2"
                                    >
                                        Join The Crew
                                        <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default NavBar;
