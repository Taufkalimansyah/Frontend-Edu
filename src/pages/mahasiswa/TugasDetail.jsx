import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/mahasiswa/Sidebar";
import TugasDetailHeader from "../../components/mahasiswa/TugasDetailHeader";
import InstruksiTugas from "../../components/mahasiswa/InstruksiTugas";
import PengumpulanPanel from "../../components/mahasiswa/PengumpulanPanel";
import StatusPengumpulan from "../../components/mahasiswa/StatusPengumpulan";
import Toast from "../../components/dosen/Toast";
import { getTugasDetail, submitTugas, getMySubmissions } from "../../services/api";
import { Loader2 } from "lucide-react";

export default function TugasDetail() {
    const { id } = useParams();
    const [tugas, setTugas] = useState(null);
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [gantiMode, setGantiMode] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        fetchAll();
    }, [id]);

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchAll = async () => {
        try {
            setLoading(true);
            const [tugasRes, submissionsRes] = await Promise.all([
                getTugasDetail(id),
                getMySubmissions(),
            ]);

            setTugas(tugasRes.data);

            const subs = Array.isArray(submissionsRes.data) ? submissionsRes.data : (submissionsRes.data?.data ?? []);
            const mySubmission = subs.find(s => String(s.tugas_id) === String(id));
            setSubmission(mySubmission || null);
            setGantiMode(false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitTugas = async (file) => {
        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append("file", file);
            await submitTugas(id, formData);
            showToast("✅ Tugas berhasil dikirim!", "success");
            await fetchAll();
        } catch (err) {
            console.error(err);
            showToast("❌ Gagal mengirim tugas", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                <Sidebar />
                <main className="ml-72 flex-1 p-10 flex flex-col items-center justify-center">
                    <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-3" />
                    <p className="text-slate-500">Memuat tugas...</p>
                </main>
            </div>
        );
    }

    if (!tugas) {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                <Sidebar />
                <main className="ml-72 flex-1 p-10">
                    <p className="text-slate-500">Tugas tidak ditemukan.</p>
                </main>
            </div>
        );
    }

    const isLewatDeadline = new Date(tugas.deadline) < new Date();
    // Tampilkan panel upload kalau: belum ada submission sama sekali, ATAU mahasiswa sedang klik "Ganti File"
    const tampilkanPanelUpload = !submission || gantiMode;


    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <Sidebar />

            <main className="ml-72 flex-1 p-8 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
                    <div>
                        <TugasDetailHeader
                            tugas={tugas}
                            namaKelas={tugas.kelas?.nama || "-"}
                            isLewatDeadline={isLewatDeadline}
                        />
                        <InstruksiTugas instruksi={tugas.instruksi} />
                    </div>

                    <div className="space-y-6">
                        {tampilkanPanelUpload ? (
                            <PengumpulanPanel
                                onSubmit={handleSubmitTugas}
                                isSubmitting={isSubmitting}
                                isLewatDeadline={isLewatDeadline}
                            />
                        ) : (
                            <StatusPengumpulan
                                submission={submission}
                                onGantiFile={() => setGantiMode(true)}
                            />
                        )}
                    </div>
                </div>

                {toast && (
                    <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
                )}
            </main>
        </div>
    );
}