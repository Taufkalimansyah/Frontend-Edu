import { useState, useEffect } from "react";
import { X, BookOpen, Users, Calendar, Clock, AlertCircle, Edit, Plus } from "lucide-react";

export default function KelasFormModal({ open, initialData, onClose, onSubmit, isSubmitting }) {
    const [form, setForm] = useState({
        nama: "",
        kode: "",
        mahasiswa_ids: []
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (initialData) {
            setForm({
                nama: initialData.nama || "",
                kode: initialData.kode || "",
                mahasiswa_ids: initialData.mahasiswa_ids || []
            });
        } else {
            setForm({
                nama: "",
                kode: "",
                mahasiswa_ids: []
            });
        }
        setError(null);
    }, [initialData, open]);

    if (!open) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setError(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validasi
        if (!form.nama.trim()) {
            setError("Nama kelas wajib diisi");
            return;
        }
        if (!form.kode.trim()) {
            setError("Kode kelas wajib diisi");
            return;
        }
        
        onSubmit(form);
    };

    const isEditing = !!initialData;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl shadow-lg ${
                            isEditing 
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-blue-200' 
                                : 'bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-emerald-200'
                        }`}>
                            {isEditing ? (
                                <Edit className="text-white" size={22} />
                            ) : (
                                <BookOpen className="text-white" size={22} />
                            )}
                        </div>
                        <div>
                            <h2 className={`text-xl font-bold bg-clip-text text-transparent ${
                                isEditing 
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-400' 
                                    : 'bg-gradient-to-r from-emerald-600 to-emerald-400'
                            }`}>
                                {isEditing ? "Edit Kelas" : "Buat Kelas Baru"}
                            </h2>
                            <p className="text-xs text-slate-500">
                                {isEditing 
                                    ? "Perbarui informasi kelas" 
                                    : "Tambahkan kelas baru untuk mahasiswa"}
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

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Nama Kelas */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <div className="flex items-center gap-2">
                                <BookOpen size={16} className="text-emerald-500" />
                                Nama Kelas
                            </div>
                        </label>
                        <input
                            name="nama"
                            value={form.nama}
                            onChange={handleChange}
                            placeholder="Contoh: Algoritma dan Pemrograman"
                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none"
                        />
                    </div>

                    {/* Kode Kelas */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <div className="flex items-center gap-2">
                                <BookOpen size={16} className="text-emerald-500" />
                                Kode Kelas
                            </div>
                        </label>
                        <input
                            name="kode"
                            value={form.kode}
                            onChange={handleChange}
                            placeholder="Contoh: IF-3A"
                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none"
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm">
                            <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-6 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 font-medium disabled:opacity-50"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-6 py-2.5 rounded-xl text-white font-medium shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center gap-2 ${
                                isEditing
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5'
                                    : 'bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5'
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {isEditing ? "Memperbarui..." : "Membuat..."}
                                </>
                            ) : (
                                isEditing ? "Update Kelas" : "Buat Kelas"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}