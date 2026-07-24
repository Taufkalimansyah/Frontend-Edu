import { useNavigate } from "react-router-dom";
import { ClipboardList, Calendar, Clock, ChevronRight, FileText, CheckCircle, AlertCircle } from "lucide-react";

export default function TugasItem({ tugas }) {
    const navigate = useNavigate();

    const isDeadlinePassed = new Date(tugas.deadline) < new Date();
    const isSubmitted = tugas.status === "submitted" || tugas.is_submitted;

    const getStatusConfig = () => {
        if (isSubmitted) {
            return {
                label: "Selesai",
                icon: <CheckCircle size={14} className="text-emerald-500" />,
                color: "bg-emerald-100 text-emerald-700",
                borderColor: "border-emerald-200"
            };
        } else if (isDeadlinePassed) {
            return {
                label: "Lewat Deadline",
                icon: <AlertCircle size={14} className="text-red-500" />,
                color: "bg-red-100 text-red-700",
                borderColor: "border-red-200"
            };
        } else {
            return {
                label: "Aktif",
                icon: <Clock size={14} className="text-yellow-500" />,
                color: "bg-yellow-100 text-yellow-700",
                borderColor: "border-yellow-200"
            };
        }
    };

    const statusConfig = getStatusConfig();

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const getTimeRemaining = (deadline) => {
        const now = new Date();
        const diff = new Date(deadline) - now;
        if (diff < 0) return "Terlambat";
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        if (days > 0) return `${days} hari lagi`;
        return `${hours} jam lagi`;
    };

    return (
        <div className={`
            group bg-white rounded-2xl border transition-all duration-300 
            hover:shadow-md hover:-translate-y-0.5
            ${statusConfig.borderColor} border-slate-200
        `}>
            <div className="p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Icon */}
                    <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center 
                        transition-all duration-300 group-hover:scale-110
                        ${isSubmitted ? 'bg-emerald-100' : isDeadlinePassed ? 'bg-red-100' : 'bg-slate-100'}
                    `}>
                        {isSubmitted ? (
                            <CheckCircle size={20} className="text-emerald-600" />
                        ) : isDeadlinePassed ? (
                            <AlertCircle size={20} className="text-red-600" />
                        ) : (
                            <ClipboardList size={20} className="text-slate-400" />
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors duration-200 truncate">
                                {tugas.judul}
                            </h3>
                            <span className={`
                                inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium
                                ${statusConfig.color}
                            `}>
                                {statusConfig.icon}
                                {statusConfig.label}
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                            <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                Deadline: {formatDate(tugas.deadline)}
                            </span>
                            {!isSubmitted && !isDeadlinePassed && (
                                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                                    <Clock size={12} />
                                    {getTimeRemaining(tugas.deadline)}
                                </span>
                            )}
                            {isSubmitted && (
                                <span className="flex items-center gap-1 text-emerald-600">
                                    <CheckCircle size={12} />
                                    Tugas dikumpulkan
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={() => navigate(`/mahasiswa/tugas/${tugas.id}`)}
                    className={`
                        group/btn flex items-center gap-2 px-5 py-2.5 
                        text-sm font-medium rounded-xl 
                        transition-all duration-300 
                        hover:-translate-y-0.5
                        ${isSubmitted 
                            ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
                            : isDeadlinePassed 
                                ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                                : 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300'
                        }
                    `}
                >
                    <span>{isSubmitted ? 'Lihat Hasil' : isDeadlinePassed ? 'Terlambat' : 'Lihat Tugas'}</span>
                    <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                </button>
            </div>
        </div>
    );
}