import { useState, useEffect } from "react";
import Sidebar from "../../components/dosen/Sidebar";
import PenilaianHeader from "../../components/dosen/PenilaianHeader";
import PenilaianStats from "../../components/dosen/PenilaianStats";
import PenilaianTable from "../../components/dosen/PenilaianTable";
import PenilaianDetailModal from "../../components/dosen/PenilaianDetailModal";
import Toast from "../../components/dosen/Toast";
import { getSubmissionsForDosen, gradeSubmission, downloadSubmission } from "../../services/api";
import { Loader2 } from "lucide-react";

export default function Penilaian() {
    const [penilaianList, setPenilaianList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("semua");
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ nilai: "", feedback: "" });
    const [selectedItem, setSelectedItem] = useState(null);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchSubmissions = async () => {
        try {
            setLoading(true);
            const res = await getSubmissionsForDosen();
            const list = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
            setPenilaianList(list);
        } catch (err) {
            console.error(err);
            showToast("❌ Gagal memuat data penilaian", "error");
        } finally {
            setLoading(false);
        }
    };

    // status penilaian diturunkan dari nilai, BUKAN dari field status pengumpulan
    const getGradingStatus = (item) => (item.nilai !== null && item.nilai !== undefined ? "dinilai" : "belum_dinilai");

    const filteredData = penilaianList.filter(item => {
        const matchSearch =
            item.mahasiswa?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.mahasiswa?.nim?.includes(searchTerm) ||
            item.tugas?.judul?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = filterStatus === "semua" || getGradingStatus(item) === filterStatus;
        return matchSearch && matchStatus;
    });

    const handleEdit = (item) => {
        setEditingId(item.id);
        setFormData({
            nilai: item.nilai ?? "",
            feedback: item.feedback ?? ""
        });
    };

    const handleSave = async (id) => {
        try {
            await gradeSubmission(id, parseInt(formData.nilai), formData.feedback);
            await fetchSubmissions();
            setEditingId(null);
            setFormData({ nilai: "", feedback: "" });
            showToast("✅ Penilaian berhasil disimpan!", "success");
        } catch (err) {
            console.error(err);
            showToast("❌ Gagal menyimpan penilaian", "error");
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData({ nilai: "", feedback: "" });
    };

    const handleDetail = (item) => {
        setSelectedItem(item);
    };

    const handleDownload = async (item) => {
        try {
            const res = await downloadSubmission(item.id);
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", item.file_name || "tugas");
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            showToast("❌ Gagal mengunduh file", "error");
        }
    };

    const stats = {
        total: penilaianList.length,
        sudahDinilai: penilaianList.filter(p => getGradingStatus(p) === "dinilai").length,
        belumDinilai: penilaianList.filter(p => getGradingStatus(p) === "belum_dinilai").length,
        rataRata: (() => {
            const dinilai = penilaianList.filter(p => p.nilai !== null && p.nilai !== undefined);
            return dinilai.length > 0
                ? Math.round(dinilai.reduce((acc, p) => acc + p.nilai, 0) / dinilai.length)
                : 0;
        })()
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />

            <main className="ml-72 flex-1 p-8">
                <PenilaianHeader
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                />

                <PenilaianStats stats={stats} />

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-3" />
                        <p className="text-slate-500">Memuat data penilaian...</p>
                    </div>
                ) : (
                    <PenilaianTable
                        data={filteredData}
                        editingId={editingId}
                        formData={formData}
                        setFormData={setFormData}
                        onEdit={handleEdit}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        onDetail={handleDetail}
                        onDownload={handleDownload}
                    />
                )}

                {selectedItem && (
                    <PenilaianDetailModal
                        open={!!selectedItem}
                        data={selectedItem}
                        onClose={() => setSelectedItem(null)}
                    />
                )}

                {toast && (
                    <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
                )}
            </main>
        </div>
    );
}