import { Users, BookOpen, Calendar, Clock, FileText, CalendarDays } from "lucide-react";
import AbsensiRow from "./AbsensiRow";

export default function AbsensiTable({ data, onEdit, onDelete }) {
    if (data.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
                <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CalendarDays size={40} className="text-emerald-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                    Tidak Ada Data Absensi
                </h3>
                <p className="text-slate-500">
                    Belum ada data absensi yang ditemukan
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
                                    <Users size={14} />
                                    Mahasiswa
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                <div className="flex items-center gap-2">
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
                        {data.map((item) => (
                            <AbsensiRow
                                key={item.id}
                                item={item}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}