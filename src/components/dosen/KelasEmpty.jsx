import { BookOpen, Plus } from "lucide-react";

export default function KelasEmpty({ onAddClick }) {
    return (
        <div className="text-center py-20">
            <div className="w-24 h-24 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <BookOpen size={48} className="text-emerald-300" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
                Belum ada kelas
            </h3>
            <p className="text-slate-500 mb-6">
                Mulai buat kelas pertama Anda sekarang
            </p>
            <button
                onClick={onAddClick}
                className="
                    inline-flex items-center gap-2
                    bg-gradient-to-r from-emerald-600 to-emerald-500
                    text-white font-semibold
                    px-8 py-3 rounded-2xl
                    transition-all duration-300
                    hover:shadow-lg hover:shadow-emerald-200
                    hover:-translate-y-0.5
                "
            >
                <Plus size={20} />
                Buat Kelas
            </button>
        </div>
    );
}