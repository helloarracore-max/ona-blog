
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Hero from '../components/features/Hero';
import BlogGrid from '../components/features/BlogGrid';
import { HeartHandshake, Sparkles, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
    const { isDark, user, posts, heroImages } = useApp();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const categoryParam = searchParams.get('category');

    // Derived view state from URL param or default to HOME
    // If we have a category, we map it to the ViewState equivalent just for the Grid prop
    // though ideally we refactor BlogGrid to take a string filter.
    // For now, let's cast it or pass 'HOME' if null.

    const currentView = (categoryParam ? categoryParam.toUpperCase() : 'HOME') as any;

    const scrollToPosts = () => {
        const grid = document.getElementById('blog-grid');
        if (grid) {
            grid.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {currentView === 'HOME' && (
                <Hero
                    isDark={isDark}
                    images={heroImages}
                    onReadLog={scrollToPosts}
                />
            )}

            <div id="blog-grid">
                <BlogGrid
                    posts={posts}
                    isDark={isDark}
                    // We pass the derived view based on URL param
                    currentView={currentView}
                    user={user}
                    onWriteNew={() => navigate('/admin')}
                    onPostClick={(id) => navigate(`/post/${id}`)}
                />
            </div>

            {currentView === 'HOME' && (
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
        </div>
    );
};

export default Home;
