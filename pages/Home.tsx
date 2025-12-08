import React, { useState, useEffect } from 'react';
import { Button, Card, MotionDiv } from '../components/UI';
import { UserState } from '../types';
import { useNavigate } from 'react-router-dom';
import { Receipt, Link as LinkIcon, Trophy } from 'lucide-react';
import { Globe } from '../components/Globe';

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
      // Logic handled by Layout Connect Button now, but keeping for CTA
      // Triggers wallet modal in App context ideally, but here just directs to Onboarding
      setUserState(UserState.ONBOARDING);
      navigate('/onboarding');
  }

  const handleProof = () => {
      setUserState(UserState.DEMO);
      navigate('/dashboard');
  }

  return (
    <div className="overflow-hidden bg-[#0D1117] relative">
      {/* 1. THE VOID FIX: Multi-layered Gradient Mesh with Noise */}
      <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-emerald-500/15 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" />
          <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[600px] bg-emerald-900/10 blur-[150px] rounded-full" />
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
                LIVE: {counter.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Tonnes Retired
            </div>

            <h1 className="text-6xl sm:text-8xl font-display font-bold tracking-tight leading-[1.05] text-white mb-8 drop-shadow-2xl">
                Your Wealth is On-Chain.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Your Impact is Real.</span>
            </h1>
            
            <p className="mt-10 text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
                The first decentralized wallet that lets you offset your <strong>real-world</strong> lifestyle using Polygon & Toucan Protocol. Verified. Transparent. Immutable.
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

      {/* Value Props */}
      <section className="relative py-32 px-6 max-w-7xl mx-auto z-10">
          <div className="grid md:grid-cols-3 gap-8">
              <MotionDiv 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                  <Card className="p-8 border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent hover:border-emerald-500/30 transition-all duration-500 group relative overflow-hidden h-full">
                      <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="w-14 h-14 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-emerald-500/30 transition-all duration-500 shadow-lg relative z-10">
                          <Receipt className="text-emerald-500 w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 relative z-10">Scan & Track</h3>
                      <p className="text-gray-400 leading-relaxed text-sm relative z-10">
                          Upload receipts or connect your bank. Our Advanced AI calculates your exact carbon footprint in seconds.
                      </p>
                  </Card>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                  <Card className="p-8 border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent hover:border-emerald-500/30 transition-all duration-500 group relative overflow-hidden h-full">
                      <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="w-14 h-14 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-emerald-500/30 transition-all duration-500 shadow-lg relative z-10">
                          <LinkIcon className="text-emerald-500 w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 relative z-10">Retire On-Chain</h3>
                      <p className="text-gray-400 leading-relaxed text-sm relative z-10">
                          Purchase and burn real BCT & NCT tokens. Receive a permanent NFT certificate of your contribution.
                      </p>
                  </Card>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                  <Card className="p-8 border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent hover:border-emerald-500/30 transition-all duration-500 group relative overflow-hidden h-full">
                      <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="w-14 h-14 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-emerald-500/30 transition-all duration-500 shadow-lg relative z-10">
                          <Trophy className="text-emerald-500 w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 relative z-10">Compete & Win</h3>
                      <p className="text-gray-400 leading-relaxed text-sm relative z-10">
                          Climb the global leaderboard. Earn 'Earth Saver' badges and showcase your verified impact to the world.
                      </p>
                  </Card>
              </MotionDiv>
          </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 px-6 text-center z-10">
          <MotionDiv 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto p-16 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 relative overflow-hidden group"
          >
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full -z-0 group-hover:bg-emerald-500/20 transition-all duration-1000" />
              
              <h2 className="text-4xl font-display font-bold text-white mb-6 relative z-10 tracking-tight">Ready to neutralize your lifestyle?</h2>
              <p className="text-gray-400 mb-10 text-lg relative z-10">Join 14,000+ others taking real climate action on-chain.</p>
              <Button onClick={handleStart} size="lg" className="h-14 px-10 text-lg relative z-10 font-bold shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/30 transition-all">
                  Connect Wallet
              </Button>
          </MotionDiv>
      </section>
    </div>
  );
};