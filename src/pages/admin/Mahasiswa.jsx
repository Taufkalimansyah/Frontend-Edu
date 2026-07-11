import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import { Plus, Pencil, Trash2 } from "lucide-react";


export default function Mahasiswa() {


    const [mahasiswa] = useState([
        {
            id: 1,
            name: "Budi Santoso",
            email: "mahasiswa@eduonline.id",
            nim: "2210511001",
            jurusan: "Informatika",
            status: "Aktif"
        },
        {
            id: 2,
            name: "Citra Ayu Lestari",
            email: "citra@eduonline.id",
            nim: "2210511002",
            jurusan: "Sistem Informasi",
            status: "Aktif"
        },
        {
            id: 3,
            name: "Andi Pratama",
            email: "andi@eduonline.id",
            nim: "2210511003",
            jurusan: "Teknik Komputer",
            status: "Aktif"
        }
    ]);


    return (

        <div className="min-h-screen bg-slate-50 flex">


            {/* Sidebar Admin */}
            <Sidebar />



            {/* Content */}
            <main className="flex-1 ml-72 p-10">


                <div className="flex justify-between items-center mb-8">


                    <div>

                        <h1 className="text-2xl font-bold text-slate-800">
                            Kelola Account 
                        </h1>

                        <p className="text-slate-500 mt-1">
                            Mengelola data mahasiswa EduOnline LMS
                        </p>

                    </div>



                    <button
                        className="
                        flex items-center gap-2
                        rounded-xl
                        bg-emerald-600
                        px-4 py-3
                        text-white
                        hover:bg-emerald-700
                        "
                    >
                        <Plus size={18}/>
                        Tambah Mahasiswa
                    </button>


                </div>





                <div className="
                    rounded-2xl
                    bg-white
                    border
                    shadow-sm
                    overflow-hidden
                ">


                    <table className="w-full">


                        <thead className="bg-emerald-50">

                            <tr>

                                <th className="px-6 py-4 text-left">
                                    Nama
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-left">
                                    NIM
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Jurusan
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-center">
                                    Action
                                </th>

                            </tr>

                        </thead>




                        <tbody>


                        {
                            mahasiswa.map((mhs)=>(

                                <tr 
                                    key={mhs.id}
                                    className="
                                    border-t
                                    hover:bg-slate-50
                                    "
                                >

                                    <td className="px-6 py-4 font-medium">
                                        {mhs.name}
                                    </td>


                                    <td className="px-6 py-4 text-slate-600">
                                        {mhs.email}
                                    </td>


                                    <td className="px-6 py-4 text-slate-600">
                                        {mhs.nim}
                                    </td>


                                    <td className="px-6 py-4 text-slate-600">
                                        {mhs.jurusan}
                                    </td>


                                    <td className="px-6 py-4">

                                        <span className="
                                            rounded-full
                                            bg-emerald-100
                                            px-3 py-1
                                            text-sm
                                            text-emerald-700
                                        ">
                                            {mhs.status}
                                        </span>

                                    </td>



                                    <td className="px-6 py-4">

                                        <div className="flex justify-center gap-2">


                                            <button
                                                className="
                                                flex items-center gap-1
                                                rounded-lg
                                                bg-blue-500
                                                px-3 py-2
                                                text-white
                                                text-sm
                                                "
                                            >
                                                <Pencil size={15}/>
                                                Edit
                                            </button>



                                            <button
                                                className="
                                                flex items-center gap-1
                                                rounded-lg
                                                bg-red-500
                                                px-3 py-2
                                                text-white
                                                text-sm
                                                "
                                            >
                                                <Trash2 size={15}/>
                                                Hapus
                                            </button>


                                        </div>

                                    </td>


                                </tr>

                            ))
                        }


                        </tbody>


                    </table>


                </div>


            </main>


        </div>

    )
}