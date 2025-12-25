
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AuthForm from '../components/features/AuthForm';
import { User } from '../types';

const Signup: React.FC = () => {
    const { isDark, login } = useApp();
    const navigate = useNavigate();

    const handleSignup = (e: React.FormEvent, data: any) => {
        e.preventDefault();

        // Mock Signup Logic
        const isAdmin = data.secretCode === 'ghibli-glow';
        const mockUser: User = {
            username: data.username,
            isAdmin: isAdmin,
        };

        login(mockUser);
        navigate('/');
    };

    return (
        <AuthForm
            type="SIGNUP"
            onSwitch={() => navigate('/login')}
            onSubmit={handleSignup}
            isDark={isDark}
        />
    );
};

export default Signup;
