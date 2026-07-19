import { BookOpen } from "lucide-react";

function toGradeLetter(rataRata) {
    if (rataRata === null || rataRata === undefined) return "-";
    if (rataRata >= 85) return "A";
    if (rataRata >= 80) return "A-";
    if (rataRata >= 75) return "B+";
    if (rataRata >= 70) return "B";
    if (rataRata >= 65) return "B-";
    if (rataRata >= 60) return "C+";
    if (rataRata >= 55) return "C";
    return "D";
}

function getGradeColor(grade) {
    const colors = {
        'A': 'bg-emerald-100 text-emerald-700',
        'A-': 'bg-emerald-100 text-emerald-700',
        'B+': 'bg-blue-100 text-blue-700',
        'B': 'bg-blue-100 text-blue-700',
        'B-': 'bg-blue-100 text-blue-700',
        'C+': 'bg-yellow-100 text-yellow-700',
        'C': 'bg-yellow-100 text-yellow-700',
        'D': 'bg-red-100 text-red-700'
    };
    return colors[grade] || 'bg-slate-100 text-slate-700';
}

export default function NilaiRow({ item }) {
    const grade = toGradeLetter(item.rata_rata);
    const gradeColor = getGradeColor(grade);

    return (
        <tr className="group hover:bg-emerald-50/50 transition-colors duration-200">
            {/* Mata Kuliah */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <BookOpen size={16} className="text-emerald-600" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors duration-200">
                            {item.kelas?.nama || "-"}
                        </h3>
                        <p className="text-xs text-slate-500">
                            {item.kelas?.kode || "-"}
                        </p>
                    </div>
                </div>
            </td>

            {/* Tugas */}
            <td className="px-6 py-4 text-center">
                <span className="text-sm font-medium text-slate-700">
                    {item.nilai_tugas ?? "-"}
                </span>
            </td>

            {/* Kuis */}
            <td className="px-6 py-4 text-center">
                <span className="text-sm font-medium text-slate-700">
                    {item.nilai_kuis ?? "-"}
                </span>
            </td>

            {/* Ujian */}
            <td className="px-6 py-4 text-center">
                <span className="text-sm font-medium text-slate-700">
                    {item.nilai_ujian ?? "-"}
                </span>
            </td>

            {/* Nilai Akhir */}
            <td className="px-6 py-4 text-center">
                <span className={`text-base font-bold ${item.rata_rata ? 'text-slate-800' : 'text-slate-400'}`}>
                    {item.rata_rata ?? "-"}
                </span>
            </td>

            {/* Grade */}
            <td className="px-6 py-4 text-center">
                {grade !== "-" ? (
                    <span className={`inline-flex items-center justify-center min-w-[40px] px-3 py-1.5 rounded-lg text-xs font-bold ${gradeColor}`}>
                        {grade}
                    </span>
                ) : (
                    <span className="text-sm text-slate-400">-</span>
                )}
            </td>
        </tr>
    );
}