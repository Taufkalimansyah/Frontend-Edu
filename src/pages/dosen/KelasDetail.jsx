import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClass } from "../../services/api";
import Sidebar from "../../components/dosen/Sidebar";
import { ArrowLeft, Users, BookOpen, Loader2 } from "lucide-react";

export default function KelasDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [kelas, setKelas] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDetail();
    }, [id]);

    const fetchDetail = async () => {
        try {
            setLoading(true);
            const res = await getClass(id);
            setKelas(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-slate-50">
                <Sidebar />
                <main className="ml-72 flex-1 p-8 flex flex-col items-center justify-center">
                    <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-3" />
                    <p className="text-slate-500">Memuat data kelas...</p>
                </main>
            </div>
        );
    }

    if (!kelas) {
        return (
            <div className="flex min-h-screen bg-slate-50">
                <Sidebar />
                <main className="ml-72 flex-1 p-8">
                    <p className="text-slate-500">Kelas tidak ditemukan.</p>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="ml-72 flex-1 p-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 mb-6 hover:text-emerald-600 transition-colors duration-200"
                >
                    <ArrowLeft size={18} /> Kembali ke Kelas Saya
                </button>

                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg shadow-emerald-200">
                        <BookOpen className="text-white" size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">{kelas.nama}</h1>
                        <p className="text-emerald-600 font-medium">{kelas.kode}</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-slate-100 flex items-center gap-2">
                        <Users size={18} className="text-emerald-500" />
                        <h2 className="font-semibold text-slate-700">
                            Daftar Mahasiswa ({kelas.mahasiswa?.length || 0})
                        </h2>
                    </div>

                    {(!kelas.mahasiswa || kelas.mahasiswa.length === 0) ? (
                        <div className="p-10 text-center text-slate-500">
                            Belum ada mahasiswa terdaftar di kelas ini.
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        NIM
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        Nama
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {kelas.mahasiswa.map((mhs) => (
                                    <tr key={mhs.id} className="hover:bg-emerald-50/50 transition-colors duration-150">
                                        <td className="px-6 py-4 text-sm text-slate-600">{mhs.nim}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-800">{mhs.name}</td>
                                        <td className="px-6 py-4 text-sm text-slate-500">{mhs.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </div>
    );
}