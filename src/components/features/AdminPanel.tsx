import React, { useState } from 'react';
import { Wand2, Loader2, Sparkles, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { BlogPost } from '../../types';
import { generateGhibliImage, generateBlogContent } from '../../services/geminiService';

interface AdminPanelProps {
    isDark: boolean;
    onPublish: (post: Omit<BlogPost, 'id' | 'likes' | 'date' | 'excerpt' | 'tags'> & { topic: string }) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isDark, onPublish }) => {
    const [topic, setTopic] = useState('');
    const [agentContext, setAgentContext] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isAgentWorking, setIsAgentWorking] = useState(false);

    // Manual state
    const [generatedData, setGeneratedData] = useState<{ title: string, content: string, excerpt: string, tags: string[] } | null>(null);
    const [coverImage, setCoverImage] = useState('');
    const [imagePrompt, setImagePrompt] = useState('');
    const [isImageLoading, setIsImageLoading] = useState(false);

    // --- Agent Mode ---
    const handleMagicAgent = async () => {
        if (!agentContext) return;
        setIsAgentWorking(true);
        try {
            // 1. Generate Text
            const textData = await generateBlogContent(agentContext);
            setGeneratedData(textData);
            setTopic(agentContext); // Sync topic

            // 2. Auto-Generate Image Prompt & Image
            const autoPrompt = `${textData.title}. ${textData.excerpt}. Studio Ghibli anime style, masterpiece, warm lighting, detailed background.`;
            setImagePrompt(autoPrompt);
            const b64 = await generateGhibliImage(autoPrompt);
            setCoverImage(b64);

        } catch (e) {
            alert("Agent encountered an error. Please try again.");
            console.error(e);
        } finally {
            setIsAgentWorking(false);
        }
    };

    // --- Manual Mode Handlers ---
    const handleGenerateContent = async () => {
        setIsGenerating(true);
        try {
            const data = await generateBlogContent(topic);
            setGeneratedData(data);
            setImagePrompt(`${data.title}, ${data.excerpt}, anime style`);
        } catch (e) {
            alert("Failed to generate content");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleGenerateImage = async () => {
        setIsImageLoading(true);
        try {
            const b64 = await generateGhibliImage(imagePrompt);
            setCoverImage(b64);
        } catch (e) {
            alert("Failed to generate image. Ensure API Key is valid.");
        } finally {
            setIsImageLoading(false);
        }
    };

    const handlePublish = () => {
        if (!generatedData || !coverImage) return;
        onPublish({
            title: generatedData.title,
            content: generatedData.content,
            coverImage: coverImage,
            topic: topic || agentContext,
            excerpt: generatedData.excerpt,
            tags: generatedData.tags,
            author: "Admin"
        } as any);
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
            <h2 className={`text-4xl font-display font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>Admin CMS</h2>

            {/* Magic Agent Section */}
            <div className="mb-12">
                <div className="p-1 rounded-3xl bg-gradient-to-r from-fuchsia-500 via-rose-500 to-purple-500">
                    <div className={`p-8 rounded-[1.3rem] ${isDark ? 'bg-neutral-900' : 'bg-white'}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-full bg-gradient-to-br from-fuchsia-500 to-rose-500 text-white shadow-lg shadow-fuchsia-500/30">
                                <Wand2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Magic Agent Writer</h3>
                                <p className="text-sm text-neutral-500">Describe your story, and I'll write the blog and paint the cover for you.</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="text"
                                className={`flex-grow h-14 rounded-xl px-4 outline-none border transition-all focus:border-fuchsia-500 ${isDark ? 'bg-black/30 border-white/10 text-white' : 'bg-neutral-50 border-neutral-200 text-black'}`}
                                placeholder="e.g. 'We discovered a hidden ramen shop in Dimapur that played jazz music...'"
                                value={agentContext}
                                onChange={(e) => setAgentContext(e.target.value)}
                            />
                            <button
                                onClick={handleMagicAgent}
                                disabled={isAgentWorking || !agentContext}
                                className="h-14 px-8 bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-fuchsia-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0"
                            >
                                {isAgentWorking ? <Loader2 className="animate-spin" /> : 'Auto-Create'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
                <div className="h-px bg-neutral-800 flex-grow"></div>
                <span className="text-neutral-500 text-sm font-medium uppercase tracking-widest">Or Manual Mode</span>
                <div className="h-px bg-neutral-800 flex-grow"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`p-6 rounded-3xl border ${isDark ? 'bg-neutral-900 border-white/10' : 'bg-white border-neutral-200'}`}>
                    <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>1. Draft Content</h3>
                    <textarea
                        className={`w-full h-32 p-4 rounded-xl border mb-4 outline-none focus:border-fuchsia-500 ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-neutral-50 border-neutral-200'}`}
                        placeholder="Topic..."
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                    <button
                        onClick={handleGenerateContent}
                        disabled={isGenerating || !topic}
                        className="flex items-center gap-2 px-6 py-3 bg-neutral-700 text-white rounded-xl font-bold hover:bg-neutral-600 disabled:opacity-50 text-sm"
                    >
                        {isGenerating ? <Loader2 className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                        Generate Text Only
                    </button>
                </div>

                <div className={`p-6 rounded-3xl border ${isDark ? 'bg-neutral-900 border-white/10' : 'bg-white border-neutral-200'}`}>
                    <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>2. Create Cover Art</h3>
                    <textarea
                        className={`w-full h-20 p-4 rounded-xl border mb-4 outline-none focus:border-fuchsia-500 ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-neutral-50 border-neutral-200'}`}
                        placeholder="Image prompt..."
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                    />
                    <button
                        onClick={handleGenerateImage}
                        disabled={isImageLoading || !imagePrompt}
                        className="flex items-center gap-2 px-6 py-3 bg-neutral-700 text-white rounded-xl font-bold hover:bg-neutral-600 disabled:opacity-50 text-sm"
                    >
                        {isImageLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                        Generate Image Only
                    </button>
                </div>
            </div>

            {generatedData && (
                <div className={`mt-8 p-8 rounded-3xl border ${isDark ? 'bg-neutral-900 border-white/10' : 'bg-white border-neutral-200'}`}>
                    <h3 className="text-2xl font-bold text-fuchsia-400 mb-2">{generatedData.title}</h3>
                    <p className="text-neutral-500 italic mb-6">{generatedData.excerpt}</p>

                    <div className="mb-6 rounded-2xl overflow-hidden shadow-2xl bg-neutral-800 min-h-[300px] relative">
                        {coverImage ? (
                            <img src={coverImage} alt="Generated Cover" className="w-full object-cover max-h-[400px]" />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-neutral-500 flex-col gap-2">
                                <ImageIcon className="w-8 h-8 opacity-50" />
                                <span className="text-sm">Preview will appear here</span>
                            </div>
                        )}
                    </div>

                    <div className={`prose ${isDark ? 'prose-invert' : ''} max-w-none mb-6`} dangerouslySetInnerHTML={{ __html: generatedData.content }}></div>

                    <button
                        onClick={handlePublish}
                        disabled={!coverImage}
                        className="w-full py-4 bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        Publish Blog Post <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
