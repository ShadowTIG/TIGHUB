
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Landing from './pages/Landing';
import Settings from './pages/Settings';
import Community from './pages/Community';
import TIGLogo from './components/TIGLogo';
import { User } from './types';

const Navigation: React.FC<{ user: User | null; onLogout: () => void; isDarkMode: boolean }> = ({ user, onLogout, isDarkMode }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';
  
  const navItems = user ? [
    { path: '/dashboard', label: 'APPS', icon: 'fa-th-large' },
    { path: '/community', label: 'SOCIAL', icon: 'fa-users' }
  ] : [
    { path: '/', label: 'HOME', icon: 'fa-house' }
  ];

  if (isAuthPage) return null;

  return (
    <nav className={`fixed top-0 left-0 right-0 h-16 z-[150] border-b no-print transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#0a0a0a]/90 border-white/5 text-white backdrop-blur-md shadow-2xl shadow-black/50' 
        : 'bg-white/90 border-gray-200/50 text-gray-900 backdrop-blur-md shadow-lg shadow-gray-200/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <TIGLogo size={34} className="group-hover:rotate-[360deg] transition-transform duration-700" />
            <div className="flex flex-col leading-none">
              <span className={`text-lg font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>TIG HUB</span>
              <span className="text-[8px] font-black text-indigo-500 tracking-[0.3em] uppercase">by TIG-Minh</span>
            </div>
          </Link>
        </div>
        
        <div className={`flex gap-1 p-1 rounded-xl transition-colors ${isDarkMode ? 'bg-white/5' : 'bg-gray-100/50'}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-5 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all flex items-center gap-2 ${
                location.pathname === item.path 
                  ? (isDarkMode ? 'bg-indigo-600 text-white shadow-md' : 'bg-black text-white shadow-md')
                  : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900')
              }`}
            >
              <i className={`fa-solid ${item.icon} text-xs`}></i>
              <span className="hidden xs:inline">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden sm:flex flex-col items-end">
                <span className={`text-[10px] font-black leading-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user.name.toUpperCase()}</span>
                <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-widest mt-0.5">Verified User</span>
              </div>
              <div className="relative group">
                <div className="p-1 cursor-pointer">
                  <button className={`w-10 h-10 rounded-xl border-2 p-0.5 overflow-hidden transition-all group-hover:scale-110 active:scale-95 ${isDarkMode ? 'border-white/20 bg-black' : 'border-black bg-white'}`}>
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} 
                      alt="Profile" 
                      className="w-full h-full rounded-lg object-cover"
                    />
                  </button>
                </div>
                
                <div className="absolute right-0 top-full pt-2 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-[160]">
                  <div className={`rounded-2xl shadow-2xl border py-2 ${isDarkMode ? 'bg-[#0f0f0f] border-white/10' : 'bg-white border-gray-200'}`}>
                    <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                      <p className={`text-xs font-black uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</p>
                      <p className="text-[10px] text-gray-500">@{user.username}</p>
                    </div>
                    <div className="p-2 space-y-1">
                      <Link 
                        to="/settings"
                        className={`w-full text-left px-4 py-3 text-[10px] font-black rounded-xl flex items-center gap-3 transition-all uppercase tracking-widest ${
                          isDarkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                        }`}
                      >
                        <i className="fa-solid fa-gear text-xs"></i>
                        Settings
                      </Link>
                      <button 
                        onClick={onLogout}
                        className="w-full text-left px-4 py-3 text-[10px] font-black text-rose-500 hover:bg-rose-50 hover:text-white rounded-xl flex items-center gap-3 transition-all uppercase tracking-widest"
                      >
                        <i className="fa-solid fa-power-off text-xs"></i>
                        Disconnect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Link 
              to="/auth"
              className="px-6 py-2.5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-black/10 active:scale-95"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const MainContent: React.FC = () => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('tig_hub_theme');
    return saved === 'dark';
  });

  useEffect(() => {
    const session = localStorage.getItem('tig_hub_session');
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch (e) {
        console.error("Failed to parse session", e);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      document.body.style.backgroundColor = '#050505';
    } else {
      document.body.classList.remove('dark');
      document.body.style.backgroundColor = '#fcfcfc';
    }
    localStorage.setItem('tig_hub_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('tig_hub_session', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('tig_hub_session');
  };

  const toggleTheme = (dark: boolean) => {
    setIsDarkMode(dark);
  };

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-[#050505]' : 'bg-white'}`}>
      <div className="flex flex-col items-center gap-4">
        <TIGLogo size={80} className="animate-spin duration-[3s]" />
        <span className="text-[10px] font-black tracking-[0.5em] text-gray-400 animate-pulse uppercase">Syncing Hub...</span>
      </div>
    </div>
  );

  const isLandingPage = location.pathname === '/';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-[#fcfcfc] text-gray-900'}`}>
      <Navigation user={user} onLogout={handleLogout} isDarkMode={isDarkMode} />
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isLandingPage ? '' : 'pt-32 pb-20'}`}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route 
            path="/auth" 
            element={user ? <Navigate to="/dashboard" /> : <Auth onLogin={handleLogin} />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard isDarkMode={isDarkMode} user={user} /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/community" 
            element={user ? <Community isDarkMode={isDarkMode} user={user} /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/settings" 
            element={user ? <Settings isDarkMode={isDarkMode} onThemeChange={toggleTheme} /> : <Navigate to="/auth" />} 
          />
        </Routes>
      </main>
      
      <footer className={`py-12 border-t text-center no-print ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
        <div className="flex flex-col items-center gap-2">
          <TIGLogo size={24} className="grayscale opacity-20" />
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">
            © 2025 TIG Hub Studio • Made by TIG-Minh
          </p>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <MainContent />
    </HashRouter>
  );
};

export default App;
