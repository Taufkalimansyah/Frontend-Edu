import { ClipboardList } from "lucide-react";
import NilaiTugasRow from "./NilaiTugasRow";

export default function NilaiTugasTable({ submissionList }) {
    return (
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden mt-6">
            <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <ClipboardList size={18} className="text-emerald-600" />
                    Nilai Per Tugas
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Rincian nilai tugas yang sudah dikumpulkan</p>
            </div>

            {submissionList.length === 0 ? (
                <div className="py-16 text-center text-slate-500">
                    Belum ada tugas yang dikumpulkan.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Tugas</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase">File</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Dikumpulkan</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Nilai</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Feedback</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {submissionList.map((item) => (
                                <NilaiTugasRow key={item.id} item={item} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}