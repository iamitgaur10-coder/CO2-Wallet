
import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Progress, cn } from '../components/UI';
import { Cloud, Car, Utensils, ShoppingBag, Leaf, Plane, Info, Eye, Loader2, Building } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { EmissionRecord, RemovalRecord } from '../types';
import { ReceiptUploader } from '../components/ReceiptUploader';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
    balanceKg: number;
    emissions: EmissionRecord[];
    removals: RemovalRecord[];
    onAddEmission: (rec: EmissionRecord) => void;
    isDemo?: boolean;
}

const balanceHistoryData = [
  { day: '01', net: 100 },
  { day: '05', net: 80 },
  { day: '10', net: 40 },
  { day: '15', net: -20 },
  { day: '20', net: -50 },
  { day: '25', net: -80 },
  { day: 'Today', net: -110 },
];

export const Dashboard: React.FC<DashboardProps> = ({ balanceKg, emissions, removals, onAddEmission, isDemo = false }) => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [showPlaid, setShowPlaid] = useState(false);
  const [plaidLoading, setPlaidLoading] = useState(0); // 0: init, 1: auth, 2: scanning, 3: success

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleReceiptAnalysis = (data: { total_kg: number, items: any[], tips: string[] }) => {
      const newRecord: EmissionRecord = {
          id: crypto.randomUUID(),
          source: `Scan: ${data.items[0]?.name || 'Unknown'}...`,
          amountKg: data.total_kg,
          date: new Date().toISOString(),
          type: 'consumption',
          method: 'receipt_scan',
          metadata: { tips: data.tips }
      };
      onAddEmission(newRecord);
  };

  const startPlaidSimulation = () => {
      if (isDemo) return;
      setShowPlaid(true);
      setPlaidLoading(1);
      setTimeout(() => setPlaidLoading(2), 1500);
      setTimeout(() => {
          setPlaidLoading(3);
          onAddEmission({
              id: crypto.randomUUID(),
              source: 'Uber Trip (Detected)',
              amountKg: 12.4,
              date: new Date().toISOString(),
              type: 'transport',
              method: 'plaid_transaction'
          });
          onAddEmission({
            id: crypto.randomUUID(),
            source: 'Starbucks Coffee',
            amountKg: 0.3,
            date: new Date().toISOString(),
            type: 'food',
            method: 'plaid_transaction'
        });
      }, 3500);
      setTimeout(() => setShowPlaid(false), 4500);
  };

  const activity = [
      ...emissions.map(e => ({ ...e, isRemoval: false, title: e.source })),
      ...removals.map(r => ({ ...r, id: r.id, amountKg: r.amount_kg, source: r.project_name, isRemoval: true, type: 'removal', date: r.date }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Humanize Data Logic
  const treeEquivalent = Math.abs(balanceKg / 20); // Approx 20kg per tree/year
  const flightEquivalent = Math.abs(balanceKg / 900); // Approx 900kg for London-NYC

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in space-y-8 relative">
        {isDemo && (
            <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-3 rounded-lg flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Eye size={18} />
                    <span className="font-bold text-sm">Observer Mode Active. Read Only.</span>
                </div>
                <Button size="sm" variant="primary" className="h-8" onClick={() => navigate('/onboarding')}>Create Account</Button>
            </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
            <div>
                <h1 className="text-3xl font-display font-bold text-white tracking-tight">Dashboard</h1>
                <p className="text-muted text-sm mt-1">Real-time atmospheric balance sheet.</p>
            </div>
            <div className="flex items-center gap-3">
                 <Button variant="outline" size="sm" onClick={startPlaidSimulation} disabled={isDemo} title={isDemo ? "Disabled in Demo" : "Connect Bank"}>
                    {isDemo ? "Bank Locked (Demo)" : "Connect Bank (Plaid)"}
                 </Button>
                 <Button variant="primary" size="sm" onClick={() => navigate('/remove')} disabled={isDemo} title={isDemo ? "Disabled in Demo" : "Neutralize"}>
                    Neutralize Debt
                 </Button>
            </div>
        </div>

        {/* Hero Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Balance */}
            <Card className="lg:col-span-2 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
                 <div className="absolute inset-0 bg-gradient-to-br from-surface to-surface-hover z-0" />
                 <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Cloud size={200} />
                 </div>
                 
                 <div className="relative z-10">
                     <div className="flex justify-between items-start">
                         <div>
                            <h2 className="text-muted text-xs font-mono uppercase tracking-widest mb-2">Net Balance</h2>
                            <div className="flex items-baseline gap-3">
                                <span className={cn("text-6xl font-display font-bold tracking-tighter", balanceKg <= 0 ? 'text-emerald-400' : 'text-white')}>
                                    {balanceKg > 0 ? '+' : ''}{balanceKg.toFixed(1)}
                                </span>
                                <span className="text-xl text-muted font-medium">kg CO₂e</span>
                            </div>
                         </div>
                         <Badge variant={balanceKg <= 0 ? "success" : "warning"}>
                            {balanceKg <= 0 ? "Carbon Negative" : "Neutralizing"}
                         </Badge>
                     </div>
                 </div>

                 <div className="relative z-10 h-32 w-full mt-auto min-w-0">
                    {mounted ? (
                        <div className="absolute inset-0">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                <AreaChart data={balanceHistoryData}>
                                    <defs>
                                        <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="day" hide />
                                    <Tooltip 
                                        cursor={{stroke: '#30363D'}}
                                        contentStyle={{backgroundColor: '#0D1117', border: '1px solid #30363D', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)'}}
                                        itemStyle={{color: '#fff', fontSize: '12px'}}
                                    />
                                    <Area type="monotone" dataKey="net" stroke="#10B981" strokeWidth={2} fill="url(#colorNet)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="w-full h-full bg-white/5 animate-pulse rounded" />
                    )}
                 </div>
            </Card>

            {/* Quick Actions & Stats */}
            <div className="flex flex-col gap-6">
                <ReceiptUploader onAnalysisComplete={handleReceiptAnalysis} />
                
                <Card className="flex-1 flex flex-col justify-center">
                     <div className="flex justify-between items-center mb-4">
                        <span className="text-xs text-muted font-mono uppercase">Monthly Budget</span>
                        <span className="text-xs text-emerald-400 font-mono">24% USED</span>
                     </div>
                     <div className="text-2xl font-bold text-white mb-2">$40.00 <span className="text-sm text-muted font-normal">/ $165</span></div>
                     <Progress value={24} className="mb-4" />
                     <p className="text-xs text-muted">
                        Auto-neutralizing Uber, Flights, and Dining via Plaid.
                     </p>
                </Card>
            </div>
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-white">Activity Feed</h2>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/wallet')}>View All</Button>
                </div>
                
                <div className="space-y-1">
                    {activity.slice(0, 6).map((item: any) => (
                        <div key={item.id} className="flex items-center justify-between p-4 rounded-lg bg-surface border border-transparent hover:border-border transition-all group">
                            <div className="flex items-center gap-4">
                                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center border border-white/5", item.isRemoval ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/5 text-muted')}>
                                    {item.type === 'transport' && <Car size={18} />}
                                    {item.type === 'flight' && <Plane size={18} />}
                                    {item.type === 'food' && <Utensils size={18} />}
                                    {item.type === 'removal' && <Leaf size={18} />}
                                    {item.type === 'consumption' && <ShoppingBag size={18} />}
                                </div>
                                <div>
                                    <div className="font-medium text-sm text-gray-200">{item.source}</div>
                                    <div className="text-xs text-muted flex items-center gap-2">
                                        {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'})}
                                        {item.method === 'receipt_scan' && <Badge variant="neutral" className="py-0 px-1 text-[9px]">VISION</Badge>}
                                        {item.method === 'plaid_transaction' && <Badge variant="neutral" className="py-0 px-1 text-[9px]">BANK</Badge>}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={cn("text-sm font-mono font-medium", item.isRemoval ? 'text-emerald-500' : 'text-white')}>
                                    {item.isRemoval ? '-' : '+'}{item.amountKg.toFixed(2)} <span className="text-muted text-xs">kg</span>
                                </div>
                                {item.tx_hash && (
                                    <a href="#" className="text-[10px] text-emerald-600 hover:text-emerald-500 underline decoration-dotted">
                                        Proof: 0x...{item.tx_hash.substring(0,4)}
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                    {activity.length === 0 && (
                        <div className="py-12 text-center text-muted border border-dashed border-border rounded-lg">
                            No activity yet. Scan a receipt or connect your bank.
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
                <Card>
                    <h3 className="text-sm font-bold mb-4">Impact Summary</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted">Lifetime Emitted</span>
                            <span className="text-white font-mono">4,120 kg</span>
                        </div>
                         <div className="flex justify-between items-center text-sm">
                            <span className="text-muted">Lifetime Removed</span>
                            <span className="text-emerald-500 font-mono">4,230 kg</span>
                        </div>
                        <div className="h-px bg-border my-2" />
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-white font-medium">Net Impact</span>
                            <span className="text-emerald-400 font-mono font-bold">{balanceKg.toFixed(1)} kg</span>
                        </div>
                    </div>
                </Card>

                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-900/20 to-transparent border border-emerald-500/20">
                    <div className="flex items-center gap-2 mb-2 text-emerald-400">
                        <Info size={16} />
                        <span className="text-xs font-bold uppercase">Did you know?</span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">
                        Your impact is equivalent to:
                        <br/>
                        <strong className="text-white">🌲 {treeEquivalent.toFixed(1)} mature trees</strong> planted.
                        <br/>
                        <strong className="text-white">✈️ {flightEquivalent.toFixed(1)} transatlantic flights</strong> offset.
                    </p>
                </div>
            </div>
        </div>

        {/* Plaid Modal Mock */}
        {showPlaid && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
                <div className="bg-white w-[400px] h-[500px] rounded-xl overflow-hidden flex flex-col shadow-2xl">
                    {/* Plaid Header */}
                    <div className="bg-black p-4 flex justify-between items-center">
                         <div className="text-white font-bold tracking-wider">PLAID</div>
                         <div className="w-8 h-8 rounded bg-gray-800" />
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-black">
                        {plaidLoading === 1 && (
                            <>
                                <Loader2 className="w-12 h-12 animate-spin text-black mb-4" />
                                <h3 className="font-bold text-lg">Authenticating with Chase...</h3>
                            </>
                        )}
                        {plaidLoading === 2 && (
                            <>
                                <Loader2 className="w-12 h-12 animate-spin text-black mb-4" />
                                <h3 className="font-bold text-lg">Scanning Transactions...</h3>
                                <p className="text-sm text-gray-500 mt-2">Looking for Uber, Flights, and Utilities...</p>
                            </>
                        )}
                        {plaidLoading === 3 && (
                            <>
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 text-white animate-slide-up">
                                    <Leaf size={32} />
                                </div>
                                <h3 className="font-bold text-lg">2 New Transactions Found</h3>
                                <p className="text-sm text-gray-500 mt-2">Added 12.7 kg CO2e to your dashboard.</p>
                            </>
                        )}
                    </div>
                    
                    <div className="p-4 border-t border-gray-100 bg-gray-50 text-center text-xs text-gray-400">
                        Secure Connection via Plaid Inc.
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};
