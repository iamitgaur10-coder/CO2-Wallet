
import React from 'react';
import { Card, Badge, cn } from '../components/UI';
import { Trophy, Medal, User } from 'lucide-react';

interface LeaderboardProps {
    balanceKg: number;
}

interface LeaderboardEntry {
    name: string;
    balance: number;
    avatar?: string;
    isUser?: boolean;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ balanceKg }) => {
    // Generate fake leaderboard data
    const globalData: LeaderboardEntry[] = [
        { name: 'Alex Chen', balance: -1450.2, avatar: 'https://i.pravatar.cc/150?u=1' },
        { name: 'Sarah Jones', balance: -890.5, avatar: 'https://i.pravatar.cc/150?u=2' },
        { name: 'Mike Ross', balance: -420.0, avatar: 'https://i.pravatar.cc/150?u=3' },
        { name: 'Emma Wilson', balance: -150.5, avatar: 'https://i.pravatar.cc/150?u=4' },
    ];

    // Insert current user
    const userData: LeaderboardEntry = { name: 'You', balance: balanceKg, isUser: true };
    const allData = [...globalData, userData].sort((a, b) => a.balance - b.balance);

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
             <div className="text-center mb-10">
                <h1 className="text-3xl font-display font-bold mb-2">Global Impact Leaderboard</h1>
                <p className="text-muted">Ranked by Net Negative Emissions (Lifetime)</p>
             </div>

             <Card className="overflow-hidden border-emerald-500/20">
                 {allData.map((user, idx) => (
                     <div key={idx} className={cn("flex items-center justify-between p-6 border-b border-white/5", user.isUser ? "bg-emerald-500/5" : "")}>
                         <div className="flex items-center gap-6">
                             <div className="w-8 font-mono font-bold text-gray-500 text-center">
                                 {idx === 0 && <Trophy className="text-yellow-400 mx-auto" size={20} />}
                                 {idx === 1 && <Medal className="text-gray-300 mx-auto" size={20} />}
                                 {idx === 2 && <Medal className="text-amber-600 mx-auto" size={20} />}
                                 {idx > 2 && `#${idx + 1}`}
                             </div>
                             
                             <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                                     {user.avatar ? <img src={user.avatar} alt={user.name} /> : <div className="w-full h-full flex items-center justify-center"><User size={20} /></div>}
                                 </div>
                                 <div>
                                     <div className="font-bold text-white flex items-center gap-2">
                                         {user.name}
                                         {user.isUser && <Badge variant="neutral">YOU</Badge>}
                                     </div>
                                     <div className="text-xs text-muted">Joined 2024</div>
                                 </div>
                             </div>
                         </div>
                         
                         <div className="text-right">
                             <div className={cn("font-mono font-bold text-lg", user.balance <= 0 ? "text-emerald-400" : "text-gray-400")}>
                                 {user.balance.toFixed(1)} kg
                             </div>
                             <div className="text-xs text-muted">Net Balance</div>
                         </div>
                     </div>
                 ))}
             </Card>
        </div>
    );
};
