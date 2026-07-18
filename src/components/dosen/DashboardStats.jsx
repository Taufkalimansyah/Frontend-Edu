import { 
  BookOpen, 
  Users, 
  ClipboardList, 
  FileUp,
  TrendingUp,
  CalendarCheck,
  Award
} from "lucide-react";

export default function DashboardStats({ stats }) {
  const statItems = [
    {
      label: "Total Kelas",
      value: stats.totalKelas,
      icon: BookOpen,
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
      trend: "+2 dari bulan lalu",
      trendColor: "text-emerald-600"
    },
    {
      label: "Total Mahasiswa",
      value: stats.totalMahasiswa,
      icon: Users,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: "+12% dari bulan lalu",
      trendColor: "text-blue-600"
    },
    {
      label: "Tugas Aktif",
      value: stats.tugasAktif,
      icon: ClipboardList,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-500",
      trend: "+3 dari minggu lalu",
      trendColor: "text-orange-500"
    },
    {
      label: "Materi Upload",
      value: stats.materiUpload,
      icon: FileUp,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      trend: "+8 dari bulan lalu",
      trendColor: "text-purple-600"
    }
  ];

  // Additional stats for bottom row
  const additionalStats = [
    {
      label: "Persentase Kehadiran",
      value: `${stats.persentaseKehadiran}%`,
      icon: CalendarCheck,
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      label: "Rata-rata Nilai",
      value: stats.rataRataNilai,
      icon: Award,
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600"
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 ${item.bgColor} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                <item.icon size={22} className={item.iconColor} />
              </div>
              <span className="text-xs text-slate-400">● ● ●</span>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{item.label}</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">
                {item.value}
              </p>
              <p className={`text-xs mt-2 ${item.trendColor} flex items-center gap-1`}>
                <TrendingUp size={12} />
                {item.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {additionalStats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 ${item.bgColor} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                <item.icon size={24} className={item.iconColor} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">{item.label}</p>
                <p className="text-2xl font-bold text-slate-800">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}