
import React, { useState, useEffect } from 'react';
import { Button, Card, MotionDiv, Input, Accordion, Badge } from '../components/UI';
import { UserState } from '../types';
import { useNavigate } from 'react-router-dom';
import { Receipt, Link as LinkIcon, Trophy, ScanLine, Leaf, ShieldCheck, ArrowRight, Mail, CheckCircle2 } from 'lucide-react';
import { Globe } from '../components/Globe';

interface HomeProps {
    setUserState: (s: UserState) => void;
}

export const Home: React.FC<HomeProps> = ({ setUserState }) => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [counter, setCounter] = useState(14205);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Fake live counter increment
    const interval = setInterval(() => {
        setCounter(prev => prev + (Math.random() > 0.7 ? 0.1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
      setUserState(UserState.ONBOARDING);
      navigate('/onboarding');
  }

  const handleProof = () => {
      setUserState(UserState.DEMO);
      navigate('/dashboard');
  }

  const handleWaitlist = (e: React.FormEvent) => {
      e.preventDefault();
      if(email) setSubscribed(true);
  }

  const faqItems = [
      { title: "Is this secure?", content: "Yes. Moss is non-custodial. We never hold your funds. You interact directly with audited smart contracts on Polygon via Toucan Protocol." },
      { title: "What is BCT?", content: "BCT (Base Carbon Tonne) is a reference token representing one tonne of carbon verified by Verra and bridged on-chain." },
      { title: "Is the offset real?", content: "Absolutely. Every retirement burns the token on-chain, creating an immutable proof that can be traced back to the specific carbon removal project registry." }
  ];

  return (
    <div className="overflow-hidden bg-[#0D1117] relative">
      {/* 1. THE VOID FIX: Deep Moss Green Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-emerald-800/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" />
          <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-teal-900/10 blur-[100px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[600px] bg-emerald-950/20 blur-[150px] rounded-full" />
          {/* Noise texture for "expensive" feel */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Hero */}
      <section className="relative pt-32 pb-40 lg:pt-40 lg:pb-56 px-4 sm:px-6 z-10 flex flex-col items-center">
        
        {/* 3D GLOBE INTEGRATION */}
        <div className="absolute top-0 opacity-20 md:opacity-40 scale-75 md:scale-100 pointer-events-none -z-10">
            <Globe />
        </div>

        <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
        >
            {/* Live Counter Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-900/20 backdrop-blur-md text-emerald-400 text-xs font-mono font-medium mb-10 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                LIVE: {counter.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Tonnes Retired Today—Be Next.
            </div>

            <h1 className="text-6xl sm:text-8xl font-display font-bold tracking-tight leading-[1.05] text-white mb-8 drop-shadow-2xl">
                Your Wealth is On-Chain.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Your Impact is Real.</span>
            </h1>
            
            <p className="mt-10 text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
                The first decentralized wallet that lets you offset your real-world carbon footprint using Polygon & Toucan Protocol. Verified. Transparent. Immutable.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button variant="primary" onClick={handleStart} className="h-14 px-10 text-lg w-full sm:w-auto font-bold shadow-[0_0_30px_rgba(16,185,129,0.25)] hover:shadow-[0_0_50px_rgba(16,185,129,0.4)] transition-all duration-500 transform hover:-translate-y-1">
                    Start Offsetting
                </Button>
                <Button variant="outline" onClick={handleProof} className="h-14 px-10 text-lg w-full sm:w-auto backdrop-blur-md bg-white/[0.02] border-white/10 hover:bg-white/[0.08] transition-all">
                    View Proof of Impact
                </Button>
            </div>
        </MotionDiv>
      </section>

      {/* Trust Banner */}
      <section className="relative py-12 border-y border-white/5 bg-white/[0.01] backdrop-blur-sm z-10">
          <div className="max-w-7xl mx-auto px-6">
              <p className="text-center text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-8">Trusted Infrastructure</p>
              <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                  {['POLYGON', 'TOUCAN', 'VERRA', 'CHAINLINK'].map(brand => (
                      <span key={brand} className="text-xl md:text-2xl font-display font-bold text-white tracking-tight cursor-default select-none hover:text-emerald-400 transition-colors">{brand}</span>
                  ))}
              </div>
          </div>
      </section>

      {/* How It Works (Infographic) */}
      <section className="relative py-32 px-6 max-w-7xl mx-auto z-10">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-400">Carbon neutrality in 3 simple steps.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
             {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 z-0"></div>

            {[
                { icon: ScanLine, title: "1. Scan & Track", text: "Upload receipts or connect your bank. AI calculates your impact." },
                { icon: Leaf, title: "2. Calculate", text: "We convert your activity into exact CO₂ tonnage." },
                { icon: ShieldCheck, title: "3. Retire", text: "Burn BCT tokens on-chain and mint your proof NFT." }
            ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-[#0D1117] border border-emerald-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                        <step.icon size={32} className="text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-400 max-w-xs">{step.text}</p>
                </div>
            ))}
        </div>
      </section>

      {/* NFT Gallery Proof */}
      <section className="relative py-20 bg-white/[0.02] border-y border-white/5">
           <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
               <div>
                   <Badge variant="success" className="mb-4">VERIFIED IMPACT</Badge>
                   <h2 className="text-4xl font-display font-bold text-white mb-6">Proof you can hold.</h2>
                   <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                       Don't just donate and hope. Receive a Soulbound NFT Certificate for every tonne you retire. 
                       Metadata includes Verra serial numbers, project location, and the immutable burn transaction hash.
                   </p>
                   <Button variant="outline" onClick={handleProof}>Explore Collection</Button>
               </div>
               <div className="relative">
                   <div className="absolute inset-0 bg-emerald-500/20 blur-[80px] rounded-full" />
                   {/* Mock NFT Card */}
                   <div className="relative z-10 bg-[#0D1117]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                       <div className="aspect-[4/5] bg-gradient-to-br from-emerald-900 to-black rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
                           <Leaf size={64} className="text-emerald-500" />
                           <div className="absolute bottom-4 left-4 text-xs font-mono text-emerald-400">1.0 TONNE CO2e</div>
                       </div>
                       <div className="flex justify-between items-end">
                           <div>
                               <div className="text-xs text-gray-500 uppercase">Certificate #8492</div>
                               <div className="text-white font-bold">Moss Genesis Offset</div>
                           </div>
                           <Badge variant="neutral">ERC-721</Badge>
                       </div>
                   </div>
               </div>
           </div>
      </section>

      {/* FAQ & Waitlist */}
      <section className="relative py-24 px-6 max-w-4xl mx-auto z-10">
          <h2 className="text-3xl font-display font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
          <Accordion items={faqItems} />

          <div className="mt-24 p-8 md:p-12 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Join 14,000+ Earth Savers</h2>
              <p className="text-gray-400 mb-8">Get early access to our mobile app and Genesis NFT drops.</p>
              
              {!subscribed ? (
                  <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                      <Input 
                        placeholder="Enter your email" 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-black/50 h-12"
                      />
                      <Button className="h-12 px-8">Join Waitlist</Button>
                  </form>
              ) : (
                  <div className="bg-emerald-500/10 text-emerald-400 p-4 rounded-lg inline-flex items-center gap-2">
                      <CheckCircle2 size={18} /> You're on the list! Watch your inbox.
                  </div>
              )}
          </div>
      </section>

      <footer className="py-12 text-center text-gray-600 text-sm">
          <p className="mb-2">Non-custodial: Your keys, your credits. No funds held.</p>
      </footer>
    </div>
  );
};
