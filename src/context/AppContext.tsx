import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BlogPost, User, ViewState } from '../types';
import { generateGhibliImage } from '../services/geminiService';

// --- Mock Data ---
const INITIAL_POSTS: BlogPost[] = [
    {
        id: '1',
        title: 'Travel Log: From Imphal to Rishikesh',
        excerpt: 'Trading the misty hills of Manipur for the chaotic charm of Delhi and the spiritual breeze of the Ganges.',
        content: '<p>The flight from Imphal to Delhi always feels like teleporting between two worlds. One moment, it\'s the quiet, pine-scented air of the hills; the next, it\'s the electric humidity of the capital.</p><p>We took the night train to Rishikesh. Anamika fell asleep on the upper berth while I watched the city lights fade into the darkness of the plains. Waking up to the sight of the Ganges cutting through the mountains felt like a reset button for our souls.</p><p>We sat by the river, eating momos, realizing how far we\'ve come—literally and metaphorically.</p>',
        coverImage: 'placeholder',
        author: 'Olivia Kangjam',
        date: 'Oct 24, 2024',
        tags: ['#Travel', '#Rishikesh', '#Sisterhood'],
        likes: 124
    },
    {
        id: '2',
        title: 'Style Edit: Modern Meitei Fusion',
        excerpt: 'How we style our traditional Phaneks with oversized blazers and combat boots for a Tokyo-meet-Imphal vibe.',
        content: '<p>Growing up, the Phanek was strict traditional wear. Now? It\'s our canvas. Today\'s look was all about contrast. I paired my striped Phanek with a vintage graphic tee and chunky combat boots.</p><p>It\'s not just clothes; it\'s identity. Wearing our heritage in the middle of a modern city makes us feel grounded yet invincible. We call it "Ghibli-Grunge" aesthetic.</p>',
        coverImage: 'placeholder',
        author: 'Anamika Kangjam',
        date: 'Oct 20, 2024',
        tags: ['#Style', '#OOTD', '#Culture'],
        likes: 98
    },
    {
        id: '3',
        title: 'Growth: Blooming in the Concrete',
        excerpt: 'Navigating our twenties, career anxiety, and finding quiet corners in a loud world.',
        content: '<p>Sometimes "Glowing Up" isn\'t about skincare routines. It\'s about being okay with not knowing the plan. This week was tough. Deadlines, confusing texts, and the noise of the city.</p><p>But we found a small park that reminded us of home. We sat there, just breathing. Growth is messy, but as long as we have these little pockets of peace, we keep blooming.</p>',
        coverImage: 'placeholder',
        author: 'Olivia Kangjam',
        date: 'Oct 15, 2024',
        tags: ['#Growth', '#MentalHealth', '#Adulting'],
        likes: 156
    }
];

const IMAGE_PROMPTS: Record<string, string> = {
    '1': 'A scenic view of the Ganges river in Rishikesh India with mountains in background, anime style Studio Ghibli, two girls sitting by the river viewing sunset',
    '2': 'Asian fashion portrait, girl wearing traditional Manipur Phanek skirt mixed with modern streetwear blazer and boots, standing in a neon lit city street at night, anime style',
    '3': 'A quiet park bench in a busy city with cherry blossoms, a girl reading a book peacefully, studio ghibli style, soft lighting',
    'hero_main': 'Close up portrait of a beautiful Asian girl from Northeast India with flowers in her hair, looking at a glowing butterfly, magical studio ghibli anime style, highly detailed',
    'hero_top': 'A magical train ride through the clouds and green hills of Northeast India, starry night sky, spirited away style anime',
    'hero_bottom': 'Two asian cousins laughing and drinking boba tea in a cozy cafe, lo-fi anime style, warm lighting'
};

