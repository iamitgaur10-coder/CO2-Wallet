import React from 'react';
import { Card, Badge, Button } from '../components/UI';
import { CheckCircle2, Shield, Users, Newspaper, Zap, BrainCircuit } from 'lucide-react';

const PageHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="mb-12 text-center">
        <h1 className="text-4xl font-display font-bold mb-4">{title}</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
    </div>
);

export const Product = () => (
    <div className="max-w-6xl mx-auto px-4 py-16 animate-fade-in">
        <PageHeader title="Features & Pricing" subtitle="Everything you need to reach net zero with Moss." />
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
             <Card className="p-6 border-emerald-500/20">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4 text-emerald-500">
                    <Zap />
                </div>
                <h3 className="font-bold text-lg mb-2 text-white">Gemini Vision Scanning</h3>
                <p className="text-gray-400 text-sm">Upload receipts or photos of food. AI extracts the carbon footprint instantly using multimodal analysis.</p>
             </Card>
             <Card className="p-6 border-emerald-500/20">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4 text-emerald-500">
                    <Shield />
                </div>
                <h3 className="font-bold text-lg mb-2 text-white">Verified On-Chain</h3>
                <p className="text-gray-400 text-sm">We don't just "plant trees". We retire actual carbon credits on the Polygon blockchain via Toucan Protocol.</p>
             </Card>
             <Card className="p-6 border-emerald-500/20">
                 <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4 text-emerald-500">
                    <BrainCircuit />
                </div>
                <h3 className="font-bold text-lg mb-2 text-white">AI Simulations</h3>
                <p className="text-gray-400 text-sm">Ask "What if I go vegan?" and get a 10-year projection. Powered by Gemini 3 Pro 1M context.</p>
             </Card>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Simple Pricing</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="p-8 border-white/5">
                    <h3 className="text-xl font-bold mb-2 text-white">Basic</h3>
                    <div className="text-4xl font-display font-bold mb-6 text-white">$0<span className="text-lg text-gray-500 font-sans font-normal">/mo</span></div>
                    <ul className="space-y-4 mb-8 text-gray-400 text-sm">
                        <li className="flex gap-2"><CheckCircle2 size={16} /> Manual tracking</li>
                        <li className="flex gap-2"><CheckCircle2 size={16} /> Pay-as-you-go removal</li>
                        <li className="flex gap-2"><CheckCircle2 size={16} /> Public profile</li>
                    </ul>
                    <Button variant="secondary" className="w-full">Start Free</Button>
                </Card>
                
                <Card className="p-8 border-emerald-500/50 bg-emerald-900/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                    <h3 className="text-xl font-bold mb-2 text-white">Moss Pro</h3>
                    <div className="text-4xl font-display font-bold mb-6 text-white">$9<span className="text-lg text-gray-400 font-sans font-normal">/mo</span></div>
                    <ul className="space-y-4 mb-8 text-gray-300 text-sm">
                        <li className="flex gap-2 text-white"><Shield size={16} className="text-emerald-400" /> Auto-neutralize every purchase</li>
                        <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-400" /> Family Plan (up to 6)</li>
                        <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-400" /> Priority removal allocation</li>
                    </ul>
                    <Button variant="primary" className="w-full">Go Pro</Button>
                </Card>
            </div>
        </div>
    </div>
);

export const About = () => (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
        <PageHeader title="About Moss" subtitle="Building the financial stack for the post-carbon economy." />
        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
                <Users className="w-8 h-8 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-white">Our Mission</h3>
                <p className="text-gray-400">To make carbon removal as easy, transparent, and verified as buying a cup of coffee.</p>
            </Card>
            <Card>
                <Shield className="w-8 h-8 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-white">Non-Custodial</h3>
                <p className="text-gray-400">We never touch your funds. You interact directly with the Polygon blockchain via your own wallet.</p>
            </Card>
        </div>
    </div>
);

export const Careers = () => (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
        <PageHeader title="Join the Mission" subtitle="Help us engineer a cooler planet." />
        <Card className="text-center p-12 border-dashed border-white/10">
            <h3 className="text-xl font-bold mb-4 text-white">No Open Positions</h3>
            <p className="text-gray-400 mb-6">We are currently a lean team. Check back later or follow us on X.</p>
            <Button variant="secondary">Follow Updates</Button>
        </Card>
    </div>
);

export const Privacy = () => (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in prose prose-invert">
        <h1 className="text-3xl font-bold mb-8 text-white">Privacy Policy</h1>
        <Card className="p-8">
            <h3 className="text-lg font-bold mb-2 text-white">1. Data Collection</h3>
            <p className="text-gray-400 mb-4">We collect transaction data solely for the purpose of calculating carbon emissions. We do not sell your data.</p>
            <h3 className="text-lg font-bold mb-2 text-white">2. Gemini AI Processing</h3>
            <p className="text-gray-400">Receipts uploaded are processed by Google Gemini. Images are not stored permanently after analysis.</p>
        </Card>
    </div>
);

export const Terms = () => (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
        <h1 className="text-3xl font-bold mb-8 text-white">Terms of Service</h1>
        <Card className="p-8">
            <p className="text-gray-400">By using Moss, you agree that carbon estimates are approximations based on IPCC data.</p>
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
                        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-emerald-400 transition-colors">How we use Gemini 3 Pro to track carbon</h3>
                        <p className="text-gray-400 text-sm">A deep dive into our multimodal architecture and receipt scanning pipeline.</p>
                    </div>
                </Card>
            ))}
        </div>
    </div>
);