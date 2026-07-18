import { X, User, BookOpen, FileText, Star, MessageSquare, Calendar, CheckCircle, Clock } from "lucide-react";

export default function PenilaianDetailModal({ open, data, onClose }) {
    if (!open) return null;

    const getStatusBadge = (status) => {
        if (status === "dinilai") {
            return {
                color: "bg-emerald-100 text-emerald-700",
                icon: <CheckCircle size={16} className="text-emerald-500" />,
                label: "Sudah Dinilai"
            };
        }
        return {
            color: "bg-yellow-100 text-yellow-700",
            icon: <Clock size={16} className="text-yellow-500" />,
            label: "Belum Dinilai"
            };
    };

    const statusBadge = getStatusBadge(data.status);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-r from-purple-500 to-purple-400 rounded-xl shadow-lg shadow-purple-200">
                            <FileText className="text-white" size={22} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                                Detail Penilaian
                            </h2>
                            <p className="text-xs text-slate-500">
                                Informasi lengkap penilaian tugas
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

                {/* Content */}
                <div className="space-y-6">
                    {/* Mahasiswa */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-emerald-200">
                                {data.mahasiswa.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">{data.mahasiswa.name}</h3>
                                <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                                    <span className="flex items-center gap-1">
                                        <User size={14} />
                                        {data.mahasiswa.nim}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <BookOpen size={14} />
                                        {data.mahasiswa.kelas}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Informasi Tugas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                            <p className="text-xs text-blue-600 font-medium mb-1">Tugas</p>
                            <p className="font-semibold text-slate-800">{data.tugas.judul}</p>
                            <p className="text-sm text-slate-500">{data.tugas.mataKuliah}</p>
                        </div>
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                            <p className="text-xs text-emerald-600 font-medium mb-1">File</p>
                            <div className="flex items-center gap-2">
                                <FileText size={16} className="text-emerald-600" />
                                <span className="text-sm text-slate-700">{data.file}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                <Calendar size={12} className="inline mr-1" />
                                Submit: {data.tanggalSubmit}
                            </p>
                        </div>
                    </div>

                    {/* Nilai & Feedback */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
                            <p className="text-xs text-purple-600 font-medium mb-1">Nilai</p>
                            <p className={`text-3xl font-bold ${data.nilai ? 'text-slate-800' : 'text-slate-400'}`}>
                                {data.nilai || 'Belum dinilai'}
                            </p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                            <p className="text-xs text-orange-600 font-medium mb-1">Status</p>
                            <span className={`
                                inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                                ${statusBadge.color}
                            `}>
                                {statusBadge.icon}
                                {statusBadge.label}
                            </span>
                        </div>
                    </div>

                    {/* Feedback */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-xs text-slate-600 font-medium mb-2 flex items-center gap-1">
                            <MessageSquare size={14} />
                            Feedback
                        </p>
                        <p className="text-slate-700 leading-relaxed">
                            {data.feedback || 'Belum ada feedback'}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-slate-100">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 hover:-translate-y-0.5 transition-all duration-300"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}