import { 
  FileUp, 
  ClipboardList, 
  CalendarDays, 
  GraduationCap,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Upload Materi",
      description: "Tambahkan materi baru",
      icon: FileUp,
      color: "bg-emerald-500",
      hoverColor: "hover:bg-emerald-600",
      path: "/dosen/upload-materi"
    },
    {
      title: "Buat Tugas",
      description: "Buat tugas baru",
      icon: ClipboardList,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      path: "/dosen/tugas"
    },
    {
      title: "Absensi",
      description: "Kelola kehadiran",
      icon: CalendarDays,
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      path: "/dosen/absensi"
    },
    {
      title: "Penilaian",
      description: "Kelola penilaian",
      icon: GraduationCap,
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
      path: "/dosen/penilaian"
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-slate-800">Aksi Cepat</h3>
          <p className="text-xs text-slate-500 mt-0.5">Akses fitur penting</p>
        </div>
      </div>

      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => navigate(action.path)}
            className="w-full group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 ${action.color} rounded-lg text-white group-hover:scale-110 transition-transform duration-300`}>
                <action.icon size={18} />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-slate-700">{action.title}</p>
                <p className="text-xs text-slate-500">{action.description}</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="bg-emerald-50 rounded-xl p-4">
          <p className="text-sm font-medium text-emerald-700">💡 Tips</p>
          <p className="text-xs text-emerald-600/80 mt-1">
            Upload materi dan buat tugas secara rutin untuk meningkatkan kualitas pembelajaran
          </p>
        </div>
      </div>
    </div>
  );
}