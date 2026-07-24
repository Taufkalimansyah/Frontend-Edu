import { Layers, CheckCircle, Clock, XCircle } from "lucide-react";

export default function AbsensiStats({ stats }) {
    const statItems = [
        {
            label: "Total Sesi",
            value: stats.totalSesi ?? 0,
            icon: Layers,
            bgColor: "bg-emerald-100",
            iconColor: "text-emerald-600"
        },
        {
            label: "Hadir",
            value: stats.totalHadir ?? 0,
            icon: CheckCircle,
            bgColor: "bg-green-100",
            iconColor: "text-green-600"
        },
        {
            label: "Izin",
            value: stats.totalIzin ?? 0,
            icon: Clock,
            bgColor: "bg-yellow-100",
            iconColor: "text-yellow-600"
        },
        {
            label: "Alpha",
            value: stats.totalAlpha ?? 0,
            icon: XCircle,
            bgColor: "bg-red-100",
            iconColor: "text-red-600"
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statItems.map((item, index) => (
                <div
                    key={index}
                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">{item.label}</p>
                            <p className="text-3xl font-bold text-slate-800 mt-1">
                                {item.value}
                            </p>
                        </div>
                        <div className={`p-3 ${item.bgColor} rounded-xl`}>
                            <item.icon size={24} className={item.iconColor} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}