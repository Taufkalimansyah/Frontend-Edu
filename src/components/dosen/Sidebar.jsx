import {
    LayoutDashboard,
    BookOpen,
    FilePlus,
    ClipboardList,
    GraduationCap,
    CalendarDays,
    LogOut
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
            flex items-center gap-3
            w-full px-4 py-3 rounded-xl transition
            ${
                active
                ? "bg-emerald-600 text-white"
                : "text-slate-700 hover:bg-emerald-50"
            }
        `;
    };

    return (
        <aside className="
            fixed left-0 top-0
            h-screen w-72
            border-r bg-white
        ">

            <div className="p-8 border-b">

                <h1 className="text-2xl font-bold text-emerald-600">
                    EduOnline
                </h1>

                <p className="text-sm text-slate-500">
                    Dashboard Dosen
                </p>

            </div>

            <nav className="p-5 space-y-2">

                <button
                    onClick={() => navigate("/dosen/dashboard")}
                    className={menuClass("/dosen/dashboard")}
                >
                    <LayoutDashboard size={20}/>
                    Dashboard
                </button>

                <button
                    onClick={() => navigate("/dosen/kelas")}
                    className={menuClass("/dosen/kelas")}
                >
                    <BookOpen size={20}/>
                    Kelas Saya
                </button>

                <button
                    onClick={() => navigate("/dosen/upload-materi")}
                    className={menuClass("/dosen/upload-materi")}
                >
                    <FilePlus size={20}/>
                    Upload Materi
                </button>

                <button
                    onClick={() => navigate("/dosen/tugas")}
                    className={menuClass("/dosen/tugas")}
                >
                    <ClipboardList size={20}/>
                    Buat Tugas
                </button>

                <button
                    onClick={() => navigate("/dosen/penilaian")}
                    className={menuClass("/dosen/penilaian")}
                >
                    <GraduationCap size={20}/>
                    Penilaian
                </button>

                <button
                    onClick={() => navigate("/dosen/absensi")}
                    className={menuClass("/dosen/absensi")}
                >
                    <CalendarDays size={20}/>
                    Absensi
                </button>

            </nav>

            <div className="
                absolute bottom-8
                left-5 right-5
            ">
                <button
                    onClick={logout}
                    className="
                        w-full py-3 rounded-xl
                        border border-red-200
                        text-red-500
                        hover:bg-red-50
                        flex items-center justify-center gap-2
                    "
                >
                    <LogOut size={18}/>
                    Logout
                </button>
            </div>

        </aside>
    );
}