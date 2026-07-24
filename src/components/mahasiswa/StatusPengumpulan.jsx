import { Clock, MessageSquare, FileText, Star } from "lucide-react";

export default function StatusPengumpulan({ submission, onGantiFile }) {
    const sudahDinilai = submission.nilai !== null && submission.nilai !== undefined;

    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 h-fit sticky top-6">
            <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-xl shadow-lg ${
                    sudahDinilai
                        ? "bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-emerald-200"
                        : "bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-yellow-200"
                }`}>
                    {sudahDinilai ? (
                        <Star className="text-white" size={18} />
                    ) : (
                        <Clock className="text-white" size={18} />
                    )}
                </div>
                <div>
                    <h2 className="font-bold text-lg text-slate-800">
                        {sudahDinilai ? "Sudah Dinilai" : "Menunggu Penilaian"}
                    </h2>
                    <p className={`text-xs ${submission.status === "Terlambat" ? "text-red-500 font-medium" : "text-slate-400"}`}>
                        {submission.status === "Terlambat" ? "⚠️ Dikumpulkan setelah deadline (Terlambat)" : "Tugas telah dikumpulkan"}
                    </p>
                </div>
            </div>

            {/* File yang dikumpulkan */}
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText size={18} className="text-emerald-600" />
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">{submission.file_name}</p>
                    <p className="text-xs text-slate-400">
                        Dikumpulkan: {submission.submitted_at ? new Date(submission.submitted_at).toLocaleString("id-ID") : "-"}
                    </p>
                </div>
            </div>

            {/* Nilai & Feedback (kalau sudah dinilai) */}
            {sudahDinilai ? (
                <>
                    <div className="p-5 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl border border-emerald-200 text-center mb-4">
                        <p className="text-xs text-emerald-600 font-medium mb-1">Nilai Anda</p>
                        <p className="text-4xl font-bold text-emerald-700">{submission.nilai}</p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 mb-2">
                            <MessageSquare size={14} />
                            Feedback Dosen
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            {submission.feedback || "Tidak ada catatan tambahan dari dosen."}
                        </p>
                    </div>
                </>
            ) : (
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200 flex items-start gap-2">
                    <Clock size={16} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-yellow-700">
                        Tugas Anda sedang menunggu penilaian dari dosen. Nilai dan feedback akan muncul di sini setelah dinilai.
                    </p>
                </div>
            )}

            {/* Opsi ganti file — hanya kalau belum dinilai */}
            {!sudahDinilai && (
                <button
                    onClick={onGantiFile}
                    className="w-full mt-4 py-3 rounded-xl font-semibold text-sm text-emerald-700 border-2 border-emerald-200 hover:bg-emerald-50 transition-colors duration-200"
                >
                    Ganti File Pengumpulan
                </button>
            )}
        </div>
    );
}