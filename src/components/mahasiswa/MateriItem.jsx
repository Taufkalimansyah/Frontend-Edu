import { ChevronDown, ChevronRight, Download, FileText, Calendar, File } from "lucide-react";

export default function MateriItem({ item, isOpen, onToggle, onDownload }) {
    return (
        <div className={`
            bg-white rounded-2xl border transition-all duration-300 overflow-hidden
            ${isOpen 
                ? 'border-emerald-300 shadow-md shadow-emerald-100/50' 
                : 'border-slate-200 hover:border-emerald-200 hover:shadow-sm'
            }
        `}>
            <div 
                className="flex items-center justify-between px-5 py-4 cursor-pointer"
                onClick={() => onToggle(item.id)}
            >
                <div className="flex items-center gap-4 flex-1">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isOpen 
                            ? "bg-gradient-to-br from-emerald-500 to-emerald-400 shadow-lg shadow-emerald-200" 
                            : "bg-slate-100"
                    }`}>
                        <FileText size={18} className={isOpen ? "text-white" : "text-slate-400"} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold transition-colors duration-200 ${
                            isOpen ? "text-emerald-700" : "text-slate-800"
                        }`}>
                            {item.judul}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                            <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {item.created_at ? new Date(item.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "-"}
                            </span>
                            <span className="flex items-center gap-1">
                                <File size={12} />
                                {item.file_name || "MoP - Datadog JMX Integration v1.0-July_22th_2026.doc"}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggle(item.id);
                        }}
                        className={`p-1.5 rounded-lg transition-all duration-300 ${
                            isOpen 
                                ? 'bg-emerald-100 text-emerald-600' 
                                : 'hover:bg-slate-100 text-slate-400'
                        }`}
                    >
                        {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </button>
                </div>
            </div>
            
            {isOpen && (
                <div className="px-5 pb-5 pt-3 border-t border-emerald-100/50 bg-gradient-to-b from-emerald-50/30 to-white">
                    <div className="flex items-start gap-3">
                        <div className="p-1.5 bg-emerald-100 rounded-lg mt-0.5">
                            <FileText size={14} className="text-emerald-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {item.deskripsi || "Tidak ada deskripsi"}
                            </p>
                            <div className="mt-3 flex items-center gap-2">
                                <span className="text-xs text-slate-400">File:</span>
                                <button
                                    onClick={() => onDownload(item)}
                                    className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                                >
                                    <Download size={13} />
                                    {item.file_name || "MoP - Datadog JMX Integration v1.0-July_22th_2026.doc"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}