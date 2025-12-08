import React, { useState } from 'react';
import { Card, Button, Input, Progress, Badge } from '../components/UI';
import { ReceiptUploader } from '../components/ReceiptUploader';
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowRight, Plane, Car, Home, Check } from 'lucide-react';

export const Calculator: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    
    // Form State
    const [flights, setFlights] = useState('');
    const [commute, setCommute] = useState('');
    const [meat, setMeat] = useState('');
    
    // Result State
    const [result, setResult] = useState<number | null>(null);

    const handleCalculate = async () => {
        setLoading(true);
        // Simulate AI Calculation delay
        await new Promise(r => setTimeout(r, 2000));
        
        // Simple logic simulation (Replace with real Gemini API call later)
        const flightScore = (parseInt(flights) || 0) * 0.8;
        const commuteScore = commute === 'Car' ? 2.4 : 0.5;
        const meatScore = meat === 'Daily' ? 1.5 : 0.5;
        
        setResult(flightScore + commuteScore + meatScore + 2); // +2 baseline
        setLoading(false);
        setStep(3);
    };

    const handleReceipt = (data: any) => {
        // Handle receipt upload logic
        setResult(data.total_kg / 1000); // Convert kg to tonnes
        setStep(3);
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] pt-32 px-4 pb-20">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-display font-bold text-white mb-2">AI Carbon Calculator</h1>
                    <p className="text-gray-400">Estimate your annual footprint in seconds.</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                        <span>INPUT</span>
                        <span>ANALYSIS</span>
                        <span>RESULT</span>
                    </div>
                    <Progress value={step === 1 ? 33 : step === 2 ? 66 : 100} className="h-1" />
                </div>

                {step === 1 && (
                    <div className="space-y-6 animate-fade-in">
                        <Card className="p-8 border-white/10">
                            <h3 className="text-lg font-bold text-white mb-6">Option A: Quick Quiz</h3>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm text-gray-400 block mb-2">How many flights per year?</label>
                                    <div className="relative">
                                        <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                        <Input 
                                            type="number" 
                                            placeholder="e.g. 4" 
                                            className="pl-10"
                                            value={flights}
                                            onChange={e => setFlights(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400 block mb-2">Primary Commute?</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['Car', 'Public', 'Bike', 'Remote'].map(opt => (
                                            <button 
                                                key={opt}
                                                onClick={() => setCommute(opt)}
                                                className={`p-3 rounded-lg border text-sm transition-all ${commute === opt ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'}`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400 block mb-2">Dietary Habits?</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['Daily Meat', 'Flexitarian', 'Vegetarian', 'Vegan'].map(opt => (
                                            <button 
                                                key={opt}
                                                onClick={() => setMeat(opt)}
                                                className={`p-3 rounded-lg border text-sm transition-all ${meat === opt ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'}`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <Button 
                                    className="w-full h-12" 
                                    onClick={handleCalculate}
                                    disabled={!commute || !meat}
                                >
                                    Calculate Footprint <ArrowRight className="ml-2" size={16} />
                                </Button>
                            </div>
                        </Card>

                        <div className="relative flex items-center py-4">
                            <div className="flex-grow border-t border-white/10"></div>
                            <span className="flex-shrink-0 mx-4 text-gray-600 text-xs uppercase tracking-wider">OR</span>
                            <div className="flex-grow border-t border-white/10"></div>
                        </div>

                        <Card className="p-8 border-white/10">
                             <h3 className="text-lg font-bold text-white mb-6">Option B: Scan Receipt</h3>
                             <ReceiptUploader onAnalysisComplete={handleReceipt} />
                        </Card>
                    </div>
                )}

                {step === 2 && loading && (
                    <div className="text-center py-20 animate-fade-in">
                        <Loader2 className="w-16 h-16 text-emerald-500 animate-spin mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-white mb-2">Analyzing Lifestyle Data...</h2>
                        <p className="text-gray-400">Consulting Gemini 3 Pro models and IPCC databases.</p>
                    </div>
                )}

                {step === 3 && result && (
                    <div className="animate-slide-up">
                        <Card className="p-10 border-emerald-500/30 bg-emerald-900/10 text-center mb-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2">
                                <Badge variant="warning">Estimate</Badge>
                            </div>
                            <h2 className="text-gray-400 mb-2 uppercase tracking-widest text-xs">Annual Carbon Footprint</h2>
                            <div className="text-6xl font-display font-bold text-white mb-4">
                                {result.toFixed(1)} <span className="text-2xl text-emerald-500">Tonnes</span>
                            </div>
                            <p className="text-gray-300 max-w-sm mx-auto mb-8">
                                That's equivalent to taking <strong>{Math.round(result * 1.2)}</strong> round-trip flights from London to New York.
                            </p>
                            <Button className="h-14 px-10 text-lg shadow-lg shadow-emerald-500/20" onClick={() => navigate('/remove')}>
                                Offset Now for ~${(result * 15).toFixed(0)} <ArrowRight className="ml-2" />
                            </Button>
                        </Card>
                        
                        <div className="text-center">
                            <button onClick={() => setStep(1)} className="text-gray-500 hover:text-white text-sm underline">Start Over</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};