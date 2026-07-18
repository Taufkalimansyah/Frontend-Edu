import { FileText, Download, Eye, CheckCircle, Clock } from "lucide-react";

export default function PenilaianRow({
    item,
    isEditing,
    formData,
    setFormData,
    onEdit,
    onSave,
    onCancel,
    onDetail
}) {
    const getStatusBadge = (status) => {
        if (status === "dinilai") {
            return {
                color: "bg-emerald-100 text-emerald-700",
                icon: <CheckCircle size={14} className="text-emerald-500" />,
                label: "Sudah Dinilai"
            };
        }
        return {
            color: "bg-yellow-100 text-yellow-700",
            icon: <Clock size={14} className="text-yellow-500" />,
            label: "Belum Dinilai"
        };
    };

    const statusBadge = getStatusBadge(item.status);

    return (
        <tr className="group hover:bg-emerald-50/50 transition-colors duration-200">
            {/* Mahasiswa */}
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
            
            {/* Tugas */}
            <td className="px-6 py-4">
                <div>
                    <p className="text-sm font-medium text-slate-700">{item.tugas.judul}</p>
                    <p className="text-xs text-slate-500">{item.tugas.mataKuliah}</p>
                </div>
            </td>
            
            {/* File */}
            <td className="px-6 py-4">
                <button className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200">
                    <FileText size={14} />
                    <span className="hover:underline">{item.file}</span>
                    <Download size={14} className="ml-1" />
                </button>
            </td>
            
            {/* Nilai */}
            <td className="px-6 py-4">
                {isEditing ? (
                    <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.nilai}
                        onChange={(e) => setFormData({ ...formData, nilai: e.target.value })}
                        className="w-20 border-2 border-slate-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none"
                        placeholder="Nilai"
                    />
                ) : (
                    <span className={`text-lg font-bold ${item.nilai ? 'text-slate-800' : 'text-slate-400'}`}>
                        {item.nilai || '-'}
                    </span>
                )}
            </td>
            
            {/* Feedback */}
            <td className="px-6 py-4">
                {isEditing ? (
                    <textarea
                        value={formData.feedback}
                        onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                        className="w-48 border-2 border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none resize-none"
                        rows="2"
                        placeholder="Tulis feedback..."
                    />
                ) : (
                    <p className="text-sm text-slate-600 line-clamp-2 max-w-xs">
                        {item.feedback || '-'}
                    </p>
                )}
            </td>
            
            {/* Status */}
            <td className="px-6 py-4">
                <span className={`
                    inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                    ${statusBadge.color}
                `}>
                    {statusBadge.icon}
                    {statusBadge.label}
                </span>
            </td>
            
            {/* Action */}
            <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                    {isEditing ? (
                        <>
                            <button
                                onClick={() => onSave(item.id)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-medium shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Simpan
                            </button>
                            <button
                                onClick={onCancel}
                                className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-300 transition-all duration-300"
                            >
                                Batal
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => onEdit(item)}
                                className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-xs font-medium shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Nilai
                            </button>
                            <button
                                onClick={() => onDetail(item)}
                                className="px-3 py-1.5 rounded-lg bg-purple-500 text-white text-xs font-medium shadow-md shadow-purple-200 hover:shadow-lg hover:shadow-purple-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1"
                            >
                                <Eye size={14} />
                                Detail
                            </button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
}