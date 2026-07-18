import { useEffect, useState } from "react";
import { X, FileText, Calendar, BookOpen, Clock, AlertCircle } from "lucide-react";

export default function TugasForm({ 
    open, 
    initialData, 
    onClose, 
    onSubmit,
    isLoading 
}) {
    const [form, setForm] = useState({
        judul: "",
        deskripsi: "",
        deadline: "",
        mataKuliah: ""
    });
    const [error, setError] = useState(null);

    const mataKuliahList = [
        "Algoritma dan Pemrograman",
        "Basis Data",
        "Desain Antarmuka Pengguna",
        "Jaringan Komputer",
        "Kecerdasan Buatan",
        "Rekayasa Perangkat Lunak",
        "Sistem Operasi",
        "Pemrograman Web"
    ];

    useEffect(() => {
        if (initialData) {
            setForm({
                judul: initialData.judul || "",
                deskripsi: initialData.deskripsi || "",
                deadline: initialData.deadline || "",
                mataKuliah: initialData.mataKuliah || ""
            });
        } else {
            setForm({
                judul: "",
                deskripsi: "",
                deadline: "",
                mataKuliah: ""
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
        
        if (!form.judul.trim()) {
            setError("Judul tugas wajib diisi");
            return;
        }
        if (!form.deskripsi.trim()) {
            setError("Deskripsi tugas wajib diisi");
            return;
        }
        if (!form.deadline) {
            setError("Deadline tugas wajib diisi");
            return;
        }
        if (!form.mataKuliah) {
            setError("Mata kuliah wajib dipilih");
            return;
        }
        
        onSubmit(form);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-200">
                            <FileText className="text-white" size={22} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                                {initialData ? "Edit Tugas" : "Buat Tugas Baru"}
                            </h2>
                            <p className="text-xs text-slate-500">
                                {initialData ? "Perbarui informasi tugas" : "Tambahkan tugas baru untuk mahasiswa"}
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
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <div className="flex items-center gap-2">
                                <FileText size={16} className="text-emerald-500" />
                                Judul Tugas
                            </div>
                        </label>
                        <input
                            name="judul"
                            value={form.judul}
                            onChange={handleChange}
                            placeholder="Masukkan judul tugas"
                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <div className="flex items-center gap-2">
                                <FileText size={16} className="text-emerald-500" />
                                Deskripsi Tugas
                            </div>
                        </label>
                        <textarea
                            name="deskripsi"
                            value={form.deskripsi}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Jelaskan detail tugas yang harus dikerjakan mahasiswa"
                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <BookOpen size={16} className="text-emerald-500" />
                                    Mata Kuliah
                                </div>
                            </label>
                            <select
                                name="mataKuliah"
                                value={form.mataKuliah}
                                onChange={handleChange}
                                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none bg-white"
                            >
                                <option value="">Pilih Mata Kuliah</option>
                                {mataKuliahList.map((mk, index) => (
                                    <option key={index} value={mk}>{mk}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-emerald-500" />
                                    Deadline
                                </div>
                            </label>
                            <input
                                type="date"
                                name="deadline"
                                value={form.deadline}
                                onChange={handleChange}
                                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm">
                            <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="px-6 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 font-medium disabled:opacity-50"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-medium shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Menyimpan...
                                </>
                            ) : (
                                initialData ? "Update Tugas" : "Buat Tugas"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}