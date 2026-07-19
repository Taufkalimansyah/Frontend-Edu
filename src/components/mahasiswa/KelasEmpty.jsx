import { BookOpen, Plus } from "lucide-react";

export default function KelasEmpty() {
    return (
        <div className="col-span-full text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200 shadow-sm">
            <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen size={40} className="text-emerald-300" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
                Belum Ada Kelas
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
                Anda belum terdaftar di kelas manapun. 
                Hubungi dosen untuk didaftarkan atau tambah KRS.
            </p>
        </div>
    );
}