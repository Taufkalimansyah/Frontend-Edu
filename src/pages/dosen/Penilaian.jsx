import { useState } from "react";
import Sidebar from "../../components/dosen/Sidebar";
import PenilaianHeader from "../../components/dosen/PenilaianHeader";
import PenilaianStats from "../../components/dosen/PenilaianStats";
import PenilaianTable from "../../components/dosen/PenilaianTable";
import PenilaianDetailModal from "../../components/dosen/PenilaianDetailModal";
import Toast from "../../components/dosen/Toast";

// Data dummy
const dummyPenilaian = [
    {
        id: 1,
        mahasiswa: {
            name: "Randy Saputra",
            nim: "20200101",
            kelas: "IF-3A"
        },
        tugas: {
            id: 1,
            judul: "Tugas 1: Analisis Algoritma",
            mataKuliah: "Algoritma dan Pemrograman"
        },
        file: "tugas_randy_algoritma.pdf",
        nilai: 85,
        feedback: "Bagus, tetapi perlu perbaikan pada kompleksitas waktu",
        status: "dinilai",
        tanggalSubmit: "2026-07-20"
    },
    {
        id: 2,
        mahasiswa: {
            name: "Sarah Dewi",
            nim: "20200102",
            kelas: "IF-3A"
        },
        tugas: {
            id: 1,
            judul: "Tugas 1: Analisis Algoritma",
            mataKuliah: "Algoritma dan Pemrograman"
        },
        file: "tugas_sarah_algoritma.pdf",
        nilai: 92,
        feedback: "Sangat baik! Pemahaman konsep sangat baik",
        status: "dinilai",
        tanggalSubmit: "2026-07-19"
    },
    {
        id: 3,
        mahasiswa: {
            name: "Budi Santoso",
            nim: "20200103",
            kelas: "IF-3B"
        },
        tugas: {
            id: 2,
            judul: "Tugas 2: Implementasi Database",
            mataKuliah: "Basis Data"
        },
        file: "tugas_budi_database.pdf",
        nilai: null,
        feedback: "",
        status: "belum_dinilai",
        tanggalSubmit: "2026-07-21"
    },
    {
        id: 4,
        mahasiswa: {
            name: "Maya Putri",
            nim: "20200104",
            kelas: "IF-3B"
        },
        tugas: {
            id: 2,
            judul: "Tugas 2: Implementasi Database",
            mataKuliah: "Basis Data"
        },
        file: "tugas_maya_database.pdf",
        nilai: 78,
        feedback: "Perbaiki struktur database dan normalisasi",
        status: "dinilai",
        tanggalSubmit: "2026-07-18"
    },
    {
        id: 5,
        mahasiswa: {
            name: "Andi Wijaya",
            nim: "20200105",
            kelas: "IF-3A"
        },
        tugas: {
            id: 3,
            judul: "Tugas 3: Desain UI/UX",
            mataKuliah: "Desain Antarmuka Pengguna"
        },
        file: "tugas_andi_uiux.pdf",
        nilai: null,
        feedback: "",
        status: "belum_dinilai",
        tanggalSubmit: "2026-07-22"
    }
];

export default function Penilaian() {
    const [penilaianList, setPenilaianList] = useState(dummyPenilaian);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("semua");
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ nilai: "", feedback: "" });
    const [selectedItem, setSelectedItem] = useState(null);
    const [toast, setToast] = useState(null);

    // Filter data
    const filteredData = penilaianList.filter(item => {
        const matchSearch = item.mahasiswa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.mahasiswa.nim.includes(searchTerm) ||
                           item.tugas.judul.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = filterStatus === "semua" || item.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const handleEdit = (item) => {
        setEditingId(item.id);
        setFormData({
            nilai: item.nilai || "",
            feedback: item.feedback || ""
        });
    };

    const handleSave = (id) => {
        setPenilaianList(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        nilai: formData.nilai ? parseInt(formData.nilai) : null,
                        feedback: formData.feedback,
                        status: formData.nilai ? "dinilai" : "belum_dinilai"
                      }
                    : item
            )
        );
        setEditingId(null);
        setFormData({ nilai: "", feedback: "" });
        
        setToast({
            message: "✅ Penilaian berhasil disimpan!",
            type: "success"
        });
        setTimeout(() => setToast(null), 3000);
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData({ nilai: "", feedback: "" });
    };

    const handleDetail = (item) => {
        setSelectedItem(item);
    };

    const handleCloseDetail = () => {
        setSelectedItem(null);
    };

    const stats = {
        total: penilaianList.length,
        sudahDinilai: penilaianList.filter(p => p.status === "dinilai").length,
        belumDinilai: penilaianList.filter(p => p.status === "belum_dinilai").length,
        rataRata: Math.round(
            penilaianList
                .filter(p => p.nilai !== null)
                .reduce((acc, p) => acc + p.nilai, 0) / 
            penilaianList.filter(p => p.nilai !== null).length || 0
        )
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

                <PenilaianTable
                    data={filteredData}
                    editingId={editingId}
                    formData={formData}
                    setFormData={setFormData}
                    onEdit={handleEdit}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    onDetail={handleDetail}
                />

                {selectedItem && (
                    <PenilaianDetailModal
                        open={!!selectedItem}
                        data={selectedItem}
                        onClose={handleCloseDetail}
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