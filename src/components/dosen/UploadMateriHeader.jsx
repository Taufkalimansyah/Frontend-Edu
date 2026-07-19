import { Search, Plus, FileUp, BookOpen } from "lucide-react";

export default function UploadMateriHeader({
    searchTerm,
    setSearchTerm,
    classes,
    selectedClass,
    setSelectedClass,
    onAddClick
}) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-200">
                        <FileUp className="text-white" size={24} />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                            Upload Materi
                        </h1>

                        <p className="text-slate-500 mt-1 flex items-center gap-2">
                            <BookOpen size={16} />
                            Kelola materi pembelajaran untuk setiap kelas
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">

                {/* Search */}
                <div className="relative">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Cari materi..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none w-full sm:w-64 transition-all duration-300"
                    />
                </div>

                {/* Pilih Kelas */}
                <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none bg-white"
                >
                    <option value="">Pilih Kelas</option>

                    {(classes || []).map((kelas) => (
                        <option key={kelas.id} value={kelas.id}>
                            {kelas.nama} ({kelas.kode})
                        </option>
                    ))}
                </select>

                {/* Upload */}
                <button
                    onClick={onAddClick}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Plus size={18} />
                    <span className="font-medium">
                        Upload Materi
                    </span>
                </button>

            </div>
        </div>
    );
}