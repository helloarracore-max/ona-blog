import React from 'react';
import { Sparkles, ArrowRight, Plus, Loader2 } from 'lucide-react';
import { BlogPost, User, ViewState } from '../../types';

interface BlogGridProps {
    posts: BlogPost[];
    isDark: boolean;
    onPostClick: (id: string) => void;
    currentView: ViewState;
    user: User | null;
    onWriteNew: () => void;
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts, isDark, onPostClick, currentView, user, onWriteNew }) => {

    let heading = 'The "Cousin-Connection"';
    if (currentView === 'TRAVEL') heading = "Travel Logs: Wanderlust";
    if (currentView === 'STYLE') heading = "Style Edit: OOTD";
    if (currentView === 'GROWTH') heading = "Growth: Personal Journeys";

    const displayPosts = currentView === 'HOME' ? posts : posts.filter(p => p.tags.some(t => t.toLowerCase().includes(currentView.toLowerCase())));

    return (
        <section className={`py-24 px-6 sm:px-12 relative border-b min-h-[600px] ${isDark ? 'border-white/5 bg-[#080808]' : 'border-black/5 bg-neutral-50'}`}>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <span className="text-fuchsia-500 font-bold tracking-wide text-sm mb-2 block uppercase">Content Pillars</span>
                        <h2 className={`text-3xl md:text-4xl font-display font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{heading}</h2>
                    </div>
                </div>

                {displayPosts.length === 0 ? (
                    <div className="py-20 text-center text-neutral-500">
                        <p>No stories found in this category yet. Time to write one?</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Admin Write Card - Visible only on Home to Admins */}
                        {user?.isAdmin && currentView === 'HOME' && (
                            <div
                                onClick={onWriteNew}
                                className="group cursor-pointer rounded-3xl overflow-hidden border border-dashed border-fuchsia-500/30 bg-fuchsia-500/5 hover:bg-fuchsia-500/10 transition-all duration-300 flex flex-col items-center justify-center aspect-square gap-4"
                            >
                                <div className="w-16 h-16 rounded-full bg-fuchsia-500 text-white flex items-center justify-center shadow-lg shadow-fuchsia-500/30 group-hover:scale-110 transition-transform">
                                    <Plus className="w-8 h-8" />
                                </div>
                                <span className="font-bold text-fuchsia-500 text-lg">Write New Log</span>
                            </div>
                        )}

                        {displayPosts.map((post, index) => (
                            <div
                                key={post.id}
                                onClick={() => onPostClick(post.id)}
                                className={`group cursor-pointer rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${index === 0 && !user?.isAdmin && currentView === 'HOME' ? 'md:col-span-2 aspect-[2/1]' : 'aspect-square'} ${isDark ? 'border-white/10 bg-white/5' : 'border-black/5 bg-white'}`}
                            >
                                <div className="relative h-full w-full bg-neutral-800">
                                    {post.coverImage && post.coverImage !== 'placeholder' ? (
                                        <img src={post.coverImage} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" alt={post.title} />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-neutral-800 to-neutral-900">
                                            <Loader2 className="w-10 h-10 text-neutral-600 animate-spin" />
                                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-600">Loading Art...</span>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
                                    <div className="absolute bottom-0 p-5 sm:p-8 w-full">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <h3 className={`font-display font-bold text-white mb-2 leading-tight ${index === 0 && !user?.isAdmin && currentView === 'HOME' ? 'text-xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>{post.title}</h3>
                                                {index === 0 && !user?.isAdmin && currentView === 'HOME' && <p className="hidden sm:block text-neutral-300 text-sm font-light line-clamp-2 max-w-md">{post.excerpt}</p>}
                                                <div className="flex gap-2 mt-3">
                                                    {post.tags.slice(0, 2).map(tag => (
                                                        <span key={tag} className="text-[10px] sm:text-xs font-medium text-fuchsia-300 bg-fuchsia-500/20 px-2 py-1 rounded-full backdrop-blur-sm">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Promo Card - Only show on Home */}
                        {currentView === 'HOME' && (
                            <div className={`md:col-span-1 rounded-3xl p-8 flex flex-col justify-center items-start border ${isDark ? 'bg-neutral-900 border-white/5' : 'bg-fuchsia-50 border-fuchsia-100'}`}>
                                <div className="w-12 h-12 bg-fuchsia-500/10 rounded-full flex items-center justify-center mb-6 text-fuchsia-500 border border-fuchsia-500/20">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <h3 className={`text-2xl font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>We are Olivia & Anamika</h3>
                                <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                    The Kangjam cousins. Blooming in our own unique ways but always staying connected at the roots.
                                </p>
                                <div className="text-fuchsia-500 font-bold text-sm flex items-center gap-2">
                                    Read our story <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogGrid;
