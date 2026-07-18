import { useEffect, useState } from "react";
import { X, User, Mail, GraduationCap, BookOpen, UserCog } from "lucide-react";

const emptyForm = { name: "", email: "", nim: "", bidang: "" };

export default function MahasiswaFormModal({ open, initialData, onClose, onSubmit }) {
    const [form, setForm] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setForm(
            initialData
                ? {
                      name: initialData.name ?? "",
                      email: initialData.email ?? "",
                      nim: initialData.nim ?? "",
                      role: initialData.role ?? "",
                      bidang: initialData.bidang ?? "",
                  }
                : emptyForm
        );
        setError(null);
    }, [initialData, open]);

    if (!open) return null;

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            await onSubmit(form);
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || "Gagal menyimpan data");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl transform animate-slideUp">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-200">
                            {initialData ? (
                                <UserCog className="text-white" size={22} />
                            ) : (
                                <GraduationCap className="text-white" size={22} />
                            )}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                                {initialData ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
                            </h2>
                            <p className="text-xs text-slate-500">
                                {initialData ? "Perbarui data mahasiswa" : "Tambahkan mahasiswa baru"}
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

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nama */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <div className="flex items-center gap-2">
                                <User size={16} className="text-emerald-500" />
                                Nama Lengkap
                            </div>
                        </label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none"
                            placeholder="Masukkan nama lengkap"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <div className="flex items-center gap-2">
                                <Mail size={16} className="text-emerald-500" />
                                Email
                            </div>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none"
                            placeholder="Masukkan alamat email"
                        />
                    </div>

                    {/* NIM */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <div className="flex items-center gap-2">
                                <BookOpen size={16} className="text-emerald-500" />
                                NIM
                            </div>
                        </label>
                        <input
                            name="nim"
                            value={form.nim}
                            onChange={handleChange}
                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none"
                            placeholder="Masukkan NIM (opsional)"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <div className="flex items-center gap-2">
                                <UserCog size={16} className="text-emerald-500" />
                                Role
                            </div>
                        </label>
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            required
                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none bg-white"
                        >
                            <option value="">-- Pilih Role --</option>
                            <option value="mahasiswa">📚 Mahasiswa</option>
                            <option value="dosen">👨‍🏫 Dosen</option>
                        </select>
                    </div>

                    {/* Jurusan */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <div className="flex items-center gap-2">
                                <GraduationCap size={16} className="text-emerald-500" />
                                Jurusan
                            </div>
                        </label>
                        <input
                            name="bidang"
                            value={form.bidang}
                            onChange={handleChange}
                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none"
                            placeholder="Masukkan jurusan (opsional)"
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm">
                            <span className="text-red-500">⚠️</span>
                            {error}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 font-medium"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-medium shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            {submitting ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Menyimpan...
                                </span>
                            ) : (
                                "Simpan Data"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}