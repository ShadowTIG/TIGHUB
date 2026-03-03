
import React from 'react';
import { Link } from 'react-router-dom';
import TIGLogo from '../components/TIGLogo';

const Landing: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-600/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center">
        <div className="mb-8 animate-in fade-in zoom-in duration-1000">
          <TIGLogo size={120} className="mx-auto drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
          THE FUTURE OF <br /> TECHNOLOGY & DESIGN
        </h1>
        
        <p className="max-w-2xl text-gray-400 text-lg md:text-xl font-medium leading-relaxed mb-10">
          <span className="text-indigo-400 font-bold uppercase tracking-widest text-sm">Technology • IT • Gaming</span>
          <br />
          TIG Hub là hệ sinh thái tối ưu tích hợp quản lý ứng dụng thông minh và giải pháp kết nối cộng đồng thế hệ mới dành cho các chuyên gia.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/auth" 
            className="px-10 py-4 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)]"
          >
            Bắt đầu ngay
          </Link>
          <a 
            href="#features" 
            className="px-10 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all backdrop-blur-md"
          >
            Tìm hiểu thêm
          </a>
        </div>
      </div>

      {/* Features Preview */}
      <div id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: 'fa-microchip', title: 'Technology', desc: 'Tích hợp những công nghệ phần cứng và phần mềm tiên tiến nhất 2025.' },
            { icon: 'fa-code', title: 'IT Solutions', desc: 'Quản lý kho ứng dụng và quy trình làm việc CNTT tập trung, bảo mật.' },
            { icon: 'fa-gamepad', title: 'Gaming DNA', desc: 'Trải nghiệm mượt mà với giao diện lấy cảm hứng từ thế giới gaming đỉnh cao.' }
          ].map((feat, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.05] transition-all">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
                <i className={`fa-solid ${feat.icon} text-xl text-indigo-400`}></i>
              </div>
              <h3 className="text-xl font-black mb-3 uppercase tracking-wider">{feat.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
