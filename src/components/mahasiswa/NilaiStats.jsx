import { BarChart3, GraduationCap, BookOpen, TrendingUp } from "lucide-react";

// Konversi rata_rata (angka 0-100 dari backend) -> huruf
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

export default function NilaiStats({ nilaiList }) {
    const totalKelas = nilaiList.length;
    const kelasSelesai = nilaiList.filter(n => n.rata_rata !== null && n.rata_rata !== undefined).length;
    const rataRataSemua = kelasSelesai > 0
        ? (
            nilaiList.reduce((sum, n) => sum + (n.rata_rata ?? 0), 0) / kelasSelesai
        ).toFixed(1)
        : null;

    const gradeTertinggi = kelasSelesai > 0
        ? toGradeLetter(Math.max(...nilaiList.map(n => n.rata_rata ?? 0)))
        : "-";

    const stats = [
        {
            label: "Rata-rata Nilai Akhir",
            value: rataRataSemua ?? "-",
            subtitle: `dari ${kelasSelesai} kelas yang sudah dinilai`,
            icon: TrendingUp,
            bgColor: "bg-gradient-to-br from-slate-800 to-slate-900",
            textColor: "text-white",
            labelColor: "text-slate-400",
            valueColor: "text-white",
            iconBg: "bg-white/10"
        },
        {
            label: "Total Kelas",
            value: totalKelas,
            subtitle: `${kelasSelesai} sudah ada nilai, ${totalKelas - kelasSelesai} belum`,
            icon: BarChart3,
            bgColor: "bg-white",
            textColor: "text-slate-800",
            labelColor: "text-slate-500",
            valueColor: "text-slate-800",
            iconBg: "bg-emerald-100"
        },
        {
            label: "Grade Tertinggi",
            value: gradeTertinggi,
            subtitle: "Berdasarkan rata-rata nilai per kelas",
            icon: GraduationCap,
            bgColor: "bg-white",
            textColor: "text-slate-800",
            labelColor: "text-slate-500",
            valueColor: "text-emerald-600",
            iconBg: "bg-emerald-100"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((item, index) => (
                <div
                    key={index}
                    className={`rounded-2xl p-6 border ${item.bgColor === 'bg-white' ? 'border-slate-200' : 'border-slate-700'} shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
                >
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <p className={`text-xs uppercase tracking-wider font-medium ${item.labelColor}`}>
                                {item.label}
                            </p>
                            <h2 className={`mt-2 text-3xl font-bold ${item.valueColor}`}>
                                {item.value}
                            </h2>
                            <p className={`mt-2 text-sm ${item.labelColor}`}>
                                {item.subtitle}
                            </p>
                        </div>
                        <div className={`p-3 rounded-xl ${item.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                            <item.icon size={22} className={item.textColor} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}