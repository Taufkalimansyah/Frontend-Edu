import { Calendar, Clock, BookOpen, Users, ChevronRight, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TugasDetailHeader({ tugas, namaKelas, isLewatDeadline }) {
    const navigate = useNavigate();

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const getTimeRemaining = (deadline) => {
        const now = new Date();
        const diff = new Date(deadline) - now;
        if (diff < 0) return "Lewat deadline";
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return `${days} hari ${hours} jam lagi`;
    };

    // Navigasi ke halaman Kelas Saya
    const goToKelasSaya = () => {
        navigate("/mahasiswa/kelas");
    };

    // Navigasi ke halaman Detail Kelas
    const goToDetailKelas = () => {
        navigate(`/mahasiswa/kelas/${tugas.kelas?.id}`);
    };

    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 md:p-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-4 flex-wrap">
                <button 
                    onClick={() => navigate("/mahasiswa/dashboard")}
                    className="hover:text-emerald-600 transition-colors duration-200 flex items-center gap-1"
                >
                    <Home size={14} />
                </button>
                <ChevronRight size={12} />
                
                {/* Kelas Saya - Link ke halaman Kelas Saya */}
                <button 
                    onClick={goToKelasSaya}
                    className="hover:text-emerald-600 transition-colors duration-200 font-medium text-slate-500 hover:text-emerald-600"
                >
                    Kelas Saya
                </button>
                <ChevronRight size={12} />
                
                {/* Nama Kelas - Link ke halaman Detail Kelas */}
                <button 
                    onClick={goToDetailKelas}
                    className="hover:text-emerald-600 transition-colors duration-200 text-slate-500 hover:text-emerald-600"
                >
                    {namaKelas}
                </button>
                <ChevronRight size={12} />
                
                {/* Halaman saat ini (tidak bisa diklik) */}
                <span className="text-emerald-600 font-medium truncate max-w-[200px]">
                    {tugas.judul}
                </span>
            </div>

            {/* Title & Status */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg shadow-emerald-200">
                        <BookOpen className="text-white" size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                            {tugas.judul}
                        </h1>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm text-slate-500 flex items-center gap-1">
                                <Users size={14} className="text-emerald-500" />
                                {tugas.kelas?.nama || "-"}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs font-semibold px-4 py-1.5 rounded-full ${
                        isLewatDeadline
                            ? "bg-red-100 text-red-700"
                            : "bg-emerald-100 text-emerald-700"
                    }`}>
                        {isLewatDeadline ? "⏰ Lewat Deadline" : "📝 Belum Deadline"}
                    </span>
                    {!isLewatDeadline && (
                        <span className="text-xs text-slate-400">
                            Sisa waktu: {getTimeRemaining(tugas.deadline)}
                        </span>
                    )}
                </div>
            </div>

            {/* Deadline */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                    <div className="p-1.5 bg-red-50 rounded-lg">
                        <Calendar size={16} className="text-red-500" />
                    </div>
                    <span>
                        Deadline: <span className="font-semibold text-slate-800">
                            {formatDate(tugas.deadline)}
                        </span>
                        <span className="text-slate-400 ml-1">• 23:59 WIB</span>
                    </span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                    <div className="p-1.5 bg-emerald-50 rounded-lg">
                        <Clock size={16} className="text-emerald-500" />
                    </div>
                    <span>
                        Dibuat: <span className="font-medium text-slate-700">
                            {formatDate(tugas.created_at)}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}