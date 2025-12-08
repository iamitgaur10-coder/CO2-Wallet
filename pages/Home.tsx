import React, { useState, useEffect } from 'react';
import { Button, Card, Badge } from '../components/UI';
import { UserState } from '../types';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Trophy, Receipt, Link as LinkIcon, ExternalLink, Leaf } from 'lucide-react';

interface HomeProps {
    setUserState: (s: UserState) => void;
}

export const Home: React.FC<HomeProps> = ({ setUserState }) => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [counter, setCounter] = useState(14205);

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

  return (
    <div className="overflow-hidden bg-[#0D1117]">
      {/* Hero */}
      <section className="relative pt-32 pb-40 lg:pt-48 lg:pb-56 px-4 sm:px-6">
        
        {/* The "Void" Fix: Subtle Gradient Mesh */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full -z-10 pointer-events-none mix-blend-screen" />
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
        
        {/* Optional Noise Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10 mix-blend-overlay"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-900/10 text-emerald-400 text-xs font-mono font-medium mb-10 animate-fade-in backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                LIVE: {counter.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Tonnes Retired
            </div>

            <h1 className="text-6xl sm:text-8xl font-display font-bold tracking-tight leading-[1.05] text-white mb-8 drop-shadow-2xl">
                Your Wealth is On-Chain.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Your Impact is Real.</span>
            </h1>
            
            {/* Typography Fix: Increased spacing and line-height */}
            <p className="mt-8 text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto leading-[1.7] font-light">
                The first decentralized wallet that lets you offset your <strong>real-world</strong> carbon footprint using Polygon & Toucan Protocol. Verified. Transparent. Immutable.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
                <Button variant="primary" onClick={handleStart} className="h-14 px-8 text-lg w-full sm:w-auto font-bold shadow-[0_0_30px_rgba(16,185,129,0.25)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all duration-300 transform hover:-translate-y-0.5">
                    Start Offsetting
                </Button>
                <Button variant="outline" onClick={handleProof} className="h-14 px-8 text-lg w-full sm:w-auto backdrop-blur-sm hover:bg-white/5">
                    View Proof of Impact
                </Button>
            </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-12 bg-white/[0.02] border-y border-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
              <p className="text-center text-[10px] font-mono text-gray-600 uppercase tracking-[0.3em] mb-8">Trusted Infrastructure</p>
              <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                  {['POLYGON', 'TOUCAN', 'VERRA', 'CHAINLINK'].map(brand => (
                      <span key={brand} className="text-xl md:text-2xl font-display font-bold text-white tracking-tight cursor-default select-none">{brand}</span>
                  ))}
              </div>
          </div>
      </section>

      {/* Value Props */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-emerald-500/20 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Receipt className="text-emerald-500 w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Scan & Track</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                      Upload receipts or connect your bank. Our Advanced AI calculates your exact carbon footprint in seconds.
                  </p>
              </Card>

              <Card className="p-8 border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-emerald-500/20 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <LinkIcon className="text-emerald-500 w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Retire On-Chain</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                      Purchase and burn real BCT & NCT tokens. Receive a permanent NFT certificate of your contribution.
                  </p>
              </Card>

              <Card className="p-8 border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-emerald-500/20 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Trophy className="text-emerald-500 w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Compete & Win</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                      Climb the global leaderboard. Earn 'Earth Saver' badges and showcase your verified impact to the world.
                  </p>
              </Card>
          </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center">
          <div className="max-w-4xl mx-auto p-16 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full -z-0" />
              
              <h2 className="text-4xl font-display font-bold text-white mb-6 relative z-10 tracking-tight">Ready to neutralize your lifestyle?</h2>
              <p className="text-gray-400 mb-10 text-lg relative z-10">Join 14,000+ others taking real climate action on-chain.</p>
              <Button onClick={handleStart} size="lg" className="h-14 px-10 text-lg relative z-10 font-bold shadow-xl shadow-emerald-500/10">
                  Connect Wallet
              </Button>
          </div>
      </section>
    </div>
  );
};