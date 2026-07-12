import {
    LayoutDashboard,
    BookOpen,
    GraduationCap,
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

        // aktif juga untuk route turunan
        // contoh:
        // /mahasiswa/kelas
        // /mahasiswa/kelas/1
        // /mahasiswa/kelas/2
        const active = location.pathname.startsWith(path);

        return `
            flex w-full items-center gap-3
            rounded-xl px-4 py-3 transition
            ${
                active
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-700 hover:bg-emerald-50"
            }
        `;
    };

    return (
        <aside
            className="
                fixed left-0 top-0
                h-screen w-72
                border-r border-slate-200
                bg-white
            "
        >

            {/* Logo */}
            <div className="p-8 border-b">

                <h1 className="
                    text-2xl font-bold
                    text-emerald-600
                ">
                    EduOnline
                </h1>

                <p className="
                    text-sm text-slate-500
                ">
                    Dashboard Mahasiswa
                </p>

            </div>

            {/* Menu */}
            <nav className="p-5 space-y-2">

                <button
                    onClick={() =>
                        navigate(
                            "/mahasiswa/dashboard"
                        )
                    }
                    className={menuClass(
                        "/mahasiswa/dashboard"
                    )}
                >
                    <LayoutDashboard size={20}/>
                    Dashboard
                </button>

                <button
                    onClick={() =>
                        navigate(
                            "/mahasiswa/kelas"
                        )
                    }
                    className={menuClass(
                        "/mahasiswa/kelas"
                    )}
                >
                    <BookOpen size={20}/>
                    Kelas Saya
                </button>

                <button
                    onClick={() =>
                        navigate(
                            "/mahasiswa/nilai"
                        )
                    }
                    className={menuClass(
                        "/mahasiswa/nilai"
                    )}
                >
                    <GraduationCap size={20}/>
                    Nilai Akhir
                </button>

            </nav>

            {/* Logout */}
            <div
                className="
                    absolute bottom-8
                    left-5 right-5
                "
            >

                <button
                    onClick={logout}
                    className="
                        flex w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border border-red-200
                        py-3
                        text-red-500
                        hover:bg-red-50
                        transition
                    "
                >
                    <LogOut size={18}/>
                    Logout
                </button>

            </div>

        </aside>
    );
}