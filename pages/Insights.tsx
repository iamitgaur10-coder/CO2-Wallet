import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Input } from '../components/UI';
import { generateInsights } from '../services/gemini';
import { ChatMessage } from '../types';
import { Send, BrainCircuit, Sparkles, User, Loader2 } from 'lucide-react';

interface InsightsProps {
    balanceKg: number;
    historyContext: string;
}

export const Insights: React.FC<InsightsProps> = ({ balanceKg, historyContext }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'welcome',
            role: 'model',
            content: `I'm Gemini 3 Pro. I have analyzed your full emission history.
            
**Current Lifetime Balance:** ${balanceKg > 0 ? '+' : ''}${balanceKg} kg CO₂e.

Ask me to simulate lifestyle scenarios (e.g., "What if I move to Spain and go vegan?") or analyze your spending patterns.`,
            timestamp: Date.now()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;
        
        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsLoading(true);

        const responseText = await generateInsights(
            userMsg.content, 
            `User Balance: ${balanceKg} kg CO2. History Summary: ${historyContext}. Location: San Francisco (Default).`
        );
        
        const modelMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            content: responseText,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, modelMsg]);
        setIsLoading(false);
    };

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col max-w-5xl mx-auto px-4 py-6">
            <header className="mb-6 flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                    <BrainCircuit className="text-white w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Insights & Simulations</h1>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                        Powered by Gemini 3 Pro (1M Context) <Sparkles size={10} className="text-yellow-400" />
                    </p>
                </div>
            </header>

            <Card className="flex-1 flex flex-col overflow-hidden border-white/10 bg-black/40">
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex gap-4 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-white/10' : 'bg-gradient-to-br from-blue-500 to-purple-600'}`}>
                                    {msg.role === 'user' ? <User size={14} /> : <BrainCircuit size={14} className="text-white" />}
                                </div>
                                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                                    msg.role === 'user' 
                                    ? 'bg-white text-black' 
                                    : 'bg-white/5 text-gray-200 border border-white/5 prose prose-invert prose-sm max-w-none'
                                }`}>
                                   {/* Simple markdown rendering for demo */}
                                   <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                             <div className="flex gap-4 max-w-[80%]">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                    <BrainCircuit size={14} className="text-white" />
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                                    <span className="text-xs text-gray-400">Running 100,000 simulations...</span>
                                </div>
                             </div>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-white/10 bg-surface/50 backdrop-blur-md">
                    <div className="relative flex items-center">
                        <Input 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask 'What if I switch to an EV and install solar?'"
                            className="pr-12 h-14 bg-black/50 border-white/10 text-base"
                        />
                        <button 
                            onClick={handleSend}
                            disabled={!inputValue.trim() || isLoading}
                            className="absolute right-2 p-2 bg-white text-black rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
};
