import {
    BookOpen,
    User,
    Calendar,
    MapPin,
    Plus,
    X
} from "lucide-react";


import {
    useState
} from "react";


import {
    useNavigate
} from "react-router-dom";


import Sidebar from "../../components/mahasiswa/Sidebar";



export default function KelasSaya() {


    const navigate = useNavigate();


    const [kelas, setKelas] = useState([

        {
            id: 1,
            nama: "Struktur Data & Algoritma",
            kode: "IF-201",
            sks: 3,
            dosen: "Prof. Dr. Ir. Heru Santoso",
            jadwal: "Senin, 08:00 - 10:30",
            ruangan: "Lab Dasar Informatika",
            progress: 65,
            status: "Berlangsung"
        },


        {
            id: 2,
            nama: "Sistem Basis Data",
            kode: "IF-202",
            sks: 3,
            dosen: "Dra. Siska Putri, M.T",
            jadwal: "Selasa, 13:00 - 15:30",
            ruangan: "Ruang Kuliah 3.1",
            progress: 42,
            status: "Berlangsung"
        },


        {
            id: 3,
            nama: "Arsitektur Komputer",
            kode: "IF-203",
            sks: 2,
            dosen: "Ir. Bambang Wijaya",
            jadwal: "Kamis, 10:00 - 11:40",
            ruangan: "Ruang Kuliah 2.4",
            progress: 88,
            status: "Tugas Baru"
        }

    ]);



    const [showModal,setShowModal] = useState(false);


    const [selectedKRS,setSelectedKRS] = useState([]);



    const availableCourses = [

        {
            id:4,
            nama:"Komputasi Awan",
            kode:"IF-305",
            sks:3,
            dosen:"Dr. Citra Dewi",
            jadwal:"Jumat, 13:00 - 15:30",
            ruangan:"Lab Cloud Computing",
            progress:0,
            status:"Baru"
        },


        {
            id:5,
            nama:"Machine Learning",
            kode:"IF-401",
            sks:3,
            dosen:"Dr. Rizky Ramadhan",
            jadwal:"Rabu, 08:00 - 10:30",
            ruangan:"Lab Artificial Intelligence",
            progress:0,
            status:"Baru"
        },


        {
            id:6,
            nama:"Keamanan Jaringan",
            kode:"IF-410",
            sks:2,
            dosen:"Dr. Bambang Setiawan",
            jadwal:"Kamis, 13:00 - 14:40",
            ruangan:"Lab Networking",
            progress:0,
            status:"Baru"
        }

    ];




    const toggleCourse = (course)=>{


        const exist =
        selectedKRS.find(
            item=>item.id === course.id
        );


        if(exist){


            setSelectedKRS(
                selectedKRS.filter(
                    item=>item.id !== course.id
                )
            );


        }else{


            setSelectedKRS([
                ...selectedKRS,
                course
            ]);


        }

    };





    const submitKRS = ()=>{


        const newCourse =
        selectedKRS.filter(

            course =>

            !kelas.some(
                item=>item.id === course.id
            )

        );



        setKelas([

            ...kelas,

            ...newCourse

        ]);



        setSelectedKRS([]);

        setShowModal(false);


    };





    return (

        <div className="
            flex min-h-screen
            bg-slate-100
        ">


            <Sidebar />



            <main className="
                flex-1
                ml-72
                p-10
            ">


                {/* HEADER */}

                <div className="
                    flex
                    justify-between
                    items-center
                ">


                    <div>




                        <h1 className="
                            text-4xl
                            font-bold
                            mt-3
                            text-slate-800
                        ">
                            Kelas Saya
                        </h1>



                        <p className="
                            mt-2
                            text-slate-500
                        ">
                            Daftar mata kuliah yang Anda ikuti.
                        </p>


                    </div>





                    <select
                        className="
                            rounded-xl
                            border
                            bg-white
                            px-4
                            py-3
                        "
                    >

                        <option>
                            Semester Ganjil 2026
                        </option>


                        <option>
                            Semester Genap 2026
                        </option>

                    </select>


                </div>






                {/* CARD KELAS */}


                <div className="
                    mt-8
                    grid
                    grid-cols-3
                    gap-6
                ">



                {
                    kelas.map(item=>(


                    <div

                    key={item.id}

                    className="
                        bg-white
                        rounded-2xl
                        border
                        shadow-sm
                        overflow-hidden
                    "

                    >



                        <div className="
                            h-24
                            bg-gradient-to-r
                            from-emerald-500
                            to-emerald-300
                            relative
                        ">


                            <span
                            className="
                                absolute
                                right-4
                                top-4
                                bg-white
                                rounded-full
                                px-3
                                py-1
                                text-xs
                            "
                            >

                                ● {item.status}

                            </span>


                        </div>





                        <div className="p-5">


                            <div
                            className="
                                mt-0.3
                                mb-4
                                w-14
                                h-14
                                rounded-xl
                                bg-emerald-700
                                text-white
                                flex
                                items-center
                                justify-center
                            "
                            >

                                <BookOpen/>

                            </div>





                            <h2 className="
                                text-lg
                                font-bold
                            ">
                                {item.nama}
                            </h2>



                            <p className="
                                text-emerald-600
                                font-semibold
                                mt-1
                            ">
                                {item.kode} • {item.sks} SKS
                            </p>





                            <div className="
                                mt-4
                                space-y-2
                                text-sm
                                text-slate-600
                            ">


                                <p className="flex gap-2">
                                    <User size={16}/>
                                    {item.dosen}
                                </p>



                                <p className="flex gap-2">
                                    <Calendar size={16}/>
                                    {item.jadwal}
                                </p>



                                <p className="flex gap-2">
                                    <MapPin size={16}/>
                                    {item.ruangan}
                                </p>


                            </div>






                            <div className="mt-5">


                                <div className="
                                    flex
                                    justify-between
                                    text-sm
                                ">

                                    <span>
                                        Progress
                                    </span>


                                    <b className="
                                        text-emerald-600
                                    ">
                                        {item.progress}%
                                    </b>

                                </div>



                                <div className="
                                    mt-2
                                    h-2
                                    bg-slate-200
                                    rounded-full
                                ">


                                    <div

                                    className="
                                        h-2
                                        bg-emerald-600
                                        rounded-full
                                    "

                                    style={{
                                        width:`${item.progress}%`
                                    }}

                                    />

                                </div>


                            </div>







                            <button

                            onClick={()=>navigate(
                                `/mahasiswa/kelas/${item.id}`
                            )}

                            className="
                                mt-5
                                w-full
                                bg-emerald-700
                                text-white
                                py-2.5
                                rounded-xl
                                hover:bg-emerald-800
                            "

                            >

                                Lihat Detail

                            </button>



                        </div>


                    </div>


                    ))
                }






                {/* TAMBAH KRS */}



                <div

                onClick={()=>setShowModal(true)}

                className="
                    cursor-pointer
                    border-2
                    border-dashed
                    border-slate-300
                    rounded-2xl
                    bg-white
                    flex
                    flex-col
                    justify-center
                    items-center
                    min-h-[380px]
                    hover:bg-emerald-50
                    hover:border-emerald-500
                "

                >


                    <div className="
                        w-16
                        h-16
                        rounded-full
                        bg-slate-100
                        flex
                        items-center
                        justify-center
                        text-emerald-600
                    ">

                        <Plus size={35}/>

                    </div>



                    <h2 className="
                        mt-5
                        text-xl
                        font-bold
                    ">
                        Tambah KRS
                    </h2>



                    <p className="
                        text-sm
                        text-slate-500
                        mt-2
                    ">
                        Tambahkan mata kuliah
                    </p>


                </div>




                </div>








                {/* MODAL KRS */}


                {
                showModal && (


                <div className="
                    fixed
                    inset-0
                    bg-black/40
                    flex
                    items-center
                    justify-center
                    z-50
                ">


                    <div className="
                        bg-white
                        rounded-2xl
                        w-[600px]
                        p-7
                    ">


                        <div className="
                            flex
                            justify-between
                        ">


                            <h2 className="
                                text-2xl
                                font-bold
                            ">
                                Tambah KRS
                            </h2>


                            <button
                            onClick={()=>setShowModal(false)}
                            >

                                <X/>

                            </button>


                        </div>




                        <div className="
                            mt-5
                            space-y-3
                        ">


                        {
                            availableCourses.map(course=>(


                            <div

                            key={course.id}

                            className="
                                border
                                rounded-xl
                                p-4
                                flex
                                justify-between
                            "

                            >


                                <div>

                                    <h3 className="
                                        font-bold
                                    ">
                                        {course.nama}
                                    </h3>


                                    <p className="
                                        text-sm
                                        text-slate-500
                                    ">
                                        {course.kode}
                                        {" • "}
                                        {course.sks} SKS
                                    </p>


                                </div>




                                <input

                                type="checkbox"

                                checked={
                                    selectedKRS.some(
                                        item=>item.id===course.id
                                    )
                                }

                                onChange={()=>
                                    toggleCourse(course)
                                }

                                />



                            </div>


                            ))
                        }


                        </div>





                        <button

                        onClick={submitKRS}

                        className="
                            mt-6
                            w-full
                            bg-emerald-600
                            text-white
                            py-3
                            rounded-xl
                        "

                        >

                            Ambil KRS

                        </button>



                    </div>


                </div>


                )
                }





            </main>


        </div>

    );

}