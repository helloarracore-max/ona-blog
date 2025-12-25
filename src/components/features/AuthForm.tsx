import React, { useState } from 'react';

interface AuthFormProps {
    type: 'LOGIN' | 'SIGNUP';
    onSwitch: () => void;
    onSubmit: (e: React.FormEvent, data: any) => void;
    isDark: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSwitch, onSubmit, isDark }) => {
    const [formData, setFormData] = useState({ username: '', password: '', secretCode: '' });

    return (
        <div className="min-h-screen flex items-center justify-center pt-20 pb-20 px-6">
            <div className={`w-full max-w-md p-8 rounded-3xl border shadow-2xl relative overflow-hidden ${isDark ? 'bg-neutral-900/90 border-white/10' : 'bg-white border-black/5'}`}>
                {/* Decorative Blob */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-fuchsia-500/20 blur-3xl rounded-full"></div>

                <h2 className={`text-3xl font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{type === 'LOGIN' ? 'Welcome Back' : 'Join the Crew'}</h2>
                <p className={`text-sm mb-8 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>Enter your details to access the Glow-Log.</p>

                <form onSubmit={(e) => onSubmit(e, formData)} className="flex flex-col gap-4">
                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1 block">Username</label>
                        <input
                            type="text"
                            className={`w-full h-12 rounded-xl px-4 outline-none border transition-all focus:border-fuchsia-500 ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-neutral-50 border-neutral-200 text-black'}`}
                            value={formData.username}
                            onChange={e => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1 block">Password</label>
                        <input
                            type="password"
                            className={`w-full h-12 rounded-xl px-4 outline-none border transition-all focus:border-fuchsia-500 ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-neutral-50 border-neutral-200 text-black'}`}
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    {type === 'SIGNUP' && (
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1 block">Admin Secret (Optional)</label>
                            <input
                                type="text"
                                placeholder="For writing access"
                                className={`w-full h-12 rounded-xl px-4 outline-none border transition-all focus:border-fuchsia-500 ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-neutral-50 border-neutral-200 text-black'}`}
                                value={formData.secretCode}
                                onChange={e => setFormData({ ...formData, secretCode: e.target.value })}
                            />
                        </div>
                    )}

                    <button className="h-12 bg-fuchsia-500 hover:bg-fuchsia-400 text-white rounded-xl font-bold mt-4 transition-colors">
                        {type === 'LOGIN' ? 'Log In' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button onClick={onSwitch} className="text-sm text-neutral-500 hover:text-fuchsia-500 transition-colors">
                        {type === 'LOGIN' ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                    </button>
                </div>

                {/* Hint for demo purposes */}
                <div className="mt-8 p-4 rounded-lg bg-neutral-800/50 border border-neutral-700 text-xs text-neutral-400">
                    <p className="font-bold mb-1">Demo Admin Credentials:</p>
                    <p>User: <span className="font-mono text-fuchsia-400">admin</span></p>
                    <p>Pass: <span className="font-mono text-fuchsia-400">Admin@1498</span></p>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;
