import { useState, useEffect } from "react";
import Sidebar from "../../components/mahasiswa/Sidebar";
import DashboardWelcome from "../../components/mahasiswa/DashboardWelcome";
import RataRataCard from "../../components/mahasiswa/RataRataCard";
import TugasMendatang from "../../components/mahasiswa/TugasMendatang";
import RingkasanKelas from "../../components/mahasiswa/RingkasanKelas";
import KalenderMini from "../../components/mahasiswa/KalenderMini";
import NilaiTerakhir from "../../components/mahasiswa/NilaiTerakhir";
import { getClasses, getTugasList, getGrades, me } from "../../services/api";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [kelasList, setKelasList] = useState([]);
    const [tugasList, setTugasList] = useState([]);
    const [nilaiList, setNilaiList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            setLoading(true);
            const [meRes, kelasRes, tugasRes, nilaiRes] = await Promise.all([
                me(),
                getClasses(),
                getTugasList(),
                getGrades(),
            ]);

            setUser(meRes.data);

            const kelas = Array.isArray(kelasRes.data) ? kelasRes.data : (kelasRes.data?.data ?? []);
            setKelasList(kelas);

            const kelasIds = kelas.map(k => String(k.id));
            const allTugas = Array.isArray(tugasRes.data) ? tugasRes.data : (tugasRes.data?.data ?? []);
            const tugasMendatang = allTugas
                .filter(t => kelasIds.includes(String(t.kelas_id)) && new Date(t.deadline) >= new Date(new Date().setHours(0, 0, 0, 0)))
                .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                .slice(0, 3);
            setTugasList(tugasMendatang);

            const nilai = Array.isArray(nilaiRes.data) ? nilaiRes.data : (nilaiRes.data?.data ?? []);
            setNilaiList(nilai);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const nilaiDinilai = nilaiList.filter(n => n.rata_rata !== null && n.rata_rata !== undefined);
    const rataRataKeseluruhan = nilaiDinilai.length > 0
        ? nilaiDinilai.reduce((sum, n) => sum + n.rata_rata, 0) / nilaiDinilai.length
        : null;

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                <Sidebar />
                <main className="flex-1 ml-72 p-8 flex flex-col items-center justify-center">
                    <div className="relative">
                        <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                    <p className="text-slate-500 mt-4 font-medium">Memuat dashboard...</p>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <Sidebar />

            <main className="flex-1 ml-72 p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                        <DashboardWelcome name={user?.name} />
                    </div>
                    <div className="lg:col-span-1">
                        <RataRataCard rataRata={rataRataKeseluruhan} jumlahKelasDinilai={nilaiDinilai.length} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
                    <div className="lg:col-span-4">
                        <TugasMendatang tugasList={tugasList} />
                    </div>
                    <div className="lg:col-span-5">
                        <RingkasanKelas kelasList={kelasList} nilaiList={nilaiList} />
                    </div>
                    <div className="lg:col-span-3 space-y-6">
                        <KalenderMini />
                        <NilaiTerakhir nilaiList={nilaiList} />
                    </div>
                </div>
            </main>
        </div>
    );
}