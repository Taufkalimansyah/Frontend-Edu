import { useState, useEffect } from "react";
import Sidebar from "../../components/dosen/Sidebar";
import AbsensiHeader from "../../components/dosen/AbsensiHeader";
import AbsensiStats from "../../components/dosen/AbsensiStats";
import AbsensiTable from "../../components/dosen/AbsensiTable";
import AbsensiFormModal from "../../components/dosen/AbsensiFormModal";
import Toast from "../../components/dosen/Toast";
import { getClasses, getAttendance, createAttendance, updateAttendance, deleteAttendance, getUsersByRole } from "../../services/api";
import { AlertCircle, Loader2 } from "lucide-react";

export default function Absensi() {
    const [kelasList, setKelasList] = useState([]);
    const [activeKelas, setActiveKelas] = useState(null);
    const [mahasiswaList, setMahasiswaList] = useState([]); // List of students for the active class
    
    const [absensiList, setAbsensiList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("semua");
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [showForm, setShowForm] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [toast, setToast] = useState(null);

    // Fetch classes on mount
    useEffect(() => {
        fetchClasses();
        fetchAllMahasiswa();
    }, []);

    // Fetch attendance when active class changes
    useEffect(() => {
        if (activeKelas) {
            fetchAttendance(activeKelas);
        } else {
            setAbsensiList([]);
        }
    }, [activeKelas]);

    const fetchClasses = async () => {
        try {
            setLoading(true);
            const { data } = await getClasses();
            setKelasList(data);
            if (data.length > 0) {
                setActiveKelas(data[0].id);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Gagal memuat daftar kelas");
        } finally {
            setLoading(false);
        }
    };

    const fetchAttendance = async (classId) => {
        try {
            setLoading(true);
            const { data } = await getAttendance(classId);
            setAbsensiList(data);
        } catch (err) {
            setError(err.response?.data?.message || "Gagal memuat data absensi");
        } finally {
            setLoading(false);
        }
    };

    const fetchAllMahasiswa = async () => {
        try {
            const { data } = await getUsersByRole("mahasiswa");
            setMahasiswaList(data || []);
        } catch (err) {
            console.error("Gagal memuat daftar mahasiswa:", err);
        }
    };

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleAdd = async (formData) => {
        try {
            const payload = {
                mahasiswa_id: formData.mahasiswa_id,
                tanggal: formData.tanggal,
                status: formData.status
            };
            await createAttendance(activeKelas, payload);
            await fetchAttendance(activeKelas);
            setShowForm(false);
            showToast("✅ Tambah absensi selesai!", "success");
        } catch (err) {
            showToast("❌ Gagal menambahkan absensi!", "error");
        }
    };

    const handleEdit = async (formData) => {
        try {
            const payload = {
                tanggal: formData.tanggal,
                status: formData.status
            };
            await updateAttendance(editingData.id, payload);
            await fetchAttendance(activeKelas);
            setEditingData(null);
            setShowForm(false);
            showToast("✅ Absensi berhasil diperbarui!", "success");
        } catch (err) {
            showToast("❌ Gagal memperbarui absensi!", "error");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Yakin ingin menghapus data absensi ini?")) {
            try {
                await deleteAttendance(id);
                await fetchAttendance(activeKelas);
                showToast("🗑️ Absensi berhasil dihapus!", "warning");
            } catch (err) {
                showToast("❌ Gagal menghapus absensi!", "error");
            }
        }
    };

    const handleEditClick = (item) => {
        setEditingData(item);
        setShowForm(true);
    };

    // Filter data
    const filteredData = absensiList.filter(item => {
        const matchSearch = item.mahasiswa?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.mahasiswa?.nim?.includes(searchTerm);
        const matchStatus = filterStatus === "semua" || item.status === filterStatus;
        return matchSearch && matchStatus;
    });

    // Stats
    const stats = {
        total: absensiList.length,
        hadir: absensiList.filter(a => a.status === "hadir").length,
        izin: absensiList.filter(a => a.status === "izin").length,
        alpha: absensiList.filter(a => a.status === "alpha").length,
        persentase: absensiList.length > 0 
            ? Math.round((absensiList.filter(a => a.status === "hadir").length / absensiList.length) * 100)
            : 0
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            
            <main className="ml-72 flex-1 p-8">
                <AbsensiHeader
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    filterKelas={activeKelas || ""}
                    setFilterKelas={setActiveKelas}
                    kelasList={kelasList}
                    onAddClick={() => {
                        if (!activeKelas) {
                            showToast("⚠️ Pilih kelas terlebih dahulu!", "warning");
                            return;
                        }
                        setEditingData(null);
                        setShowForm(true);
                    }}
                />

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-600">
                        <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
                        <p className="text-slate-500 font-medium animate-pulse">Memuat data absensi...</p>
                    </div>
                ) : (
                    <>
                        <AbsensiStats stats={stats} />

                        {activeKelas ? (
                            <AbsensiTable
                                data={filteredData}
                                onEdit={handleEditClick}
                                onDelete={handleDelete}
                            />
                        ) : (
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
                                <p className="text-slate-500">Pilih kelas dari dropdown untuk melihat absensi.</p>
                            </div>
                        )}
                    </>
                )}

                {showForm && (
                    <AbsensiFormModal
                        open={showForm}
                        initialData={editingData}
                        mahasiswaList={mahasiswaList}
                        onClose={() => {
                            setShowForm(false);
                            setEditingData(null);
                        }}
                        onSubmit={editingData ? handleEdit : handleAdd}
                    />
                )}

                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </main>
        </div>
    );
}