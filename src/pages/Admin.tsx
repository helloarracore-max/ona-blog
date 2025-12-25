
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AdminPanel from '../components/features/AdminPanel';
import { BlogPost } from '../types';

const Admin: React.FC = () => {
    const { isDark, addPost, user } = useApp();
    const navigate = useNavigate();

    // Route protection
    React.useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/');
        }
    }, [user, navigate]);

    const handlePublishPost = (postData: any) => {
        const newPost: BlogPost = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            likes: 0,
            ...postData
        };
        addPost(newPost);
        navigate('/');
    };

    if (!user || !user.isAdmin) return null;

    return (
        <AdminPanel isDark={isDark} onPublish={handlePublishPost} />
    );
};

export default Admin;
