
import React from 'react';
import { Card, Badge, cn } from '../components/UI';
import { EmissionRecord, RemovalRecord } from '../types';
import { ArrowUpRight, ArrowDownLeft, ExternalLink } from 'lucide-react';

interface WalletProps {
    emissions: EmissionRecord[];
    removals: RemovalRecord[];
}

export const Wallet: React.FC<WalletProps> = ({ emissions, removals }) => {
    const transactions = [
        ...emissions.map(e => ({ ...e, type: 'debit', label: 'Emission' })),
        ...removals.map(r => ({ ...r, amountKg: r.amount_kg, type: 'credit', label: 'Removal', source: r.project_name }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
            <h1 className="text-3xl font-display font-bold mb-8">Wallet History</h1>
            
            <Card className="overflow-hidden p-0">
                <div className="grid grid-cols-4 bg-white/5 p-4 text-xs font-mono uppercase text-muted border-b border-border">
                    <div className="col-span-2">Transaction</div>
                    <div className="text-right">Amount</div>
                    <div className="text-right">Date</div>
                </div>
                <div className="divide-y divide-border">
                    {transactions.map((tx: any, i) => (
                        <div key={i} className="grid grid-cols-4 p-4 hover:bg-white/5 transition-colors items-center group">
                            <div className="col-span-2 flex items-center gap-4">
                                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", tx.type === 'credit' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500')}>
                                    {tx.type === 'credit' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                </div>
                                <div>
                                    <div className="font-medium text-white">{tx.source || tx.project_name}</div>
                                    <div className="text-xs text-muted flex items-center gap-2">
                                        {tx.type === 'credit' ? 'On-Chain Removal' : 'Emission Event'}
                                        {tx.tx_hash && (
                                            <a href={`https://polygonscan.com/tx/${tx.tx_hash}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-emerald-500 hover:underline">
                                                0x{tx.tx_hash.substring(0,4)}... <ExternalLink size={10} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={cn("text-right font-mono font-medium", tx.type === 'credit' ? 'text-emerald-500' : 'text-white')}>
                                {tx.type === 'credit' ? '-' : '+'}{tx.amountKg.toFixed(2)} kg
                            </div>
                            <div className="text-right text-sm text-gray-500">
                                {new Date(tx.date).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};
