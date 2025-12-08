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
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-24 pb-32 lg:pt-40 lg:pb-48 px-4 sm:px-6">
        {/* Abstract Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 blur-[100px] rounded-full -z-10" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-blue-500/5 blur-[80px] rounded-full -z-10" />
        
        <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium mb-8 animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                LIVE: {counter.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Tonnes Retired
            </div>

            <h1 className="text-5xl sm:text-7xl font-display font-bold tracking-tight leading-[1.1] text-white mb-6">
                Your Wealth is On-Chain.<br />
                <span className="text-emerald-400">Your Impact is Real.</span>
            </h1>
            
            <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                The first decentralized wallet that lets you offset your real-world carbon footprint using Polygon & Toucan Protocol. Verified. Transparent. Immutable.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="primary" onClick={handleStart} className="h-14 px-8 text-lg w-full sm:w-auto font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    Start Offsetting
                </Button>
                <Button variant="outline" onClick={handleProof} className="h-14 px-8 text-lg w-full sm:w-auto">
                    View Proof of Impact
                </Button>
            </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-12 bg-white/5 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
              <p className="text-center text-xs font-mono text-gray-500 uppercase tracking-[0.2em] mb-8">Trusted Infrastructure</p>
              <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                  {['POLYGON', 'TOUCAN', 'VERRA', 'CHAINLINK'].map(brand => (
                      <span key={brand} className="text-xl md:text-2xl font-display font-bold text-white tracking-tight cursor-default">{brand}</span>
                  ))}
              </div>
          </div>
      </section>

      {/* Value Props */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 border-white/10 hover:border-emerald-500/30 transition-all group">
                  <div className="w-14 h-14 bg-surface rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Receipt className="text-emerald-500 w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Scan & Track</h3>
                  <p className="text-gray-400 leading-relaxed">
                      Upload receipts or connect your bank. Our Advanced AI calculates your exact carbon footprint in seconds.
                  </p>
              </Card>

              <Card className="p-8 border-white/10 hover:border-emerald-500/30 transition-all group">
                  <div className="w-14 h-14 bg-surface rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <LinkIcon className="text-emerald-500 w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Retire On-Chain</h3>
                  <p className="text-gray-400 leading-relaxed">
                      Purchase and burn real BCT & NCT tokens. Receive a permanent NFT certificate of your contribution.
                  </p>
              </Card>

              <Card className="p-8 border-white/10 hover:border-emerald-500/30 transition-all group">
                  <div className="w-14 h-14 bg-surface rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Trophy className="text-emerald-500 w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Compete & Win</h3>
                  <p className="text-gray-400 leading-relaxed">
                      Climb the global leaderboard. Earn 'Earth Saver' badges and showcase your verified impact to the world.
                  </p>
              </Card>
          </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center">
          <div className="max-w-3xl mx-auto p-12 rounded-2xl bg-gradient-to-br from-surface to-surface-hover border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full -z-0" />
              
              <h2 className="text-3xl font-display font-bold text-white mb-6 relative z-10">Ready to neutralize your lifestyle?</h2>
              <p className="text-gray-400 mb-8 relative z-10">Join 14,000+ others taking real climate action on-chain.</p>
              <Button onClick={handleStart} size="lg" className="h-14 px-10 text-lg relative z-10">
                  Connect Wallet
              </Button>
          </div>
      </section>
    </div>
  );
};