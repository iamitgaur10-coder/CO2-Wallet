import React from 'react';
import { UserState } from '../types';
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from './UI';
import { 
  LayoutDashboard, 
  Wallet, 
  Leaf, 
  BrainCircuit, 
  Trophy, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Wallet as WalletIcon
} from 'lucide-react';

interface LayoutProps {
  userState: UserState;
  setUserState: (state: UserState) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ userState, setUserState, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    setUserState(UserState.PUBLIC);
    navigate('/');
  };

  const isLoginPage = location.pathname === '/login';
  const showAppLayout = userState === UserState.AUTHENTICATED || userState === UserState.DEMO;

  const PublicNav = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/[0.08] bg-[#0D1117]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3. NAVBAR FIX: Precise Vertical Alignment (h-20 + flex items-center) */}
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-900/50 group-hover:shadow-emerald-500/20 transition-all duration-500">
              <Leaf className="text-black fill-black" size={20} />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-white group-hover:text-emerald-50 transition-colors">CO₂ Wallet</span>
          </div>
          
          {!isLoginPage && (
              <>
                <div className="hidden md:flex items-center gap-10 h-full">
                    <NavLink 
                      to="/product" 
                      className={({isActive}) => `text-sm font-medium transition-all duration-300 ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`}
                    >
                      Product
                    </NavLink>
                    <NavLink 
                      to="/how-it-works" 
                      className={({isActive}) => `text-sm font-medium transition-all duration-300 ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`}
                    >
                      How It Works
                    </NavLink>
                    
                    <button 
                      onClick={() => navigate('/login')} 
                      className="text-sm font-medium text-white/60 hover:text-white transition-all duration-300"
                    >
                        Login
                    </button>

                    <div className="pl-6 border-l border-white/10 h-8 flex items-center">
                        <Button onClick={() => {
                            setUserState(UserState.ONBOARDING);
                            navigate('/onboarding');
                        }} className="h-10 px-6 font-bold shadow-md shadow-emerald-900/20 gap-2 text-sm bg-white text-black hover:bg-emerald-50 border-none transition-all hover:scale-[1.02]">
                            <WalletIcon size={16} />
                            Connect Wallet
                        </Button>
                    </div>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-400 hover:text-white">
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
              </>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && !isLoginPage && (
        <div className="md:hidden bg-[#0D1117] border-b border-white/10 py-6 px-4 flex flex-col gap-6 animate-fade-in shadow-2xl">
           <NavLink to="/product" className="text-lg font-medium text-gray-300">Product</NavLink>
           <NavLink to="/how-it-works" className="text-lg font-medium text-gray-300">How It Works</NavLink>
           <button onClick={() => navigate('/login')} className="text-lg font-medium text-gray-300 text-left">Login</button>
           <Button onClick={() => {
                setUserState(UserState.ONBOARDING);
                navigate('/onboarding');
            }} className="w-full h-12 text-base">Connect Wallet</Button>
        </div>
      )}
    </nav>
  );

  const AppSidebar = () => {
    const links = [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/wallet', icon: Wallet, label: 'Wallet' },
        { to: '/remove', icon: Leaf, label: 'Remove' },
        { to: '/insights', icon: BrainCircuit, label: 'Insights AI' },
        { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
        { to: '/profile', icon: Settings, label: 'Settings' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-surface/50 backdrop-blur-xl border-r border-white/5 hidden lg:flex flex-col z-40">
            <div className="h-20 flex items-center px-6 border-b border-white/5 cursor-pointer" onClick={() => navigate('/dashboard')}>
                 <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                    <Leaf className="text-black fill-black" size={18} />
                 </div>
                 <span className="font-display font-bold text-xl text-white">CO₂ Wallet</span>
            </div>
            
            <div className="flex-1 py-6 px-3 flex flex-col gap-1">
                {links.map(link => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-white/5 text-emerald-400 shadow-inner shadow-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <link.icon size={18} />
                        {link.label}
                    </NavLink>
                ))}
            </div>

            <div className="p-4 border-t border-white/5">
                <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 w-full text-left text-gray-400 hover:text-white transition-colors text-sm font-medium hover:bg-red-500/10 rounded-lg hover:text-red-400">
                    <LogOut size={18} />
                    Disconnect
                </button>
            </div>
        </aside>
    );
  }

  const AppMobileNav = () => (
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-lg border-t border-white/5 pb-safe z-50">
          <div className="flex justify-around items-center h-16">
              <NavLink to="/dashboard" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-emerald-400' : 'text-gray-500'}`}>
                  <LayoutDashboard size={20} />
                  <span className="text-[10px]">Home</span>
              </NavLink>
              <NavLink to="/remove" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-emerald-400' : 'text-gray-500'}`}>
                  <div className="bg-primary/20 p-2 rounded-full -mt-6 border-4 border-background relative">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-full"></div>
                    <Leaf size={24} className="text-emerald-500 relative z-10" />
                  </div>
              </NavLink>
              <NavLink to="/insights" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-emerald-400' : 'text-gray-500'}`}>
                  <BrainCircuit size={20} />
                  <span className="text-[10px]">AI</span>
              </NavLink>
          </div>
      </nav>
  )

  if (showAppLayout) {
    return (
      <div className="min-h-screen bg-background text-white">
        <AppSidebar />
        <main className="lg:ml-64 pb-20 lg:pb-0 min-h-screen">
            {children}
        </main>
        <AppMobileNav />
      </div>
    );
  }

  // Login & Onboarding Layout (Minimal)
  if (userState === UserState.ONBOARDING || isLoginPage) {
      return (
          <div className="min-h-screen bg-background flex flex-col text-white relative overflow-hidden">
               <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/5 blur-[120px] rounded-full -z-10" />
               
               {!isLoginPage && (
                   <div className="p-6">
                     <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                            <Leaf className="text-black fill-black" size={20} />
                        </div>
                     </div>
                   </div>
               )}
               <div className="flex-1 flex items-center justify-center p-0 sm:p-4 relative z-10">
                   {children}
               </div>
          </div>
      )
  }

  // Public Layout
  return (
    <div className="min-h-screen bg-background text-white selection:bg-emerald-500/30">
      <PublicNav />
      <div className="pt-20">
        {children}
      </div>
      <footer className="border-t border-white/5 py-16 px-6 bg-[#0D1117] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
                <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-wider">Product</h4>
                <ul className="space-y-4 text-sm text-gray-500">
                    <li><Link to="/product" className="hover:text-emerald-400 transition-colors">Features</Link></li>
                    <li><Link to="/product" className="hover:text-emerald-400 transition-colors">Pricing</Link></li>
                    <li><Link to="/science" className="hover:text-emerald-400 transition-colors">API</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-wider">Company</h4>
                <ul className="space-y-4 text-sm text-gray-500">
                    <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About</Link></li>
                    <li><Link to="/science" className="hover:text-emerald-400 transition-colors">Methodology</Link></li>
                    <li><Link to="/careers" className="hover:text-emerald-400 transition-colors">Careers</Link></li>
                </ul>
            </div>
             <div>
                <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-wider">Legal</h4>
                <ul className="space-y-4 text-sm text-gray-500">
                    <li><Link to="/privacy" className="hover:text-emerald-400 transition-colors">Privacy</Link></li>
                    <li><Link to="/terms" className="hover:text-emerald-400 transition-colors">Terms</Link></li>
                </ul>
            </div>
             <div className="col-span-2 md:col-span-1">
                 <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded flex items-center justify-center">
                        <Leaf className="text-black fill-black" size={14} />
                    </div>
                    <span className="font-display font-bold text-white">CO₂ Wallet</span>
                 </div>
                 <p className="text-xs text-gray-600 leading-relaxed mb-4">
                     The first decentralized wallet for your real-world carbon footprint. Built on Polygon.
                 </p>
                 <p className="text-xs text-gray-700">
                     &copy; 2025 CO2 Wallet Inc. (v2.1.2)
                 </p>
             </div>
        </div>
      </footer>
    </div>
  );
};