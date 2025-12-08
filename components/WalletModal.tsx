import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Wallet } from 'lucide-react';
import { Card } from './UI';

interface WalletModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConnect: (wallet: string) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onConnect }) => {
    const wallets = [
        { id: 'metamask', name: 'MetaMask', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg' },
        { id: 'rainbow', name: 'Rainbow', icon: 'https://avatars.githubusercontent.com/u/48327834?s=200&v=4' },
        { id: 'coinbase', name: 'Coinbase Wallet', icon: 'https://images.ctfassets.net/c5bd0wqjc7v0/3dG53W9Q5Z4q2jB6Z3y0y/834279090623623662283296229987/coinbase-wallet-logo.svg' },
        { id: 'walletconnect', name: 'WalletConnect', icon: 'https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Logo/Blue%20(Default)/Logo.svg' },
    ];

    const [connecting, setConnecting] = React.useState<string | null>(null);

    const handleConnect = (id: string, name: string) => {
        setConnecting(id);
        setTimeout(() => {
            onConnect(name);
            setConnecting(null);
            onClose();
        }, 1200);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" 
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[360px] z-[101] px-4"
                    >
                        <div className="bg-[#1A1B1F] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                            <div className="p-4 border-b border-white/5 flex justify-between items-center">
                                <h3 className="font-bold text-white text-lg">Connect Wallet</h3>
                                <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                                    <X size={16} />
                                </button>
                            </div>
                            
                            <div className="p-2 space-y-1">
                                {wallets.map((w) => (
                                    <button
                                        key={w.id}
                                        onClick={() => handleConnect(w.id, w.name)}
                                        disabled={connecting !== null}
                                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all group disabled:opacity-50"
                                    >
                                        <div className="flex items-center gap-4">
                                            <img src={w.icon} alt={w.name} className="w-8 h-8 rounded-lg object-contain" />
                                            <span className="font-bold text-white">{w.name}</span>
                                        </div>
                                        {connecting === w.id ? (
                                            <Loader2 className="animate-spin text-emerald-500" size={18} />
                                        ) : (
                                            <div className="text-xs font-bold text-gray-500 uppercase tracking-wide group-hover:text-emerald-500 transition-colors">
                                                Scan
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                            
                            <div className="p-4 bg-[#141519] border-t border-white/5 text-center">
                                <p className="text-xs text-gray-500">
                                    New to Ethereum? <a href="#" className="text-emerald-500 hover:underline">Learn more about wallets</a>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};