import { useEffect, useState } from "react";
import Sidebar from "../../components/mahasiswa/Sidebar";
import NilaiHeader from "../../components/mahasiswa/NilaiHeader";
import NilaiStats from "../../components/mahasiswa/NilaiStats";
import NilaiTable from "../../components/mahasiswa/NilaiTable";
import { getGrades } from "../../services/api";

export default function Nilai() {
    const [nilaiList, setNilaiList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNilai();
    }, []);

    const fetchNilai = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await getGrades();
            const list = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
            setNilaiList(list);
        } catch (err) {
            console.error(err);
            setError("Gagal memuat data nilai.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <Sidebar />

            <main className="flex-1 ml-72 p-8 md:p-10">
                <NilaiHeader />

                <NilaiStats nilaiList={nilaiList} />

                <NilaiTable 
                    nilaiList={nilaiList} 
                    loading={loading} 
                    error={error} 
                />
            </main>
        </div>
    );
}