
import React from 'react';
import { Card, Badge } from '../components/UI';
import { CheckCircle2 } from 'lucide-react';

export const Science: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
            <h1 className="text-4xl font-display font-bold mb-6">Methodology</h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl">
                We believe in radical transparency. Here is exactly how we calculate, verify, and retire carbon credits.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <Card>
                    <h3 className="text-xl font-bold mb-4 text-white">1. Calculation</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        We use the <strong>IPCC 2024 Emissions Factors</strong> database combined with Gemini 3 Pro's multimodal analysis.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Image recognition for receipts</li>
                        <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> GPS-based transport estimation</li>
                        <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Real-time grid intensity data</li>
                    </ul>
                </Card>
                <Card>
                    <h3 className="text-xl font-bold mb-4 text-white">2. Verification</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        Every removal is backed by an on-chain asset on the <strong>Polygon Network</strong>.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Toucan Protocol (NCT/BCT)</li>
                        <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Public Transaction Hashes</li>
                        <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Double-spend protection</li>
                    </ul>
                </Card>
            </div>

            <h2 className="text-2xl font-bold mb-8">Removal Partners</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Climeworks', 'Running Tide', 'Charm Industrial', 'Pachama'].map(p => (
                    <div key={p} className="h-24 bg-surface rounded-lg border border-white/5 flex items-center justify-center font-bold text-gray-500">
                        {p}
                    </div>
                ))}
            </div>
        </div>
    );
};
