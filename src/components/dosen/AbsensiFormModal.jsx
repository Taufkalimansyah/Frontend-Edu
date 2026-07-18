import { useEffect, useState } from "react";
import { X, User, BookOpen, Calendar, Clock, FileText, AlertCircle } from "lucide-react";

export default function AbsensiFormModal({ open, initialData, onClose, onSubmit }) {
    const [form, setForm] = useState({
        mahasiswaName: "",
        mahasiswaNim: "",
        mahasiswaKelas: "",
        mataKuliah: "",
        pertemuan: "",
        tanggal: "",
        waktu: "",
        status: "hadir",
        keterangan: ""
    });
    const [error, setError] = useState(null);

    const kelasList = ["IF-3A", "IF-3B", "IF-3C", "IF-4A", "IF-4B"];
    const statusList = [
        { value: "hadir", label: "Hadir" },
        { value: "izin", label: "Izin" },
        { value: "alpa", label: "Alpa" }
    ];

    useEffect(() => {
        if (initialData) {
            setForm({
                mahasiswaName: initialData.mahasiswa.name || "",
                mahasiswaNim: initialData.mahasiswa.nim || "",
                mahasiswaKelas: initialData.mahasiswa.kelas || "",
                mataKuliah: initialData.mataKuliah || "",
                pertemuan: initialData.pertemuan || "",
                tanggal: initialData.tanggal || "",
                waktu: initialData.waktu || "",
                status: initialData.status || "hadir",
                keterangan: initialData.keterangan || ""
            });
        } else {
            setForm({
                mahasiswaName: "",
                mahasiswaNim: "",
                mahasiswaKelas: "",
                mataKuliah: "",
                pertemuan: "",
                tanggal: "",
                waktu: "",
                status: "hadir",
                keterangan: ""
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
        
        if (!form.mahasiswaName.trim()) {
            setError("Nama mahasiswa wajib diisi");
            return;
        }
        if (!form.mahasiswaNim.trim()) {
            setError("NIM mahasiswa wajib diisi");
            return;
        }
        if (!form.mahasiswaKelas) {
            setError("Kelas wajib dipilih");
            return;
        }
        if (!form.mataKuliah.trim()) {
            setError("Mata kuliah wajib diisi");
            return;
        }
        if (!form.pertemuan.trim()) {
            setError("Pertemuan wajib diisi");
            return;
        }
        if (!form.tanggal) {
            setError("Tanggal wajib diisi");
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
                            <CalendarDays className="text-white" size={22} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                                {initialData ? "Edit Absensi" : "Tambah Absensi"}
                            </h2>
                            <p className="text-xs text-slate-500">
                                {initialData ? "Perbarui data absensi" : "Tambahkan data absensi baru"}
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
                    {/* Mahasiswa */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <User size={16} className="text-emerald-500" />
                                    Nama Mahasiswa
                                </div>
                            </label>
                            <input
                                name="mahasiswaName"
                                value={form.mahasiswaName}
                                onChange={handleChange}
                                placeholder="Masukkan nama mahasiswa"
                                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <FileText size={16} className="text-emerald-500" />
                                    NIM
                                </div>
                            </label>
                            <input
                                name="mahasiswaNim"
                                value={form.mahasiswaNim}
                                onChange={handleChange}
                                placeholder="Masukkan NIM"
                                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Kelas & Mata Kuliah */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <User size={16} className="text-emerald-500" />
                                    Kelas
                                </div>
                            </label>
                            <select
                                name="mahasiswaKelas"
                                value={form.mahasiswaKelas}
                                onChange={handleChange}
                                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none bg-white"
                            >
                                <option value="">Pilih Kelas</option>
                                {kelasList.map(kelas => (
                                    <option key={kelas} value={kelas}>{kelas}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <BookOpen size={16} className="text-emerald-500" />
                                    Mata Kuliah
                                </div>
                            </label>
                            <input
                                name="mataKuliah"
                                value={form.mataKuliah}
                                onChange={handleChange}
                                placeholder="Masukkan mata kuliah"
                                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Pertemuan & Tanggal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-emerald-500" />
                                    Pertemuan
                                </div>
                            </label>
                            <input
                                name="pertemuan"
                                value={form.pertemuan}
                                onChange={handleChange}
                                placeholder="Contoh: Pertemuan 1"
                                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-emerald-500" />
                                    Tanggal
                                </div>
                            </label>
                            <input
                                type="date"
                                name="tanggal"
                                value={form.tanggal}
                                onChange={handleChange}
                                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Status & Waktu */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-emerald-500" />
                                    Status
                                </div>
                            </label>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none bg-white"
                            >
                                {statusList.map(status => (
                                    <option key={status.value} value={status.value}>
                                        {status.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-emerald-500" />
                                    Waktu
                                </div>
                            </label>
                            <input
                                type="time"
                                name="waktu"
                                value={form.waktu}
                                onChange={handleChange}
                                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Keterangan */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <div className="flex items-center gap-2">
                                <FileText size={16} className="text-emerald-500" />
                                Keterangan
                            </div>
                        </label>
                        <textarea
                            name="keterangan"
                            value={form.keterangan}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Tambahkan keterangan jika diperlukan..."
                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none resize-none"
                        />
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
                            className="px-6 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 font-medium"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-medium shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                        >
                            {initialData ? "Update Absensi" : "Tambah Absensi"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}