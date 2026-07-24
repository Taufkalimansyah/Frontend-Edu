import { FileText, Clock, CheckCircle } from "lucide-react";

export default function NilaiTugasRow({ item }) {
    const sudahDinilai = item.nilai !== null && item.nilai !== undefined;

    return (
        <tr className="hover:bg-emerald-50/50 transition-colors duration-200">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-xl">
                        <FileText size={16} className="text-emerald-600" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-800">{item.tugas?.judul}</h3>
                        <p className="text-xs text-slate-500">{item.tugas?.kelas?.nama}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 text-center">
                <span className="text-xs text-slate-500">{item.file_name}</span>
            </td>
            <td className="px-6 py-4 text-center">
                <span className="text-xs text-slate-500">
                    {item.submitted_at ? new Date(item.submitted_at).toLocaleDateString("id-ID") : "-"}
                </span>
            </td>
            <td className="px-6 py-4 text-center">
                {sudahDinilai ? (
                    <span className="text-base font-bold text-slate-800">{item.nilai}</span>
                ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-yellow-700 bg-yellow-100 px-3 py-1.5 rounded-full">
                        <Clock size={12} /> Belum Dinilai
                    </span>
                )}
            </td>
            <td className="px-6 py-4 max-w-xs">
                <p className="text-sm text-slate-600 line-clamp-2">{item.feedback || "-"}</p>
            </td>
        </tr>
    );
}