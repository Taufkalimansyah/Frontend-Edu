import { FileText, Calendar, BookOpen, Clock, Edit, Trash2 } from "lucide-react";

export default function TugasList({ tugasList, onEdit, onDelete }) {
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
            {tugasList.map((tugas) => (
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
                                </div>

                                <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                                    {tugas.instruksi}
                                </p>

                                <div className="flex flex-wrap items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1.5 text-slate-500">
                                        <BookOpen size={15} className="text-emerald-500" />
                                        <span>{tugas.kelas?.nama || "-"}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-500">
                                        <Calendar size={15} className="text-emerald-500" />
                                        <span>Deadline: {new Date(tugas.deadline).toLocaleDateString('id-ID')}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-500">
                                        <Clock size={15} className="text-emerald-500" />
                                        <span>Dibuat: {tugas.created_at ? new Date(tugas.created_at).toLocaleDateString('id-ID') : "-"}</span>
                                    </div>
                                </div>
                            </div>

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
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}