import { useState } from "react";
import Sidebar from "../../components/dosen/Sidebar";
import AbsensiHeader from "../../components/dosen/AbsensiHeader";
import AbsensiStats from "../../components/dosen/AbsensiStats";
import AbsensiTable from "../../components/dosen/AbsensiTable";
import AbsensiFormModal from "../../components/dosen/AbsensiFormModal";
import Toast from "../../components/dosen/Toast";

// Data dummy
const dummyAbsensi = [
    {
        id: 1,
        mahasiswa: {
            name: "Randy Saputra",
            nim: "20200101",
            kelas: "IF-3A"
        },
        mataKuliah: "Algoritma dan Pemrograman",
        pertemuan: "Pertemuan 1",
        tanggal: "2026-07-18",
        status: "hadir",
        waktu: "08:00",
        keterangan: "-"
    },
    {
        id: 2,
        mahasiswa: {
            name: "Sarah Dewi",
            nim: "20200102",
            kelas: "IF-3A"
        },
        mataKuliah: "Algoritma dan Pemrograman",
        pertemuan: "Pertemuan 1",
        tanggal: "2026-07-18",
        status: "hadir",
        waktu: "07:55",
        keterangan: "-"
    },
    {
        id: 3,
        mahasiswa: {
            name: "Budi Santoso",
            nim: "20200103",
            kelas: "IF-3B"
        },
        mataKuliah: "Basis Data",
        pertemuan: "Pertemuan 2",
        tanggal: "2026-07-19",
        status: "izin",
        waktu: "-",
        keterangan: "Sakit"
    },
    {
        id: 4,
        mahasiswa: {
            name: "Maya Putri",
            nim: "20200104",
            kelas: "IF-3B"
        },
        mataKuliah: "Basis Data",
        pertemuan: "Pertemuan 2",
        tanggal: "2026-07-19",
        status: "hadir",
        waktu: "08:10",
        keterangan: "-"
    },
    {
        id: 5,
        mahasiswa: {
            name: "Andi Wijaya",
            nim: "20200105",
            kelas: "IF-3A"
        },
        mataKuliah: "Desain Antarmuka Pengguna",
        pertemuan: "Pertemuan 3",
        tanggal: "2026-07-20",
        status: "alpa",
        waktu: "-",
        keterangan: "Tidak hadir tanpa keterangan"
    },
    {
        id: 6,
        mahasiswa: {
            name: "Dewi Lestari",
            nim: "20200106",
            kelas: "IF-3A"
        },
        mataKuliah: "Desain Antarmuka Pengguna",
        pertemuan: "Pertemuan 3",
        tanggal: "2026-07-20",
        status: "hadir",
        waktu: "07:50",
        keterangan: "-"
    }
];

export default function Absensi() {
    const [absensiList, setAbsensiList] = useState(dummyAbsensi);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("semua");
    const [filterKelas, setFilterKelas] = useState("semua");
    const [showForm, setShowForm] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [toast, setToast] = useState(null);

    // Get unique kelas for filter
    const kelasList = ["semua", ...new Set(absensiList.map(item => item.mahasiswa.kelas))];

    // Filter data
    const filteredData = absensiList.filter(item => {
        const matchSearch = item.mahasiswa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.mahasiswa.nim.includes(searchTerm) ||
                           item.mataKuliah.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = filterStatus === "semua" || item.status === filterStatus;
        const matchKelas = filterKelas === "semua" || item.mahasiswa.kelas === filterKelas;
        return matchSearch && matchStatus && matchKelas;
    });

    // Stats
    const stats = {
        total: absensiList.length,
        hadir: absensiList.filter(a => a.status === "hadir").length,
        izin: absensiList.filter(a => a.status === "izin").length,
        alpa: absensiList.filter(a => a.status === "alpa").length,
        persentase: Math.round(
            (absensiList.filter(a => a.status === "hadir").length / absensiList.length) * 100
        )
    };

    const handleAdd = (data) => {
        const newAbsensi = {
            id: Date.now(),
            ...data,
            mahasiswa: {
                name: data.mahasiswaName,
                nim: data.mahasiswaNim,
                kelas: data.mahasiswaKelas
            }
        };
        setAbsensiList([newAbsensi, ...absensiList]);
        setShowForm(false);
        setToast({
            message: "✅ Absensi berhasil ditambahkan!",
            type: "success"
        });
        setTimeout(() => setToast(null), 3000);
    };

    const handleEdit = (data) => {
        setAbsensiList(prev =>
            prev.map(item =>
                item.id === editingData.id
                    ? {
                        ...item,
                        status: data.status,
                        keterangan: data.keterangan,
                        waktu: data.waktu
                      }
                    : item
            )
        );
        setEditingData(null);
        setShowForm(false);
        setToast({
            message: "✅ Absensi berhasil diperbarui!",
            type: "success"
        });
        setTimeout(() => setToast(null), 3000);
    };

    const handleDelete = (id) => {
        if (window.confirm("Yakin ingin menghapus data absensi ini?")) {
            setAbsensiList(prev => prev.filter(item => item.id !== id));
            setToast({
                message: "🗑️ Absensi berhasil dihapus!",
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
                <AbsensiHeader
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    filterKelas={filterKelas}
                    setFilterKelas={setFilterKelas}
                    kelasList={kelasList}
                    onAddClick={() => {
                        setEditingData(null);
                        setShowForm(true);
                    }}
                />

                <AbsensiStats stats={stats} />

                <AbsensiTable
                    data={filteredData}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                />

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