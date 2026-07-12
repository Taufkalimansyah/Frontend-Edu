import { useState } from "react";
import { Plus } from "lucide-react";
import Sidebar from "../../components/dashboard/Sidebar";
import MahasiswaTable from "../../components/mahasiswa/MahasiswaTable";
import MahasiswaFormModal from "../../components/mahasiswa/MahasiswaFormModal";
import HapusConfirmModal from "../../components/mahasiswa/HapusConfirmModal";
import useMahasiswa from "../../components/hooks/Usemahasiswa";

export default function Mahasiswa() {
    const {
        mahasiswa,
        loading,
        error,
        createMahasiswa,
        updateMahasiswa,
        deleteMahasiswa,
    } = useMahasiswa();

    const [formOpen, setFormOpen] = useState(false);
    const [editingMhs, setEditingMhs] = useState(null);
    const [deletingMhs, setDeletingMhs] = useState(null);

    const openAddForm = () => {
        setEditingMhs(null);
        setFormOpen(true);
    };

    const openEditForm = (mhs) => {
        setEditingMhs(mhs);
        setFormOpen(true);
    };

    const handleSubmit = (payload) => {
        return editingMhs
            ? updateMahasiswa(editingMhs.id, payload)
            : createMahasiswa(payload);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar Admin */}
            <Sidebar />

            {/* Content */}
            <main className="flex-1 ml-72 p-10">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Kelola Account</h1>
                        <p className="text-slate-500 mt-1">
                            Mengelola data mahasiswa EduOnline LMS
                        </p>
                    </div>

                    <button
                        onClick={openAddForm}
                        className="
                        flex items-center gap-2
                        rounded-xl
                        bg-emerald-600
                        px-4 py-3
                        text-white
                        hover:bg-emerald-700
                        "
                    >
                        <Plus size={18} />
                        Tambah Account
                    </button>
                </div>

                {error && (
                    <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <MahasiswaTable
                    data={mahasiswa}
                    loading={loading}
                    onEdit={openEditForm}
                    onDelete={setDeletingMhs}
                />
            </main>

            <MahasiswaFormModal
                open={formOpen}
                initialData={editingMhs}
                onClose={() => setFormOpen(false)}
                onSubmit={handleSubmit}
            />

            <HapusConfirmModal
                open={!!deletingMhs}
                mahasiswa={deletingMhs}
                onClose={() => setDeletingMhs(null)}
                onConfirm={deleteMahasiswa}
            />
        </div>
    );
}