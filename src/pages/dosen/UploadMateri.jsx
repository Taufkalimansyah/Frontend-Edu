import { useState, useEffect } from "react";
import { uploadMateri, getClasses} from "../../services/api";
import Sidebar from "../../components/dosen/Sidebar";
import Toast from "../../components/dosen/Toast";
import UploadMateriHeader from "../../components/dosen/UploadMateriHeader";
import UploadMateriForm from "../../components/dosen/UploadMateriForm";
import MateriStats from "../../components/dosen/MateriStats";
import MateriList from "../../components/dosen/MateriList";


export default function UploadMateri() {
    const [materiList, setMateriList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [classes, setClasses] = useState([]);


    const filteredData = materiList.filter(item =>
        item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
    fetchClasses();
}, []);


const fetchClasses = async () => {
    try {
        const res = await getClasses();
        setClasses(res.data);
    } catch (error) {
        console.error(error);
    }
};

    const handleAddMateri = async (data) => {
    try {
        setIsLoading(true);

        const formData = new FormData();

        formData.append("judul", data.judul);
        formData.append("deskripsi", data.deskripsi);
        formData.append("file", data.file);

        const res = await uploadMateri(
            data.kelasId,
            formData
        );

        setMateriList(prev => [
            res.data,
            ...prev
        ]);

        setShowForm(false);

        setToast({
            message: "✅ Materi berhasil diupload!",
            type:"success"
        });

    } catch(err){
        console.error(err);

        setToast({
            message:"❌ Upload gagal",
            type:"error"
        });

    } finally {
        setIsLoading(false);
    }
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