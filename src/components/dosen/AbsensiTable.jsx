import { CalendarDays, BookOpen, Calendar, Clock } from "lucide-react";
import AbsensiRow from "./AbsensiRow";

export default function AbsensiTable({ data, onDetail, onEdit, onDelete }) {
    if (data.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
                <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CalendarDays size={40} className="text-emerald-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Belum Ada Sesi Absensi</h3>
                <p className="text-slate-500">Buat sesi absensi baru untuk kelas ini</p>
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
                                <div className="flex items-center gap-2"><BookOpen size={14} />Pertemuan</div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                <div className="flex items-center gap-2"><Calendar size={14} />Periode</div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                <div className="flex items-center gap-2"><Clock size={14} />Waktu</div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                Rekap
                            </th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.map((item) => (
                            <AbsensiRow key={item.id} item={item} onDetail={onDetail} onEdit={onEdit} onDelete={onDelete} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}