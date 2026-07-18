import { Pencil, Trash2, CheckCircle, Clock, XCircle, User } from "lucide-react";

export default function AbsensiRow({ item, onEdit, onDelete }) {
    const getStatusConfig = (status) => {
        const configs = {
            hadir: {
                color: "bg-green-100 text-green-700",
                icon: <CheckCircle size={14} className="text-green-500" />,
                label: "Hadir"
            },
            izin: {
                color: "bg-yellow-100 text-yellow-700",
                icon: <Clock size={14} className="text-yellow-500" />,
                label: "Izin"
            },
            alpa: {
                color: "bg-red-100 text-red-700",
                icon: <XCircle size={14} className="text-red-500" />,
                label: "Alpa"
            }
        };
        return configs[status] || configs.alpa;
    };

    const statusConfig = getStatusConfig(item.status);

    return (
        <tr className="group hover:bg-emerald-50/50 transition-colors duration-200">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-emerald-200 group-hover:scale-110 transition-transform duration-300">
                        {item.mahasiswa.name.charAt(0)}
                    </div>
                    <div>
                        <p className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors duration-200">
                            {item.mahasiswa.name}
                        </p>
                        <p className="text-xs text-slate-500">
                            {item.mahasiswa.nim} • {item.mahasiswa.kelas}
                        </p>
                    </div>
                </div>
            </td>
            
            <td className="px-6 py-4">
                <span className="text-sm text-slate-700">{item.mataKuliah}</span>
            </td>
            
            <td className="px-6 py-4">
                <span className="text-sm text-slate-700">{item.pertemuan}</span>
            </td>
            
            <td className="px-6 py-4">
                <span className="text-sm text-slate-700">{item.tanggal}</span>
            </td>
            
            <td className="px-6 py-4">
                <span className="text-sm text-slate-700">{item.waktu || '-'}</span>
            </td>
            
            <td className="px-6 py-4">
                <span className={`
                    inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                    ${statusConfig.color}
                `}>
                    {statusConfig.icon}
                    {statusConfig.label}
                </span>
            </td>
            
            <td className="px-6 py-4">
                <p className="text-sm text-slate-600 max-w-xs truncate">
                    {item.keterangan || '-'}
                </p>
            </td>
            
            <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
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