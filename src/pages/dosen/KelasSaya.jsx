import { useState } from "react";
import Sidebar from "../../components/dosen/Sidebar";
import { createClass } from "../../services/api";

export default function TambahKelas() {

    const [nama,setNama] = useState("");
    const [kode,setKode] = useState("");

    const submit = async(e)=>{
        e.preventDefault();

        await createClass({
            nama,
            kode
        });

        alert("Kelas berhasil dibuat");
    };

    return(
        <div className="flex bg-slate-100 min-h-screen">

            <Sidebar/>

            <main className="ml-72 flex-1 p-10">

                <h1 className="text-3xl font-bold">
                    Tambah Kelas
                </h1>

                <form
                    onSubmit={submit}
                    className="
                        mt-8 bg-white p-8 rounded-2xl
                        max-w-2xl
                    "
                >

                    <input
                        type="text"
                        placeholder="Nama Kelas"
                        value={nama}
                        onChange={(e)=>setNama(e.target.value)}
                        className="
                            w-full border rounded-xl
                            p-4 mb-5
                        "
                    />

                    <input
                        type="text"
                        placeholder="Kode Kelas"
                        value={kode}
                        onChange={(e)=>setKode(e.target.value)}
                        className="
                            w-full border rounded-xl
                            p-4 mb-5
                        "
                    />

                    <button
                        className="
                            bg-emerald-600 text-white
                            px-8 py-3 rounded-xl
                        "
                    >
                        Simpan
                    </button>

                </form>

            </main>

        </div>
    )
}