import { Pencil, Trash2, Eye, CheckCircle, Clock, XCircle } from "lucide-react";

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

export default function AbsensiRow({ item, onDetail, onEdit, onDelete }) {
    return (
        <tr className="group hover:bg-emerald-50/50 transition-colors duration-200">
            <td className="px-6 py-4">
                <p className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors duration-200">
                    {item.pertemuan}
                </p>
            </td>

            <td className="px-6 py-4 text-sm text-slate-700 whitespace-nowrap">
                {formatTanggal(item.tanggal_mulai)} &ndash; {formatTanggal(item.tanggal_selesai)}
            </td>

            <td className="px-6 py-4 text-sm text-slate-700 whitespace-nowrap">
                {formatWaktu(item.waktu_mulai)} &ndash; {formatWaktu(item.waktu_selesai)}
            </td>

            <td className="px-6 py-4">
                <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle size={13} /> {item.hadir_count ?? 0}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-600">
                        <Clock size={13} /> {item.izin_count ?? 0}
                    </span>
                    <span className="flex items-center gap-1 text-red-600">
                        <XCircle size={13} /> {item.alpha_count ?? 0}
                    </span>
                </div>
            </td>

            <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                    <button
                        onClick={() => onDetail(item)}
                        className="px-3 py-1.5 rounded-lg bg-slate-600 text-white text-xs font-medium shadow-md shadow-slate-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1"
                    >
                        <Eye size={14} />
                        Detail
                    </button>
                    <button
                        onClick={() => onEdit(item)}
                        className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-xs font-medium shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1"
                    >
                        <Pencil size={14} />
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(item.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-medium shadow-md shadow-red-200 hover:shadow-lg hover:shadow-red-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1"
                    >
                        <Trash2 size={14} />
                        Hapus
                    </button>
                </div>
            </td>
        </tr>
    );
}