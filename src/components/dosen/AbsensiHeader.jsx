import { Filter, Plus, CalendarDays } from "lucide-react";

export default function AbsensiHeader({
    filterKelas,
    setFilterKelas,
    kelasList,
    onAddClick
}) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-200">
                        <CalendarDays className="text-white" size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                            Absensi Mahasiswa
                        </h1>
                        <p className="text-slate-500 mt-1 flex items-center gap-2">
                            <CalendarDays size={16} />
                            Kelola kehadiran mahasiswa per pertemuan
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
                {/* Filter Kelas */}
                <div className="relative">
                    <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                        value={filterKelas}
                        onChange={(e) => setFilterKelas(e.target.value)}
                        className="pl-10 pr-8 py-2.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none bg-white appearance-none w-full sm:w-auto"
                    >
                        {kelasList.length === 0 ? (
                            <option value="">Tidak ada kelas</option>
                        ) : (
                            kelasList.map(kelas => (
                                <option key={kelas.id} value={kelas.id}>
                                    {kelas.nama}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                <button
                    onClick={onAddClick}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all duration-300"
                >
                    <Plus size={18} />
                    <span className="font-medium">Tambah Absensi</span>
                </button>
            </div>
        </div>
    );
}