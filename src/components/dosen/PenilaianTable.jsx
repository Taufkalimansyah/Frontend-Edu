import { FileText, Download, Eye, User, BookOpen, Star, MessageSquare } from "lucide-react";
import PenilaianRow from "./PenilaianRow";

export default function PenilaianTable({
    data,
    editingId,
    formData,
    setFormData,
    onEdit,
    onSave,
    onCancel,
    onDetail
}) {
    if (data.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
                <FileText size={48} className="text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                    Tidak Ada Data
                </h3>
                <p className="text-slate-500">
                    Tidak ada data penilaian yang ditemukan
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gradient-to-r from-emerald-50 to-emerald-100/50">
                            <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                <div className="flex items-center gap-2">
                                    <User size={14} />
                                    Mahasiswa
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                <div className="flex items-center gap-2">
                                    <BookOpen size={14} />
                                    Tugas
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                <div className="flex items-center gap-2">
                                    <FileText size={14} />
                                    File
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                <div className="flex items-center gap-2">
                                    <Star size={14} />
                                    Nilai
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                <div className="flex items-center gap-2">
                                    <MessageSquare size={14} />
                                    Feedback
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
                        {data.map((item) => (
                            <PenilaianRow
                                key={item.id}
                                item={item}
                                isEditing={editingId === item.id}
                                formData={formData}
                                setFormData={setFormData}
                                onEdit={onEdit}
                                onSave={onSave}
                                onCancel={onCancel}
                                onDetail={onDetail}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}