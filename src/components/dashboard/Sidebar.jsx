import {
  LayoutDashboard,
  Users,
  Bell,
  LogOut,
  Sparkles,
  ChevronRight,
  User,
  Settings,
  Shield,
  Activity
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("eduonline_token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuClass = (path) => {
    const active = location.pathname === path;

    return `
      relative group flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300
      ${
        active
        ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-200"
        : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 hover:translate-x-1"
      }
    `;
  };

  const menuIconClass = (path) => {
    const active = location.pathname === path;
    return `
      transition-all duration-300 flex-shrink-0
      ${active 
        ? "text-white" 
        : "text-slate-400 group-hover:text-emerald-500"
      }
    `;
  };

  const menuItems = [
    { 
      path: "/admin/dashboard", 
      icon: LayoutDashboard, 
      label: "Dashboard",
      description: "Overview sistem"
    },
    { 
      path: "/admin/mahasiswa", 
      icon: Users, 
      label: "Kelola Account",
      description: "Manajemen pengguna"
    },
    { 
      path: "/admin/pengumuman", 
      icon: Bell, 
      label: "Pengumuman",
      description: "Kelola pengumuman"
    }
  ];

  return (
    <aside className="
      fixed left-0 top-0
      h-screen w-72
      bg-white/90 backdrop-blur-xl
      border-r border-slate-200/50
      shadow-2xl
      flex flex-col
      transition-all duration-300
    ">
      {/* Logo Section */}
      <div className="relative p-6 border-b border-slate-200/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg shadow-emerald-200/50 hover:scale-105 transition-transform duration-300">
              <Sparkles className="text-white" size={22} />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
              EduOnline
            </h1>
            <p className="text-xs text-slate-400 font-medium">Dashboard Admin</p>
          </div>
        </div>
        
        {/* Decorative Line */}
        <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-emerald-500/20 via-emerald-500/40 to-emerald-500/20"></div>
      </div>

      {/* User Profile */}
      <div className="mx-4 mt-4 p-3 bg-gradient-to-r from-emerald-50 to-emerald-100/30 rounded-2xl border border-emerald-200/30 hover:border-emerald-200/60 transition-all duration-300 group">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-emerald-200 group-hover:scale-110 transition-transform duration-300">
              <User size={20} />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-700 truncate">Admin Utama</p>
            <p className="text-xs text-slate-400 truncate flex items-center gap-1">
              <Shield size={12} className="text-emerald-500" />
              Super Admin
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-emerald-100/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <ChevronRight size={16} className="text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={menuClass(item.path)}
            >
              {/* Active Indicator */}
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg shadow-white/50"></span>
              )}
              
              <Icon size={20} className={menuIconClass(item.path)} />
              
              <div className="flex-1 text-left">
                <span className="text-sm font-medium block">
                  {item.label}
                </span>
                {active && (
                  <span className="text-[10px] text-white/70 block -mt-0.5">
                    {item.description}
                  </span>
                )}
              </div>
              
              {active && (
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              )}
              {!active && (
                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-slate-400 group-hover:translate-x-1" />
              )}
            </button>
          );
        })}

        {/* Divider with label */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200/50"></div>
          </div>
          <div className="relative flex justify-center">
          </div>
        </div>

        {/* Logout Button */}
        <div className="pt-4 mt-4 border-t border-slate-200/50">
          <button
            onClick={logout}
            className="
              relative group flex w-full items-center gap-3 
              px-4 py-3 rounded-xl
              bg-gradient-to-r from-red-50 to-red-100/30
              text-red-600 hover:text-red-700
              border border-red-200/30 hover:border-red-300/60
              transition-all duration-300
              hover:shadow-lg hover:shadow-red-100/50
              hover:-translate-y-0.5
              overflow-hidden
            "
          >
            {/* Background Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <LogOut size={20} className="text-red-500 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 flex-shrink-0" />
            <span className="flex-1 text-left text-sm font-medium">Logout</span>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-xs text-red-400">→</span>
            </div>
          </button>
        </div>
      </nav>

      {/* Footer - Tanpa indikator hijau */}
      <div className="p-4 border-t border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-white/50">
        <div className="text-center space-y-1">
          <p className="text-xs font-medium text-slate-500">
            © 2026 EduOnline
          </p>
          <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
            <span className="inline-block w-1 h-1 bg-emerald-400 rounded-full"></span>
            Made with ❤️
          </p>
        </div>
      </div>
    </aside>
  );
}