import {
  LayoutDashboard,
  Users,
  Bell,
  LogOut,
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
      flex w-full items-center gap-3 rounded-xl px-4 py-3 transition
      ${
        active
        ? "bg-emerald-600 text-white shadow-sm"
        : "text-slate-700 hover:bg-emerald-50"
      }
    `;
  };


  return (
    <aside className="fixed left-0 top-0 h-screen w-72 border-r border-slate-200 bg-white">

      {/* Logo */}
      <div className="p-8 border-b">

        <h1 className="text-2xl font-bold text-emerald-600">
          EduOnline
        </h1>

        <p className="text-slate-500 text-sm">
          Dashboard Admin
        </p>

      </div>


      {/* Menu */}
      <nav className="p-5 space-y-2">


        <button
          onClick={() => navigate("/admin/dashboard")}
          className={menuClass("/admin/dashboard")}
        >
          <LayoutDashboard size={20}/>
          Dashboard
        </button>



        <button
          onClick={() => navigate("/admin/mahasiswa")}
          className={menuClass("/admin/mahasiswa")}
        >
          <Users size={20}/>
          Kelola Account
        </button>



        <button
          onClick={() => navigate("/admin/pengumuman")}
          className={menuClass("/admin/pengumuman")}
        >
          <Bell size={20}/>
          Pengumuman
        </button>


      </nav>



      {/* Logout */}
      <div className="absolute bottom-8 left-5 right-5">

        <button
          onClick={logout}
          className="
          flex w-full items-center justify-center gap-2 
          rounded-xl border border-red-200 py-3 
          text-red-500 hover:bg-red-50 transition
          "
        >

          <LogOut size={18}/>
          Logout

        </button>

      </div>


    </aside>
  );
}