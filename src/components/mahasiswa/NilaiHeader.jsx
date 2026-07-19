import { Download, Printer, FileText } from "lucide-react";

export default function NilaiHeader() {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-200">
                        <FileText className="text-white" size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                            Laporan Nilai
                        </h1>
                        <p className="text-slate-500 mt-0.5">
                            Rekap nilai akhir per mata kuliah
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex gap-3">
                <button className="group flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-300 hover:-translate-y-0.5 shadow-sm hover:shadow-md">
                    <Download size={16} className="group-hover:scale-110 transition-transform duration-300" />
                    Download PDF
                </button>

                <button className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all duration-300">
                    <Printer size={16} className="group-hover:scale-110 transition-transform duration-300" />
                    Print KHS
                </button>
            </div>
        </div>
    );
}