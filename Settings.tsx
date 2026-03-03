
import React from 'react';

interface SettingsProps {
  isDarkMode: boolean;
  onThemeChange: (dark: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({ isDarkMode, onThemeChange }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-in slide-in-from-bottom-4 duration-700 mt-4">
      <header className="space-y-4">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${
          isDarkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
        }`}>
          <i className="fa-solid fa-gear"></i> System Config
        </div>
        <h1 className={`text-5xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>SYSTEM SETTINGS</h1>
        <p className="text-gray-500 font-medium">Tùy chỉnh giao diện và cấu hình hệ thống TIG Hub của bạn.</p>
      </header>

      <div className="space-y-8">
        {/* Appearance Section */}
        <section className={`p-8 rounded-[2.5rem] border transition-all ${
          isDarkMode ? 'bg-[#0a0a0a] border-white/5 shadow-2xl' : 'bg-white border-gray-100 shadow-xl'
        }`}>
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-white/5 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
              <i className="fa-solid fa-palette text-xl"></i>
            </div>
            <div>
              <h2 className={`text-xl font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Appearance</h2>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Giao diện người dùng</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => onThemeChange(false)}
              className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 group ${
                !isDarkMode 
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-lg shadow-indigo-100/50' 
                  : 'border-white/5 bg-white/5 hover:border-white/20'
              }`}
            >
              <div className={`w-16 h-12 rounded-lg bg-white shadow-sm border border-gray-100 overflow-hidden relative ${!isDarkMode ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`}>
                <div className="absolute top-0 left-0 w-full h-2 bg-gray-100"></div>
                <div className="p-2 space-y-1 mt-2">
                  <div className="w-full h-1 bg-gray-100 rounded"></div>
                  <div className="w-2/3 h-1 bg-gray-100 rounded"></div>
                </div>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${!isDarkMode ? 'text-indigo-600' : 'text-gray-400 group-hover:text-white'}`}>Light Mode</span>
            </button>

            <button
              onClick={() => onThemeChange(true)}
              className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 group ${
                isDarkMode 
                  ? 'border-indigo-600 bg-indigo-900/10 shadow-lg shadow-indigo-900/50' 
                  : 'border-gray-100 bg-gray-50 hover:border-gray-200'
              }`}
            >
              <div className={`w-16 h-12 rounded-lg bg-[#0a0a0a] shadow-sm border border-white/5 overflow-hidden relative ${isDarkMode ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`}>
                <div className="absolute top-0 left-0 w-full h-2 bg-white/5"></div>
                <div className="p-2 space-y-1 mt-2">
                  <div className="w-full h-1 bg-white/10 rounded"></div>
                  <div className="w-2/3 h-1 bg-white/10 rounded"></div>
                </div>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-indigo-400' : 'text-gray-400 group-hover:text-black'}`}>Dark Premium</span>
            </button>
          </div>
        </section>

        {/* Account Section (Visual Only for Demo) */}
        <section className={`p-8 rounded-[2.5rem] border transition-all ${
          isDarkMode ? 'bg-[#0a0a0a] border-white/5 shadow-2xl opacity-50' : 'bg-white border-gray-100 shadow-xl opacity-50'
        }`}>
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-white/5 text-rose-400' : 'bg-rose-50 text-rose-600'}`}>
              <i className="fa-solid fa-shield-halved text-xl"></i>
            </div>
            <div>
              <h2 className={`text-xl font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Security</h2>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Bảo mật & Tài khoản</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'border-white/5 bg-white/5' : 'bg-gray-50 border-gray-100'}`}>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Project Role</p>
              <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Lead Developer & Designer</p>
            </div>
            <p className="text-[10px] font-bold text-gray-400 italic">Advanced security and account features are currently locked by the Hub Administrator.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
