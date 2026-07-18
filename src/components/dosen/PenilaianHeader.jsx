import { Search, Filter, Star, FileText } from "lucide-react";

export default function PenilaianHeader({
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus
}) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-200">
                        <Star className="text-white" size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                            Penilaian Tugas
                        </h1>
                        <p className="text-slate-500 mt-1 flex items-center gap-2">
                            <FileText size={16} />
                            Kelola penilaian tugas mahasiswa
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Cari mahasiswa atau tugas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none w-full sm:w-64 transition-all duration-300"
                    />
                </div>
                
                <div className="relative">
                    <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="pl-10 pr-8 py-2.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none bg-white appearance-none w-full sm:w-auto"
                    >
                        <option value="semua">Semua Status</option>
                        <option value="dinilai">Sudah Dinilai</option>
                        <option value="belum_dinilai">Belum Dinilai</option>
                    </select>
                </div>
            </div>
        </div>
    );
}