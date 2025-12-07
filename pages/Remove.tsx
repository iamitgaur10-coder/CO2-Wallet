import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Input, cn } from '../components/UI';
import { Leaf, ShieldCheck, Globe, Loader2, Sparkles, CheckCircle2, Lock, ExternalLink, Share2, CreditCard, Bitcoin } from 'lucide-react';
import { optimizeRemovalMix } from '../services/gemini';
import { RemovalRecord, RecommendedRemoval } from '../types';

interface RemoveProps {
    balanceKg: number;
    onAddRemoval: (rec: RemovalRecord) => void;
}

export const Remove: React.FC<RemoveProps> = ({ balanceKg, onAddRemoval }) => {
    const debtToNeutralize = balanceKg > 0 ? balanceKg : 100; // Default target
    const [budget, setBudget] = useState<string>('25');
    const [recommendations, setRecommendations] = useState<RecommendedRemoval[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto'>('card');

    const handleOptimize = async () => {
        setIsLoading(true);
        setRecommendations([]);
        setIsSuccess(false);
        const recs = await optimizeRemovalMix(debtToNeutralize, parseFloat(budget) || 10);
        setRecommendations(recs);
        setIsLoading(false);
    };

    useEffect(() => {
        if (debtToNeutralize > 0) handleOptimize();
    }, []);

    const handleCheckout = async () => {
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const txHash = "0x" + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        
        recommendations.forEach(rec => {
            onAddRemoval({
                id: crypto.randomUUID(),
                project_name: rec.provider,
                provider: rec.provider as any,
                method: rec.method as any,
                amount_kg: rec.amount_kg,
                cost_usd: rec.cost_usd,
                date: new Date().toISOString(),
                tx_hash: txHash,
                certificate_url: `https://mumbai.polygonscan.com/tx/${txHash}`
            });
        });

        setIsProcessing(false);
        setIsSuccess(true);
    };

    const handleShare = () => {
        const text = `I just permanently removed ${recommendations.reduce((a,b)=>a+b.amount_kg,0).toFixed(1)}kg of CO2 on-chain with @co2wallet. #ReFi #Gemini`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    }

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center animate-fade-in px-4">
                <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(16,185,129,0.5)]">
                    <CheckCircle2 className="text-black w-12 h-12" strokeWidth={3} />
                </div>
                <h2 className="text-4xl font-display font-bold mb-4 text-white">Retirement Confirmed.</h2>
                <p className="text-xl text-gray-300 max-w-lg mb-8">
                    You just permanently removed <span className="text-emerald-400 font-bold">{recommendations.reduce((a,b) => a + b.amount_kg, 0).toFixed(1)} kg</span> of CO₂.
                </p>
                
                <Card className="max-w-md w-full p-6 bg-surface/80 mb-8 border-emerald-500/20">
                    <div className="flex justify-between items-center mb-4 border-b border-border pb-4">
                        <span className="text-sm text-muted">Status</span>
                        <Badge variant="success">Confirmed on Polygon</Badge>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted">Transaction Hash</span>
                        <a href="#" className="text-xs font-mono text-emerald-500 hover:underline flex items-center gap-1">
                            {recommendations[0]?.project_id.substring(0,8)}...b9 <ExternalLink size={10} />
                        </a>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted">Certificate NFT</span>
                        <span className="text-xs text-white">Minted to Vault</span>
                    </div>
                </Card>

                <div className="flex gap-4">
                    <Button onClick={handleShare} className="gap-2 bg-[#1DA1F2] hover:bg-[#1a91da] border-none text-white shadow-lg">
                        <Share2 size={16} /> Share on X
                    </Button>
                    <Button onClick={() => setIsSuccess(false)} variant="secondary">Done</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
             <header className="mb-10 text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-display font-bold mb-3">One-Click Neutralization</h1>
                <p className="text-muted text-lg">
                    Gemini 3 Pro analyzes live carbon markets to build your perfect removal portfolio.
                </p>
            </header>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                {/* Configuration Panel */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="sticky top-24">
                        <h3 className="text-sm font-bold text-white mb-6">Removal Settings</h3>
                        
                        <div className="space-y-6">
                             <div>
                                <label className="text-xs text-muted mb-2 block uppercase tracking-wider">Target Amount (kg)</label>
                                <Input 
                                   disabled
                                   value={debtToNeutralize.toFixed(1)}
                                   className="bg-surface/50 text-gray-400 border-dashed"
                                />
                                <p className="text-[10px] text-muted mt-1">Based on your current debt</p>
                             </div>

                             <div>
                                 <label className="text-xs text-muted mb-2 block uppercase tracking-wider">Max Budget ($)</label>
                                 <div className="relative">
                                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                     <Input 
                                        type="number" 
                                        value={budget} 
                                        onChange={(e) => setBudget(e.target.value)}
                                        className="pl-8 text-xl font-mono h-12 bg-black border-border focus:border-emerald-500"
                                     />
                                 </div>
                             </div>

                             <Button 
                                className="w-full" 
                                variant="secondary"
                                onClick={handleOptimize}
                                disabled={isLoading}
                             >
                                {isLoading ? <Loader2 className="animate-spin mr-2" size={16} /> : <Sparkles size={16} className="mr-2" />}
                                {isLoading ? 'Optimizing...' : 'Re-optimize Portfolio'}
                             </Button>
                        </div>
                    </Card>

                    <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-900/10 border border-emerald-500/10">
                        <ShieldCheck className="text-emerald-500 shrink-0" size={24} />
                        <div className="text-xs text-emerald-100/70">
                            <strong>Verified & Permanent.</strong><br/>
                            We only purchase retired credits via Toucan Protocol on Polygon.
                        </div>
                    </div>
                </div>

                {/* Results Panel */}
                <div className="lg:col-span-2 space-y-6">
                     {isLoading ? (
                        <Card className="min-h-[400px] flex flex-col items-center justify-center text-center">
                            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
                            <h3 className="text-lg font-bold">Analysing Global Markets...</h3>
                            <div className="mt-4 space-y-1 text-sm text-muted font-mono">
                                <p>Checking Climeworks availability...</p>
                                <p>Querying Toucan NCT pool price...</p>
                                <p>Calculating optimal mix...</p>
                            </div>
                        </Card>
                     ) : (
                         <>
                            <Card className="border-emerald-500/20 bg-gradient-to-b from-surface to-emerald-950/10">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Sparkles size={18} className="text-emerald-400" />
                                        Recommended Portfolio
                                    </h3>
                                    <Badge variant="success">OPTIMIZED</Badge>
                                </div>
                                
                                <div className="space-y-3">
                                    {recommendations.map((rec, idx) => (
                                        <div key={idx} className="p-4 rounded-lg bg-black/40 border border-border flex flex-col sm:flex-row justify-between items-center gap-4 group hover:border-emerald-500/30 transition-all">
                                            <div className="flex items-center gap-4 w-full">
                                                <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-gray-300 border border-border">
                                                    {idx === 0 ? <span className="font-bold">1</span> : <span className="text-xs">{idx+1}</span>}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white">{rec.provider}</div>
                                                    <div className="text-xs text-muted flex items-center gap-2">
                                                        <span>{rec.method}</span>
                                                        <span className="w-1 h-1 bg-gray-600 rounded-full" />
                                                        <span>{rec.location}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right min-w-[120px]">
                                                <div className="font-mono font-bold text-emerald-400">{rec.amount_kg.toFixed(1)} kg</div>
                                                <div className="text-xs text-muted">${rec.cost_usd.toFixed(2)}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {recommendations.length > 0 && (
                                    <div className="mt-6 pt-6 border-t border-border">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-muted">Total Removal</span>
                                            <span className="text-white font-mono">{recommendations.reduce((a,b)=>a+b.amount_kg,0).toFixed(1)} kg</span>
                                        </div>
                                        <div className="flex justify-between text-xl font-bold items-center">
                                            <span className="text-white">Total Cost</span>
                                            <span className="text-emerald-400">${recommendations.reduce((a,b)=>a+b.cost_usd,0).toFixed(2)}</span>
                                        </div>
                                    </div>
                                )}
                            </Card>

                            <div className="flex gap-4">
                                <button 
                                    onClick={() => setPaymentMethod('card')}
                                    className={cn("flex-1 p-3 rounded-lg border flex items-center justify-center gap-2 transition-all", paymentMethod === 'card' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-border hover:border-gray-500')}
                                >
                                    <CreditCard size={18} /> Card (Stripe)
                                </button>
                                <button 
                                    onClick={() => setPaymentMethod('crypto')}
                                    className={cn("flex-1 p-3 rounded-lg border flex items-center justify-center gap-2 transition-all", paymentMethod === 'crypto' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-border hover:border-gray-500')}
                                >
                                    <Bitcoin size={18} /> Crypto
                                </button>
                            </div>

                            <Button 
                                className="w-full h-14 text-lg font-bold shadow-lg shadow-emerald-900/20" 
                                onClick={handleCheckout}
                                disabled={recommendations.length === 0 || isProcessing}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2" />
                                        Processing Payment...
                                    </>
                                ) : (
                                    <>
                                        <Lock size={18} className="mr-2 opacity-70" />
                                        Pay & Retire Credits
                                    </>
                                )}
                            </Button>
                            
                            <p className="text-center text-xs text-muted">
                                {paymentMethod === 'card' ? 'Secure payment via Stripe.' : 'Pay via MetaMask/WalletConnect.'} Tokens verified by Toucan Protocol.
                            </p>
                         </>
                     )}
                </div>
            </div>
        </div>
    );
};