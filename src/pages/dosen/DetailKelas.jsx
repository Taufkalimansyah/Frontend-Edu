import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/mahasiswa/Sidebar";
import DetailKelasHeader from "../../components/mahasiswa/DetailKelasHeader";
import DetailKelasTabs from "../../components/mahasiswa/DetailKelasTabs";
import MateriTab from "../../components/mahasiswa/MateriTab";
import TugasTab from "../../components/mahasiswa/TugasTab";
import RingkasanTugas from "../../components/mahasiswa/RingkasanTugas";
import { getClass, getMaterials, getTugasList, downloadMateri } from "../../services/api";
import { Loader2 } from "lucide-react";

export default function DetailKelas() {
    const { id } = useParams();
    const [kelas, setKelas] = useState(null);
    const [materiList, setMateriList] = useState([]);
    const [tugasList, setTugasList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("materi");
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        fetchAll();
    }, [id]);

    const fetchAll = async () => {
        try {
            setLoading(true);
            const [kelasRes, materiRes, tugasRes] = await Promise.all([
                getClass(id),
                getMaterials(),
                getTugasList(),
            ]);

            setKelas(kelasRes.data);

            const allMateri = Array.isArray(materiRes.data) ? materiRes.data : (materiRes.data?.data ?? []);
            setMateriList(allMateri.filter(m => String(m.kelas_id) === String(id)));

            const allTugas = Array.isArray(tugasRes.data) ? tugasRes.data : (tugasRes.data?.data ?? []);
            setTugasList(allTugas.filter(t => String(t.kelas_id) === String(id)));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (item) => {
        try {
            const res = await downloadMateri(item.id);
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", item.file_name || "materi");
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggle = (itemId) => {
        setExpandedId(prev => (prev === itemId ? null : itemId));
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-slate-50">
                <Sidebar />
                <main className="ml-72 flex-1 p-10 flex flex-col items-center justify-center">
                    <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-3" />
                    <p className="text-slate-500">Memuat kelas...</p>
                </main>
            </div>
        );
    }

    if (!kelas) {
        return (
            <div className="flex min-h-screen bg-slate-50">
                <Sidebar />
                <main className="ml-72 flex-1 p-10">
                    <p className="text-slate-500">Kelas tidak ditemukan.</p>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />

            <main className="ml-72 flex-1 p-10">
                <DetailKelasHeader namaKelas={kelas.nama} />

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
                    <div>
                        <DetailKelasTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                        {activeTab === "materi" && (
                            <MateriTab
                                materiList={materiList}
                                expandedId={expandedId}
                                onToggle={handleToggle}
                                onDownload={handleDownload}
                            />
                        )}

                        {activeTab === "tugas" && (
                            <TugasTab tugasList={tugasList} />
                        )}
                    </div>

                    <RingkasanTugas totalTugas={tugasList.length} totalMateri={materiList.length} />
                </div>
            </main>
        </div>
    );
}