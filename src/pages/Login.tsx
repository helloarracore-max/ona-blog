
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AuthForm from '../components/features/AuthForm';
import { User } from '../types';

const Login: React.FC = () => {
    const { isDark, login } = useApp();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent, data: any) => {
        e.preventDefault();

        // Mock Login Logic moved here or kept in AppContext but called here
        // Ideally AppContext should just expose a 'login' function that takes credentials
        // But the original code had the logic in App.tsx. 
        // We'll duplicate the simple mock logic here for now or move it to Context later.

        let mockUser: User;
        if (data.username === 'admin' && data.password === 'Admin@1498') {
            mockUser = {
                username: 'Admin',
                isAdmin: true,
                avatar: ''
            }
        } else {
            mockUser = {
                username: data.username,
                isAdmin: false,
                avatar: ''
            };
        }

        login(mockUser);
        navigate('/');
    };

    return (
        <AuthForm
            type="LOGIN"
            onSwitch={() => navigate('/signup')}
            onSubmit={handleLogin}
            isDark={isDark}
        />
    );
};

export default Login;
