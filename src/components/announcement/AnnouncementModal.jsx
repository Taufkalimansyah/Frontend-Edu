import { useEffect, useState } from "react";
import { X, Calendar, FileText, AlertCircle } from "lucide-react";

export default function AnnouncementModal({
    open,
    onClose,
    onSave,
    editing,
    error,
    saving
}) {
    const [form, setForm] = useState({
        judul: "",
        isi: "",
        tanggal: "",
        status: "aktif"
    });

    useEffect(() => {
        if (editing) {
            setForm({
                judul: editing.judul,
                isi: editing.isi,
                tanggal: editing.tanggal,
                status: editing.status.toLowerCase()
            });
        } else {
            setForm({
                judul: "",
                isi: "",
                tanggal: "",
                status: "aktif"
            });
        }
    }, [editing]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
            <div className="bg-white rounded-3xl w-[600px] p-8 shadow-2xl transform animate-slideUp">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-200">
                            <FileText className="text-white" size={22} />
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                            {editing ? "Edit Pengumuman" : "Tambah Pengumuman"}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-300 hover:rotate-90"
                    >
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
                    <div className="space-y-5">
                        {/* Judul */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Judul Pengumuman
                            </label>
                            <div className="relative">
                                <input
                                    className={`w-full border-2 rounded-xl p-3 pl-4 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none ${error ? "border-red-400 ring-2 ring-red-200" : "border-slate-200"}`}
                                    placeholder="Masukkan judul pengumuman"
                                    value={form.judul}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            judul: e.target.value
                                        })
                                    }
                                />
                                {error && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <AlertCircle size={18} className="text-red-500" />
                                    </div>
                                )}
                            </div>
                            {error && (
                                <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                                    <AlertCircle size={14} />
                                    {error}
                                </p>
                            )}
                        </div>

                        {/* Isi */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Isi Pengumuman
                            </label>
                            <textarea
                                rows={5}
                                className="w-full border-2 border-slate-200 rounded-xl p-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none resize-none"
                                placeholder="Tulis isi pengumuman di sini..."
                                value={form.isi}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        isi: e.target.value
                                    })
                                }
                            />
                        </div>

                        {/* Tanggal & Status */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-emerald-500" />
                                        Tanggal
                                    </div>
                                </label>
                                <input
                                    type="date"
                                    className="w-full border-2 border-slate-200 rounded-xl p-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none"
                                    value={form.tanggal}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            tanggal: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Status
                                </label>
                                <select
                                    className="w-full border-2 border-slate-200 rounded-xl p-3 transition-all duration-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none bg-white"
                                    value={form.status}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            status: e.target.value
                                        })
                                    }
                                >
                                    <option value="aktif">✅ Aktif</option>
                                    <option value="nonaktif">⛔ Nonaktif</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 font-medium"
                        >
                            Batal
                        </button>
                        <button
                            disabled={saving}
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-medium shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            {saving ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Menyimpan...
                                </span>
                            ) : (
                                editing ? "Simpan Perubahan" : "Tambah Pengumuman"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}