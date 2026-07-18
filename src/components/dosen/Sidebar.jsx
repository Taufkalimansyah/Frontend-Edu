import {
    LayoutDashboard,
    BookOpen,
    FilePlus,
    ClipboardList,
    GraduationCap,
    CalendarDays,
    LogOut,
    Sparkles,
    ChevronRight,
    User
} from "lucide-react";

import {
    useNavigate,
    useLocation
} from "react-router-dom";

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
            relative group flex items-center gap-3
            w-full px-4 py-3 rounded-xl transition-all duration-300
            ${active 
                ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-200" 
                : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
            }
        `;
    };

    const menuIconClass = (path) => {
        const active = location.pathname === path;
        return `
            transition-all duration-300
            ${active 
                ? "text-white" 
                : "text-slate-400 group-hover:text-emerald-500"
            }
        `;
    };

    const menuItems = [
        { path: "/dosen/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { path: "/dosen/kelas", icon: BookOpen, label: "Kelas Saya" },
        { path: "/dosen/upload-materi", icon: FilePlus, label: "Upload Materi" },
        { path: "/dosen/tugas", icon: ClipboardList, label: "Buat Tugas" },
        { path: "/dosen/penilaian", icon: GraduationCap, label: "Penilaian" },
        { path: "/dosen/absensi", icon: CalendarDays, label: "Absensi" }
    ];

    return (
        <aside className="
            fixed left-0 top-0
            h-screen w-72
            bg-white/90 backdrop-blur-lg
            border-r border-slate-200/50
            shadow-xl
            flex flex-col
        ">

            {/* Logo Section */}
            <div className="relative p-6 border-b border-slate-200/50">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl shadow-lg shadow-emerald-200 animate-pulse">
                            <Sparkles className="text-white" size={22} />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                            EduOnline
                        </h1>
                        <p className="text-xs text-slate-400 font-medium">Dashboard Dosen</p>
                    </div>
                </div>
            </div>

            {/* User Profile */}
            <div className="mx-4 mt-4 p-3 bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-2xl border border-emerald-200/50">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-200">
                            <User size={18} />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-700">Dosen Pengajar</p>
                        <p className="text-xs text-slate-500">dosen@eduonline.com</p>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
                {menuItems.map((item) => {
                    const active = location.pathname === item.path;
                    const Icon = item.icon;
                    
                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={menuClass(item.path)}
                        >
                            {active && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></span>
                            )}
                            <Icon size={20} className={menuIconClass(item.path)} />
                            <span className="flex-1 text-left text-sm font-medium">
                                {item.label}
                            </span>
                            {active && (
                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                            )}
                            {!active && (
                                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-slate-400" />
                            )}
                        </button>
                    );
                })}

                {/* Divider */}
                <div className="my-4 border-t border-slate-200/50"></div>

                {/* Logout Button */}
                <button
                    onClick={logout}
                    className="
                        relative group flex items-center gap-3
                        w-full px-4 py-3 rounded-xl
                        bg-gradient-to-r from-red-50 to-red-100/50
                        text-red-600 hover:text-red-700
                        border border-red-200/50
                        transition-all duration-300
                        hover:shadow-lg hover:shadow-red-100
                        hover:-translate-y-0.5
                    "
                >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/10 to-red-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <LogOut size={20} className="text-red-500 group-hover:scale-110 transition-transform duration-300" />
                    <span className="flex-1 text-left text-sm font-medium">Logout</span>
                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0" />
                </button>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200/50">
                <div className="text-center">
                    <p className="text-xs text-slate-400">
                        © 2026 EduOnline v2.0
                    </p>
                    <p className="text-[10px] text-slate-300 mt-0.5">
                        Made with ❤️ for education
                    </p>
                </div>
            </div>
        </aside>
    );
}