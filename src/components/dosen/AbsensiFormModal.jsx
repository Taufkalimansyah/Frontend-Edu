import { useEffect, useState } from "react";
import { X, Calendar, Clock, AlertCircle, CalendarDays, BookOpen } from "lucide-react";

export default function AbsensiFormModal({ open, initialData, onClose, onSubmit }) {
    const [form, setForm] = useState({
        pertemuan: "",
        tanggal_mulai: "",
        tanggal_selesai: "",
        waktu_mulai: "",
        waktu_selesai: ""
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (initialData) {
            setForm({
                pertemuan: initialData.pertemuan || "",
                tanggal_mulai: initialData.tanggal_mulai || "",
                tanggal_selesai: initialData.tanggal_selesai || "",
                waktu_mulai: initialData.waktu_mulai || "",
                waktu_selesai: initialData.waktu_selesai || ""
            });
        } else {
            setForm({
                pertemuan: "",
                tanggal_mulai: "",
                tanggal_selesai: "",
                waktu_mulai: "",
                waktu_selesai: ""
            });
        }
        setError(null);
    }, [initialData, open]);

    if (!open) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
        setError(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.pertemuan.trim()) {
            setError("Pertemuan wajib diisi");
            return;
        }

        if (!form.tanggal_mulai) {
            setError("Tanggal mulai wajib diisi");
            return;
        }

        if (!form.tanggal_selesai) {
            setError("Tanggal selesai wajib diisi");
            return;
        }

        if (new Date(form.tanggal_selesai) < new Date(form.tanggal_mulai)) {
            setError("Tanggal selesai harus lebih besar dari tanggal mulai");
            return;
        }

        if (!form.waktu_mulai) {
            setError("Waktu mulai wajib diisi");
            return;
        }

        if (!form.waktu_selesai) {
            setError("Waktu selesai wajib diisi");
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
                                {initialData ? "Edit Absensi" : "Buat Absensi Periode"}
                            </h2>
                            <p className="text-xs text-slate-500">
                                {initialData ? "Perbarui data absensi" : "Buat sesi absensi untuk periode tertentu"}
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
                    {/* Pertemuan */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <div className="flex items-center gap-2">
                                <BookOpen size={16} className="text-emerald-500" />
                                Pertemuan
                            </div>
                        </label>
                        <input
                            type="text"
                            name="pertemuan"
                            value={form.pertemuan}
                            onChange={handleChange}
                            placeholder="Contoh: Pertemuan 1 - Pengenalan Algoritma"
                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none"
                        />
                    </div>

                    {/* Periode Tanggal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-emerald-500" />
                                    Tanggal Mulai
                                </div>
                            </label>
                            <input
                                type="date"
                                name="tanggal_mulai"
                                value={form.tanggal_mulai}
                                onChange={handleChange}
                                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-emerald-500" />
                                    Tanggal Selesai
                                </div>
                            </label>
                            <input
                                type="date"
                                name="tanggal_selesai"
                                value={form.tanggal_selesai}
                                onChange={handleChange}
                                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Waktu */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-emerald-500" />
                                    Waktu Mulai
                                </div>
                            </label>
                            <input
                                type="time"
                                name="waktu_mulai"
                                value={form.waktu_mulai}
                                onChange={handleChange}
                                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-emerald-500" />
                                    Waktu Selesai
                                </div>
                            </label>
                            <input
                                type="time"
                                name="waktu_selesai"
                                value={form.waktu_selesai}
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
                            <CalendarDays size={18} />
                            {initialData ? "Update Absensi" : "Buat Absensi"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}