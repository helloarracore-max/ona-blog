import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

// Layout
import MainLayout from './components/layout/MainLayout';
import PageTransition from './components/layout/PageTransition';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import Post from './pages/Post';

export default function App() {
    const location = useLocation();

    return (
        <MainLayout>
            <Toaster position="bottom-center" toastOptions={{
                style: {
                    background: '#333',
                    color: '#fff',
                },
            }} />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                    <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
                    <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
                    <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
                    <Route path="/post/:id" element={<PageTransition><Post /></PageTransition>} />
                </Routes>
            </AnimatePresence>
        </MainLayout>
    );
}