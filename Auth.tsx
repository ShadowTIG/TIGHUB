
import React, { useState } from 'react';
import { User } from '../types';
import TIGLogo from '../components/TIGLogo';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const users: User[] = JSON.parse(localStorage.getItem('tig_hub_users') || '[]');

    if (isLogin) {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        onLogin(user);
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không đúng.');
      }
    } else {
      if (!username || !password || !name) {
        setError('Vui lòng điền đầy đủ thông tin.');
        return;
      }
      if (users.some(u => u.username === username)) {
        setError('Tên đăng nhập đã tồn tại.');
        return;
      }
      const newUser: User = { username, password, name };
      localStorage.setItem('tig_hub_users', JSON.stringify([...users, newUser]));
      onLogin(newUser);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="bg-[#0a0a0a] w-full max-w-md rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] border border-white/5 overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        <div className="p-10 space-y-8 relative overflow-hidden">
          {/* Ambient Glow background */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/20 blur-[80px] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-rose-600/20 blur-[80px] rounded-full"></div>

          <div className="text-center space-y-4 relative z-10">
            <TIGLogo size={90} className="mx-auto" />
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight leading-tight">
                {isLogin ? 'HUB ACCESS' : 'CREATE ID'}
              </h1>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-white/20"></span>
                <p className="text-[9px] text-white/40 font-black tracking-[0.3em] uppercase">
                  Tech • IT • Gaming
                </p>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-white/20"></span>
              </div>
            </div>
          </div>

          <form onSubmit={handleAuth} className="space-y-4 relative z-10">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-white/30 uppercase ml-1 tracking-widest">Full Name</label>
                <div className="relative">
                  <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-sm"></i>
                  <input
                    type="text"
                    required
                    className="w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-1 focus:ring-white/40 focus:bg-white/10 outline-none transition-all placeholder:text-white/10 text-white text-sm"
                    placeholder="Nguyễn Văn A"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-black text-white/30 uppercase ml-1 tracking-widest">Username</label>
              <div className="relative">
                <i className="fa-solid fa-at absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-sm"></i>
                <input
                  type="text"
                  required
                  className="w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-1 focus:ring-white/40 focus:bg-white/10 outline-none transition-all placeholder:text-white/10 text-white text-sm"
                  placeholder="username123"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-white/30 uppercase ml-1 tracking-widest">Security Key</label>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-sm"></i>
                <input
                  type="password"
                  required
                  className="w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-1 focus:ring-white/40 focus:bg-white/10 outline-none transition-all placeholder:text-white/10 text-white text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-[10px] font-black uppercase tracking-wider flex items-center gap-2 animate-shake">
                <i className="fa-solid fa-circle-exclamation"></i>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-500 hover:text-white shadow-xl transition-all active:scale-[0.97] mt-4"
            >
              {isLogin ? 'Initialize System' : 'Sync Identity'}
            </button>
          </form>

          <div className="text-center relative z-10">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-[10px] font-black text-white/20 hover:text-white transition-colors uppercase tracking-[0.2em]"
            >
              {isLogin ? "Register New Sector" : "Back to Control Center"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
