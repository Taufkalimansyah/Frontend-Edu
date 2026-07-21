import { useState } from "react";



export default function KelasCard({ kelas, onClick, onEditClick, onDeleteClick }) {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div
            className="
                group bg-white rounded-3xl overflow-hidden
                shadow-md hover:shadow-2xl
                transition-all duration-300
                border border-slate-100
                hover:-translate-y-1
                cursor-pointer
            "
            onClick={() => onClick(kelas.id)}
        >
            {/* Card Header with Gradient */}
            <div className="relative h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 p-6">
                <div className="absolute top-4 right-4">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowMenu(!showMenu);
                        }}
                        className="
                            p-2 bg-white/20 hover:bg-white/30
                            rounded-xl text-white
                            transition-all duration-200
                        "
                    >
                        <span className="text-lg">⋮</span>
                    </button>
                    
                    {/* Dropdown Menu */}
                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-10">
                            <button
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    onEditClick(kelas);
                                }}
                            >
                                ✏️ Edit Kelas
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 transition-colors duration-200">
                                👥 Lihat Mahasiswa
                            </button>
                            <button
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    onDeleteClick(kelas);
                                }}
                                className="
                                w-full px-4 py-2 text-left text-sm 
                                text-red-600 hover:bg-red-50
                                "
                            >
                                🗑️ Hapus Kelas
                            </button>
                        </div>
                    )}
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
                    {kelas.nama}
                </h3>
                <p className="text-sm text-emerald-600 font-medium mb-4">
                    {kelas.kode}
                </p>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="text-emerald-500">👥</span>
                        <span>{kelas.mahasiswa_count} Mahasiswa</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="text-emerald-500">📅</span>
                        <span>Dibuat: {new Date(kelas.created_at).toLocaleDateString('id-ID')}</span>
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
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick(kelas.id);
                    }}
                >
                    Kelola Kelas →
                </button>
            </div>
        </div>
    );
}