import { useState } from "react";
import Sidebar from "../../components/dosen/Sidebar";
import TugasForm from "../../components/dosen/TugasForm";
import TugasList from "../../components/dosen/TugasList";
import Toast from "../../components/Toast";
import { Plus, FileText, Calendar, Clock, ClipboardList } from "lucide-react";

// Data dummy
const dummyTugas = [
    {
        id: 1,
        judul: "Tugas 1: Analisis Algoritma",
        deskripsi: "Buatlah analisis kompleksitas waktu dari algoritma sorting yang telah dipelajari",
        deadline: "2026-07-25",
        mataKuliah: "Algoritma dan Pemrograman",
        status: "aktif",
        totalMahasiswa: 45,
        sudahMengumpulkan: 28,
        createdAt: "2026-07-18T10:00:00"
    },
    {
        id: 2,
        judul: "Tugas 2: Implementasi Database",
        deskripsi: "Rancang dan implementasikan database sederhana menggunakan MySQL",
        deadline: "2026-07-30",
        mataKuliah: "Basis Data",
        status: "aktif",
        totalMahasiswa: 38,
        sudahMengumpulkan: 15,
        createdAt: "2026-07-19T14:30:00"
    },
    {
        id: 3,
        judul: "Tugas 3: Desain UI/UX",
        deskripsi: "Buatlah prototype desain aplikasi mobile dengan Figma",
        deadline: "2026-08-05",
        mataKuliah: "Desain Antarmuka Pengguna",
        status: "nonaktif",
        totalMahasiswa: 42,
        sudahMengumpulkan: 40,
        createdAt: "2026-07-15T09:00:00"
    }
];

export default function BuatTugas() {
    const [tugasList, setTugasList] = useState(dummyTugas);
    const [showForm, setShowForm] = useState(false);
    const [editingTugas, setEditingTugas] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const handleAddTugas = (data) => {
        setIsLoading(true);
        
        setTimeout(() => {
            const newTugas = {
                id: Date.now(),
                ...data,
                status: "aktif",
                totalMahasiswa: Math.floor(Math.random() * 30) + 20,
                sudahMengumpulkan: 0,
                createdAt: new Date().toISOString()
            };
            
            setTugasList([newTugas, ...tugasList]);
            setShowForm(false);
            setIsLoading(false);
            
            setToast({
                message: "✅ Tugas berhasil dibuat!",
                type: "success"
            });
            
            setTimeout(() => setToast(null), 3000);
        }, 1500);
    };

    const handleUpdateTugas = (data) => {
        setIsLoading(true);
        
        setTimeout(() => {
            const updatedList = tugasList.map(tugas => 
                tugas.id === editingTugas.id 
                    ? { ...tugas, ...data }
                    : tugas
            );
            
            setTugasList(updatedList);
            setEditingTugas(null);
            setShowForm(false);
            setIsLoading(false);
            
            setToast({
                message: "✅ Tugas berhasil diperbarui!",
                type: "success"
            });
            
            setTimeout(() => setToast(null), 3000);
        }, 1500);
    };

    const handleDeleteTugas = (id) => {
        if (window.confirm("Yakin ingin menghapus tugas ini?")) {
            setIsLoading(true);
            
            setTimeout(() => {
                const filteredList = tugasList.filter(tugas => tugas.id !== id);
                setTugasList(filteredList);
                setIsLoading(false);
                
                setToast({
                    message: "🗑️ Tugas berhasil dihapus!",
                    type: "warning"
                });
                
                setTimeout(() => setToast(null), 3000);
            }, 1000);
        }
    };

    const handleEditTugas = (tugas) => {
        setEditingTugas(tugas);
        setShowForm(true);
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            
            <main className="ml-72 flex-1 p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-200">
                                <ClipboardList className="text-white" size={24} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                                    Kelola Tugas
                                </h1>
                                <p className="text-slate-500 mt-1 flex items-center gap-2">
                                    <Clock size={16} />
                                    Kelola semua tugas yang diberikan kepada mahasiswa
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <button
                        onClick={() => {
                            setEditingTugas(null);
                            setShowForm(true);
                        }}
                        className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                        <span className="font-medium">Buat Tugas</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Total Tugas</p>
                                <p className="text-3xl font-bold text-slate-800 mt-1">{tugasList.length}</p>
                            </div>
                            <div className="p-3 bg-emerald-100 rounded-xl">
                                <FileText size={24} className="text-emerald-600" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Tugas Aktif</p>
                                <p className="text-3xl font-bold text-slate-800 mt-1">
                                    {tugasList.filter(t => t.status === "aktif").length}
                                </p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Clock size={24} className="text-blue-600" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Rata-rata Pengumpulan</p>
                                <p className="text-3xl font-bold text-slate-800 mt-1">
                                    {tugasList.length > 0 ? Math.round(
                                        tugasList.reduce((acc, t) => acc + (t.sudahMengumpulkan / t.totalMahasiswa * 100), 0) / 
                                        tugasList.length
                                    ) : 0}%
                                </p>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <Calendar size={24} className="text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {showForm && (
                    <TugasForm
                        open={showForm}
                        initialData={editingTugas}
                        onClose={() => {
                            setShowForm(false);
                            setEditingTugas(null);
                        }}
                        onSubmit={editingTugas ? handleUpdateTugas : handleAddTugas}
                        isLoading={isLoading}
                    />
                )}

                <TugasList
                    tugasList={tugasList}
                    onEdit={handleEditTugas}
                    onDelete={handleDeleteTugas}
                />

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