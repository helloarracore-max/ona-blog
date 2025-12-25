
import { BlogPost } from '../types';

export const INITIAL_POSTS: BlogPost[] = [
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

export const IMAGE_PROMPTS: Record<string, string> = {
    '1': 'A scenic view of the Ganges river in Rishikesh India with mountains in background, anime style Studio Ghibli, two girls sitting by the river viewing sunset',
    '2': 'Asian fashion portrait, girl wearing traditional Manipur Phanek skirt mixed with modern streetwear blazer and boots, standing in a neon lit city street at night, anime style',
    '3': 'A quiet park bench in a busy city with cherry blossoms, a girl reading a book peacefully, studio ghibli style, soft lighting',
    'hero_main': 'Close up portrait of a beautiful Asian girl from Northeast India with flowers in her hair, looking at a glowing butterfly, magical studio ghibli anime style, highly detailed',
    'hero_top': 'A magical train ride through the clouds and green hills of Northeast India, starry night sky, spirited away style anime',
    'hero_bottom': 'Two asian cousins laughing and drinking boba tea in a cozy cafe, lo-fi anime style, warm lighting'
};
