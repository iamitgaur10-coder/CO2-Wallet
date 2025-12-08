import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Remove } from './pages/Remove';
import { Insights } from './pages/Insights';
import { Onboarding } from './pages/Onboarding';
import { Login } from './pages/Login';
import { Wallet } from './pages/Wallet';
import { Leaderboard } from './pages/Leaderboard';
import { Profile } from './pages/Profile';
import { Science } from './pages/Science';
import { Calculator } from './pages/Calculator';
import { About, Careers, Privacy, Terms, Blog, Product } from './pages/Static';
import { UserState, EmissionRecord, RemovalRecord } from './types';
import { WalletModal } from './components/WalletModal';
import { ToastProvider, useToast } from './components/UI';

// Initialize App Context
console.log("Moss App v3.3.0 Initialized - " + new Date().toISOString());

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [userState, setUserState] = useState<UserState>(() => {
      const saved = localStorage.getItem('co2_user_state');
      return (saved as UserState) || UserState.PUBLIC;
  });
  
  const [emissions, setEmissions] = useState<EmissionRecord[]>(() => {
      const saved = localStorage.getItem('co2_emissions');
      return saved ? JSON.parse(saved) : [];
  });
  
  const [removals, setRemovals] = useState<RemovalRecord[]>(() => {
      const saved = localStorage.getItem('co2_removals');
      return saved ? JSON.parse(saved) : [];
  });

  const [balanceKg, setBalanceKg] = useState(0);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  useEffect(() => {
      localStorage.setItem('co2_user_state', userState);
  }, [userState]);

  useEffect(() => {
      const totalEmitted = emissions.reduce((acc, curr) => acc + curr.amountKg, 0);
      const totalRemoved = removals.reduce((acc, curr) => acc + curr.amount_kg, 0);
      setBalanceKg(totalEmitted - totalRemoved);
  }, [emissions, removals]);

  const addEmission = (record: EmissionRecord) => setEmissions(prev => [record, ...prev]);
  const addRemoval = (record: RemovalRecord) => setRemovals(prev => [record, ...prev]);

  const handleWalletConnect = (walletName: string) => {
      toast(`Connected: ${walletName}`, 'success');
      setTimeout(() => {
        setUserState(UserState.ONBOARDING);
        navigate('/dashboard');
      }, 500);
  };

  const isAuthenticatedOrDemo = userState === UserState.AUTHENTICATED || userState === UserState.DEMO;

  return (
    <>
      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
        onConnect={handleWalletConnect}
      />
      
      <Layout userState={userState} setUserState={setUserState}>
        <Routes>
          <Route path="/" element={isAuthenticatedOrDemo ? <Navigate to="/dashboard" /> : <Home setUserState={(state) => {
              if (state === UserState.ONBOARDING) setIsWalletModalOpen(true);
              else setUserState(state);
          }} />} />
          
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/product" element={<Product />} />
          <Route path="/how-it-works" element={<Science />} />
          
          <Route path="/onboarding" element={<Onboarding setUserState={setUserState} />} />
          <Route path="/login" element={isAuthenticatedOrDemo ? <Navigate to="/dashboard" /> : <Login setUserState={setUserState} />} />

          {/* Authenticated */}
          <Route path="/dashboard" element={isAuthenticatedOrDemo ? <Dashboard balanceKg={balanceKg} emissions={emissions} removals={removals} onAddEmission={addEmission} isDemo={userState === UserState.DEMO} /> : <Navigate to="/" />} />
          <Route path="/remove" element={isAuthenticatedOrDemo ? <Remove balanceKg={balanceKg} onAddRemoval={addRemoval} isDemo={userState === UserState.DEMO} /> : <Navigate to="/" />} />
          <Route path="/insights" element={isAuthenticatedOrDemo ? <Insights balanceKg={balanceKg} historyContext="History" /> : <Navigate to="/" />} />
          <Route path="/wallet" element={isAuthenticatedOrDemo ? <Wallet emissions={emissions} removals={removals} /> : <Navigate to="/" />} />
          <Route path="/leaderboard" element={isAuthenticatedOrDemo ? <Leaderboard balanceKg={balanceKg} /> : <Navigate to="/" />} />
          <Route path="/profile" element={isAuthenticatedOrDemo ? <Profile userState={userState} setUserState={setUserState} /> : <Navigate to="/" />} />
          
          {/* Static */}
          <Route path="/about" element={<About />} />
          <Route path="/science" element={<Science />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/blog" element={<Blog />} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </>
  );
};

const App: React.FC = () => (
    <HashRouter>
        <ToastProvider>
            <AppContent />
        </ToastProvider>
    </HashRouter>
);

export default App;