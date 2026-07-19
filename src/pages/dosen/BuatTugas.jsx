import { useState, useEffect } from "react";
import Sidebar from "../../components/dosen/Sidebar";
import TugasForm from "../../components/dosen/TugasForm";
import TugasList from "../../components/dosen/TugasList";
import Toast from "../../components/dosen/Toast";
import { getTugasList, createTugas, updateTugas, deleteTugas, getClasses } from "../../services/api";
import { Plus, FileText, Clock, ClipboardList } from "lucide-react";

export default function BuatTugas() {
    const [tugasList, setTugasList] = useState([]);
    const [classes, setClasses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingTugas, setEditingTugas] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        fetchTugas();
        fetchClasses();
    }, []);

    const fetchTugas = async () => {
        try {
            const res = await getTugasList();
            const list = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
            setTugasList(list);
        } catch (err) {
            console.error(err);
            showToast("❌ Gagal memuat daftar tugas", "error");
        }
    };

    const fetchClasses = async () => {
        try {
            const res = await getClasses();
            const list = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
            setClasses(list);
        } catch (err) {
            console.error(err);
        }
    };

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleAddTugas = async (data) => {
        try {
            setIsLoading(true);
            const payload = {
                judul: data.judul,
                instruksi: data.instruksi,
                deadline: data.deadline,
            };
            await createTugas(data.kelasId, payload);
            await fetchTugas();
            setShowForm(false);
            showToast("✅ Tugas berhasil dibuat!", "success");
        } catch (err) {
            console.error(err);
            showToast("❌ Gagal membuat tugas", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateTugas = async (data) => {
        try {
            setIsLoading(true);
            const payload = {
                judul: data.judul,
                instruksi: data.instruksi,
                deadline: data.deadline,
            };
            await updateTugas(editingTugas.id, payload);
            await fetchTugas();
            setEditingTugas(null);
            setShowForm(false);
            showToast("✅ Tugas berhasil diperbarui!", "success");
        } catch (err) {
            console.error(err);
            showToast("❌ Gagal memperbarui tugas", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteTugas = async (id) => {
        if (window.confirm("Yakin ingin menghapus tugas ini?")) {
            try {
                await deleteTugas(id);
                await fetchTugas();
                showToast("🗑️ Tugas berhasil dihapus!", "warning");
            } catch (err) {
                console.error(err);
                showToast("❌ Gagal menghapus tugas", "error");
            }
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                                <p className="text-sm text-slate-500">Tugas Mendatang</p>
                                <p className="text-3xl font-bold text-slate-800 mt-1">
                                    {tugasList.filter(t => new Date(t.deadline) > new Date()).length}
                                </p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Clock size={24} className="text-blue-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {showForm && (
                    <TugasForm
                        open={showForm}
                        initialData={editingTugas}
                        kelasList={classes}
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