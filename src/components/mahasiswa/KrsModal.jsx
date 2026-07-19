import { X, BookOpen, User, CheckCircle } from "lucide-react";

export default function KrsModal({ 
    open, 
    availableCourses, 
    selectedIds, 
    onToggle, 
    onClose, 
    onSubmit, 
    isSubmitting 
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-200">
                            <BookOpen className="text-white" size={22} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                                Tambah KRS
                            </h2>
                            <p className="text-xs text-slate-500">
                                Pilih mata kuliah yang ingin diambil
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
                <div className="space-y-3">
                    {availableCourses.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                <BookOpen size={32} className="text-slate-400" />
                            </div>
                            <p className="text-sm text-slate-500 font-medium">
                                Tidak ada kelas lain yang tersedia
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                                Semua kelas sudah Anda ambil
                            </p>
                        </div>
                    ) : (
                        availableCourses.map(course => (
                            <div 
                                key={course.id} 
                                className={`group border-2 rounded-xl p-4 transition-all duration-200 cursor-pointer ${
                                    selectedIds.includes(course.id) 
                                        ? 'border-emerald-500 bg-emerald-50/50' 
                                        : 'border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/30'
                                }`}
                                onClick={() => onToggle(course.id)}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-emerald-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                            <BookOpen size={18} className="text-emerald-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800">{course.nama}</h3>
                                            <div className="flex items-center gap-3 mt-1">
                                                <p className="text-sm text-emerald-600 font-medium">
                                                    {course.kode}
                                                </p>
                                                <span className="text-xs text-slate-400">•</span>
                                                <p className="text-sm text-slate-500 flex items-center gap-1">
                                                    <User size={14} />
                                                    {course.dosen?.name || "-"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                        selectedIds.includes(course.id) 
                                            ? 'border-emerald-500 bg-emerald-500' 
                                            : 'border-slate-300'
                                    }`}>
                                        {selectedIds.includes(course.id) && (
                                            <CheckCircle size={14} className="text-white" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                    <span className="text-sm text-slate-500">
                        {selectedIds.length > 0 ? (
                            <span className="text-emerald-600 font-medium">
                                {selectedIds.length} mata kuliah dipilih
                            </span>
                        ) : (
                            "Belum ada mata kuliah dipilih"
                        )}
                    </span>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-6 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 font-medium disabled:opacity-50"
                        >
                            Batal
                        </button>
                        <button
                            onClick={onSubmit}
                            disabled={isSubmitting || selectedIds.length === 0}
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-medium shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Mendaftarkan...
                                </>
                            ) : (
                                "Ambil KRS"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}