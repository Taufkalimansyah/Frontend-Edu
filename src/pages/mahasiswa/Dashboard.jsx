import Sidebar from "../../components/mahasiswa/Sidebar";

import {
    BookOpen,
    CalendarDays,
    ClipboardList,
    ChevronRight
} from "lucide-react";

export default function Dashboard() {

    const tugas = [
        {
            nama: "Pemrograman Web",
            deadline: "Deadline: Besok",
            color: "text-red-500"
        },
        {
            nama: "Basis Data",
            deadline: "3 Hari Lagi",
            color: "text-slate-500"
        },
        {
            nama: "Komputasi Awan",
            deadline: "1 Minggu Lagi",
            color: "text-slate-500"
        }
    ];

    const progress = [
        {
            nama: "Struktur Data",
            progress: 75
        },
        {
            nama: "Basis Data",
            progress: 45
        },
        {
            nama: "Jaringan Komputer",
            progress: 90
        }
    ];

    const nilai = [
        {
            nama: "Quiz 2: BD",
            waktu: "Kemarin",
            nilai: 95
        },
        {
            nama: "Tugas 1: SD",
            waktu: "3 Hari lalu",
            nilai: 88
        }
    ];

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <main className="flex-1 ml-72 p-8">

                {/* Header */}

                <div className="grid grid-cols-4 gap-5">

                    {/* Welcome */}

                    <div className="
                        col-span-3
                        rounded-3xl
                        bg-gradient-to-r
                        from-emerald-700
                        to-emerald-500
                        p-8
                        text-white
                    ">
                        <h1 className="text-5xl font-bold">
                            Selamat Datang!
                        </h1>

                        <p className="mt-5 text-xl text-emerald-100">
                            Kamu sudah menyelesaikan 75% dari kurikulum semester ini.
                        </p>

                        <p className="text-xl text-emerald-100">
                            Terus semangat mengejar cita-citamu!
                        </p>
                    </div>

                    {/* IPK */}

                    <div className="
                        rounded-3xl
                        bg-white
                        p-8
                        shadow-sm
                        flex
                        flex-col
                        items-center
                        justify-center
                    ">
                        <p className="
                            text-center
                            text-xs
                            tracking-[3px]
                            text-slate-500
                            font-semibold
                        ">
                            INDEKS PRESTASI KUMULATIF
                        </p>

                        <div className="
                            mt-5
                            h-40
                            w-40
                            rounded-full
                            border-[10px]
                            border-emerald-700
                            flex
                            items-center
                            justify-center
                        ">
                            <div className="text-center">
                                <h2 className="text-5xl font-bold">
                                    3.85
                                </h2>

                                <p className="
                                    text-sm
                                    font-semibold
                                    text-emerald-600
                                ">
                                    Excellent
                                </p>
                            </div>
                        </div>

                        <p className="mt-5 text-sm text-slate-500">
                            Naik 0.15 poin dari semester lalu
                        </p>
                    </div>

                </div>

                {/* Content */}

                <div className="grid grid-cols-12 gap-5 mt-6">

                    {/* Tugas */}

                    <div className="
                        col-span-4
                        rounded-3xl
                        bg-white
                        p-6
                        shadow-sm
                    ">

                        <div className="
                            flex
                            justify-between
                            items-center
                            mb-5
                        ">
                            <h2 className="text-2xl font-bold">
                                Tugas Mendatang
                            </h2>

                            <ClipboardList className="text-emerald-600"/>
                        </div>

                        <div className="space-y-4">

                            {
                                tugas.map((item,index)=>(
                                    <div
                                        key={index}
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            rounded-2xl
                                            border
                                            p-4
                                            hover:bg-slate-50
                                            transition
                                        "
                                    >

                                        <div className="flex gap-4">

                                            <div className="
                                                h-12
                                                w-12
                                                rounded-xl
                                                bg-emerald-100
                                                flex
                                                items-center
                                                justify-center
                                            ">
                                                <BookOpen className="text-emerald-600"/>
                                            </div>

                                            <div>
                                                <h3 className="font-bold">
                                                    {item.nama}
                                                </h3>

                                                <p className={item.color}>
                                                    {item.deadline}
                                                </p>
                                            </div>

                                        </div>

                                        <ChevronRight/>
                                    </div>
                                ))
                            }

                        </div>

                    </div>

                    {/* Progress */}

                    <div className="
                        col-span-5
                        rounded-3xl
                        bg-white
                        p-6
                        shadow-sm
                    ">

                        <div className="
                            flex justify-between
                            items-center
                        ">
                            <h2 className="text-2xl font-bold">
                                Progress Matakuliah
                            </h2>

                            <button className="
                                text-emerald-600
                                font-semibold
                            ">
                                Lihat Semua
                            </button>
                        </div>

                        <div className="mt-8 space-y-6">

                            {
                                progress.map((item,index)=>(
                                    <div key={index}>

                                        <div className="
                                            flex
                                            justify-between
                                            mb-2
                                        ">
                                            <span className="font-semibold">
                                                {item.nama}
                                            </span>

                                            <span className="
                                                text-emerald-600
                                                font-bold
                                            ">
                                                {item.progress}%
                                            </span>
                                        </div>

                                        <div className="
                                            h-3
                                            rounded-full
                                            bg-slate-200
                                        ">
                                            <div
                                                className="
                                                    h-3
                                                    rounded-full
                                                    bg-emerald-600
                                                "
                                                style={{
                                                    width:`${item.progress}%`
                                                }}
                                            />
                                        </div>

                                    </div>
                                ))
                            }

                        </div>

                        <div className="
                            mt-10
                            grid
                            grid-cols-2
                            gap-4
                        ">

                            <div className="
                                rounded-2xl
                                bg-slate-100
                                p-5
                                text-center
                            ">
                                <h3 className="
                                    text-4xl
                                    font-bold
                                ">
                                    12
                                </h3>

                                <p className="text-slate-500">
                                    Kredit Diambil
                                </p>
                            </div>

                            <div className="
                                rounded-2xl
                                bg-slate-100
                                p-5
                                text-center
                            ">
                                <h3 className="
                                    text-4xl
                                    font-bold
                                ">
                                    4
                                </h3>

                                <p className="text-slate-500">
                                    Mata Kuliah
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Right Side */}

                    <div className="col-span-3 space-y-5">

                        {/* Kalender */}

                        <div className="
                            rounded-3xl
                            bg-white
                            p-6
                            shadow-sm
                        ">
                            <h2 className="
                                text-2xl
                                font-bold
                                mb-4
                            ">
                                Kalender
                            </h2>

                            <div className="
                                flex
                                justify-between
                                text-sm
                                text-slate-500
                            ">
                                <span>S</span>
                                <span>M</span>
                                <span>T</span>
                                <span>W</span>
                                <span>T</span>
                                <span>F</span>
                                <span>S</span>
                            </div>

                            <div className="
                                mt-5
                                grid
                                grid-cols-7
                                gap-2
                                text-center
                            ">
                                {
                                    [28,29,30,1,2,3,4].map(
                                        (d)=>(
                                            <div key={d}>
                                                {d}
                                            </div>
                                        )
                                    )
                                }

                                {
                                    [5,6,7,8,9,10,11].map(
                                        (d)=>(
                                            <div
                                                key={d}
                                                className={
                                                    d===8
                                                    ? "bg-emerald-600 text-white rounded-full h-8 w-8 flex items-center justify-center mx-auto"
                                                    : ""
                                                }
                                            >
                                                {d}
                                            </div>
                                        )
                                    )
                                }
                            </div>

                            <div className="
                                mt-5
                                text-sm
                                space-y-2
                            ">
                                <p>
                                    🔴 UTS Ganjil
                                </p>

                                <p>
                                    🟢 Libur Nasional
                                </p>
                            </div>

                        </div>

                        {/* Nilai */}

                        <div className="
                            rounded-3xl
                            bg-white
                            p-6
                            shadow-sm
                        ">
                            <h2 className="
                                text-2xl
                                font-bold
                                mb-4
                            ">
                                Nilai Terakhir
                            </h2>

                            <div className="space-y-4">

                                {
                                    nilai.map((item,index)=>(
                                        <div
                                            key={index}
                                            className="
                                                flex
                                                justify-between
                                                items-center
                                            "
                                        >
                                            <div>
                                                <h3 className="font-semibold">
                                                    {item.nama}
                                                </h3>

                                                <p className="text-sm text-slate-500">
                                                    {item.waktu}
                                                </p>
                                            </div>

                                            <div className="
                                                rounded-xl
                                                bg-emerald-100
                                                px-4 py-2
                                                font-bold
                                                text-emerald-700
                                            ">
                                                {item.nilai}
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}