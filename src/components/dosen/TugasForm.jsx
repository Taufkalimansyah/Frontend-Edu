import { useEffect, useState } from "react";
import { X, FileText, Calendar, BookOpen, AlertCircle } from "lucide-react";

export default function TugasForm({
    open,
    initialData,
    kelasList = [],
    onClose,
    onSubmit,
    isLoading
}) {
    const [form, setForm] = useState({
        kelasId: "",
        judul: "",
        instruksi: "",
        deadline: ""
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (initialData) {
            setForm({
                kelasId: initialData.kelas_id || "",
                judul: initialData.judul || "",
                instruksi: initialData.instruksi || "",
                deadline: initialData.deadline ? initialData.deadline.slice(0, 10) : ""
            });
        } else {
            setForm({
                kelasId: "",
                judul: "",
                instruksi: "",
                deadline: ""
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

        if (!initialData && !form.kelasId) {
            setError("Kelas wajib dipilih");
            return;
        }
        if (!form.judul.trim()) {
            setError("Judul tugas wajib diisi");
            return;
        }
        if (!form.deadline) {
            setError("Deadline tugas wajib diisi");
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
                    {!initialData && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <BookOpen size={16} className="text-emerald-500" />
                                    Kelas
                                </div>
                            </label>
                            <select
                                name="kelasId"
                                value={form.kelasId}
                                onChange={handleChange}
                                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none bg-white"
                            >
                                <option value="">Pilih Kelas</option>
                                {kelasList.map(kelas => (
                                    <option key={kelas.id} value={kelas.id}>
                                        {kelas.nama}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

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
                                Instruksi Tugas
                            </div>
                        </label>
                        <textarea
                            name="instruksi"
                            value={form.instruksi}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Jelaskan detail tugas yang harus dikerjakan mahasiswa"
                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none resize-none"
                        />
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
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-medium shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
                        >
                            {isLoading ? "Menyimpan..." : (initialData ? "Update Tugas" : "Buat Tugas")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}