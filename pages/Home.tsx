
import React, { useState, useEffect } from 'react';
import { Button, Card, Badge } from '../components/UI';
import { UserState } from '../types';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Globe, ShieldCheck, Zap, Eye } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface HomeProps {
    setUserState: (s: UserState) => void;
}

const data = [
  { name: 'Jan', emitted: 4000, removed: 2400 },
  { name: 'Feb', emitted: 3000, removed: 1398 },
  { name: 'Mar', emitted: 2000, removed: 9800 },
  { name: 'Apr', emitted: 2780, removed: 3908 },
  { name: 'May', emitted: 1890, removed: 4800 },
  { name: 'Jun', emitted: 2390, removed: 3800 },
  { name: 'Jul', emitted: 3490, removed: 4300 },
];

export const Home: React.FC<HomeProps> = ({ setUserState }) => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small timeout to ensure DOM is fully ready for Recharts measurement
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
      setUserState(UserState.ONBOARDING);
      navigate('/onboarding');
  }

  const handleDemo = () => {
      setUserState(UserState.DEMO);
      navigate('/dashboard');
  }

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 px-4 sm:px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-5xl mx-auto text-center">
            <Badge variant="success" >Version 2.0 Now Live</Badge>
            <h1 className="mt-8 text-5xl sm:text-7xl font-display font-bold tracking-tight leading-[1.1]">
                The easiest way to <span className="text-emerald-400">offset</span> your on-chain carbon footprint.
            </h1>
            <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
                Powered by Toucan Protocol & Gemini 3 Pro.
                <br />
                Track every gram. Remove every gram. Prove every gram.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button onClick={handleStart} className="h-12 px-8 text-base w-full sm:w-auto">
                    Get Started Free
                </Button>
                <Button variant="secondary" onClick={handleDemo} className="h-12 px-8 text-base w-full sm:w-auto gap-2">
                    <Eye size={18} className="text-gray-400" />
                    View Live Demo
                </Button>
            </div>

            <div className="mt-12 text-sm text-gray-500 font-mono flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-emerald-500 font-bold">-42,108 kg</span> removed by community this week
            </div>
        </div>

        {/* Hero Image / Dashboard Preview */}
        <div className="mt-20 max-w-6xl mx-auto transform hover:scale-[1.01] transition-transform duration-700">
            <div className="rounded-xl bg-surface border border-white/10 p-2 shadow-2xl shadow-emerald-900/20">
                <img 
                    src="https://picsum.photos/1200/600?grayscale" 
                    alt="App Dashboard" 
                    className="rounded-lg w-full h-auto opacity-80"
                />
            </div>
        </div>
      </section>

      {/* Section 1: The New Balance */}
      <section className="py-24 bg-surface/30 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
             <div>
                 <h2 className="text-3xl font-display font-bold mb-6">The New Balance That Actually Matters</h2>
                 <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                     You already check your bank balance daily. Now check the one that decides if the future is habitable.
                     We integrate with your life to calculate your real-time CO₂ debt, then give you one-click power to neutralize it.
                 </p>
                 <ul className="space-y-4">
                     {[
                         'Real-time lifetime CO₂ debt tracking',
                         'Instant removal with on-chain proof',
                         'Leaderboards that make climate action status'
                     ].map((item, i) => (
                         <li key={i} className="flex items-center gap-3">
                             <CheckCircle2 className="text-emerald-500" size={20} />
                             <span className="text-gray-200">{item}</span>
                         </li>
                     ))}
                 </ul>
             </div>
             <div className="h-80 w-full min-w-0">
                {/* Simulated Chart */}
                {mounted ? (
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorRemoved" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#161B22', border: '1px solid rgba(255,255,255,0.1)' }}
                                labelStyle={{ color: '#999' }}
                            />
                            <Area type="monotone" dataKey="removed" stroke="#10B981" fillOpacity={1} fill="url(#colorRemoved)" strokeWidth={2} />
                            <Area type="monotone" dataKey="emitted" stroke="#EF4444" fill="transparent" strokeDasharray="5 5" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="w-full h-full bg-white/5 rounded animate-pulse" />
                )}
             </div>
          </div>
      </section>

      {/* Partners */}
      <section className="py-20 text-center">
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-10">Backed by the best removal science</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {['Climeworks', 'Pachama', 'Running Tide', 'Living Carbon'].map(brand => (
                  <span key={brand} className="text-xl font-display font-bold text-white">{brand}</span>
              ))}
          </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold">Transparent Pricing</h2>
              <p className="text-gray-400 mt-4">Climate action shouldn't be a premium feature.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="p-8 border-white/5 hover:border-emerald-500/30 transition-colors">
                  <h3 className="text-xl font-bold mb-2">Basic</h3>
                  <div className="text-4xl font-display font-bold mb-6">$0<span className="text-lg text-gray-500 font-sans font-normal">/mo</span></div>
                  <ul className="space-y-4 mb-8 text-gray-400 text-sm">
                      <li className="flex gap-2"><CheckCircle2 size={16} /> Manual tracking</li>
                      <li className="flex gap-2"><CheckCircle2 size={16} /> Pay-as-you-go removal</li>
                      <li className="flex gap-2"><CheckCircle2 size={16} /> Public profile</li>
                  </ul>
                  <Button variant="secondary" className="w-full" onClick={handleStart}>Start Free</Button>
              </Card>
              
              <Card className="p-8 border-emerald-500/50 bg-emerald-900/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                  <h3 className="text-xl font-bold mb-2 text-white">Pro</h3>
                  <div className="text-4xl font-display font-bold mb-6 text-white">$9<span className="text-lg text-gray-400 font-sans font-normal">/mo</span></div>
                  <ul className="space-y-4 mb-8 text-gray-300 text-sm">
                      <li className="flex gap-2 text-white"><ShieldCheck size={16} className="text-emerald-400" /> Auto-neutralize every purchase</li>
                      <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-400" /> Family Plan (up to 6)</li>
                      <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-400" /> Advanced Gemini Simulations</li>
                      <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-400" /> Priority removal allocation</li>
                  </ul>
                  <Button variant="primary" className="w-full" onClick={handleStart}>Go Pro</Button>
              </Card>
          </div>
      </section>
    </div>
  );
};
