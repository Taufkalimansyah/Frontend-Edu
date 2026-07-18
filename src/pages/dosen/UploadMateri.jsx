import { useState } from "react";
import Sidebar from "../../components/dosen/Sidebar";
import Toast from "../../components/dosen/Toast";
import UploadMateriHeader from "../../components/dosen/UploadMateriHeader";
import UploadMateriForm from "../../components/dosen/UploadMateriForm";
import MateriStats from "../../components/dosen/MateriStats";
import MateriList from "../../components/dosen/MateriList";

// Data dummy materi
const dummyMateri = [
    {
        id: 1,
        judul: "Modul 1 - Pengenalan Algoritma",
        deskripsi: "Materi pengenalan dasar algoritma dan pemrograman",
        file: "modul_algoritma_1.pdf",
        fileSize: "2.4 MB",
        mataKuliah: "Algoritma dan Pemrograman",
        tanggalUpload: "2026-07-15",
        status: "published",
        views: 45,
        downloads: 28
    },
    {
        id: 2,
        judul: "Slide Pertemuan 2 - Database",
        deskripsi: "Slide presentasi tentang konsep dasar database dan SQL",
        file: "slide_database_2.pptx",
        fileSize: "5.1 MB",
        mataKuliah: "Basis Data",
        tanggalUpload: "2026-07-16",
        status: "published",
        views: 32,
        downloads: 19
    },
    {
        id: 3,
        judul: "Tutorial Praktikum - Desain UI",
        deskripsi: "Panduan praktikum membuat desain UI/UX menggunakan Figma",
        file: "tutorial_figma.pdf",
        fileSize: "3.8 MB",
        mataKuliah: "Desain Antarmuka Pengguna",
        tanggalUpload: "2026-07-17",
        status: "draft",
        views: 0,
        downloads: 0
    },
    {
        id: 4,
        judul: "Modul 2 - Struktur Data",
        deskripsi: "Materi tentang array, linked list, stack, dan queue",
        file: "modul_struktur_data.pdf",
        fileSize: "4.2 MB",
        mataKuliah: "Algoritma dan Pemrograman",
        tanggalUpload: "2026-07-18",
        status: "published",
        views: 38,
        downloads: 22
    }
];

export default function UploadMateri() {
    const [materiList, setMateriList] = useState(dummyMateri);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterMataKuliah, setFilterMataKuliah] = useState("semua");
    const [showForm, setShowForm] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const mataKuliahList = ["semua", ...new Set(materiList.map(item => item.mataKuliah))];

    const filteredData = materiList.filter(item => {
        const matchSearch = item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());
        const matchMataKuliah = filterMataKuliah === "semua" || item.mataKuliah === filterMataKuliah;
        return matchSearch && matchMataKuliah;
    });

    const handleAddMateri = (data) => {
        setIsLoading(true);
        
        setTimeout(() => {
            const newMateri = {
                id: Date.now(),
                ...data,
                fileSize: "2.0 MB",
                tanggalUpload: new Date().toISOString().split('T')[0],
                status: "published",
                views: 0,
                downloads: 0
            };
            
            setMateriList([newMateri, ...materiList]);
            setShowForm(false);
            setIsLoading(false);
            
            setToast({
                message: "✅ Materi berhasil diupload!",
                type: "success"
            });
            setTimeout(() => setToast(null), 3000);
        }, 1500);
    };

    const handleUpdateMateri = (data) => {
        setIsLoading(true);
        
        setTimeout(() => {
            const updatedList = materiList.map(item =>
                item.id === editingData.id
                    ? { ...item, ...data }
                    : item
            );
            
            setMateriList(updatedList);
            setEditingData(null);
            setShowForm(false);
            setIsLoading(false);
            
            setToast({
                message: "✅ Materi berhasil diperbarui!",
                type: "success"
            });
            setTimeout(() => setToast(null), 3000);
        }, 1500);
    };

    const handleDeleteMateri = (id) => {
        if (window.confirm("Yakin ingin menghapus materi ini?")) {
            setMateriList(prev => prev.filter(item => item.id !== id));
            setToast({
                message: "🗑️ Materi berhasil dihapus!",
                type: "warning"
            });
            setTimeout(() => setToast(null), 3000);
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
                    filterMataKuliah={filterMataKuliah}
                    setFilterMataKuliah={setFilterMataKuliah}
                    mataKuliahList={mataKuliahList}
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
                />

                {showForm && (
                    <UploadMateriForm
                        open={showForm}
                        initialData={editingData}
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