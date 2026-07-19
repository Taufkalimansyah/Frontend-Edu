import { Plus, BookOpen } from "lucide-react";

export default function KelasHeader({ onAddClick }) {
    return (
        <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-200">
                            <BookOpen className="text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                                Kelas Saya
                            </h1>
                            <p className="text-slate-500 mt-0.5">
                                Kelola semua kelas yang Anda ajar
                            </p>
                        </div>
                    </div>
                </div>
                
                <button
                    onClick={onAddClick}
                    className="
                        flex items-center gap-2
                        bg-gradient-to-r from-emerald-600 to-emerald-500
                        hover:shadow-lg hover:shadow-emerald-200
                        text-white font-semibold
                        px-6 py-3 rounded-2xl
                        transition-all duration-300
                        hover:-translate-y-0.5
                        group
                    "
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    <span>Buat Kelas Baru</span>
                </button>
            </div>
        </div>
    );
}