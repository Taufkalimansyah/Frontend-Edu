import { FileText, Star, Check, X, Download, Eye, User, BookOpen, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function PenilaianTable({ data, editingId, formData, setFormData, onEdit, onSave, onCancel, onDetail, onDownload }) {
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const getSortIcon = (field) => {
        if (sortBy !== field) return null;
        return sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
    };

    const sortedData = [...data];
    if (sortBy) {
        sortedData.sort((a, b) => {
            let aVal, bVal;
            if (sortBy === 'nama') {
                aVal = a.mahasiswa?.name || '';
                bVal = b.mahasiswa?.name || '';
            } else if (sortBy === 'nilai') {
                aVal = a.nilai ?? -1;
                bVal = b.nilai ?? -1;
            } else {
                aVal = a[sortBy] || '';
                bVal = b[sortBy] || '';
            }
            if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }

    if (data.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 text-center">
                <div className="w-24 h-24 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <FileText size={40} className="text-emerald-300" />
                </div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">Belum Ada Pengumpulan</h3>
                <p className="text-slate-500">Belum ada mahasiswa yang mengumpulkan tugas.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gradient-to-r from-emerald-50 to-emerald-100/50">
                            <th 
                                className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider cursor-pointer hover:text-emerald-500 transition-colors duration-200"
                                onClick={() => handleSort('nama')}
                            >
                                <div className="flex items-center gap-1">
                                    <User size={14} />
                                    Mahasiswa
                                    {getSortIcon('nama')}
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                <div className="flex items-center gap-1">
                                    <BookOpen size={14} />
                                    Tugas
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                <div className="flex items-center gap-1">
                                    <FileText size={14} />
                                    File
                                </div>
                            </th>
                            <th 
                                className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider cursor-pointer hover:text-emerald-500 transition-colors duration-200"
                                onClick={() => handleSort('nilai')}
                            >
                                <div className="flex items-center gap-1">
                                    <Star size={14} />
                                    Nilai
                                    {getSortIcon('nilai')}
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                <div className="flex items-center gap-1">
                                    <MessageSquare size={14} />
                                    Feedback
                                </div>
                            </th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {sortedData.map((item) => {
                            const isEditing = editingId === item.id;
                            const sudahDinilai = item.nilai !== null && item.nilai !== undefined;
                            
                            return (
                                <tr key={item.id} className="group hover:bg-emerald-50/50 transition-colors duration-200">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-emerald-200 group-hover:scale-110 transition-transform duration-300">
                                                {item.mahasiswa?.name?.charAt(0) || '?'}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-800 group-hover:text-emerald-700 transition-colors duration-200">
                                                    {item.mahasiswa?.name || "-"}
                                                </p>
                                                <p className="text-xs text-slate-500">{item.mahasiswa?.nim || "-"}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-slate-700">{item.tugas?.judul || "-"}</p>
                                        <p className="text-xs text-slate-500">{item.tugas?.kelas?.nama || "-"}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.file_name ? (
                                            <button
                                                onClick={() => onDownload(item)}
                                                className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 text-sm font-medium group/btn transition-all duration-200"
                                            >
                                                <div className="p-1.5 bg-emerald-50 rounded-lg group-hover/btn:bg-emerald-100 transition-colors duration-200">
                                                    <Download size={14} />
                                                </div>
                                                <span className="hover:underline">{item.file_name}</span>
                                            </button>
                                        ) : (
                                            <span className="text-sm text-slate-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {isEditing ? (
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={formData.nilai}
                                                onChange={(e) => setFormData(prev => ({ ...prev, nilai: e.target.value }))}
                                                className="w-20 border-2 border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-300"
                                                placeholder="Nilai"
                                                autoFocus
                                            />
                                        ) : (
                                            <span className={`text-lg font-bold ${sudahDinilai ? 'text-slate-800' : 'text-slate-400'}`}>
                                                {sudahDinilai ? item.nilai : '-'}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 max-w-xs">
                                        {isEditing ? (
                                            <textarea
                                                rows={2}
                                                value={formData.feedback}
                                                onChange={(e) => setFormData(prev => ({ ...prev, feedback: e.target.value }))}
                                                className="w-full border-2 border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none resize-none transition-all duration-300"
                                                placeholder="Tulis feedback..."
                                            />
                                        ) : (
                                            <p className="text-sm text-slate-600 line-clamp-2">
                                                {item.feedback || <span className="text-slate-400">-</span>}
                                            </p>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            {isEditing ? (
                                                <>
                                                    <button 
                                                        onClick={() => onSave(item.id)} 
                                                        className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white rounded-xl shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all duration-300"
                                                        title="Simpan"
                                                    >
                                                        <Check size={15} />
                                                    </button>
                                                    <button 
                                                        onClick={onCancel} 
                                                        className="p-2 bg-gradient-to-r from-slate-400 to-slate-500 text-white rounded-xl shadow-md shadow-slate-200 hover:shadow-lg hover:shadow-slate-300 hover:-translate-y-0.5 transition-all duration-300"
                                                        title="Batal"
                                                    >
                                                        <X size={15} />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button 
                                                        onClick={() => onEdit(item)} 
                                                        className="p-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-xl shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 hover:-translate-y-0.5 transition-all duration-300"
                                                        title="Beri Nilai"
                                                    >
                                                        <Star size={15} />
                                                    </button>
                                                    <button 
                                                        onClick={() => onDetail(item)} 
                                                        className="p-2 bg-gradient-to-r from-purple-500 to-purple-400 text-white rounded-xl shadow-md shadow-purple-200 hover:shadow-lg hover:shadow-purple-300 hover:-translate-y-0.5 transition-all duration-300"
                                                        title="Detail"
                                                    >
                                                        <Eye size={15} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            
            {/* Footer dengan total data */}
            <div className="px-6 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Menampilkan {data.length} data</span>
                <span className="flex items-center gap-1">
                    <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full"></span>
                    {data.filter(item => item.nilai !== null && item.nilai !== undefined).length} sudah dinilai
                </span>
            </div>
        </div>
    );
}