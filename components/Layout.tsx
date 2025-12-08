import React from 'react';
import { UserState } from '../types';
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from './UI';
import { 
  LayoutDashboard, 
  Wallet, 
  Hexagon, 
  BrainCircuit, 
  Trophy, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Wallet as WalletIcon,
  Calculator
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
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/[0.08] bg-[#0A0A0A]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Hexagon className="text-black fill-black/10" size={20} strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-white group-hover:text-emerald-50 transition-colors">Moss</span>
          </div>
          
          {!isLoginPage && (
              <>
                <div className="hidden md:flex items-center gap-8 h-full">
                    <NavLink to="/product" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Product</NavLink>
                    <NavLink to="/how-it-works" className="text-sm font-medium text-white/60 hover:text-white transition-colors">How It Works</NavLink>
                    <NavLink to="/calculator" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Calculator</NavLink>
                    
                    <div className="pl-4">
                        <Button onClick={() => {
                            setUserState(UserState.ONBOARDING);
                            navigate('/onboarding');
                        }} className="h-10 px-5 bg-white text-black hover:bg-gray-200 font-bold rounded-lg border-0">
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
        <div className="md:hidden bg-[#0A0A0A] border-b border-white/10 py-6 px-4 flex flex-col gap-6 animate-fade-in shadow-2xl">
           <NavLink to="/product" className="text-lg font-medium text-gray-300">Product</NavLink>
           <NavLink to="/calculator" className="text-lg font-medium text-gray-300">Calculator</NavLink>
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
        { to: '/remove', icon: Hexagon, label: 'Remove' },
        { to: '/calculator', icon: Calculator, label: 'Calculator' },
        { to: '/insights', icon: BrainCircuit, label: 'Insights AI' },
        { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
        { to: '/profile', icon: Settings, label: 'Settings' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0A0A0A] border-r border-white/5 hidden lg:flex flex-col z-40">
            <div className="h-20 flex items-center px-6 border-b border-white/5 cursor-pointer" onClick={() => navigate('/dashboard')}>
                 <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center mr-3">
                    <Hexagon className="text-black fill-black/10" size={18} />
                 </div>
                 <span className="font-display font-bold text-xl text-white">Moss</span>
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
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0A0A0A]/90 backdrop-blur-lg border-t border-white/5 pb-safe z-50">
          <div className="flex justify-around items-center h-16">
              <NavLink to="/dashboard" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-emerald-400' : 'text-gray-500'}`}>
                  <LayoutDashboard size={20} />
                  <span className="text-[10px]">Home</span>
              </NavLink>
              <NavLink to="/remove" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-emerald-400' : 'text-gray-500'}`}>
                  <div className="bg-emerald-500/20 p-2 rounded-full -mt-6 border-4 border-[#0A0A0A] relative">
                    <Hexagon size={24} className="text-emerald-500 relative z-10" />
                  </div>
              </NavLink>
              <NavLink to="/calculator" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-emerald-400' : 'text-gray-500'}`}>
                  <Calculator size={20} />
                  <span className="text-[10px]">Calc</span>
              </NavLink>
          </div>
      </nav>
  )

  if (showAppLayout) {
    return (
      <div className="min-h-screen bg-background text-white">
        <AppSidebar />
        <main className="lg:ml-64 pb-20 lg:pb-0 min-h-screen bg-[#0A0A0A]">
            {children}
        </main>
        <AppMobileNav />
      </div>
    );
  }

  // Login & Onboarding Layout
  if (userState === UserState.ONBOARDING || isLoginPage) {
      return (
          <div className="min-h-screen bg-[#0A0A0A] flex flex-col text-white relative overflow-hidden">
               <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/5 blur-[120px] rounded-full -z-10" />
               {!isLoginPage && (
                   <div className="p-6">
                     <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                            <Hexagon className="text-black" size={20} />
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
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <PublicNav />
      <div className="pt-20">
        {children}
      </div>
      <footer className="border-t border-white/5 py-16 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
             <div className="col-span-2 md:col-span-1">
                 <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center">
                        <Hexagon className="text-black" size={14} />
                    </div>
                    <span className="font-display font-bold text-white">Moss</span>
                 </div>
                 <p className="text-xs text-gray-600 leading-relaxed mb-4">Offset on-chain. Flex forever.</p>
                 <div className="text-[10px] text-gray-700 font-mono">v4.0.0</div>
             </div>
             <div>
                <h4 className="font-bold mb-4 text-white">Product</h4>
                <div className="flex flex-col gap-2">
                    <Link to="/product" className="text-sm text-gray-400 hover:text-emerald-400">Features</Link>
                    <Link to="/product#pricing" className="text-sm text-gray-400 hover:text-emerald-400">Pricing</Link>
                    <Link to="/calculator" className="text-sm text-gray-400 hover:text-emerald-400">Calculator</Link>
                </div>
             </div>
             <div>
                <h4 className="font-bold mb-4 text-white">Company</h4>
                <div className="flex flex-col gap-2">
                    <Link to="/about" className="text-sm text-gray-400 hover:text-emerald-400">About</Link>
                    <Link to="/careers" className="text-sm text-gray-400 hover:text-emerald-400">Careers</Link>
                    <Link to="/blog" className="text-sm text-gray-400 hover:text-emerald-400">Blog</Link>
                </div>
             </div>
             <div>
                <h4 className="font-bold mb-4 text-white">Legal</h4>
                <div className="flex flex-col gap-2">
                    <Link to="/privacy" className="text-sm text-gray-400 hover:text-emerald-400">Privacy</Link>
                    <Link to="/terms" className="text-sm text-gray-400 hover:text-emerald-400">Terms</Link>
                </div>
             </div>
        </div>
      </footer>
    </div>
  );
};