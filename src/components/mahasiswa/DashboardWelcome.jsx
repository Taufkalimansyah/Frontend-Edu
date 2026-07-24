import { Sparkles, TrendingUp, Calendar } from "lucide-react";

export default function DashboardWelcome({ name }) {
    const today = new Date();
    const dateOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('id-ID', dateOptions);

    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400 p-8 text-white shadow-xl shadow-emerald-200/50">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4"></div>
            <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/10 rounded-full"></div>
            
            {/* Floating Bubbles */}
            <div className="absolute top-8 right-20 w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-8 right-32 w-2 h-2 bg-white/30 rounded-full animate-pulse delay-100"></div>
            <div className="absolute top-20 right-10 w-2 h-2 bg-white/30 rounded-full animate-pulse delay-200"></div>

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={20} className="text-yellow-300" />
                    <span className="text-xs font-medium text-emerald-100 bg-white/20 px-3 py-1 rounded-full">
                        {formattedDate}
                    </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold">
                    Selamat Datang{name ? `, ${name}` : ""}!
                </h1>
                <p className="mt-3 text-emerald-50 text-lg md:text-xl max-w-2xl">
                    Semoga harimu produktif. Cek tugas dan nilai terbarumu di bawah ini.
                </p>
                
                <div className="mt-6 flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                        <TrendingUp size={16} />
                        <span className="text-sm font-medium">Aktif</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                        <Calendar size={16} />
                        <span className="text-sm font-medium">Semester Ganjil 2023/2024</span>
                    </div>
                </div>
            </div>
        </div>
    );
}