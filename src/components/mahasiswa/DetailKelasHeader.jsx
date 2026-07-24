import { BookOpen, Users, Calendar, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DetailKelasHeader({ namaKelas, kodeKelas, dosen, mahasiswaCount }) {
    const navigate = useNavigate();

    return (
        <div className="mb-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-500 mb-4 hover:text-emerald-600 transition-all duration-200 hover:translate-x-[-4px] group"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="font-medium">Kembali ke Kelas Saya</span>
            </button>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg shadow-emerald-200">
                            <BookOpen className="text-white" size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                                {namaKelas || "Nama Kelas"}
                            </h1>
                            <div className="flex flex-wrap items-center gap-3 mt-1">
                                {kodeKelas && (
                                    <span className="text-emerald-600 font-semibold text-sm bg-emerald-50 px-3 py-1 rounded-full">
                                        {kodeKelas}
                                    </span>
                                )}
                                {dosen && (
                                    <>
                                        <span className="text-slate-400">•</span>
                                        <span className="text-sm text-slate-500 flex items-center gap-1">
                                            <Users size={15} className="text-emerald-500" />
                                            {dosen}
                                        </span>
                                    </>
                                )}
                                {mahasiswaCount !== undefined && (
                                    <>
                                        <span className="text-slate-400">•</span>
                                        <span className="text-sm text-slate-500 flex items-center gap-1">
                                            <Users size={15} className="text-emerald-500" />
                                            {mahasiswaCount} Mahasiswa
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-500 bg-slate-50 px-4 py-2 rounded-xl">
                        <div className="flex items-center gap-1.5">
                            <Calendar size={16} className="text-emerald-500" />
                            <span>Semester Ganjil</span>
                        </div>
                        <div className="w-px h-6 bg-slate-200"></div>
                        <div className="flex items-center gap-1.5">
                            <Calendar size={16} className="text-emerald-500" />
                            <span>2023/2024</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}