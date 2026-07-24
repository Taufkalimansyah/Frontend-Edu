import { useNavigate } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";

export default function RingkasanKelas({ kelasList, nilaiList }) {
    const navigate = useNavigate();

    const getNilaiKelas = (kelasId) => {
        const nilai = nilaiList.find(n => String(n.kelas_id) === String(kelasId));
        return (nilai?.rata_rata !== null && nilai?.rata_rata !== undefined) ? nilai.rata_rata : null;
    };

    const kelasSudahDinilai = nilaiList.filter(n => n.rata_rata !== null && n.rata_rata !== undefined).length;

    return (
        <div className="rounded-3xl bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200 h-full">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Ringkasan Kelas</h2>
                    <p className="text-xs text-slate-400">Progress belajar Anda</p>
                </div>
                <button
                    onClick={() => navigate("/mahasiswa/kelas")}
                    className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-semibold text-sm transition-colors duration-200"
                >
                    Lihat Semua
                    <ArrowRight size={16} />
                </button>
            </div>

            <div className="mt-6 space-y-5">
                {kelasList.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                            <BookOpen size={24} className="text-slate-300" />
                        </div>
                        <p className="text-sm text-slate-500">Belum ada kelas yang diikuti.</p>
                    </div>
                ) : (
                    kelasList.slice(0, 3).map((item) => {
                        const nilai = getNilaiKelas(item.id);
                        const percent = nilai !== null ? Math.round(nilai) : 0;
                        return (
                            <div key={item.id} className="group">
                                <div className="flex justify-between items-center mb-1.5">
                                    <span className="font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors duration-200">
                                        {item.nama}
                                    </span>
                                    <span className={`font-bold text-sm ${nilai !== null ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        {nilai !== null ? `${nilai.toFixed(1)}` : "Belum dinilai"}
                                    </span>
                                </div>
                                <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-1000"
                                        style={{ width: `${percent}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-4 text-center border border-emerald-200/50 hover:shadow-md transition-all duration-300">
                    <h3 className="text-3xl font-bold text-emerald-600">{kelasList.length}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Mata Kuliah Diikuti</p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 text-center border border-blue-200/50 hover:shadow-md transition-all duration-300">
                    <h3 className="text-3xl font-bold text-blue-600">{kelasSudahDinilai}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Sudah Dinilai</p>
                </div>
            </div>
        </div>
    );
}