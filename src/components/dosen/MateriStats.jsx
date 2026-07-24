import { FileUp } from "lucide-react";

export default function MateriStats({ materiList }) {
    // Handle jika materiList undefined atau null
    if (!materiList || !Array.isArray(materiList)) {
        return (
            <div className="mb-8">
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm animate-pulse">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
                            <div className="h-8 bg-slate-200 rounded w-12"></div>
                        </div>
                        <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
                    </div>
                </div>
            </div>
        );
    }

    const total = materiList.length;

    return (
        <div className="mb-8">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Total Materi</p>
                        <p className="text-3xl font-bold text-slate-800 mt-1">
                            {total}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                            {total > 0 ? `${total} materi tersedia` : "Belum ada materi"}
                        </p>
                    </div>
                    <div className="p-3 bg-emerald-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <FileUp size={24} className="text-emerald-600" />
                    </div>
                </div>
            </div>
        </div>
    );
}