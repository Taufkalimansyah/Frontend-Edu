import { FileUp, BookOpen, Eye, Download } from "lucide-react";

export default function MateriStats({ materiList }) {
    const stats = {
        total: materiList.length,
        published: materiList.filter(m => m.status === "published").length,
        totalViews: materiList.reduce((acc, m) => acc + m.views, 0),
        totalDownloads: materiList.reduce((acc, m) => acc + m.downloads, 0)
    };

    const statItems = [
        {
            label: "Total Materi",
            value: stats.total,
            icon: FileUp,
            bgColor: "bg-emerald-100",
            iconColor: "text-emerald-600"
        },
        {
            label: "Materi Published",
            value: stats.published,
            icon: BookOpen,
            bgColor: "bg-green-100",
            iconColor: "text-green-600"
        },
        {
            label: "Total Views",
            value: stats.totalViews,
            icon: Eye,
            bgColor: "bg-blue-100",
            iconColor: "text-blue-600"
        },
        {
            label: "Total Downloads",
            value: stats.totalDownloads,
            icon: Download,
            bgColor: "bg-purple-100",
            iconColor: "text-purple-600"
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