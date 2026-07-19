import { useState, useEffect } from "react";
import { uploadMateri, updateMateri, deleteMateri, getMaterials, getClasses, downloadMateri } from "../../services/api";
import Sidebar from "../../components/dosen/Sidebar";
import Toast from "../../components/dosen/Toast";
import UploadMateriHeader from "../../components/dosen/UploadMateriHeader";
import UploadMateriForm from "../../components/dosen/UploadMateriForm";
import MateriStats from "../../components/dosen/MateriStats";
import MateriList from "../../components/dosen/MateriList";

export default function UploadMateri() {
    const [materiList, setMateriList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetchClasses();
        fetchMateri();
    }, []);

    const fetchClasses = async () => {
        try {
            const res = await getClasses();
            const list = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
            setClasses(list);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDownload = async (item) => {
        try {
            const res = await downloadMateri(item.id);
            
            // Buat URL sementara dari blob
            const url = window.URL.createObjectURL(new Blob([res.data]));
            
            // Buat elemen <a> tersembunyi buat trigger download
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", item.file_name || "materi");
            document.body.appendChild(link);
            link.click();
            
            // Bersihkan
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            showToast("❌ Gagal mengunduh file", "error");
        }
    };

    const fetchMateri = async () => {
        try {
            const res = await getMaterials();
            const list = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
            setMateriList(list);
        } catch (error) {
            console.error(error);
            setToast({ message: "❌ Gagal memuat daftar materi", type: "error" });
        }
    };

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const filteredData = materiList
        .filter(item =>
            item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(item => !selectedClass || String(item.kelas_id) === String(selectedClass));

    const handleAddMateri = async (data) => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("judul", data.judul);
            formData.append("deskripsi", data.deskripsi);
            formData.append("file", data.file);

            await uploadMateri(data.kelasId, formData);
            await fetchMateri();
            setShowForm(false);
            showToast("✅ Materi berhasil diupload!", "success");
        } catch (err) {
            console.error(err);
            showToast("❌ Upload gagal", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateMateri = async (data) => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("judul", data.judul);
            formData.append("deskripsi", data.deskripsi);
            if (data.file) {
                formData.append("file", data.file);
            }
            formData.append("_method", "PUT"); // method spoofing karena ada file

            await updateMateri(editingData.id, formData);
            await fetchMateri();
            setShowForm(false);
            setEditingData(null);
            showToast("✅ Materi berhasil diperbarui!", "success");
        } catch (err) {
            console.error(err);
            showToast("❌ Gagal memperbarui materi", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteMateri = async (id) => {
        if (window.confirm("Yakin ingin menghapus materi ini?")) {
            try {
                await deleteMateri(id);
                await fetchMateri();
                showToast("🗑️ Materi berhasil dihapus!", "warning");
            } catch (err) {
                console.error(err);
                showToast("❌ Gagal menghapus materi", "error");
            }
        }
    };

    const handleEditClick = (item) => {
        setEditingData(item);
        setShowForm(true);
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="ml-72 flex-1 p-8">
                <UploadMateriHeader
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    classes={classes}
                    selectedClass={selectedClass}
                    setSelectedClass={setSelectedClass}
                    onAddClick={() => {
                        setEditingData(null);
                        setShowForm(true);
                    }}
                />

                <MateriStats materiList={materiList} />

                <MateriList
                    data={filteredData}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteMateri}
                    onDownload={handleDownload}
                />

                {showForm && (
                    <UploadMateriForm
                        open={showForm}
                        initialData={editingData}
                        kelasList={classes}
                        onClose={() => {
                            setShowForm(false);
                            setEditingData(null);
                        }}
                        onSubmit={editingData ? handleUpdateMateri : handleAddMateri}
                        isLoading={isLoading}
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