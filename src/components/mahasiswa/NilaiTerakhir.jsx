import { useNavigate } from "react-router-dom";
import { TrendingUp, Award, Calendar } from "lucide-react";

export default function NilaiTerakhir({ nilaiList }) {
    const navigate = useNavigate();

    const terbaru = [...nilaiList]
        .filter(n => n.rata_rata !== null && n.rata_rata !== undefined)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 3);

    const getGradeColor = (nilai) => {
        if (nilai >= 85) return "bg-emerald-100 text-emerald-700 border-emerald-200";
        if (nilai >= 70) return "bg-blue-100 text-blue-700 border-blue-200";
        if (nilai >= 55) return "bg-yellow-100 text-yellow-700 border-yellow-200";
        return "bg-red-100 text-red-700 border-red-200";
    };

    return (
        <div className="rounded-3xl bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-emerald-100 rounded-lg">
                    <Award size={16} className="text-emerald-600" />
                </div>
                <h2 className="text-lg font-bold text-slate-800">Nilai Terakhir</h2>
                <span className="ml-auto text-xs text-slate-400 flex items-center gap-1">
                    <TrendingUp size={12} />
                    Update terbaru
                </span>
            </div>

            <div className="space-y-3">
                {terbaru.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                            <Award size={24} className="text-slate-300" />
                        </div>
                        <p className="text-sm text-slate-500">Belum ada nilai tercatat.</p>
                    </div>
                ) : (
                    terbaru.map((item) => (
                        <div key={item.id} className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200">
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors duration-200 truncate">
                                    {item.kelas?.nama || "-"}
                                </h3>
                                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                                    <Calendar size={12} />
                                    <span>
                                        {item.updated_at ? new Date(item.updated_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "-"}
                                    </span>
                                </div>
                            </div>
                            <div className={`ml-4 px-4 py-2 rounded-xl font-bold text-sm border ${getGradeColor(item.rata_rata)}`}>
                                {item.rata_rata.toFixed(1)}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {terbaru.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                    <button
                        onClick={() => navigate("/mahasiswa/nilai")}
                        className="w-full text-center text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200 flex items-center justify-center gap-1"
                    >
                        Lihat Semua Nilai
                        <TrendingUp size={12} />
                    </button>
                </div>
            )}
        </div>
    );
}