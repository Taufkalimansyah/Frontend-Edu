import { ClipboardList, CheckCircle, Clock, AlertCircle, TrendingUp, Users, FileText } from "lucide-react";

export default function RingkasanTugas({ tugasList, submissionList, totalMateri }) {
    const totalTugas = tugasList.length;
    const submittedCount = submissionList.length;
    const belumDinilai = submissionList.filter(s => s.nilai === null || s.nilai === undefined).length;
    const belumDikumpulkan = totalTugas - submittedCount;

    // Hitung progress pengumpulan
    const progressPengumpulan = totalTugas > 0 ? Math.round((submittedCount / totalTugas) * 100) : 0;

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 h-fit sticky top-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-200">
                    <ClipboardList className="text-white" size={18} />
                </div>
                <div>
                    <h2 className="font-bold text-lg text-slate-800">Status Tugas</h2>
                    <p className="text-xs text-slate-400">Progress pengumpulan Anda</p>
                </div>
            </div>

            {/* Progress Pengumpulan */}
            <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-600 font-medium">Progress Pengumpulan</span>
                    <span className="font-bold text-emerald-600">{progressPengumpulan}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-1000"
                        style={{ width: `${progressPengumpulan}%` }}
                    />
                </div>
            </div>

            {/* Detail Cards */}
            <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                            <Users size={15} className="text-emerald-500" />
                        </div>
                        <span className="text-sm text-slate-600">Tugas Terkumpul</span>
                    </div>
                    <span className="font-bold text-slate-800">{submittedCount}/{totalTugas}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                            <Clock size={15} className="text-yellow-500" />
                        </div>
                        <span className="text-sm text-slate-600">Belum Dinilai</span>
                    </div>
                    <span className="font-bold text-slate-800">{belumDinilai}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                            <AlertCircle size={15} className="text-red-500" />
                        </div>
                        <span className="text-sm text-slate-600">Belum Dikumpulkan</span>
                    </div>
                    <span className="font-bold text-slate-800">{belumDikumpulkan}</span>
                </div>
            </div>

            {/* Footer Summary */}
            <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Total Tugas</span>
                    <span className="font-semibold text-slate-600">{totalTugas}</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                    <span className="text-slate-400">Total Materi</span>
                    <span className="font-semibold text-slate-600">{totalMateri}</span>
                </div>
            </div>
        </div>
    );
}