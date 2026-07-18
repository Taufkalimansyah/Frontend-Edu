import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/dosen/Sidebar";
import { getClasses } from "../../services/api";

export default function KelasSaya() {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await getClasses();
            setClasses(response.data);
        } catch (error) {
            console.error("Error fetching classes:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredClasses = classes.filter(cls =>
        cls.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.kode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
            <Sidebar />
            
            <main className="ml-72 flex-1 p-8 md:p-10">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-emerald-100 rounded-xl">
                                    <span className="text-emerald-600 text-2xl">📚</span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                                    Kelas Saya
                                </h1>
                            </div>
                            <p className="text-slate-500 ml-14">
                                Kelola semua kelas yang Anda ajar
                            </p>
                        </div>
                        
                        <button
                            onClick={() => navigate("/dosen/tambah-kelas")}
                            className="
                                flex items-center gap-2
                                bg-emerald-600 hover:bg-emerald-700
                                text-white font-semibold
                                px-6 py-3 rounded-2xl
                                transition-all duration-200
                                hover:shadow-lg hover:shadow-emerald-200
                                group
                            "
                        >
                            <span className="text-xl group-hover:rotate-90 transition-transform duration-300">➕</span>
                            <span>Buat Kelas Baru</span>
                        </button>
                    </div>
                </div>

                {/* Search & Filter Section */}
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

                {/* Classes Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white rounded-3xl p-6 animate-pulse">
                                <div className="h-32 bg-slate-200 rounded-xl mb-4"></div>
                                <div className="h-6 bg-slate-200 rounded-lg mb-2 w-3/4"></div>
                                <div className="h-4 bg-slate-200 rounded-lg w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : filteredClasses.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-xl font-semibold text-slate-700 mb-2">
                            Belum ada kelas
                        </h3>
                        <p className="text-slate-500 mb-6">
                            Mulai buat kelas pertama Anda sekarang
                        </p>
                        <button
                            onClick={() => navigate("/dosen/tambah-kelas")}
                            className="
                                bg-emerald-600 hover:bg-emerald-700
                                text-white font-semibold
                                px-8 py-3 rounded-2xl
                                transition-all duration-200
                                hover:shadow-lg hover:shadow-emerald-200
                            "
                        >
                            Buat Kelas
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredClasses.map((cls) => (
                            <div
                                key={cls.id}
                                className="
                                    group bg-white rounded-3xl overflow-hidden
                                    shadow-md hover:shadow-2xl
                                    transition-all duration-300
                                    border border-slate-100
                                    hover:-translate-y-1
                                    cursor-pointer
                                "
                                onClick={() => navigate(`/dosen/kelas/${cls.id}`)}
                            >
                                {/* Card Header with Gradient */}
                                <div className="relative h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 p-6">
                                    <div className="absolute top-4 right-4">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Handle menu
                                            }}
                                            className="
                                                p-2 bg-white/20 hover:bg-white/30
                                                rounded-xl text-white
                                                transition-all duration-200
                                            "
                                        >
                                            <span>⋮</span>
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                                            <span className="text-white text-3xl">📖</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-slate-800 mb-1 line-clamp-1">
                                        {cls.nama}
                                    </h3>
                                    <p className="text-sm text-emerald-600 font-medium mb-4">
                                        {cls.kode}
                                    </p>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <span className="text-emerald-500">👥</span>
                                            <span>{cls.jumlah_mahasiswa || 0} Mahasiswa</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <span className="text-emerald-500">📅</span>
                                            <span>Dibuat: {new Date(cls.created_at).toLocaleDateString('id-ID')}</span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        className="
                                            mt-4 w-full py-2.5
                                            bg-slate-50 hover:bg-emerald-50
                                            text-slate-600 hover:text-emerald-600
                                            font-medium rounded-xl
                                            transition-all duration-200
                                            border border-slate-200 hover:border-emerald-200
                                        "
                                    >
                                        Kelola Kelas →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}