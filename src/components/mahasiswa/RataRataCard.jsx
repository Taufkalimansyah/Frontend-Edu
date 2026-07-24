import { TrendingUp, Award } from "lucide-react";

export default function RataRataCard({ rataRata, jumlahKelasDinilai }) {
    const getGradeInfo = (nilai) => {
        if (nilai === null) return { label: "Belum ada nilai", color: "text-slate-400", bgColor: "bg-slate-100" };
        if (nilai >= 85) return { label: "Excellent!", color: "text-emerald-600", bgColor: "bg-emerald-100" };
        if (nilai >= 70) return { label: "Baik", color: "text-blue-600", bgColor: "bg-blue-100" };
        if (nilai >= 55) return { label: "Cukup", color: "text-yellow-600", bgColor: "bg-yellow-100" };
        return { label: "Perlu Ditingkatkan", color: "text-red-600", bgColor: "bg-red-100" };
    };

    const gradeInfo = getGradeInfo(rataRata);

    return (
        <div className="rounded-3xl bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200 h-full flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-3">
                <Award size={16} className="text-emerald-600" />
                <p className="text-xs tracking-wider text-slate-500 font-semibold uppercase">
                    Rata-rata Nilai
                </p>
            </div>

            <div className="relative">
                <div className="w-36 h-36 rounded-full border-8 border-emerald-200 flex items-center justify-center shadow-inner">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-slate-800">
                            {rataRata !== null ? rataRata.toFixed(1) : "-"}
                        </h2>
                        <p className={`text-xs font-semibold mt-0.5 ${gradeInfo.color}`}>
                            {gradeInfo.label}
                        </p>
                    </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200">
                    <TrendingUp size={14} className="text-white" />
                </div>
            </div>

            <p className="mt-4 text-sm text-slate-500">
                Dari {jumlahKelasDinilai} kelas yang sudah dinilai
            </p>
            
            <div className="mt-3 w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-1000"
                    style={{ width: `${rataRata !== null ? Math.min(rataRata, 100) : 0}%` }}
                />
            </div>
        </div>
    );
}