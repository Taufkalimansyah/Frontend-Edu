import { useState, useEffect } from "react";
import Sidebar from "../../components/dosen/Sidebar";
import AbsensiHeader from "../../components/dosen/AbsensiHeader";
import AbsensiStats from "../../components/dosen/AbsensiStats";
import AbsensiTable from "../../components/dosen/AbsensiTable";
import AbsensiFormModal from "../../components/dosen/AbsensiFormModal";
import AbsensiDetailModal from "../../components/dosen/AbsensiDetailModal";
import Toast from "../../components/dosen/Toast";
import { getClasses, getAttendance, getAttendanceDetail, createAttendance, updateAttendance, deleteAttendance } from "../../services/api";
import { AlertCircle, Loader2 } from "lucide-react";

export default function Absensi() {
    const [kelasList, setKelasList] = useState([]);
    const [activeKelas, setActiveKelas] = useState(null);

    const [absensiList, setAbsensiList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [toast, setToast] = useState(null);

    const [showDetail, setShowDetail] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);
    const [detailData, setDetailData] = useState(null);

    useEffect(() => {
        fetchClasses();
    }, []);

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

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleAdd = async (formData) => {
        try {
            const payload = {
                pertemuan: formData.pertemuan,
                tanggal_mulai: formData.tanggal_mulai,
                tanggal_selesai: formData.tanggal_selesai,
                waktu_mulai: formData.waktu_mulai,
                waktu_selesai: formData.waktu_selesai
            };
            await createAttendance(activeKelas, payload);
            await fetchAttendance(activeKelas);
            setShowForm(false);
            showToast("✅ Sesi absensi berhasil dibuat!", "success");
        } catch (err) {
            showToast("❌ Gagal membuat sesi absensi!", "error");
        }
    };

    const handleEdit = async (formData) => {
        try {
            const payload = {
                pertemuan: formData.pertemuan,
                tanggal_mulai: formData.tanggal_mulai,
                tanggal_selesai: formData.tanggal_selesai,
                waktu_mulai: formData.waktu_mulai,
                waktu_selesai: formData.waktu_selesai
            };
            await updateAttendance(editingData.id, payload);
            await fetchAttendance(activeKelas);
            setEditingData(null);
            setShowForm(false);
            showToast("✅ Sesi absensi berhasil diperbarui!", "success");
        } catch (err) {
            showToast("❌ Gagal memperbarui sesi absensi!", "error");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Yakin ingin menghapus sesi absensi ini?")) {
            try {
                await deleteAttendance(id);
                await fetchAttendance(activeKelas);
                showToast("🗑️ Sesi absensi berhasil dihapus!", "warning");
            } catch (err) {
                showToast("❌ Gagal menghapus sesi absensi!", "error");
            }
        }
    };

    const handleEditClick = (item) => {
        setEditingData(item);
        setShowForm(true);
    };

    const handleDetailClick = async (item) => {
        setShowDetail(true);
        setDetailLoading(true);
        try {
            const { data } = await getAttendanceDetail(item.id);
            setDetailData(data);
        } catch (err) {
            showToast("❌ Gagal memuat detail absensi!", "error");
            setShowDetail(false);
        } finally {
            setDetailLoading(false);
        }
    };

    const filteredData = absensiList.filter(item =>
        item.pertemuan?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        totalSesi: absensiList.length,
        totalHadir: absensiList.reduce((sum, s) => sum + (s.hadir_count || 0), 0),
        totalIzin: absensiList.reduce((sum, s) => sum + (s.izin_count || 0), 0),
        totalAlpha: absensiList.reduce((sum, s) => sum + (s.alpha_count || 0), 0),
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />

            <main className="ml-72 flex-1 p-8">
                <AbsensiHeader
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
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
                                onDetail={handleDetailClick}
                                onEdit={handleEditClick}
                                onDelete={handleDelete}
                            />
                        ) : (
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
                                <p className="text-slate-500">Pilih kelas dari dropdown untuk melihat sesi absensi.</p>
                            </div>
                        )}
                    </>
                )}

                {showForm && (
                    <AbsensiFormModal
                        open={showForm}
                        initialData={editingData}
                        onClose={() => {
                            setShowForm(false);
                            setEditingData(null);
                        }}
                        onSubmit={editingData ? handleEdit : handleAdd}
                    />
                )}

                {showDetail && (
                    <AbsensiDetailModal
                        open={showDetail}
                        loading={detailLoading}
                        detail={detailData}
                        onClose={() => {
                            setShowDetail(false);
                            setDetailData(null);
                        }}
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