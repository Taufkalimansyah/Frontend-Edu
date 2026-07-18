import { FileText, Calendar, BookOpen, Users, Clock, Edit, Trash2 } from "lucide-react";

export default function TugasList({ tugasList, onEdit, onDelete }) {
    const getStatusColor = (status) => {
        return status === "aktif" 
            ? "bg-emerald-100 text-emerald-700" 
            : "bg-slate-100 text-slate-600";
    };

    const getStatusDot = (status) => {
        return status === "aktif" 
            ? "bg-emerald-500" 
            : "bg-slate-400";
    };

    const getProgressColor = (percentage) => {
        if (percentage >= 80) return "from-emerald-500 to-emerald-400";
        if (percentage >= 50) return "from-blue-500 to-blue-400";
        if (percentage >= 30) return "from-yellow-500 to-yellow-400";
        return "from-red-500 to-red-400";
    };

    if (tugasList.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
                <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileText size={40} className="text-emerald-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                    Belum Ada Tugas
                </h3>
                <p className="text-slate-500">
                    Mulai dengan membuat tugas baru melalui tombol di atas.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {tugasList.map((tugas) => {
                const progress = Math.round(
                    (tugas.sudahMengumpulkan / tugas.totalMahasiswa) * 100
                );
                
                return (
                    <div
                        key={tugas.id}
                        className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
                    >
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-emerald-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                            <FileText size={18} className="text-emerald-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors duration-200">
                                            {tugas.judul}
                                        </h3>
                                        <span className={`
                                            inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                                            ${getStatusColor(tugas.status)}
                                        `}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(tugas.status)}`}></span>
                                            {tugas.status}
                                        </span>
                                    </div>
                                    
                                    <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                                        {tugas.deskripsi}
                                    </p>
                                    
                                    <div className="flex flex-wrap items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1.5 text-slate-500">
                                            <BookOpen size={15} className="text-emerald-500" />
                                            <span>{tugas.mataKuliah}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-slate-500">
                                            <Calendar size={15} className="text-emerald-500" />
                                            <span>Deadline: {tugas.deadline}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-slate-500">
                                            <Clock size={15} className="text-emerald-500" />
                                            <span>{new Date(tugas.createdAt).toLocaleDateString('id-ID')}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-3">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onEdit(tugas)}
                                            className="px-3 py-2 rounded-xl bg-blue-500 text-white text-sm font-medium shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5"
                                        >
                                            <Edit size={14} />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(tugas.id)}
                                            className="px-3 py-2 rounded-xl bg-red-500 text-white text-sm font-medium shadow-md shadow-red-200 hover:shadow-lg hover:shadow-red-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5"
                                        >
                                            <Trash2 size={14} />
                                            Hapus
                                        </button>
                                    </div>
                                    
                                    <div className="w-full max-w-xs">
                                        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                                            <span className="flex items-center gap-1">
                                                <Users size={13} />
                                                {tugas.sudahMengumpulkan}/{tugas.totalMahasiswa}
                                            </span>
                                            <span className="font-semibold">{progress}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full bg-gradient-to-r ${getProgressColor(progress)} rounded-full transition-all duration-1000`}
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}