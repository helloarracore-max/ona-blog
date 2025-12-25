
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PostDetail from '../components/features/PostDetail';

const Post: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { isDark, posts } = useApp();
    const navigate = useNavigate();

    const post = posts.find(p => p.id === id);

    if (!post) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <p>Post not found.</p>
            </div>
        );
    }

    return (
        <PostDetail
            post={post}
            isDark={isDark}
            onBack={() => navigate('/')}
        />
    );
};

export default Post;
