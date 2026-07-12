import { useState } from "react";
import Sidebar from "../../components/dosen/Sidebar";
import { createTugas } from "../../services/api";

export default function BuatTugas(){

    const [judul,setJudul] = useState("");
    const [deadline,setDeadline] = useState("");

    const submit = async(e)=>{
        e.preventDefault();

        await createTugas(1,{
            judul,
            deadline
        });

        alert("Tugas berhasil dibuat");
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
                        placeholder="Judul Tugas"
                        className="w-full border p-4 rounded-xl mb-5"
                        onChange={(e)=>setJudul(e.target.value)}
                    />

                    <input
                        type="date"
                        className="w-full border p-4 rounded-xl mb-5"
                        onChange={(e)=>setDeadline(e.target.value)}
                    />

                    <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl">
                        Simpan
                    </button>

                </form>

            </main>

        </div>
    )
}