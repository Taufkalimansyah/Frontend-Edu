import { useState } from "react";
import Sidebar from "../../components/dosen/Sidebar";
import { uploadMateri } from "../../services/api";

export default function UploadMateri(){

    const [judul,setJudul] = useState("");
    const [deskripsi,setDeskripsi] = useState("");
    const [file,setFile] = useState(null);

    const submit = async(e)=>{
        e.preventDefault();

        const formData = new FormData();

        formData.append("judul",judul);
        formData.append("deskripsi",deskripsi);
        formData.append("file",file);

        await uploadMateri(1,formData);

        alert("Materi berhasil diupload");
    };

    return(
        <div className="flex">

            <Sidebar/>

            <main className="ml-72 flex-1 p-10">

                <form
                    onSubmit={submit}
                    className="bg-white p-8 rounded-2xl"
                >

                    <input
                        placeholder="Judul"
                        onChange={(e)=>setJudul(e.target.value)}
                        className="w-full border p-4 rounded-xl mb-5"
                    />

                    <textarea
                        placeholder="Deskripsi"
                        onChange={(e)=>setDeskripsi(e.target.value)}
                        className="w-full border p-4 rounded-xl mb-5"
                    />

                    <input
                        type="file"
                        onChange={(e)=>setFile(e.target.files[0])}
                    />

                    <button className="mt-5 bg-emerald-600 text-white px-6 py-3 rounded-xl">
                        Upload
                    </button>

                </form>

            </main>

        </div>
    )
}