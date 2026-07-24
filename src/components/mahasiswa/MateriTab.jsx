import MateriItem from "./MateriItem";
import { FileText } from "lucide-react";

export default function MateriTab({ materiList, expandedId, onToggle, onDownload }) {
    if (materiList.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileText size={32} className="text-slate-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Belum Ada Materi</h3>
                <p className="text-sm text-slate-500">Belum ada materi yang diupload di kelas ini.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-sm font-semibold text-slate-700">Daftar Materi</h3>
                    <p className="text-xs text-slate-400">{materiList.length} materi tersedia</p>
                </div>
            </div>
            {materiList.map((item) => (
                <MateriItem
                    key={item.id}
                    item={item}
                    isOpen={expandedId === item.id}
                    onToggle={onToggle}
                    onDownload={onDownload}
                />
            ))}
        </div>
    );
}