interface AppContextType {
    isDark: boolean;
    toggleTheme: () => void;
    view: ViewState;
    setView: (view: ViewState) => void;
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    posts: BlogPost[];
    addPost: (post: BlogPost) => void;
    heroImages: Record<string, string>;
    activePostId: string | null;
    setActivePostId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDark, setIsDark] = useState(true);
    const [view, setView] = useState<ViewState>('HOME');
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [activePostId, setActivePostId] = useState<string | null>(null);
    const [heroImages, setHeroImages] = useState<Record<string, string>>({});

    const [processingImages, setProcessingImages] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    // Load initial data
    useEffect(() => {
        const savedPosts = localStorage.getItem('oa_blog_posts_v3');
        const savedUser = localStorage.getItem('oa_user');
        const savedHeroImages = localStorage.getItem('oa_hero_images');

        if (savedPosts) {
            setPosts(JSON.parse(savedPosts));
        } else {
            setPosts(INITIAL_POSTS);
            try {
                localStorage.setItem('oa_blog_posts_v3', JSON.stringify(INITIAL_POSTS));
            } catch (e) {
                console.warn('Failed to save initial posts to localStorage:', e);
            }
        }

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        if (savedHeroImages) {
            setHeroImages(JSON.parse(savedHeroImages));
        }

        setIsDataLoaded(true);
    }, []);

    // Effect: Generate Hero Images
    useEffect(() => {
        const generateHeroes = async () => {
            if (!isDataLoaded) return;
            if (heroImages.hero_main && heroImages.hero_top && heroImages.hero_bottom) return;
            if (processingImages) return;

            // Check for API Key availability before trying
            // We check this inside the effect to allow it to run once data is loaded
            if (!import.meta.env.VITE_API_KEY) {
                console.warn("Skipping Image Generation: VITE_API_KEY is missing (checked in effect).");
                return;
            }

            setProcessingImages(true);
            const newImages = { ...heroImages };
            let changed = false;
            let criticalError = false;

            const keys = ['hero_main', 'hero_top', 'hero_bottom'];

            for (const key of keys) {
                // Check against current state AND our local newImages accumulator to avoid duplicates
                if (!newImages[key]) {
                    try {
                        const prompt = IMAGE_PROMPTS[key];
                        console.log(`Generating ${key}...`);
                        const base64 = await generateGhibliImage(prompt);
                        if (base64) {
                            newImages[key] = base64;
                            changed = true;
                            // Determine if we should update state immediately or batch
                            setHeroImages(prev => ({ ...prev, [key]: base64 }));
                        }
                    } catch (e: any) {
                        console.error(`Failed to generate ${key}`, e);

                        // Check for API Key errors (400 INVALID_ARGUMENT is common for bad keys)
                        const errorMsg = String(e?.message || e);
                        if (errorMsg.includes('API key') || errorMsg.includes('400') || errorMsg.includes('INVALID_ARGUMENT')) {
                            console.error("Critical API Error: Stopping all generation.");
                            criticalError = true;
                            break; // Stop loop
                        }
                    }
                }
            }

            if (changed) {
                try {
                    localStorage.setItem('oa_hero_images', JSON.stringify(newImages));
                } catch (e) {
                    console.warn('Quota exceeded saving hero images. Data will persist in memory only.', e);
                }
            }

            // Only reset processing flag if we didn't hit a critical auth error.
            // If we hit a critical error, we leave it TRUE to prevent the effect from trying again in this session.
            if (!criticalError) {
                setProcessingImages(false);
            }
        };

        // Debounce slightly to ensure hydration
        const timer = setTimeout(generateHeroes, 2000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded]); // Removed processingImages and heroImages to prevent loops. Logic handles checks.

    // Effect: Generate Post Images
    useEffect(() => {
        const generatePostImages = async () => {
            if (!isDataLoaded) return;
            if (posts.length === 0) return;
            if (posts.every(p => p.coverImage && p.coverImage !== 'placeholder')) return;

            if (!import.meta.env.VITE_API_KEY) {
                return;
            }

            let updated = false;
            let criticalError = false;
            const newPosts = [...posts];

            for (let i = 0; i < newPosts.length; i++) {
                if (newPosts[i].coverImage === 'placeholder' || !newPosts[i].coverImage) {
                    try {
                        const promptKey = newPosts[i].id;
                        const prompt = IMAGE_PROMPTS[promptKey] || `Anime style illustration studio ghibli style: ${newPosts[i].title}`;

                        console.log(`Generating blog image ${i}...`);
                        const base64 = await generateGhibliImage(prompt);
                        if (base64) {
                            newPosts[i].coverImage = base64;
                            updated = true;
                            setPosts([...newPosts]);
                        }
                    } catch (e: any) {
                        console.error(`Failed to generate post image ${i}`, e);
                        const errorMsg = String(e?.message || e);
                        if (errorMsg.includes('API key') || errorMsg.includes('400') || errorMsg.includes('INVALID_ARGUMENT')) {
                            criticalError = true;
                            break; // Stop loop
                        }
                    }
                }
            }

            if (updated) {
                try {
                    localStorage.setItem('oa_blog_posts_v3', JSON.stringify(newPosts));
                } catch (e) {
                    console.warn('Quota exceeded saving blog posts. Data will persist in memory only.', e);
                }
            }
        };

        if (posts.some(p => p.coverImage === 'placeholder')) {
            const timer = setTimeout(generatePostImages, 2500);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded]); // Removed posts to prevent loop if update fails or partial update

    const toggleTheme = () => setIsDark(prev => !prev);

    const login = (userData: User) => {
        setUser(userData);
        try {
            localStorage.setItem('oa_user', JSON.stringify(userData));
        } catch (e) {
            console.error('Failed to save user to localStorage:', e);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('oa_user');
        setView('HOME');
    };

    const addPost = (post: BlogPost) => {
        const updatedPosts = [post, ...posts];
        setPosts(updatedPosts);
        try {
            localStorage.setItem('oa_blog_posts_v3', JSON.stringify(updatedPosts));
        } catch (e) {
            console.warn('Failed to save updated posts to localStorage (quota exceeded?):', e);
        }
    };

    return (
        <AppContext.Provider value={{
            isDark, toggleTheme,
            view, setView,
            user, login, logout,
            posts, addPost,
            heroImages,
            activePostId, setActivePostId
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
