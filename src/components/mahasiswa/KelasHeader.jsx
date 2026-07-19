import { BookOpen } from "lucide-react";

export default function KelasHeader() {
    return (
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
                        Daftar mata kuliah yang Anda ikuti
                    </p>
                </div>
            </div>
        </div>
    );
}