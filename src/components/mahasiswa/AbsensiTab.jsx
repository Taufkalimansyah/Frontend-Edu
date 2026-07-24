import { useState } from "react";
import { CalendarDays, BookOpen, Calendar, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";

const formatTanggal = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (isNaN(date)) return value;
    return date.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
};

const formatWaktu = (value) => {
    if (!value) return "-";
    const match = String(value).match(/(\d{2}):(\d{2})/);
    return match ? `${match[1]}:${match[2]}` : value;
};

const statusConfig = {
    hadir: { color: "bg-green-100 text-green-700", icon: <CheckCircle size={14} className="text-green-500" />, label: "Hadir" },
    izin: { color: "bg-yellow-100 text-yellow-700", icon: <Clock size={14} className="text-yellow-500" />, label: "Izin" },
    alpha: { color: "bg-red-100 text-red-700", icon: <XCircle size={14} className="text-red-500" />, label: "Alpha" }
};

export default function AbsensiTab({ absensiList, onIsi }) {
    const [submittingId, setSubmittingId] = useState(null);

    const handlePilih = async (sesiId, status) => {
        setSubmittingId(sesiId);
        try {
            await onIsi(sesiId, status);
        } finally {
            setSubmittingId(null);
        }
    };

    if (!absensiList || absensiList.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CalendarDays size={32} className="text-slate-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Belum Ada Sesi Absensi</h3>
                <p className="text-sm text-slate-500">Dosen belum membuat sesi absensi untuk kelas ini.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {absensiList.map((item) => {
                const sudahIsi = Boolean(item.status_saya);
                const cfg = sudahIsi ? statusConfig[item.status_saya] : null;

                return (
                    <div
                        key={item.id}
                        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <BookOpen size={16} className="text-emerald-500" />
                                    <h3 className="font-semibold text-slate-800">{item.pertemuan}</h3>
                                </div>
                                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        {formatTanggal(item.tanggal_mulai)} &ndash; {formatTanggal(item.tanggal_selesai)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock size={12} />
                                        {formatWaktu(item.waktu_mulai)} &ndash; {formatWaktu(item.waktu_selesai)}
                                    </span>
                                </div>
                            </div>

                            {sudahIsi ? (
                                <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium ${cfg.color}`}>
                                    {cfg.icon}
                                    Kamu sudah isi: {cfg.label}
                                </span>
                            ) : (
                                <div className="flex items-center gap-2">
                                    {submittingId === item.id ? (
                                        <div className="flex items-center gap-2 text-sm text-slate-500 px-3 py-2">
                                            <Loader2 size={16} className="animate-spin" />
                                            Menyimpan...
                                        </div>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => handlePilih(item.id, "hadir")}
                                                className="px-3 py-2 rounded-lg bg-green-500 text-white text-xs font-medium shadow-md shadow-green-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1"
                                            >
                                                <CheckCircle size={14} />
                                                Hadir
                                            </button>
                                            <button
                                                onClick={() => handlePilih(item.id, "izin")}
                                                className="px-3 py-2 rounded-lg bg-yellow-500 text-white text-xs font-medium shadow-md shadow-yellow-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1"
                                            >
                                                <Clock size={14} />
                                                Izin
                                            </button>
                                            <button
                                                onClick={() => handlePilih(item.id, "alpha")}
                                                className="px-3 py-2 rounded-lg bg-red-500 text-white text-xs font-medium shadow-md shadow-red-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1"
                                            >
                                                <XCircle size={14} />
                                                Alpha
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}