import { useEffect, useState } from "react";
import { X, FileUp, BookOpen, FileText, AlertCircle, Upload } from "lucide-react";

export default function UploadMateriForm({
    open,
    initialData,
    onClose,
    onSubmit,
    isLoading
}) {
    const [form, setForm] = useState({
        judul: "",
        deskripsi: "",
        mataKuliah: "",
        file: null,
        fileName: ""
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
                mataKuliah: initialData.mataKuliah || "",
                file: null,
                fileName: initialData.file || ""
            });
        } else {
            setForm({
                judul: "",
                deskripsi: "",
                mataKuliah: "",
                file: null,
                fileName: ""
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm(prev => ({
                ...prev,
                file: file,
                fileName: file.name
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!form.judul.trim()) {
            setError("Judul materi wajib diisi");
            return;
        }
        if (!form.deskripsi.trim()) {
            setError("Deskripsi materi wajib diisi");
            return;
        }
        if (!form.mataKuliah) {
            setError("Mata kuliah wajib dipilih");
            return;
        }
        if (!initialData && !form.file) {
            setError("File materi wajib diupload");
            return;
        }
        
        onSubmit(form);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-200">
                            <FileUp className="text-white" size={22} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                                {initialData ? "Edit Materi" : "Upload Materi Baru"}
                            </h2>
                            <p className="text-xs text-slate-500">
                                {initialData ? "Perbarui informasi materi" : "Upload materi pembelajaran baru"}
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
                    {/* Judul */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <div className="flex items-center gap-2">
                                <FileText size={16} className="text-emerald-500" />
                                Judul Materi
                            </div>
                        </label>
                        <input
                            name="judul"
                            value={form.judul}
                            onChange={handleChange}
                            placeholder="Masukkan judul materi"
                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none"
                        />
                    </div>

                    {/* Deskripsi */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <div className="flex items-center gap-2">
                                <FileText size={16} className="text-emerald-500" />
                                Deskripsi
                            </div>
                        </label>
                        <textarea
                            name="deskripsi"
                            value={form.deskripsi}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Jelaskan materi yang akan diupload"
                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none resize-none"
                        />
                    </div>

                    {/* Mata Kuliah */}
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

                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <div className="flex items-center gap-2">
                                <Upload size={16} className="text-emerald-500" />
                                File Materi
                            </div>
                        </label>
                        <div className="relative">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className={`
                                border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300
                                ${form.fileName ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-emerald-300'}
                            `}>
                                <FileUp size={40} className={`mx-auto mb-2 ${form.fileName ? 'text-emerald-500' : 'text-slate-400'}`} />
                                <p className="text-sm font-medium text-slate-700">
                                    {form.fileName || 'Klik atau drag file untuk upload'}
                                </p>
                                <p className="text-xs text-slate-400 mt-1">
                                    {form.fileName ? `File: ${form.fileName}` : 'PDF, PPT, DOC (Max 10MB)'}
                                </p>
                            </div>
                        </div>
                    </div>

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
                                    Mengupload...
                                </>
                            ) : (
                                initialData ? "Update Materi" : "Upload Materi"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}