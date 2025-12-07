import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Remove } from './pages/Remove';
import { Insights } from './pages/Insights';
import { Onboarding } from './pages/Onboarding';
import { Login } from './pages/Login';
import { UserState, EmissionRecord, RemovalRecord } from './types';

// Placeholder components
const Placeholder = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500 animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p>This feature requires a live Stripe Production Key.</p>
    </div>
);

const App: React.FC = () => {
  const [userState, setUserState] = useState<UserState>(UserState.PUBLIC);
  
  // -- The Single Truth State (Simulating Supabase Store) --
  const [emissions, setEmissions] = useState<EmissionRecord[]>([
      { id: '1', source: 'Uber ride SFO → SJC', amountKg: 14.2, date: new Date().toISOString(), type: 'transport', method: 'plaid_transaction' },
      { id: '2', source: 'Delta Flight (SFO-JFK)', amountKg: 420.5, date: new Date(Date.now() - 86400000 * 2).toISOString(), type: 'flight', method: 'auto_detected' },
      { id: '3', source: 'Monthly Home Energy', amountKg: 85.0, date: new Date(Date.now() - 86400000 * 5).toISOString(), type: 'energy', method: 'manual' },
  ]);
  
  const [removals, setRemovals] = useState<RemovalRecord[]>([
       { id: '101', project_name: 'Climeworks Orca', provider: 'Climeworks', method: 'DAC', amount_kg: 50.0, cost_usd: 42.5, date: new Date(Date.now() - 86400000 * 10).toISOString(), tx_hash: '0x123...abc' }
  ]);

  const [balanceKg, setBalanceKg] = useState(0);

  // Real-time Balance Calculation (Simulating Postgres Trigger)
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

  const isAuthenticatedOrDemo = userState === UserState.AUTHENTICATED || userState === UserState.DEMO;

  return (
    <HashRouter>
      <Layout userState={userState} setUserState={setUserState}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
              isAuthenticatedOrDemo 
              ? <Navigate to="/dashboard" /> 
              : <Home setUserState={setUserState} />
          } />
          
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
          <Route path="/wallet" element={<Placeholder title="Wallet History" />} />
          <Route path="/leaderboard" element={<Placeholder title="Global Leaderboard" />} />
          <Route path="/profile" element={<Placeholder title="Profile Settings" />} />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;