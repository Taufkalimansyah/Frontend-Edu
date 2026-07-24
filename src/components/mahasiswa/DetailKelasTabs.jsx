import { FileText, ClipboardList, CalendarCheck } from "lucide-react";

export default function DetailKelasTabs({ activeTab, setActiveTab }) {
    const tabs = [
        { id: "materi", label: "Materi", icon: FileText },
        { id: "tugas", label: "Tugas", icon: ClipboardList },
        { id: "absensi", label: "Absensi", icon: CalendarCheck }
    ];

    return (
        <div className="flex gap-2 mb-6 bg-white rounded-2xl border border-slate-200 p-1.5 shadow-sm">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;

                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 flex-1
                            ${isActive
                                ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-200'
                                : 'text-slate-600 hover:bg-slate-100'
                            }
                        `}
                    >
                        <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                        <span>{tab.label}</span>
                        {isActive && (
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse ml-1"></span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}