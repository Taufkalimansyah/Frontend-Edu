import { FileText, ListChecks, AlertCircle } from "lucide-react";

export default function InstruksiTugas({ instruksi }) {
    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 md:p-8 mt-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-200">
                    <ListChecks className="text-white" size={20} />
                </div>
                <div>
                    <h2 className="font-bold text-lg text-slate-800">Instruksi Tugas</h2>
                    <p className="text-xs text-slate-400">Petunjuk pengerjaan tugas</p>
                </div>
            </div>

            {instruksi ? (
                <div className="prose prose-slate max-w-none">
                    <div className="text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                        {instruksi}
                    </div>
                </div>
            ) : (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <FileText size={28} className="text-slate-300" />
                    </div>
                    <p className="text-slate-500">Tidak ada instruksi tambahan untuk tugas ini.</p>
                </div>
            )}

            <div className="mt-4 p-3 bg-yellow-50 rounded-xl border border-yellow-200 flex items-start gap-3">
                <AlertCircle size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-700">
                    Baca instruksi dengan teliti sebelum mengerjakan tugas. Pastikan semua poin dikerjakan.
                </p>
            </div>
        </div>
    );
}