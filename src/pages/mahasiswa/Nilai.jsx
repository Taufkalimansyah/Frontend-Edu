import { useEffect, useState } from "react";
import Sidebar from "../../components/mahasiswa/Sidebar";
import NilaiHeader from "../../components/mahasiswa/NilaiHeader";
import NilaiStats from "../../components/mahasiswa/NilaiStats";
import NilaiTable from "../../components/mahasiswa/NilaiTable";
import NilaiTugasTable from "../../components/mahasiswa/NilaiTugasTable";
import { getGrades, getMySubmissions } from "../../services/api";

export default function Nilai() {
    const [nilaiList, setNilaiList] = useState([]);
    const [submissionList, setSubmissionList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNilai();
    }, []);

    const fetchNilai = async () => {
        try {
            setLoading(true);
            setError(null);

            const [gradesRes, submissionsRes] = await Promise.all([
                getGrades(),
                getMySubmissions(),
            ]);

            const list = Array.isArray(gradesRes.data) ? gradesRes.data : (gradesRes.data?.data ?? []);
            setNilaiList(list);

            const subs = Array.isArray(submissionsRes.data) ? submissionsRes.data : (submissionsRes.data?.data ?? []);
            setSubmissionList(subs);
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

                {!loading && !error && (
                    <NilaiTugasTable submissionList={submissionList} />
                )}
            </main>
        </div>
    );
}