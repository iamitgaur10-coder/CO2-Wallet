import React, { useState, useEffect } from 'react';
import { Button, Card, Accordion, Badge, Input } from '../components/UI';
import { UserState } from '../types';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Leaf, ShieldCheck, Zap, Globe, Lock } from 'lucide-react';
import { HeroSpline } from '../components/HeroSpline';
import { motion } from 'framer-motion';

interface HomeProps {
    setUserState: (s: UserState) => void;
}

export const Home: React.FC<HomeProps> = ({ setUserState }) => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(14205.4);
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  // Auto-increment live counter
  useEffect(() => {
    const interval = setInterval(() => {
        setCounter(prev => prev + 0.01);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleConnect = () => {
      // Trigger wallet modal via parent state lifting or route param
      setUserState(UserState.ONBOARDING);
      navigate('/onboarding');
  }

  const handleWaitlist = (e: React.FormEvent) => {
      e.preventDefault();
      if(email) setJoined(true);
  }

  return (
    <div className="bg-[#0A0A0A] min-h-screen overflow-x-hidden">
      
      {/* SECTION 1: HERO (3D SPLINE) */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
         {/* Background Spline */}
         <div className="absolute inset-0 z-0 opacity-60">
             <HeroSpline />
         </div>

         {/* Content Overlay */}
         <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-20">
             <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
             >
                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/30 border border-emerald-500/20 backdrop-blur-md mb-8">
                     <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                     </span>
                     <span className="text-emerald-400 font-mono text-xs font-bold tracking-wider">
                         LIVE: {counter.toLocaleString(undefined, { minimumFractionDigits: 2 })} TONNES RETIRED
                     </span>
                 </div>

                 <h1 className="text-5xl md:text-8xl font-display font-bold text-white tracking-tight mb-6 leading-[1.1]">
                     Offset On-Chain.<br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Flex Forever.</span>
                 </h1>

                 <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                     The first non-custodial wallet to bridge your real-world lifestyle with on-chain carbon credits. Powered by Polygon & Toucan.
                 </p>

                 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                     <Button 
                        onClick={handleConnect} 
                        className="h-14 px-8 text-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] transition-all w-full sm:w-auto"
                     >
                         Connect Wallet
                     </Button>
                     <Button 
                        variant="outline" 
                        onClick={() => navigate('/how-it-works')}
                        className="h-14 px-8 text-lg border-white/10 hover:bg-white/5 w-full sm:w-auto"
                     >
                         How it Works
                     </Button>
                 </div>
             </motion.div>
         </div>
      </section>

      {/* SECTION 2: HOW IT WORKS (CARDS) */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0A0A0A] to-[#0D1117]">
          <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-display font-bold text-white mb-4">Carbon Neutrality in 3 Steps</h2>
                  <p className="text-gray-400">From receipt to retirement in seconds.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {[
                      { icon: Zap, title: "1. Calculate", desc: "Upload receipts or take our AI quiz. Gemini 3 Pro estimates your footprint instantly." },
                      { icon: ShieldCheck, title: "2. Verify", desc: "We source real BCT (Base Carbon Tonnes) from Toucan Protocol on Polygon." },
                      { icon: Leaf, title: "3. Retire", desc: "Burn tokens on-chain to mint a Soulbound NFT certificate of impact." }
                  ].map((item, i) => (
                      <Card key={i} className="p-8 bg-white/[0.02] border-white/5 hover:border-emerald-500/30 transition-all group">
                          <div className="w-14 h-14 bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                              <item.icon size={28} />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                          <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                      </Card>
                  ))}
              </div>
          </div>
      </section>

      {/* SECTION 3: PROOF GALLERY (NFTs) */}
      <section className="py-24 border-y border-white/5 bg-black/40">
          <div className="max-w-7xl mx-auto px-6">
              <div className="flex justify-between items-end mb-12">
                  <div>
                      <h2 className="text-3xl font-display font-bold text-white mb-2">Real Proof. On-Chain.</h2>
                      <p className="text-gray-400">Every retirement mints a verified NFT.</p>
                  </div>
                  <Button variant="ghost" className="hidden sm:flex" onClick={() => window.open('https://opensea.io', '_blank')}>View Collection <ArrowRight size={16} className="ml-2"/></Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-900 border border-white/10 hover:border-emerald-500/50 transition-all cursor-pointer">
                          <div className={`absolute inset-0 bg-gradient-to-br ${i % 2 === 0 ? 'from-emerald-900/40' : 'from-teal-900/40'} to-black z-0`} />
                          <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                              <div className="flex justify-between">
                                  <Badge variant="neutral" className="bg-black/50 backdrop-blur">#{8490 + i}</Badge>
                                  <Globe size={16} className="text-white/40" />
                              </div>
                              <div>
                                  <div className="text-xs text-emerald-400 font-mono mb-1">1.0 TONNE REMOVED</div>
                                  <div className="font-bold text-white">Moss Genesis</div>
                              </div>
                          </div>
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-emerald-500/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                              <span className="font-bold text-black">View on OpenSea</span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* SECTION 4: FAQ & WAITLIST */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
          <Accordion items={[
              { title: "Is this non-custodial?", content: "Yes. We never hold your funds. You interact directly with the Polygon blockchain via your own wallet." },
              { title: "What are the gas fees?", content: "We build on Polygon (PoS), so gas fees are typically less than $0.01 per transaction." },
              { title: "How is the carbon verified?", content: "We use Toucan Protocol, which bridges Verra-verified carbon credits onto the blockchain as BCT/NCT tokens." },
              { title: "Can I sell the NFT?", content: "No. The proof-of-impact NFTs are Soulbound (non-transferable) to prevent double-counting." }
          ]} />

          <div className="mt-24 text-center">
              <div className="p-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl">
                  <div className="bg-[#0D1117] rounded-xl p-8 md:p-12">
                      <h2 className="text-3xl font-bold text-white mb-4">Join the Movement</h2>
                      <p className="text-gray-400 mb-8">Get early access to the mobile app and Genesis drops.</p>
                      
                      {!joined ? (
                          <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                              <Input 
                                placeholder="Enter your email" 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12 bg-black/50 border-white/10 focus:border-emerald-500"
                              />
                              <Button className="h-12 px-8 bg-white text-black hover:bg-gray-200">Join Waitlist</Button>
                          </form>
                      ) : (
                          <div className="inline-flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-6 py-3 rounded-lg">
                              <CheckCircle2 size={20} /> You are on the list!
                          </div>
                      )}
                      <p className="mt-6 text-xs text-gray-600">No spam. Unsubscribe anytime.</p>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};