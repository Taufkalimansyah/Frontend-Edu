import { useEffect, useState } from "react";
import { X, User, Calendar, Clock, AlertCircle, CalendarDays } from "lucide-react";

export default function AbsensiFormModal({ open, initialData, mahasiswaList, onClose, onSubmit }) {
    const [form, setForm] = useState({
        mahasiswa_id: "",
        tanggal: "",
        status: "hadir"
    });
    const [error, setError] = useState(null);

    const statusList = [
        { value: "hadir", label: "Hadir" },
        { value: "izin", label: "Izin" },
        { value: "alpha", label: "Alpha" }
    ];

    useEffect(() => {
        if (initialData) {
            setForm({
                mahasiswa_id: initialData.mahasiswa_id || initialData.mahasiswa?.id || "",
                tanggal: initialData.tanggal || "",
                status: initialData.status || "hadir"
            });
        } else {
            setForm({
                mahasiswa_id: "",
                tanggal: "",
                status: "hadir"
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
        
        // If editing, mahasiswa_id might not be changeable but we still need it
        if (!initialData && !form.mahasiswa_id) {
            setError("Mahasiswa wajib dipilih");
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
                    {/* Mahasiswa (Only show if adding, or disabled if editing) */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <div className="flex items-center gap-2">
                                <User size={16} className="text-emerald-500" />
                                Mahasiswa
                            </div>
                        </label>
                        {initialData ? (
                            <input
                                type="text"
                                value={`${initialData.mahasiswa?.name} (${initialData.mahasiswa?.nim})`}
                                disabled
                                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 bg-slate-50 text-slate-500 outline-none cursor-not-allowed"
                            />
                        ) : (
                            <select
                                name="mahasiswa_id"
                                value={form.mahasiswa_id}
                                onChange={handleChange}
                                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none bg-white"
                            >
                                <option value="">Pilih Mahasiswa</option>
                                {mahasiswaList?.map(mhs => (
                                    <option key={mhs.id} value={mhs.id}>
                                        {mhs.nim} - {mhs.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    {/* Tanggal & Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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