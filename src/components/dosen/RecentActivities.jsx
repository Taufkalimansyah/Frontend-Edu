import { Clock, Calendar, MoreVertical } from "lucide-react";

export default function RecentActivities({ activities }) {
  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700",
      success: "bg-emerald-100 text-emerald-700",
      warning: "bg-orange-100 text-orange-700",
      error: "bg-red-100 text-red-700",
      info: "bg-blue-100 text-blue-700"
    };
    return colors[status] || colors.info;
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: "Menunggu",
      success: "Selesai",
      warning: "Perhatian",
      error: "Gagal",
      info: "Informasi"
    };
    return labels[status] || labels.info;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-slate-800">Aktivitas Terbaru</h3>
          <p className="text-xs text-slate-500 mt-0.5">Update terakhir dari aktivitas Anda</p>
        </div>
        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
          Lihat Semua
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div
              key={activity.id}
              className="group flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200"
            >
              <div className={`p-2 ${activity.bgColor} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={18} className={activity.iconColor} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {activity.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {activity.description}
                    </p>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${getStatusColor(activity.status)}`}>
                    {getStatusLabel(activity.status)}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                  <Clock size={12} />
                  {activity.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}