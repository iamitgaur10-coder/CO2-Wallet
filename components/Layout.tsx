import React from 'react';
import { UserState } from '../types';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
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
  Globe,
  ArrowRight
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
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">C</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">CO₂ Wallet</span>
          </div>
          
          {!isLoginPage && (
              <>
                <div className="hidden md:flex items-center gap-8">
                    <NavLink to="/" className={({isActive}) => `text-sm font-medium hover:text-white transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}>Product</NavLink>
                    <NavLink to="/how-it-works" className={({isActive}) => `text-sm font-medium hover:text-white transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}>How It Works</NavLink>
                    <NavLink to="/science" className={({isActive}) => `text-sm font-medium hover:text-white transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}>Science</NavLink>
                    
                    <button onClick={() => navigate('/login')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        Login
                    </button>

                    <Button onClick={() => {
                        setUserState(UserState.ONBOARDING);
                        navigate('/onboarding');
                    }}>Get Started</Button>
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
           <NavLink to="/" className="text-base font-medium text-gray-300">Product</NavLink>
           <NavLink to="/how-it-works" className="text-base font-medium text-gray-300">How It Works</NavLink>
           <NavLink to="/science" className="text-base font-medium text-gray-300">Science</NavLink>
           <button onClick={() => navigate('/login')} className="text-base font-medium text-gray-300 text-left">Login</button>
           <Button onClick={() => {
                setUserState(UserState.ONBOARDING);
                navigate('/onboarding');
            }} className="w-full">Get Started</Button>
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
            <div className="h-16 flex items-center px-6 border-b border-white/5 cursor-pointer" onClick={() => navigate('/dashboard')}>
                 <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded flex items-center justify-center mr-2">
                    <span className="text-black font-bold text-xs">C</span>
                 </div>
                 <span className="font-display font-bold text-lg text-white">CO₂ Wallet</span>
            </div>
            
            <div className="flex-1 py-6 px-3 flex flex-col gap-1">
                {links.map(link => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-white/5 text-emerald-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <link.icon size={18} />
                        {link.label}
                    </NavLink>
                ))}
            </div>

            <div className="p-4 border-t border-white/5">
                <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 w-full text-left text-gray-400 hover:text-white transition-colors text-sm font-medium">
                    <LogOut size={18} />
                    Sign Out
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
                            <span className="text-black font-bold text-lg">C</span>
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
      <div className="pt-16">
        {children}
      </div>
      <footer className="border-t border-white/5 py-12 px-6 bg-surface/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
                <h4 className="font-bold mb-4 text-white">Product</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><button onClick={() => navigate('/')} className="hover:text-emerald-400">Features</button></li>
                    <li><button onClick={() => navigate('/')} className="hover:text-emerald-400">Pricing</button></li>
                    <li><button onClick={() => navigate('/science')} className="hover:text-emerald-400">API</button></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-4 text-white">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><button onClick={() => navigate('/about')} className="hover:text-emerald-400">About</button></li>
                    <li><button onClick={() => navigate('/science')} className="hover:text-emerald-400">Methodology</button></li>
                    <li><button onClick={() => navigate('/careers')} className="hover:text-emerald-400">Careers</button></li>
                </ul>
            </div>
             <div>
                <h4 className="font-bold mb-4 text-white">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><button onClick={() => navigate('/privacy')} className="hover:text-emerald-400">Privacy</button></li>
                    <li><button onClick={() => navigate('/terms')} className="hover:text-emerald-400">Terms</button></li>
                </ul>
            </div>
             <div className="col-span-2 md:col-span-1">
                 <h4 className="font-bold mb-4 text-emerald-400">CO₂ Removal Wallet</h4>
                 <p className="text-xs text-gray-500">
                     Built for Gemini 3 Pro Hackathon.
                     <br />
                     &copy; 2025 CO2 Wallet Inc.
                 </p>
             </div>
        </div>
      </footer>
    </div>
  );
};