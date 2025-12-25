import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BlogPost, User, ViewState } from '../types';
import { generateGhibliImage } from '../services/geminiService';

import { INITIAL_POSTS, IMAGE_PROMPTS } from '../data/mockData';

interface AppContextType {
    isDark: boolean;
    toggleTheme: () => void;
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    posts: BlogPost[];
    addPost: (post: BlogPost) => void;
    heroImages: Record<string, string>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDark, setIsDark] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<BlogPost[]>([]);
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
            user, login, logout,
            posts, addPost,
            heroImages,
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
