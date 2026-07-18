import { 
  BarChart3, 
  Calendar, 
  TrendingUp,
  Users,
  BookOpen,
  CheckCircle,
  Clock
} from "lucide-react";

export default function DashboardCharts() {
  // Data dummy untuk chart
  const weeklyData = [
    { day: "Sen", tugas: 4, materi: 3, absensi: 8 },
    { day: "Sel", tugas: 2, materi: 5, absensi: 6 },
    { day: "Rab", tugas: 5, materi: 2, absensi: 9 },
    { day: "Kam", tugas: 3, materi: 4, absensi: 7 },
    { day: "Jum", tugas: 6, materi: 3, absensi: 8 },
    { day: "Sab", tugas: 1, materi: 1, absensi: 4 },
    { day: "Min", tugas: 0, materi: 0, absensi: 0 }
  ];

  const maxValue = Math.max(
    ...weeklyData.flatMap(d => [d.tugas, d.materi, d.absensi])
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-slate-800">Aktivitas Mingguan</h3>
          <p className="text-xs text-slate-500 mt-0.5">Statistik tugas, materi, dan absensi</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors duration-200">
            Minggu Ini
          </button>
          <button className="px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-50 rounded-lg transition-colors duration-200">
            Bulan Ini
          </button>
        </div>
      </div>

      <div className="h-64 flex items-end gap-3">
        {weeklyData.map((data, index) => {
          const heightTugas = (data.tugas / maxValue) * 100;
          const heightMateri = (data.materi / maxValue) * 100;
          const heightAbsensi = (data.absensi / maxValue) * 100;

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div className="flex items-end gap-1.5 h-52">
                <div className="flex flex-col items-center gap-1">
                  <div 
                    className="w-6 bg-emerald-500 rounded-t-lg transition-all duration-500 hover:bg-emerald-600"
                    style={{ height: `${heightTugas}%` }}
                  ></div>
                  <span className="text-[10px] text-slate-500">T</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div 
                    className="w-6 bg-blue-500 rounded-t-lg transition-all duration-500 hover:bg-blue-600"
                    style={{ height: `${heightMateri}%` }}
                  ></div>
                  <span className="text-[10px] text-slate-500">M</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div 
                    className="w-6 bg-purple-500 rounded-t-lg transition-all duration-500 hover:bg-purple-600"
                    style={{ height: `${heightAbsensi}%` }}
                  ></div>
                  <span className="text-[10px] text-slate-500">A</span>
                </div>
              </div>
              <span className="text-xs text-slate-500 font-medium">{data.day}</span>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-500 rounded"></div>
          <span className="text-xs text-slate-600">Tugas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-xs text-slate-600">Materi</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded"></div>
          <span className="text-xs text-slate-600">Absensi</span>
        </div>
      </div>
    </div>
  );
}