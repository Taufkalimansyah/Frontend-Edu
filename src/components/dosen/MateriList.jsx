import { FileText, Eye, Download, Calendar, BookOpen, Pencil, Trash2, FileUp } from "lucide-react";

export default function MateriList({ data, onEdit, onDelete }) {
    if (data.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
                <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileUp size={40} className="text-emerald-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                    Belum Ada Materi
                </h3>
                <p className="text-slate-500">
                    Mulai dengan mengupload materi pembelajaran baru
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.map((item) => (
                <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
                >
                    <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3 flex-1">
                                <div className="p-2.5 bg-emerald-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <FileText size={20} className="text-emerald-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors duration-200 line-clamp-1">
                                        {item.judul}
                                    </h3>
                                    <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                                        <BookOpen size={12} />
                                        {item.mataKuliah}
                                    </p>
                                </div>
                            </div>
                            <span className={`
                                text-xs px-2.5 py-1 rounded-full font-medium
                                ${item.status === 'published' 
                                    ? 'bg-emerald-100 text-emerald-700' 
                                    : 'bg-yellow-100 text-yellow-700'
                                }
                            `}>
                                {item.status === 'published' ? 'Published' : 'Draft'}
                            </span>
                        </div>

                        {/* Deskripsi */}
                        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                            {item.deskripsi}
                        </p>

                        {/* Info */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-4">
                            <span className="flex items-center gap-1">
                                <FileText size={13} />
                                {item.file}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar size={13} />
                                {item.tanggalUpload}
                            </span>
                            <span className="flex items-center gap-1">
                                <Eye size={13} />
                                {item.views} views
                            </span>
                            <span className="flex items-center gap-1">
                                <Download size={13} />
                                {item.downloads} downloads
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => window.open(`/${item.file}`, '_blank')}
                                    className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-medium shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5"
                                >
                                    <Download size={13} />
                                    Download
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onEdit(item)}
                                    className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-xs font-medium shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1"
                                >
                                    <Pencil size={13} />
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(item.id)}
                                    className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-medium shadow-md shadow-red-200 hover:shadow-lg hover:shadow-red-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1"
                                >
                                    <Trash2 size={13} />
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