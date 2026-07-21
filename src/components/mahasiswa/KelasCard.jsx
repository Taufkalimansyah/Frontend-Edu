import { BookOpen, User, Calendar, Users, ChevronRight } from "lucide-react";

export default function KelasCard({ item, onClick }) {
    return (
        <div 
            className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
            onClick={() => onClick(item.id)}
        >
            {/* Header Gradient */}
            <div className="relative h-24 bg-gradient-to-r from-emerald-500 to-emerald-400 p-6">
                <div className="absolute -bottom-8 left-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform duration-300">
                        <BookOpen size={28} />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 pt-10">
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors duration-200 line-clamp-1">
                    {item.nama}
                </h3>
                <p className="text-sm text-emerald-600 font-semibold mt-0.5">
                    {item.kode}
                </p>

                <div className="mt-4 space-y-2.5 text-sm text-slate-600">
                    <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-emerald-50 rounded-lg">
                            <User size={15} className="text-emerald-500" />
                        </div>
                        <span>{item.dosen?.name || "-"}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-emerald-50 rounded-lg">
                            <Calendar size={15} className="text-emerald-500" />
                        </div>
                        <span>Bergabung: {item.created_at ? new Date(item.created_at).toLocaleDateString("id-ID") : "-"}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-emerald-50 rounded-lg">
                            <Users size={15} className="text-emerald-500" />
                        </div>
                        <span>{item.mahasiswa_count} Mahasiswa</span>
                    </div>
                </div>

                <button
                    className="mt-5 w-full group/btn relative py-2.5 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 font-medium rounded-xl border border-slate-200 hover:border-emerald-200 transition-all duration-200 flex items-center justify-center gap-2"
                >
                    <span>Lihat Detail</span>
                    <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                </button>
            </div>
        </div>
    );
}