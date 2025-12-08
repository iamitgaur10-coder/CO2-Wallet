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
  // FIX: Treat DEMO users as Authenticated for Layout purposes so they see the Sidebar
  const showAppLayout = userState === UserState.AUTHENTICATED || userState === UserState.DEMO;

  const PublicNav = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 bg-[#0D1117]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-900/50">
              <Leaf className="text-black fill-black" size={20} />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-white">CO₂ Wallet</span>
          </div>
          
          {!isLoginPage && (
              <>
                <div className="hidden md:flex items-center gap-8">
                    <NavLink to="/product" className={({isActive}) => `text-sm font-medium hover:text-white transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}>Product</NavLink>
                    <NavLink to="/how-it-works" className={({isActive}) => `text-sm font-medium hover:text-white transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}>How It Works</NavLink>
                    
                    <button onClick={() => navigate('/login')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        Login
                    </button>

                    <Button onClick={() => {
                        setUserState(UserState.ONBOARDING);
                        navigate('/onboarding');
                    }} className="h-10 px-6 font-bold shadow-md shadow-emerald-900/20 gap-2">
                        <WalletIcon size={16} />
                        Connect Wallet
                    </Button>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-400">
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
              </>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && !isLoginPage && (
        <div className="md:hidden bg-background border-b border-white/10 py-4 px-4 flex flex-col gap-4 animate-fade-in">
           <NavLink to="/product" className="text-base font-medium text-gray-300">Product</NavLink>
           <NavLink to="/how-it-works" className="text-base font-medium text-gray-300">How It Works</NavLink>
           <button onClick={() => navigate('/login')} className="text-base font-medium text-gray-300 text-left">Login</button>
           <Button onClick={() => {
                setUserState(UserState.ONBOARDING);
                navigate('/onboarding');
            }} className="w-full">Connect Wallet</Button>
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
        <aside className="fixed left-0 top-0 h-screen w-64 bg-surface border-r border-white/5 hidden lg:flex flex-col z-40">
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
                        className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-white/5 text-emerald-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <link.icon size={18} />
                        {link.label}
                    </NavLink>
                ))}
            </div>

            <div className="p-4 border-t border-white/5">
                <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 w-full text-left text-gray-400 hover:text-white transition-colors text-sm font-medium">
                    <LogOut size={18} />
                    Disconnect
                </button>
            </div>
        </aside>
    );
  }

  const AppMobileNav = () => (
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-white/5 pb-safe z-50">
          <div className="flex justify-around items-center h-16">
              <NavLink to="/dashboard" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-emerald-400' : 'text-gray-500'}`}>
                  <LayoutDashboard size={20} />
                  <span className="text-[10px]">Home</span>
              </NavLink>
              <NavLink to="/remove" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-emerald-400' : 'text-gray-500'}`}>
                  <div className="bg-primary/20 p-2 rounded-full -mt-6 border-4 border-background">
                    <Leaf size={24} className="text-emerald-500" />
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
          <div className="min-h-screen bg-background flex flex-col text-white">
               {!isLoginPage && (
                   <div className="p-6">
                     <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                            <Leaf className="text-black fill-black" size={20} />
                        </div>
                     </div>
                   </div>
               )}
               <div className="flex-1 flex items-center justify-center p-0 sm:p-4">
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
      <footer className="border-t border-white/5 py-12 px-6 bg-surface/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
                <h4 className="font-bold mb-4 text-white">Product</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><Link to="/product" className="hover:text-emerald-400">Features</Link></li>
                    <li><Link to="/product" className="hover:text-emerald-400">Pricing</Link></li>
                    <li><Link to="/science" className="hover:text-emerald-400">API</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-4 text-white">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><Link to="/about" className="hover:text-emerald-400">About</Link></li>
                    <li><Link to="/science" className="hover:text-emerald-400">Methodology</Link></li>
                    <li><Link to="/careers" className="hover:text-emerald-400">Careers</Link></li>
                </ul>
            </div>
             <div>
                <h4 className="font-bold mb-4 text-white">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><Link to="/privacy" className="hover:text-emerald-400">Privacy</Link></li>
                    <li><Link to="/terms" className="hover:text-emerald-400">Terms</Link></li>
                </ul>
            </div>
             <div className="col-span-2 md:col-span-1">
                 <h4 className="font-bold mb-4 text-emerald-400">CO₂ Removal Wallet</h4>
                 <p className="text-xs text-gray-500">
                     Built for the Planet.
                     <br />
                     &copy; 2025 CO2 Wallet Inc.
                 </p>
             </div>
        </div>
      </footer>
    </div>
  );
};