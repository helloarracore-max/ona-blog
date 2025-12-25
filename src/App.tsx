import React from 'react';
import { Sparkles, HeartHandshake, TrendingUp } from 'lucide-react';
import { BlogPost, User } from './types';
import { useApp } from './context/AppContext';

// Components
import MainLayout from './components/layout/MainLayout';
import Hero from './components/features/Hero';
import BlogGrid from './components/features/BlogGrid';
import AuthForm from './components/features/AuthForm';
import AdminPanel from './components/features/AdminPanel';
import PostDetail from './components/features/PostDetail';

export default function App() {
    const {
        isDark, setView,
        user, login,
        posts, addPost,
        heroImages,
        view, activePostId, setActivePostId
    } = useApp();

    const handleLogin = (e: React.FormEvent, data: any) => {
        e.preventDefault();

        let mockUser: User;
        if (data.username === 'admin' && data.password === 'Admin@1498') {
            mockUser = {
                username: 'Admin',
                isAdmin: true,
                avatar: ''
            }
        } else {
            mockUser = {
                username: data.username,
                isAdmin: false,
                avatar: ''
            };
        }

        login(mockUser);
        setView('HOME');
    };

    const handleSignup = (e: React.FormEvent, data: any) => {
        e.preventDefault();
        const isAdmin = data.secretCode === 'ghibli-glow';
        const mockUser: User = {
            username: data.username,
            isAdmin: isAdmin,
        };
        login(mockUser);
        setView('HOME');
    };

    const handlePublishPost = (postData: any) => {
        const newPost: BlogPost = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            likes: 0,
            ...postData
        };
        addPost(newPost);
        setView('HOME');
    };

    return (
        <MainLayout>
            {view === 'HOME' && (
                <Hero
                    isDark={isDark}
                    images={heroImages}
                    onReadLog={() => {
                        window.scrollTo({ top: 800, behavior: 'smooth' });
                    }}
                />
            )}

            {['HOME', 'TRAVEL', 'STYLE', 'GROWTH'].includes(view) && (
                <BlogGrid
                    posts={posts}
                    isDark={isDark}
                    currentView={view}
                    user={user}
                    onWriteNew={() => setView('ADMIN')}
                    onPostClick={(id) => {
                        setActivePostId(id);
                        setView('POST_DETAIL');
                        window.scrollTo(0, 0);
                    }}
                />
            )}

            {view === 'HOME' && (
                <section className={`py-24 px-6 sm:px-12 ${isDark ? 'bg-[#080808]' : 'bg-white/50'}`}>
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: 'Authenticity', icon: HeartHandshake, color: 'text-fuchsia-400', desc: "No filters on our bond. Just real stories." },
                                { title: 'Girly & Funky', icon: Sparkles, color: 'text-rose-400', desc: "Traditional vibes meet modern aesthetics." },
                                { title: 'Shared Growth', icon: TrendingUp, color: 'text-purple-400', desc: "Growing up individually, but together." }
                            ].map((item, idx) => (
                                <div key={idx} className={`p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1 ${isDark ? 'bg-white/5 border border-white/5 hover:bg-white/10' : 'bg-white border border-neutral-100 shadow-md'}`}>
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'} ${item.color}`}>
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                                    <p className={`text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {view === 'LOGIN' && <AuthForm type="LOGIN" onSwitch={() => setView('SIGNUP')} onSubmit={handleLogin} isDark={isDark} />}

            {view === 'SIGNUP' && <AuthForm type="SIGNUP" onSwitch={() => setView('LOGIN')} onSubmit={handleSignup} isDark={isDark} />}

            {view === 'ADMIN' && <AdminPanel isDark={isDark} onPublish={handlePublishPost} />}

            {view === 'POST_DETAIL' && activePostId && (
                <PostDetail
                    post={posts.find(p => p.id === activePostId)!}
                    isDark={isDark}
                    onBack={() => setView('HOME')}
                />
            )}
        </MainLayout>
    );
}