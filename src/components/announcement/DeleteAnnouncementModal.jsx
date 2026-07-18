import { X, AlertTriangle, Trash2 } from "lucide-react";

export default function DeleteAnnouncementModal({
    open,
    onClose,
    onDelete
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
            <div className="bg-white rounded-3xl p-8 w-[450px] shadow-2xl transform animate-slideUp">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-r from-red-500 to-red-400 rounded-2xl shadow-lg shadow-red-200">
                            <Trash2 size={24} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">
                                Hapus Pengumuman
                            </h2>
                            <p className="text-sm text-slate-500">
                                Tindakan ini tidak dapat dibatalkan
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

                {/* Warning */}
                <div className="my-6 p-4 bg-red-50 rounded-2xl border border-red-100">
                    <div className="flex items-start gap-3">
                        <AlertTriangle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm text-red-700 font-medium">
                                Peringatan!
                            </p>
                            <p className="text-sm text-red-600/80 mt-0.5">
                                Pengumuman yang dihapus tidak dapat dikembalikan. Pastikan Anda yakin.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-100">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 font-medium"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onDelete}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-medium shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                    >
                        <Trash2 size={18} />
                        Hapus Pengumuman
                    </button>
                </div>
            </div>
        </div>
    );
}