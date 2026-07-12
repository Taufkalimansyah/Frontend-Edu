import { useState, useEffect } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import { Plus } from "lucide-react";

import AnnouncementTable from "../../components/announcement/AnnouncementTable";
import AnnouncementModal from "../../components/announcement/AnnouncementModal";
import DeleteAnnouncementModal from "../../components/announcement/DeleteAnnouncementModal";

import {
    getAnnouncements,
    postAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
} from "../../services/api";

export default function Pengumuman() {

    const [pengumuman, setPengumuman] = useState([]);

    const [openModal, setOpenModal] = useState(false);

    const [editing, setEditing] = useState(null);

    const [deleteItem, setDeleteItem] = useState(null);

    const [formError, setFormError] = useState(null);

    const [saving, setSaving] = useState(false);

    const loadData = async () => {
        const res = await getAnnouncements();
        setPengumuman(res.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSave = async (payload) => {
        setSaving(true);
        setFormError(null);

        try {
            if (editing) {
                await updateAnnouncement(editing.id, payload);
            } else {
                await postAnnouncement(payload);
            }

            setOpenModal(false);
            setEditing(null);
            loadData();
        } catch (err) {
            const message =
                err.response?.data?.errors?.judul?.[0] ||
                err.response?.data?.message ||
                "Gagal menyimpan pengumuman. Silakan coba lagi.";

            setFormError(message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {

        await deleteAnnouncement(deleteItem.id);

        setDeleteItem(null);

        loadData();
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">

            <Sidebar />

            <main className="flex-1 ml-72 p-10">

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-2xl font-bold">
                            Pengumuman
                        </h1>

                        <p className="text-slate-500">
                            Kelola informasi pengguna EduOnline
                        </p>

                    </div>

                    <button
                        onClick={()=>{
                            setEditing(null);
                            setFormError(null);
                            setOpenModal(true);
                        }}
                        className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-white"
                    >
                        <Plus size={18}/>
                        Tambah Pengumuman
                    </button>

                </div>

                <AnnouncementTable
                    pengumuman={pengumuman}
                    onEdit={(item)=>{
                        setEditing(item);
                        setFormError(null);
                        setOpenModal(true);
                    }}
                    onDelete={setDeleteItem}
                />

            </main>

            <AnnouncementModal
                open={openModal}
                onClose={()=>{
                    setOpenModal(false);
                    setFormError(null);
                }}
                editing={editing}
                onSave={handleSave}
                error={formError}
                saving={saving}
            />

            <DeleteAnnouncementModal
                open={deleteItem}
                item={deleteItem}
                onClose={()=>setDeleteItem(null)}
                onDelete={handleDelete}
            />

        </div>
    );

}