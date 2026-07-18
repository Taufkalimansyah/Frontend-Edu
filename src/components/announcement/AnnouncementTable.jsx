import { Bell, Pencil, Trash2, Eye, Calendar, User } from "lucide-react";

export default function AnnouncementTable({
    pengumuman,
    onEdit,
    onDelete
}) {
    return (
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gradient-to-r from-emerald-50 to-emerald-100/50">
                            <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                Judul
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                Isi
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                <div className="flex items-center gap-1">
                                    <User size={14} />
                                    Pembuat
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                <div className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    Tanggal
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {pengumuman.map((item, index) => (
                            <tr
                                key={item.id}
                                className="group hover:bg-emerald-50/50 transition-colors duration-200"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                            <Bell size={16} className="text-emerald-600" />
                                        </div>
                                        <span className="font-medium text-slate-800 group-hover:text-emerald-700 transition-colors duration-200">
                                            {item.judul}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-slate-600 line-clamp-2 max-w-xs">
                                        {item.isi}
                                    </p>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                                            {item.pembuat?.name?.charAt(0) || 'U'}
                                        </div>
                                        <span className="text-sm text-slate-700">
                                            {item.pembuat?.name || 'Unknown'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {item.tanggal?.split("T")[0] || '-'}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`
                                        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                                        ${item.status.toLowerCase() === 'aktif' 
                                            ? 'bg-emerald-100 text-emerald-700' 
                                            : 'bg-slate-100 text-slate-600'
                                        }
                                    `}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${item.status.toLowerCase() === 'aktif' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                                        {item.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => onEdit(item)}
                                            className="group/btn relative px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 text-white text-xs font-medium shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5"
                                        >
                                            <Pencil size={14} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                                            Edit
                                            <span className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></span>
                                        </button>
                                        <button
                                            onClick={() => onDelete(item)}
                                            className="group/btn relative px-3 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-400 text-white text-xs font-medium shadow-md shadow-red-200 hover:shadow-lg hover:shadow-red-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5"
                                        >
                                            <Trash2 size={14} className="group-hover/btn:scale-110 transition-transform duration-300" />
                                            Hapus
                                            <span className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {pengumuman.length === 0 && (
                <div className="text-center py-12">
                    <Bell size={48} className="text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">Belum ada pengumuman</p>
                </div>
            )}
        </div>
    );
}