
import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { APPS } from '../constants';
import { AppItem, User } from '../types';

const Dashboard: React.FC<{ isDarkMode: boolean; user: User }> = ({ isDarkMode, user }) => {
  const socketRef = useRef<Socket | null>(null);
  const [customApps, setCustomApps] = useState<AppItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Connect to WebSocket server
    const socket = io();
    socketRef.current = socket;

    socket.on('sync_apps', (syncedApps: AppItem[]) => {
      setCustomApps(syncedApps);
    });

    socket.on('app_added', (newApp: AppItem) => {
      setCustomApps(prev => {
        if (prev.some(a => a.id === newApp.id)) return prev;
        return [newApp, ...prev];
      });
    });

    socket.on('app_deleted', (appId: string) => {
      setCustomApps(prev => prev.filter(a => a.id !== appId));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as any;
    
    const newApp: AppItem = {
      id: Date.now().toString(),
      name: form.appName.value,
      description: form.appDesc.value,
      url: form.appUrl.value,
      icon: 'fa-globe',
      category: 'External Site',
      color: 'bg-indigo-600',
      developer: user.name // Ghi tên người dùng hiện tại
    };

    if (socketRef.current) {
      socketRef.current.emit('add_app', newApp);
    }
    
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Gỡ bỏ trang web này khỏi bộ sưu tập của bạn?')) {
      if (socketRef.current) {
        socketRef.current.emit('delete_app', id);
      }
    }
  };

  const handleLaunch = (url: string) => {
    // Chuyển hướng trực tiếp đến trang web
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const allApps = [...customApps, ...APPS];
  const filteredApps = allApps.filter(app => 
    app.name.toLowerCase().includes(search.toLowerCase()) || 
    (app.developer || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className={`flex flex-col md:flex-row md:items-end justify-between gap-8 border-b pb-12 ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
        <div className="space-y-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-black text-white'}`}>
            <i className="fa-solid fa-microchip"></i> HUB COMMAND CENTER • v3.5
          </div>
          <h1 className={`text-6xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>MY APPS</h1>
          <p className="text-gray-500 max-w-lg font-medium">Truy cập nhanh các nền tảng web yêu thích của bạn. Click "Launch" để chuyển đến trang nguồn.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
            <input 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Tìm kiếm ứng dụng..."
              className={`pl-12 pr-6 py-4 rounded-2xl outline-none border transition-all font-bold text-sm w-full sm:w-80 ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-indigo-500' : 'bg-gray-100 border-gray-200 focus:border-black'}`}
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:-translate-y-1 transition-all active:scale-95"
          >
            Add New Website
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredApps.map((app) => (
          <div 
            key={app.id} 
            className={`group p-8 rounded-[2.5rem] border transition-all hover:-translate-y-2 relative overflow-hidden ${
              isDarkMode ? 'bg-[#0a0a0a] border-white/5 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10' : 'bg-white border-gray-100 hover:border-black hover:shadow-2xl shadow-lg shadow-gray-200/50'
            }`}
          >
            {customApps.some(a => a.id === app.id) && (
              <button 
                onClick={(e) => { e.stopPropagation(); handleDelete(app.id); }}
                className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500 hover:text-white flex items-center justify-center z-20"
              >
                <i className="fa-solid fa-trash-can text-xs"></i>
              </button>
            )}

            <div className={`${app.color} w-16 h-16 rounded-[2rem] flex items-center justify-center text-white text-2xl mb-8 shadow-xl group-hover:scale-110 transition-transform relative z-10`}>
              <i className={`fa-solid ${app.icon}`}></i>
            </div>
            
            <div className="space-y-2 mb-8 relative z-10">
              <h3 className={`text-2xl font-black uppercase tracking-tighter leading-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{app.name}</h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-2">{app.description}</p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/5 relative z-10">
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-indigo-500 uppercase tracking-widest">Added By</span>
                <span className={`text-[11px] font-black uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{app.developer || 'System'}</span>
              </div>
              <button 
                onClick={() => handleLaunch(app.url)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  isDarkMode ? 'bg-white/5 text-white hover:bg-indigo-600 shadow-lg' : 'bg-black text-white hover:bg-indigo-600 shadow-xl'
                }`}
              >
                Launch App
              </button>
            </div>
            
            <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full ${app.color} opacity-[0.03] group-hover:scale-150 transition-transform duration-700`}></div>
          </div>
        ))}

        {filteredApps.length === 0 && (
          <div className="col-span-full py-20 text-center opacity-30">
            <i className="fa-solid fa-ghost text-6xl mb-4"></i>
            <p className="text-sm font-black uppercase tracking-widest">No Applications Found</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
           <div className={`w-full max-w-lg rounded-[3rem] border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-gray-200'}`}>
              <div className="p-10 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h2 className={`text-2xl font-black uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Add New Site</h2>
                  <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-1">Direct External Integration</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-rose-500 hover:text-white transition-all">
                  <i className="fa-solid fa-xmark text-lg"></i>
                </button>
              </div>
              <form onSubmit={handleDeploy} className="p-10 space-y-6">
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">App Display Name</label>
                    <input name="appName" required className={`w-full px-6 py-4 rounded-2xl outline-none border transition-all font-bold ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-indigo-500' : 'bg-gray-50 border-gray-200 focus:border-black'}`} placeholder="Ví dụ: Portfolio của tôi" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Target Website URL</label>
                    <input name="appUrl" type="url" required className={`w-full px-6 py-4 rounded-2xl outline-none border transition-all font-bold ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-indigo-500' : 'bg-gray-50 border-gray-200 focus:border-black'}`} placeholder="https://myapp.com" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Short Description</label>
                    <textarea name="appDesc" required className={`w-full px-6 py-4 rounded-2xl outline-none border transition-all font-bold resize-none ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-indigo-500' : 'bg-gray-50 border-gray-200 focus:border-black'}`} rows={2} placeholder="Mô tả ngắn gọn về ứng dụng này..." />
                 </div>
                 
                 <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl flex items-center gap-3">
                    <i className="fa-solid fa-shield-halved text-indigo-500"></i>
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Website will be registered under: {user.name}</p>
                 </div>

                 <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-xl hover:-translate-y-1 transition-all">
                    Register Application
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
