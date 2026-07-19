import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/mahasiswa/Sidebar";
import KelasHeader from "../../components/mahasiswa/KelasHeader";
import KelasGrid from "../../components/mahasiswa/KelasGrid";
import KrsModal from "../../components/mahasiswa/KrsModal";
import Toast from "../../components/dosen/Toast";
import { getClasses, getAvailableClasses, enrollClass } from "../../services/api";
import { Loader2, Plus } from "lucide-react";

export default function KelasSaya() {
    const navigate = useNavigate();
    const [kelasList, setKelasList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [availableCourses, setAvailableCourses] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        fetchKelas();
    }, []);

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchKelas = async () => {
        try {
            setLoading(true);
            const res = await getClasses();
            const list = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
            setKelasList(list);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const openModal = async () => {
        try {
            const res = await getAvailableClasses();
            const list = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
            setAvailableCourses(list);
            setSelectedIds([]);
            setShowModal(true);
        } catch (err) {
            console.error(err);
            showToast("❌ Gagal memuat daftar kelas tersedia", "error");
        }
    };

    const toggleCourse = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const submitKRS = async () => {
        try {
            setIsSubmitting(true);
            await Promise.all(selectedIds.map(id => enrollClass(id)));
            await fetchKelas();
            setShowModal(false);
            showToast("✅ Berhasil mendaftar kelas!", "success");
        } catch (err) {
            console.error(err);
            showToast("❌ Gagal mendaftar salah satu kelas", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCardClick = (id) => {
        navigate(`/mahasiswa/kelas/${id}`);
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <Sidebar />

            <main className="flex-1 ml-72 p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <KelasHeader />
                    <button
                        onClick={openModal}
                        className="group flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-3 rounded-2xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                        <span className="font-medium">Tambah KRS</span>
                    </button>
                </div>

                {loading ? (
                    <div className="mt-16 flex flex-col items-center justify-center">
                        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
                        <p className="text-slate-500 font-medium">Memuat kelas...</p>
                    </div>
                ) : (
                    <KelasGrid kelasList={kelasList} onCardClick={handleCardClick} />
                )}

                <KrsModal
                    open={showModal}
                    availableCourses={availableCourses}
                    selectedIds={selectedIds}
                    onToggle={toggleCourse}
                    onClose={() => setShowModal(false)}
                    onSubmit={submitKRS}
                    isSubmitting={isSubmitting}
                />

                {toast && (
                    <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
                )}
            </main>
        </div>
    );
}