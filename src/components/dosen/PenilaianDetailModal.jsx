import { X, User, BookOpen, FileText, Star, MessageSquare, Calendar, CheckCircle, Clock, Download, Award, TrendingUp, CalendarDays } from "lucide-react";

export default function PenilaianDetailModal({ open, data, onClose }) {
    if (!open) return null;

    const sudahDinilai = data.nilai !== null && data.nilai !== undefined;

    const statusBadge = sudahDinilai
        ? {
            color: "bg-emerald-100 text-emerald-700",
            icon: <CheckCircle size={16} className="text-emerald-500" />,
            label: "Sudah Dinilai"
        }
        : {
            color: "bg-yellow-100 text-yellow-700",
            icon: <Clock size={16} className="text-yellow-500" />,
            label: "Belum Dinilai"
        };

    // Fungsi untuk menentukan grade
    const getGrade = (nilai) => {
        if (nilai === null || nilai === undefined) return "-";
        if (nilai >= 85) return { grade: "A", color: "text-emerald-600 bg-emerald-50" };
        if (nilai >= 75) return { grade: "B+", color: "text-blue-600 bg-blue-50" };
        if (nilai >= 65) return { grade: "B", color: "text-blue-600 bg-blue-50" };
        if (nilai >= 55) return { grade: "C+", color: "text-yellow-600 bg-yellow-50" };
        if (nilai >= 45) return { grade: "C", color: "text-yellow-600 bg-yellow-50" };
        return { grade: "D", color: "text-red-600 bg-red-50" };
    };

    const gradeInfo = getGrade(data.nilai);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fadeIn">
            <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg shadow-purple-200">
                            <Award className="text-white" size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                                Detail Penilaian
                            </h2>
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                                <CalendarDays size={12} />
                                Informasi lengkap penilaian tugas
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-purple-50 rounded-xl transition-all duration-300 hover:rotate-90"
                    >
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-6">
                    {/* Mahasiswa */}
                    <div className="p-5 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl border border-slate-200 hover:border-emerald-200 transition-colors duration-300">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-emerald-200">
                                    {data.mahasiswa?.name?.charAt(0) || '?'}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-slate-800">{data.mahasiswa?.name || "Mahasiswa"}</h3>
                                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mt-1">
                                    <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm">
                                        <User size={14} className="text-emerald-500" />
                                        {data.mahasiswa?.nim || "-"}
                                    </span>
                                    <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm">
                                        <BookOpen size={14} className="text-emerald-500" />
                                        {data.tugas?.kelas?.nama || "-"}
                                    </span>
                                </div>
                            </div>
                            {sudahDinilai && (
                                <div className={`px-4 py-2 rounded-xl font-bold text-2xl ${gradeInfo.color}`}>
                                    {gradeInfo.grade}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Informasi Tugas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-2xl border border-blue-200 hover:shadow-md transition-shadow duration-300">
                            <p className="text-xs text-blue-600 font-semibold mb-2 flex items-center gap-1">
                                <BookOpen size={14} />
                                Informasi Tugas
                            </p>
                            <p className="font-semibold text-slate-800">{data.tugas?.judul || "-"}</p>
                            <p className="text-sm text-slate-500 mt-1">{data.tugas?.kelas?.nama || "-"}</p>
                            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                                <Calendar size={12} />
                                <span>Deadline: {data.tugas?.deadline || "-"}</span>
                            </div>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/30 rounded-2xl border border-emerald-200 hover:shadow-md transition-shadow duration-300">
                            <p className="text-xs text-emerald-600 font-semibold mb-2 flex items-center gap-1">
                                <FileText size={14} />
                                File Tugas
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-emerald-100 rounded-lg">
                                    <FileText size={16} className="text-emerald-600" />
                                </div>
                                <span className="text-sm text-slate-700 font-medium">{data.file_name || "Tidak ada file"}</span>
                            </div>
                            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                                <Calendar size={12} />
                                <span>Submit: {data.submitted_at ? new Date(data.submitted_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }) : "-"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Nilai & Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 bg-gradient-to-br from-purple-50 to-purple-100/30 rounded-2xl border border-purple-200 hover:shadow-md transition-shadow duration-300">
                            <p className="text-xs text-purple-600 font-semibold mb-2 flex items-center gap-1">
                                <Star size={14} />
                                Nilai
                            </p>
                            <div className="flex items-end gap-3">
                                <p className={`text-4xl font-bold ${sudahDinilai ? 'text-slate-800' : 'text-slate-400'}`}>
                                    {sudahDinilai ? data.nilai : '-'}
                                </p>
                                {sudahDinilai && (
                                    <span className="text-sm text-slate-400 font-medium">/ 100</span>
                                )}
                            </div>
                            {sudahDinilai && (
                                <div className="mt-2 flex items-center gap-2">
                                    <TrendingUp size={14} className="text-emerald-500" />
                                    <span className="text-xs text-emerald-600 font-medium">Grade {gradeInfo.grade}</span>
                                </div>
                            )}
                        </div>
                        <div className="p-5 bg-gradient-to-br from-orange-50 to-orange-100/30 rounded-2xl border border-orange-200 hover:shadow-md transition-shadow duration-300">
                            <p className="text-xs text-orange-600 font-semibold mb-2 flex items-center gap-1">
                                <Clock size={14} />
                                Status
                            </p>
                            <div className="flex items-center gap-3">
                                <span className={`
                                    inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                                    ${statusBadge.color}
                                `}>
                                    {statusBadge.icon}
                                    {statusBadge.label}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Feedback */}
                    <div className="p-5 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl border border-slate-200 hover:border-emerald-200 transition-colors duration-300">
                        <p className="text-xs text-slate-600 font-semibold mb-3 flex items-center gap-1">
                            <MessageSquare size={14} />
                            Feedback Dosen
                        </p>
                        <div className={`p-4 rounded-xl ${data.feedback ? 'bg-white' : 'bg-slate-100/50'}`}>
                            <p className="text-slate-700 leading-relaxed">
                                {data.feedback || (
                                    <span className="text-slate-400 italic">Belum ada feedback dari dosen</span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-slate-200">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                    >
                        <X size={16} />
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}