import React from 'react';
import { Card, Badge, Button } from '../components/UI';
import { CheckCircle2, Shield, Users, Newspaper } from 'lucide-react';

const PageHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="mb-12 text-center">
        <h1 className="text-4xl font-display font-bold mb-4">{title}</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
    </div>
);

export const About = () => (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
        <PageHeader title="About CO₂ Wallet" subtitle="Building the financial stack for the post-carbon economy." />
        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
                <Users className="w-8 h-8 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                <p className="text-gray-400">To make carbon removal as easy, transparent, and verified as buying a cup of coffee.</p>
            </Card>
            <Card>
                <Shield className="w-8 h-8 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Our Trust</h3>
                <p className="text-gray-400">We rely on code, not promises. Every ton removed is verified on-chain via Toucan Protocol.</p>
            </Card>
        </div>
    </div>
);

export const Careers = () => (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
        <PageHeader title="Join the Mission" subtitle="Help us engineer a cooler planet." />
        <Card className="text-center p-12 border-dashed">
            <h3 className="text-xl font-bold mb-4">No Open Positions</h3>
            <p className="text-gray-400 mb-6">We are currently a lean team. Check back later or follow us on X.</p>
            <Button variant="secondary">Follow Updates</Button>
        </Card>
    </div>
);

export const Privacy = () => (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in prose prose-invert">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <Card className="p-8">
            <h3 className="text-lg font-bold mb-2">1. Data Collection</h3>
            <p className="text-gray-400 mb-4">We collect transaction data solely for the purpose of calculating carbon emissions. We do not sell your data.</p>
            <h3 className="text-lg font-bold mb-2">2. Gemini AI Processing</h3>
            <p className="text-gray-400">Receipts uploaded are processed by Google Gemini. Images are not stored permanently after analysis.</p>
        </Card>
    </div>
);

export const Terms = () => (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <Card className="p-8">
            <p className="text-gray-400">By using CO₂ Wallet, you agree that carbon estimates are approximations based on IPCC data.</p>
        </Card>
    </div>
);

export const Blog = () => (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
        <PageHeader title="The Ledger" subtitle="Updates on climate tech and programmable carbon." />
        <div className="grid gap-6">
            {[1, 2, 3].map(i => (
                <Card key={i} className="flex flex-col md:flex-row gap-6 p-6 hover:border-emerald-500/30 transition-colors cursor-pointer group">
                    <div className="w-full md:w-48 h-32 bg-white/5 rounded-lg flex items-center justify-center">
                        <Newspaper className="text-gray-600 group-hover:text-emerald-500 transition-colors" />
                    </div>
                    <div>
                        <div className="text-emerald-500 text-xs font-bold mb-2 uppercase tracking-wider">Engineering</div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">How we use Gemini 3 Pro to track carbon</h3>
                        <p className="text-gray-400 text-sm">A deep dive into our multimodal architecture and receipt scanning pipeline.</p>
                    </div>
                </Card>
            ))}
        </div>
    </div>
);