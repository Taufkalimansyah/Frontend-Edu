export default function KelasSearch({ searchTerm, setSearchTerm }) {
    return (
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                <input
                    type="text"
                    placeholder="Cari kelas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="
                        w-full pl-12 pr-4 py-3
                        bg-white border border-slate-200 rounded-2xl
                        focus:outline-none focus:border-emerald-500
                        focus:ring-4 focus:ring-emerald-100
                        transition-all duration-200
                        text-slate-700 placeholder:text-slate-400
                    "
                />
            </div>
            <button className="
                px-6 py-3 bg-white border border-slate-200 rounded-2xl
                text-slate-600 hover:text-slate-800 hover:border-slate-300
                transition-all duration-200
                flex items-center gap-2
            ">
                <span>🔽</span>
                <span>Filter</span>
            </button>
        </div>
    );
}