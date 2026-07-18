import {
  LayoutDashboard,
  Users,
  Bell,
  LogOut,
  Sparkles,
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
      relative flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300
      ${
        active
        ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-200"
        : "text-slate-700 hover:bg-emerald-50 hover:translate-x-1"
      }
    `;
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 border-r border-slate-200 bg-white/80 backdrop-blur-lg">
      {/* Logo */}
      <div className="relative p-8 border-b border-slate-200/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-200">
            <Sparkles className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
              EduOnline
            </h1>
            <p className="text-slate-500 text-sm">Dashboard Admin</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="p-5 space-y-2">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className={menuClass("/admin/dashboard")}
        >
          <LayoutDashboard size={20} />
          Dashboard
          {location.pathname === "/admin/dashboard" && (
            <span className="absolute right-4 w-2 h-2 bg-white rounded-full animate-pulse"></span>
          )}
        </button>

        <button
          onClick={() => navigate("/admin/mahasiswa")}
          className={menuClass("/admin/mahasiswa")}
        >
          <Users size={20} />
          Kelola Account
          {location.pathname === "/admin/mahasiswa" && (
            <span className="absolute right-4 w-2 h-2 bg-white rounded-full animate-pulse"></span>
          )}
        </button>

        <button
          onClick={() => navigate("/admin/pengumuman")}
          className={menuClass("/admin/pengumuman")}
        >
          <Bell size={20} />
          Pengumuman
          {location.pathname === "/admin/pengumuman" && (
            <span className="absolute right-4 w-2 h-2 bg-white rounded-full animate-pulse"></span>
          )}
        </button>
      </nav>

      {/* Logout */}
      <div className="absolute bottom-8 left-5 right-5">
        <button
          onClick={logout}
          className="
            group relative flex w-full items-center justify-center gap-2 
            rounded-xl border border-red-200 py-3 
            text-red-500 hover:bg-red-50 hover:border-red-300 transition-all duration-300
            overflow-hidden
          "
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <LogOut size={18} className="group-hover:rotate-12 transition-transform duration-300" />
          Logout
        </button>
      </div>
    </aside>
  );
}