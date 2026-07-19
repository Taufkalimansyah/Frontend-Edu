import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/dosen/Sidebar";
import KelasHeader from "../../components/dosen/KelasHeader";
import KelasSearch from "../../components/dosen/KelasSearch";
import KelasGrid from "../../components/dosen/KelasGrid";
import KelasSkeleton from "../../components/dosen/KelasSkeleton";
import KelasEmpty from "../../components/dosen/KelasEmpty";
import KelasFormModal from "../../components/dosen/KelasFormModal";
import Toast from "../../components/dosen/Toast";
import { getClasses, createClass, updateClass, deleteClass } from "../../services/api";


export default function KelasSaya() {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState(null);
    const [editingClass, setEditingClass] = useState(null);


    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await getClasses();
            setClasses(response.data);
        } catch (error) {
            console.error("Error fetching classes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateClass = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await createClass(data);
            setClasses([response.data, ...classes]);
            setShowModal(false);
            setToast({
                message: "✅ Kelas berhasil dibuat!",
                type: "success"
            });
            setTimeout(() => setToast(null), 3000);
        } catch (error) {
            setToast({
                message: "❌ Gagal membuat kelas: " + error.message,
                type: "error"
            });
            setTimeout(() => setToast(null), 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditClick = (kelas) => {
    setEditingClass(kelas);
    setShowModal(true);
};

    const handleUpdateClass = async (data) => {

    setIsSubmitting(true);

    try {

        const response = await updateClass(
            editingClass.id,
            data
        );


        setClasses(prev =>
            prev.map(item =>
                item.id === editingClass.id
                    ? response.data
                    : item
            )
        );


        setShowModal(false);
        setEditingClass(null);


        setToast({
            message:"✅ Kelas berhasil diperbarui!",
            type:"success"
        });


    } catch(error){

        console.error(error);

        setToast({
            message:"❌ Gagal update kelas",
            type:"error"
        });

    } finally {

        setIsSubmitting(false);

        setTimeout(()=>{
            setToast(null)
        },3000);

    }
};

const handleDeleteClass = async (kelas)=>{

    if(!window.confirm(
        `Hapus kelas ${kelas.nama}?`
    )){
        return;
    }


    try{

        await deleteClass(kelas.id);


        setClasses(prev =>
            prev.filter(
                item=>item.id !== kelas.id
            )
        );


        setToast({
            message:"🗑️ Kelas berhasil dihapus",
            type:"warning"
        });


    }catch(error){

        console.error(error);

        setToast({
            message:"❌ Gagal hapus kelas",
            type:"error"
        });

    }


};

    const filteredClasses = classes.filter(cls =>
        cls.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.kode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
            <Sidebar />
            
            <main className="ml-72 flex-1 p-8 md:p-10">
                <KelasHeader onAddClick={() => setShowModal(true)} />
                
                <KelasSearch 
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                {loading ? (
                    <KelasSkeleton />
                ) : filteredClasses.length === 0 ? (
                    <KelasEmpty onAddClick={() => setShowModal(true)} />
                ) : (
                    <KelasGrid 
                        classes={filteredClasses}
                         onEditClick={handleEditClick}
                         onDeleteClick={handleDeleteClass} 
                    />
                )}
            </main>

            {/* Modal Form */}
            <KelasFormModal
    open={showModal}
    initialData={editingClass}
    onClose={()=>{
        setShowModal(false);
        setEditingClass(null);
    }}
    onSubmit={
        editingClass
        ? handleUpdateClass
        : handleCreateClass
    }
    isSubmitting={isSubmitting}
/>

            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}