import React from 'react';
import { Card, Button, Input } from '../components/UI';
import { UserState } from '../types';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface LoginProps {
    setUserState: (s: UserState) => void;
}

export const Login: React.FC<LoginProps> = ({ setUserState }) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Simulate login success
        setUserState(UserState.AUTHENTICATED);
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in relative overflow-hidden bg-[#0D1117]">
             {/* Background elements to match Home */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[100px] rounded-full -z-10" />

            <div className="mb-8 cursor-pointer" onClick={() => navigate('/')}>
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                        <span className="text-black font-bold text-lg">C</span>
                    </div>
                    <span className="font-display font-bold text-xl tracking-tight text-white">CO₂ Wallet</span>
                  </div>
            </div>

            <Card className="w-full max-w-md p-8 border-white/10 bg-surface/50">
                <h1 className="text-2xl font-bold text-center mb-2 text-white">Welcome back</h1>
                <p className="text-center text-gray-400 mb-8 text-sm">Enter your email to sign in to your account</p>

                <div className="space-y-4">
                    <div>
                        <Input placeholder="name@example.com" type="email" className="h-11" />
                    </div>
                    <Button onClick={handleLogin} className="w-full h-11 text-base">
                        Sign In with Email
                    </Button>
                    
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#161B22] px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="secondary" onClick={handleLogin} className="w-full">
                           Google
                        </Button>
                        <Button variant="secondary" onClick={handleLogin} className="w-full">
                           Apple
                        </Button>
                    </div>
                </div>

                <div className="mt-8 text-center text-sm">
                    <span className="text-gray-500">Don't have an account? </span>
                    <button onClick={() => navigate('/onboarding')} className="text-emerald-400 hover:underline">Sign up</button>
                </div>
            </Card>
            
            <button onClick={() => navigate('/')} className="mt-8 flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
                <ArrowLeft size={16} />
                Back to Home
            </button>
        </div>
    );
};