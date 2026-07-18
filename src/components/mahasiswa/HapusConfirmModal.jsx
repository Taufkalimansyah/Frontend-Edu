import { useState } from "react";
import { X, AlertTriangle, Trash2, User } from "lucide-react";

export default function HapusConfirmModal({ open, mahasiswa, onClose, onConfirm }) {
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const handleConfirm = async () => {
        setLoading(true);
        try {
            await onConfirm(mahasiswa.id);
            onClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl transform animate-slideUp">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-r from-red-500 to-red-400 rounded-2xl shadow-lg shadow-red-200">
                            <Trash2 size={24} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">
                                Hapus Mahasiswa?
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

                {/* Info Mahasiswa */}
                <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-200">
                            {mahasiswa?.name?.charAt(0) || '?'}
                        </div>
                        <div>
                            <p className="font-semibold text-slate-800">
                                {mahasiswa?.name || 'Mahasiswa'}
                            </p>
                            <p className="text-sm text-slate-500">
                                {mahasiswa?.nim || 'NIM tidak tersedia'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Warning */}
                <div className="mb-6 p-4 bg-red-50 rounded-2xl border border-red-100">
                    <div className="flex items-start gap-3">
                        <AlertTriangle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm text-red-700 font-medium">
                                Peringatan!
                            </p>
                            <p className="text-sm text-red-600/80 mt-0.5">
                                Yakin ingin menghapus <span className="font-semibold">{mahasiswa?.name}</span>? 
                                Semua data terkait akan hilang permanen.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 font-medium"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={loading}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-medium shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Menghapus...
                            </>
                        ) : (
                            <>
                                <Trash2 size={18} />
                                Ya, Hapus
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}