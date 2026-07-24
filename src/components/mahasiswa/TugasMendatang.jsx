import { BookOpen, ClipboardList, ChevronRight, Calendar, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function getDeadlineInfo(deadline) {
    const now = new Date();
    const target = new Date(deadline);
    const diffDays = Math.ceil((target - now) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { label: "Lewat deadline", color: "text-red-500", icon: <AlertCircle size={14} /> };
    if (diffDays === 0) return { label: "Hari ini!", color: "text-red-500", icon: <AlertCircle size={14} /> };
    if (diffDays === 1) return { label: "Besok", color: "text-red-500", icon: <Clock size={14} /> };
    if (diffDays <= 7) return { label: `${diffDays} hari lagi`, color: "text-yellow-500", icon: <Clock size={14} /> };
    return { label: target.toLocaleDateString("id-ID", { day: "2-digit", month: "short" }), color: "text-slate-400", icon: <Calendar size={14} /> };
}

export default function TugasMendatang({ tugasList }) {
    const navigate = useNavigate();

    return (
        <div className="rounded-3xl bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200 h-full">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Tugas Mendatang</h2>
                    <p className="text-xs text-slate-400">Prioritas tugas terdekat</p>
                </div>
                <div className="p-2 bg-emerald-100 rounded-xl">
                    <ClipboardList size={18} className="text-emerald-600" />
                </div>
            </div>

            <div className="space-y-3">
                {tugasList.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                            <ClipboardList size={24} className="text-slate-300" />
                        </div>
                        <p className="text-sm text-slate-500">Tidak ada tugas mendatang.</p>
                        <p className="text-xs text-slate-400">Selamat! Semua tugas sudah selesai.</p>
                    </div>
                ) : (
                    tugasList.map((item) => {
                        const info = getDeadlineInfo(item.deadline);
                        return (
                            <div
                                key={item.id}
                                onClick={() => navigate(`/mahasiswa/tugas/${item.id}`)}
                                className="group flex items-center justify-between rounded-2xl border border-slate-200 p-4 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <BookOpen size={20} className="text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors duration-200">
                                            {item.judul}
                                        </h3>
                                        <div className={`flex items-center gap-1.5 text-xs font-medium ${info.color}`}>
                                            {info.icon}
                                            <span>{info.label}</span>
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-200" />
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}