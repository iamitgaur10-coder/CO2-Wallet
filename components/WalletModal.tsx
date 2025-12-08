import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, ArrowRight, Loader2 } from 'lucide-react';
import { Card } from './UI';

interface WalletModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConnect: (wallet: string) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onConnect }) => {
    const wallets = [
        { name: 'MetaMask', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg', color: 'hover:bg-orange-500/10' },
        { name: 'Rainbow', icon: 'https://avatars.githubusercontent.com/u/48327834?s=200&v=4', color: 'hover:bg-blue-500/10' },
        { name: 'Coinbase Wallet', icon: 'https://images.ctfassets.net/c5bd0wqjc7v0/3dG53W9Q5Z4q2jB6Z3y0y/834279090623623662283296229987/coinbase-wallet-logo.svg', color: 'hover:bg-blue-600/10' },
        { name: 'WalletConnect', icon: 'https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Logo/Blue%20(Default)/Logo.svg', color: 'hover:bg-blue-400/10' },
    ];

    const [connecting, setConnecting] = React.useState<string | null>(null);

    const handleConnect = (name: string) => {
        setConnecting(name);
        setTimeout(() => {
            onConnect(name);
            setConnecting(null);
            onClose();
        }, 1500);
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
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]" 
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[101] px-4"
                    >
                        <Card className="bg-[#0D1117] border border-white/10 shadow-2xl p-0 overflow-hidden">
                            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                                <h3 className="text-xl font-display font-bold text-white">Connect Wallet</h3>
                                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="p-2">
                                {wallets.map((w) => (
                                    <button
                                        key={w.name}
                                        onClick={() => handleConnect(w.name)}
                                        disabled={connecting !== null}
                                        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${w.color} hover:scale-[1.01] border border-transparent hover:border-white/5 group`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center overflow-hidden p-1">
                                                <img src={w.icon} alt={w.name} className="w-full h-full object-contain" />
                                            </div>
                                            <span className="font-bold text-white text-lg">{w.name}</span>
                                        </div>
                                        {connecting === w.name ? (
                                            <Loader2 className="animate-spin text-emerald-500" />
                                        ) : (
                                            <div className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-400 group-hover:bg-white/10 group-hover:text-white transition-colors">
                                                Connect
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                            
                            <div className="p-4 bg-white/[0.02] text-center">
                                <p className="text-xs text-gray-500">
                                    By connecting, you agree to our <span className="text-emerald-500 cursor-pointer">Terms</span> and <span className="text-emerald-500 cursor-pointer">Privacy Policy</span>.
                                </p>
                            </div>
                        </Card>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};