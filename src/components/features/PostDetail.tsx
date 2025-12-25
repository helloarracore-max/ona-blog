import React from 'react';
import { ArrowRight, Loader2, Heart } from 'lucide-react';
import { BlogPost } from '../../types';

interface PostDetailProps {
    post: BlogPost;
    isDark: boolean;
    onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, isDark, onBack }) => (
    <div className={`min-h-screen pt-24 pb-20 px-6 ${isDark ? 'bg-[#050505]' : 'bg-white'}`}>
        <button onClick={onBack} className="max-w-4xl mx-auto flex items-center gap-2 text-fuchsia-500 font-bold mb-6 hover:-translate-x-1 transition-transform">
            <ArrowRight className="rotate-180 w-4 h-4" /> Back to Logs
        </button>

        <article className="max-w-4xl mx-auto">
            <div className="rounded-[2.5rem] overflow-hidden mb-10 shadow-2xl bg-neutral-800">
                {post.coverImage && post.coverImage !== 'placeholder' ? (
                    <img src={post.coverImage} className="w-full object-cover max-h-[600px]" alt={post.title} />
                ) : (
                    <div className="w-full h-[400px] flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900">
                        <Loader2 className="w-10 h-10 text-neutral-600 animate-spin" />
                    </div>
                )}
            </div>

            <div className="flex gap-4 items-center mb-6">
                <span className="bg-fuchsia-500/10 text-fuchsia-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-fuchsia-500/20">{post.tags[0]}</span>
                <span className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>{post.date} • by {post.author}</span>
            </div>

            <h1 className={`text-4xl md:text-6xl font-display font-bold mb-8 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {post.title}
            </h1>

            <div
                className={`prose prose-lg max-w-none ${isDark ? 'prose-invert prose-p:text-neutral-300 prose-headings:font-display' : 'prose-p:text-neutral-700 prose-headings:font-display'}`}
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-16 pt-8 border-t border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 bg-rose-500/10 text-rose-500 px-6 py-3 rounded-full font-bold hover:bg-rose-500/20 transition-colors">
                        <Heart className="w-5 h-5" /> {post.likes} Likes
                    </button>
                </div>
            </div>
        </article>
    </div>
);

export default PostDetail;
