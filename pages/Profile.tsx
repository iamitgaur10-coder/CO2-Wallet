
import React, { useState } from 'react';
import { Card, Button, Input, Badge } from '../components/UI';
import { UserState } from '../types';
import { LogOut, Save, Download } from 'lucide-react';

interface ProfileProps {
    userState: UserState;
    setUserState: (s: UserState) => void;
}

export const Profile: React.FC<ProfileProps> = ({ userState, setUserState }) => {
    const [name, setName] = useState('Carbon Pioneer');
    const [email, setEmail] = useState('user@example.com');
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
            <h1 className="text-3xl font-display font-bold mb-8">Settings</h1>
            
            <div className="space-y-8">
                <Card>
                    <h3 className="text-lg font-bold mb-6">Profile Details</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-muted mb-2 block">Display Name</label>
                            <Input value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div>
                            <label className="text-xs text-muted mb-2 block">Email Address</label>
                            <Input value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <Button onClick={handleSave} disabled={saved} className="mt-2">
                            {saved ? <span className="text-emerald-400">Saved Successfully</span> : <><Save size={16} className="mr-2"/> Save Changes</>}
                        </Button>
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-bold mb-6">Data & Privacy</h3>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="font-medium text-white">Export Data</div>
                            <div className="text-sm text-muted">Download all your emission and removal records.</div>
                        </div>
                        <Button variant="secondary" size="sm">
                            <Download size={16} className="mr-2" /> CSV
                        </Button>
                    </div>
                    <div className="flex items-center justify-between">
                         <div>
                            <div className="font-medium text-white">API Access</div>
                            <div className="text-sm text-muted">Manage your personal API keys.</div>
                        </div>
                        <Badge variant="neutral">PRO ONLY</Badge>
                    </div>
                </Card>

                <div className="pt-6 border-t border-white/10">
                    <Button variant="danger" className="w-full" onClick={() => setUserState(UserState.PUBLIC)}>
                        <LogOut size={16} className="mr-2" /> Sign Out
                    </Button>
                </div>
            </div>
        </div>
    );
};
