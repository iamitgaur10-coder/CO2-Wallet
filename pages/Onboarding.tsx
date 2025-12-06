import React, { useState, useEffect } from 'react';
import { Button, Card, Badge } from '../components/UI';
import { generateOnboardingQuiz } from '../services/gemini';
import { UserState } from '../types';
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowRight, Check } from 'lucide-react';

interface Question {
    id: string;
    question: string;
    options: { label: string; valueKg: number }[];
}

interface OnboardingProps {
    setUserState: (s: UserState) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ setUserState }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0); // 0: Loading, 1: Quiz, 2: Analyzing, 3: Result/Gift
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<number[]>([]);
    const [totalKg, setTotalKg] = useState(0);

    useEffect(() => {
        const loadQuiz = async () => {
            const quizJson = await generateOnboardingQuiz();
            try {
                const parsed = JSON.parse(quizJson);
                setQuestions(parsed);
                setStep(1);
            } catch (e) {
                console.error("Failed to parse quiz", e);
                // In production, handle graceful failure
                setStep(1); 
            }
        };
        loadQuiz();
    }, []);

    const handleAnswer = (valueKg: number) => {
        const newAnswers = [...answers, valueKg];
        setAnswers(newAnswers);
        
        if (newAnswers.length < questions.length) {
            // next question
        } else {
            // finish
            setStep(2);
            const total = newAnswers.reduce((a, b) => a + b, 0);
            setTotalKg(total);
            setTimeout(() => setStep(3), 2000); // Simulate analysis
        }
    };

    const handleComplete = () => {
        setUserState(UserState.AUTHENTICATED);
        navigate('/dashboard');
    }

    if (step === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center">
                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
                <h2 className="text-xl font-medium">Gemini 3 Pro is analyzing your locale...</h2>
            </div>
        )
    }

    if (step === 1) {
        const currentQ = questions[answers.length];
        if (!currentQ) return null;

        return (
            <Card className="max-w-lg w-full p-8 animate-slide-up border-emerald-500/20">
                <div className="flex justify-between items-center mb-8">
                    <span className="text-xs font-mono text-emerald-500">STEP {answers.length + 1}/{questions.length}</span>
                    <Badge variant="neutral">AI Generated</Badge>
                </div>
                
                <h2 className="text-2xl font-display font-bold mb-8 leading-snug">{currentQ.question}</h2>
                
                <div className="space-y-3">
                    {currentQ.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(opt.valueKg)}
                            className="w-full text-left p-4 rounded-lg bg-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/50 border border-transparent transition-all flex justify-between group"
                        >
                            <span className="text-gray-300 group-hover:text-white">{opt.label}</span>
                            <ArrowRight className="opacity-0 group-hover:opacity-100 text-emerald-500 transition-opacity" size={18} />
                        </button>
                    ))}
                </div>
            </Card>
        );
    }

    if (step === 2) {
        return (
            <div className="flex flex-col items-center justify-center text-center max-w-md animate-fade-in">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                    <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Calculating Lifetime Balance</h2>
                <p className="text-gray-400">Comparing against 42,000 community members...</p>
            </div>
        )
    }

    if (step === 3) {
        return (
            <Card className="max-w-lg w-full p-8 text-center animate-slide-up border-emerald-500/30">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <Check className="text-black w-10 h-10" strokeWidth={3} />
                </div>
                <h2 className="text-3xl font-display font-bold mb-2">Est. {totalKg.toLocaleString()} kg / year</h2>
                <p className="text-gray-400 mb-8">Your initial footprint has been baselined.</p>
                
                <div className="bg-white/5 rounded-xl p-4 mb-8 text-left border border-white/5">
                    <div className="text-xs text-gray-500 uppercase mb-2">Welcome Gift</div>
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">1st Removal Credit</span>
                        <span className="text-emerald-400 font-mono font-bold">$20.00</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Enough to neutralize your first 2 weeks.</p>
                </div>

                <Button onClick={handleComplete} className="w-full h-12 text-lg shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    Enter Dashboard
                </Button>
            </Card>
        )
    }

    return null;
}
