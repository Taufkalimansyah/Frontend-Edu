import { useState } from "react";

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg text-center">
                <h2 className="text-lg font-bold text-slate-800 mb-2">Hapus Mahasiswa?</h2>
                <p className="text-slate-500 mb-6">
                    Yakin ingin menghapus{" "}
                    <span className="font-medium">{mahasiswa?.name}</span>? Tindakan ini
                    tidak bisa dibatalkan.
                </p>
                <div className="flex justify-center gap-2">
                    <button
                        onClick={onClose}
                        className="rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={loading}
                        className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:opacity-50"
                    >
                        {loading ? "Menghapus..." : "Ya, Hapus"}
                    </button>
                </div>
            </div>
        </div>
    );
}