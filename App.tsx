import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { About, Careers, Privacy, Terms, Blog, Product } from './pages/Static';
import { UserState, EmissionRecord, RemovalRecord } from './types';
import { WalletModal } from './components/WalletModal';

const App: React.FC = () => {
  // Load initial state from LocalStorage if available
  const [userState, setUserState] = useState<UserState>(() => {
      const saved = localStorage.getItem('co2_user_state');
      return (saved as UserState) || UserState.PUBLIC;
  });
  
  const [emissions, setEmissions] = useState<EmissionRecord[]>(() => {
      const saved = localStorage.getItem('co2_emissions');
      return saved ? JSON.parse(saved) : [
        { id: '1', source: 'Uber ride SFO → SJC', amountKg: 14.2, date: new Date().toISOString(), type: 'transport', method: 'plaid_transaction' },
        { id: '2', source: 'Delta Flight (SFO-JFK)', amountKg: 420.5, date: new Date(Date.now() - 86400000 * 2).toISOString(), type: 'flight', method: 'auto_detected' },
        { id: '3', source: 'Monthly Home Energy', amountKg: 85.0, date: new Date(Date.now() - 86400000 * 5).toISOString(), type: 'energy', method: 'manual' },
      ];
  });
  
  const [removals, setRemovals] = useState<RemovalRecord[]>(() => {
      const saved = localStorage.getItem('co2_removals');
      return saved ? JSON.parse(saved) : [
        { id: '101', project_name: 'Climeworks Orca', provider: 'Climeworks', method: 'DAC', amount_kg: 50.0, cost_usd: 42.5, date: new Date(Date.now() - 86400000 * 10).toISOString(), tx_hash: '0x123...abc' }
      ];
  });

  const [balanceKg, setBalanceKg] = useState(0);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  // Persistence Effects
  useEffect(() => {
      localStorage.setItem('co2_user_state', userState);
  }, [userState]);

  useEffect(() => {
      localStorage.setItem('co2_emissions', JSON.stringify(emissions));
  }, [emissions]);

  useEffect(() => {
      localStorage.setItem('co2_removals', JSON.stringify(removals));
  }, [removals]);

  // Real-time Balance Calculation
  useEffect(() => {
      const totalEmitted = emissions.reduce((acc, curr) => acc + curr.amountKg, 0);
      const totalRemoved = removals.reduce((acc, curr) => acc + curr.amount_kg, 0);
      const legacyBaseline = 0; 
      setBalanceKg((legacyBaseline + totalEmitted) - totalRemoved);
  }, [emissions, removals]);

  const addEmission = (record: EmissionRecord) => {
      setEmissions(prev => [record, ...prev]);
  };

  const addRemoval = (record: RemovalRecord) => {
      setRemovals(prev => [record, ...prev]);
  };

  // Intercept Onboarding to show Wallet Modal first if needed
  const handleSetUserState = (newState: UserState) => {
      if (newState === UserState.ONBOARDING && userState === UserState.PUBLIC) {
          // Open wallet modal instead of direct nav sometimes? 
          // For now, sticking to standard flow, but exposing modal for future use.
      }
      setUserState(newState);
  }

  const handleWalletConnect = (walletName: string) => {
      console.log(`Connected to ${walletName}`);
      setUserState(UserState.ONBOARDING);
  };

  const isAuthenticatedOrDemo = userState === UserState.AUTHENTICATED || userState === UserState.DEMO;

  return (
    <HashRouter>
      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
        onConnect={handleWalletConnect}
      />
      
      <Layout userState={userState} setUserState={handleSetUserState}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
              isAuthenticatedOrDemo 
              ? <Navigate to="/dashboard" /> 
              : <Home setUserState={(state) => {
                  if (state === UserState.ONBOARDING) {
                      setIsWalletModalOpen(true);
                  } else {
                      setUserState(state);
                  }
              }} />
          } />
          
          <Route path="/product" element={<Product />} />
          <Route path="/how-it-works" element={<Science />} />
          <Route path="/science" element={<Science />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/blog" element={<Blog />} />

          {/* Login & Onboarding */}
          <Route path="/login" element={
              isAuthenticatedOrDemo
              ? <Navigate to="/dashboard" />
              : <Login setUserState={setUserState} />
          } />
          <Route path="/onboarding" element={<Onboarding setUserState={setUserState} />} />

          {/* Authenticated Routes */}
          <Route path="/dashboard" element={
              isAuthenticatedOrDemo 
              ? <Dashboard 
                  balanceKg={balanceKg} 
                  emissions={emissions} 
                  removals={removals}
                  onAddEmission={addEmission}
                  isDemo={userState === UserState.DEMO}
                /> 
              : <Navigate to="/" />
          } />
          <Route path="/remove" element={
              isAuthenticatedOrDemo 
              ? <Remove 
                  balanceKg={balanceKg}
                  onAddRemoval={addRemoval}
                  isDemo={userState === UserState.DEMO}
                /> 
              : <Navigate to="/" />
          } />
          <Route path="/insights" element={
              isAuthenticatedOrDemo 
              ? <Insights 
                  balanceKg={balanceKg}
                  historyContext={`User has ${emissions.length} emission events totaling ${emissions.reduce((a,b)=>a+b.amountKg,0)}kg. Top source: Flights.`}
                /> 
              : <Navigate to="/" />
          } />
          <Route path="/wallet" element={
              isAuthenticatedOrDemo
              ? <Wallet emissions={emissions} removals={removals} />
              : <Navigate to="/" />
          } />
          <Route path="/leaderboard" element={
              isAuthenticatedOrDemo
              ? <Leaderboard balanceKg={balanceKg} />
              : <Navigate to="/" />
          } />
          <Route path="/profile" element={
              isAuthenticatedOrDemo
              ? <Profile userState={userState} setUserState={setUserState} />
              : <Navigate to="/" />
          } />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;