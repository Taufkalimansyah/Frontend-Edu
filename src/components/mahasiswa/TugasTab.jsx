import TugasItem from "./TugasItem";
import { ClipboardList, Plus } from "lucide-react";

export default function TugasTab({ tugasList }) {
    // Hitung statistik tugas
    const totalTugas = tugasList.length;
    const submittedTugas = tugasList.filter(t => t.status === "submitted" || t.is_submitted).length;
    const activeTugas = tugasList.filter(t => {
        const isDeadlinePassed = new Date(t.deadline) < new Date();
        return !isDeadlinePassed && !(t.status === "submitted" || t.is_submitted);
    }).length;

    if (tugasList.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ClipboardList size={32} className="text-slate-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Belum Ada Tugas</h3>
                <p className="text-sm text-slate-500">Belum ada tugas yang diberikan di kelas ini.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header dengan Statistik */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl border border-slate-200 p-4">
                <div>
                    <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <ClipboardList size={16} className="text-emerald-600" />
                        Daftar Tugas
                    </h3>
                    <p className="text-xs text-slate-400">{totalTugas} tugas total</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span className="text-slate-600">{submittedTugas} Selesai</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full"></span>
                        <span className="text-slate-600">{activeTugas} Aktif</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                        <span className="text-slate-600">{totalTugas - submittedTugas - activeTugas} Lewat</span>
                    </div>
                </div>
            </div>

            {/* Daftar Tugas */}
            <div className="space-y-3">
                {tugasList.map((tugas) => (
                    <TugasItem key={tugas.id} tugas={tugas} />
                ))}
            </div>
        </div>
    );
}