import { Loader2, BookOpen, AlertCircle } from "lucide-react";
import NilaiRow from "./NilaiRow";

// Konversi rata_rata (angka 0-100 dari backend) -> huruf
export function toGradeLetter(rataRata) {
    if (rataRata === null || rataRata === undefined) return "-";
    if (rataRata >= 85) return "A";
    if (rataRata >= 80) return "A-";
    if (rataRata >= 75) return "B+";
    if (rataRata >= 70) return "B";
    if (rataRata >= 65) return "B-";
    if (rataRata >= 60) return "C+";
    if (rataRata >= 55) return "C";
    return "D";
}

export default function NilaiTable({ nilaiList, loading, error }) {
    const totalKelas = nilaiList.length;

    return (
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
            {/* Table Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Detail Mata Kuliah</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Rincian nilai per mata kuliah</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold text-emerald-700">
                    Total: {totalKelas}
                </span>
            </div>

            {/* Content */}
            {loading ? (
                <div className="py-20 flex flex-col items-center justify-center">
                    <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
                    <p className="text-slate-500 font-medium">Memuat nilai...</p>
                </div>
            ) : error ? (
                <div className="py-20 flex flex-col items-center justify-center">
                    <AlertCircle size={40} className="text-red-400 mb-4" />
                    <p className="text-red-500 font-medium">{error}</p>
                </div>
            ) : nilaiList.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                        <BookOpen size={40} className="text-slate-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">
                        Belum Ada Nilai
                    </h3>
                    <p className="text-sm text-slate-500">
                        Belum ada nilai yang tercatat untuk Anda
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white">
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                                    Mata Kuliah
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">
                                    Tugas
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">
                                    Kuis
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">
                                    Ujian
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">
                                    Nilai Akhir
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">
                                    Grade
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {nilaiList.map((item) => (
                                <NilaiRow key={item.id} item={item} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}