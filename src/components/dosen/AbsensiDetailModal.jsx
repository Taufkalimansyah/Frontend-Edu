import { X, User, BookOpen, GraduationCap, CheckCircle, Clock, XCircle, Loader2 } from "lucide-react";

export default function AbsensiDetailModal({ open, loading, detail, onClose }) {
    if (!open) return null;

    const getStatusConfig = (status) => {
        const configs = {
            hadir: { color: "bg-green-100 text-green-700", icon: <CheckCircle size={14} className="text-green-500" />, label: "Hadir" },
            izin: { color: "bg-yellow-100 text-yellow-700", icon: <Clock size={14} className="text-yellow-500" />, label: "Izin" },
            alpha: { color: "bg-red-100 text-red-700", icon: <XCircle size={14} className="text-red-500" />, label: "Alpha" }
        };
        return configs[status] || null;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-200">
                            <BookOpen className="text-white" size={22} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                                Detail Absensi
                            </h2>
                            <p className="text-xs text-slate-500">
                                {detail?.pertemuan || "-"}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-300 hover:rotate-90"
                    >
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                {detail?.kelas && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                        <GraduationCap size={16} className="text-emerald-500" />
                        Kelas: <span className="font-medium">{detail.kelas}</span>
                    </div>
                )}

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-3" />
                        <p className="text-slate-500 text-sm">Memuat detail...</p>
                    </div>
                ) : detail?.isian?.length ? (
                    <div className="border-2 border-slate-100 rounded-xl overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Nama</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">NIM</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {detail.isian.map((row) => {
                                    const cfg = getStatusConfig(row.status);
                                    return (
                                        <tr key={row.id}>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <User size={14} className="text-emerald-500" />
                                                    <span className="text-sm text-slate-700">{row.nama}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-600">{row.nim}</td>
                                            <td className="px-4 py-3">
                                                {cfg ? (
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
                                                        {cfg.icon}
                                                        {cfg.label}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-slate-400">Belum mengisi</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-12 text-center text-slate-500 text-sm">
                        Belum ada mahasiswa yang mengisi absensi ini.
                    </div>
                )}

                <div className="flex justify-end pt-6">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 font-medium"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}