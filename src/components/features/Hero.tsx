import React from 'react';
import { BookOpen, Users, Loader2, Flower2 } from 'lucide-react';

interface HeroProps {
    isDark: boolean;
    onReadLog: () => void;
    images: Record<string, string>;
}

const Hero: React.FC<HeroProps> = ({ isDark, onReadLog, images }) => (
    <main className={`flex-grow flex pt-40 pb-20 px-6 sm:px-12 relative items-center justify-center border-b ${isDark ? 'border-white/5' : 'border-black/5'}`}>
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Left Text */}
            <div className="lg:col-span-5 flex flex-col gap-8 relative z-10">
                <div className={`inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full border ${isDark ? 'bg-white/5 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
                    </span>
                    <span className="text-xs font-bold text-fuchsia-500 tracking-wide uppercase">Status: Blooming</span>
                </div>

                <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-[1.1] ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    The O&A <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-rose-400">Glow-Log.</span>
                </h1>

                <p className={`text-lg font-medium ${isDark ? 'text-neutral-200' : 'text-neutral-700'}`}>
                    Two Cousins, Olivia & Anamika Kangjam. One Journey. A Lifetime of Glowing Up.
                </p>
                <p className={`text-base leading-relaxed max-w-lg ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    From the hills of Manipur to the streets of Delhi. A digital diary documenting our travel, style, and growth, illustrated with Ghibli magic.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                    <button
                        onClick={onReadLog}
                        className="hover:shadow-[0_0_30px_rgba(232,121,249,0.4)] hover:-translate-y-0.5 transition-all duration-300 flex gap-2 text-base font-bold text-white bg-gradient-to-r from-fuchsia-600 to-rose-600 h-14 rounded-2xl px-8 shadow-[0_0_20px_rgba(192,38,211,0.3)] items-center justify-center"
                    >
                        <BookOpen className="w-5 h-5" />
                        Read Logs
                    </button>
                    <button className={`hover:border-rose-400 transition-all duration-300 flex gap-2 group text-base font-medium h-14 border rounded-2xl px-8 items-center justify-center ${isDark ? 'text-white border-neutral-700 hover:bg-neutral-900' : 'text-gray-900 border-neutral-200 hover:bg-white shadow-sm'}`}>
                        <Users className="w-5 h-5 group-hover:text-rose-400" />
                        Meet the Cousins
                    </button>
                </div>
            </div>

            {/* Right Visuals */}
            <div className="lg:col-span-7 relative w-full mt-16 lg:mt-0">
                <div className="grid grid-cols-12 lg:grid-rows-6 gap-4 h-auto lg:h-[600px] w-full">
                    {/* Tall Image - Main (Visible on Mobile) */}
                    <div className="col-span-12 lg:col-span-5 lg:row-span-6 rounded-[2.5rem] overflow-hidden relative group cursor-pointer shadow-2xl border border-white/10 bg-neutral-800 h-[500px] lg:h-auto">
                        {images.hero_main ? (
                            <img src={images.hero_main} className="transition-transform duration-700 group-hover:scale-110 opacity-90 w-full h-full object-cover" alt="Anime Style Asian Girl" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center flex-col gap-2 bg-gradient-to-br from-fuchsia-900/40 to-rose-900/40 animate-pulse">
                                <Loader2 className="w-8 h-8 text-fuchsia-500 animate-spin" />
                                <span className="text-xs text-fuchsia-400">Painting...</span>
                            </div>
                        )}
                        <div className="bg-gradient-to-t to-transparent from-fuchsia-900/60 absolute inset-0"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <p className="text-xs font-bold uppercase tracking-wider text-fuchsia-300 mb-1">The Heirloom Log</p>
                            <h3 className="text-xl font-display font-bold">One Phanek, Two Ways</h3>
                        </div>
                    </div>

                    {/* Top Wide - Hero Top (Desktop Only) */}
                    <div className="hidden lg:block col-span-7 row-span-3 rounded-[2.5rem] overflow-hidden relative group cursor-pointer shadow-2xl border border-white/10 bg-neutral-800">
                        {images.hero_top ? (
                            <img src={images.hero_top} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" alt="Ghibli Landscape" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center flex-col gap-2 bg-gradient-to-br from-purple-900/40 to-blue-900/40 animate-pulse">
                                <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
                                <span className="text-xs text-rose-400">Dreaming...</span>
                            </div>
                        )}
                        <div className="absolute top-4 right-4 backdrop-blur-md border px-3 py-1.5 rounded-full flex items-center gap-2 bg-black/40 border-white/10">
                            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
                            <span className="text-xs font-medium text-white">Sister-Scout</span>
                        </div>
                    </div>

                    {/* Bottom Square - Hero Bottom (Desktop Only) */}
                    <div className="hidden lg:block col-span-4 row-span-3 rounded-[2.5rem] overflow-hidden relative group cursor-pointer shadow-2xl border border-white/10 bg-neutral-800">
                        {images.hero_bottom ? (
                            <img src={images.hero_bottom} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" alt="Friends" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center flex-col gap-2 bg-gradient-to-br from-indigo-900/40 to-fuchsia-900/40 animate-pulse">
                                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                                <span className="text-xs text-purple-400">Sketching...</span>
                            </div>
                        )}
                    </div>

                    {/* Spinner (Desktop Only) */}
                    <div className="hidden lg:flex col-span-3 row-span-3 items-center justify-center relative">
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            <div className="absolute inset-0 animate-spin-slow">
                                <svg className={`w-full h-full ${isDark ? 'text-neutral-700' : 'text-neutral-300'}`} viewBox="0 0 100 100">
                                    <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                                    <text className="text-[10px] uppercase font-bold tracking-widest fill-current">
                                        <textPath xlinkHref="#curve">
                                            • Sisterhood • Stories • Glow Up • Sisterhood • Stories •
                                        </textPath>
                                    </text>
                                </svg>
                            </div>
                            <button className="w-16 h-16 rounded-full bg-fuchsia-400 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg shadow-fuchsia-500/20 z-10">
                                <Flower2 className="w-8 h-8 text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
);

export default Hero;
