import Sidebar from "../../components/mahasiswa/Sidebar";

import {
    Download,
    Printer,
    BarChart3,
    GraduationCap
} from "lucide-react";

export default function Nilai() {

    const nilai = [
        {
            id: 1,
            matkul: "Algoritma & Struktur Data",
            kode: "CS201",
            sks: 3,
            tugas: 90,
            uts: 85,
            uas: 88,
            grade: "A",
            feedback:
                "Kerja bagus pada struktur data, pemahaman graf sangat kuat."
        },
        {
            id: 2,
            matkul: "Pemrograman Web Lanjut",
            kode: "CS305",
            sks: 4,
            tugas: 95,
            uts: 92,
            uas: 94,
            grade: "A",
            feedback:
                "Improvisasi UI/UX pada proyek akhir sangat mengesankan."
        },
        {
            id: 3,
            matkul: "Basis Data II",
            kode: "CS204",
            sks: 3,
            tugas: 82,
            uts: 78,
            uas: 80,
            grade: "B+",
            feedback:
                "Optimasi query SQL bisa ditingkatkan lagi."
        },
        {
            id: 4,
            matkul: "Kecerdasan Buatan",
            kode: "CS402",
            sks: 3,
            tugas: 88,
            uts: 90,
            uas: 86,
            grade: "A-",
            feedback:
                "Analisis model neural network cukup mendalam."
        },
        {
            id: 5,
            matkul: "Jaringan Komputer",
            kode: "CS206",
            sks: 3,
            tugas: 75,
            uts: 82,
            uas: 78,
            grade: "B",
            feedback:
                "Pelajari lebih lanjut tentang protokol keamanan jaringan."
        }
    ];

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <main className="flex-1 ml-72 p-8">

                {/* HEADER */}

                <div className="flex justify-between items-start">

                    <div>

                        <h1 className="text-2xl font-bold text-slate-900">
                            Laporan Nilai
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Semester Ganjil 2023/2024 • Kartu Hasil Studi
                        </p>

                    </div>

                    <div className="flex gap-3">

                        <button className="
                            flex items-center gap-2
                            rounded-xl border
                            bg-white
                            px-4 py-2.5
                            text-sm
                            shadow-sm
                        ">
                            <Download size={16}/>
                            Download PDF
                        </button>

                        <button className="
                            flex items-center gap-2
                            rounded-xl
                            bg-emerald-700
                            px-4 py-2.5
                            text-sm
                            text-white
                            shadow-sm
                        ">
                            <Printer size={16}/>
                            Print KHS
                        </button>

                    </div>

                </div>

                {/* SUMMARY CARD */}

                <div className="
                    mt-6
                    grid
                    grid-cols-3
                    gap-5
                ">

                    {/* IPK */}

                    <div className="
                        rounded-2xl
                        bg-slate-900
                        p-6
                        text-white
                    ">
                        <p className="
                            text-xs
                            uppercase
                            tracking-widest
                            text-slate-400
                        ">
                            IPK Kumulatif
                        </p>

                        <h2 className="
                            mt-2
                            text-3xl
                            font-bold
                        ">
                            3.85
                        </h2>

                        <p className="
                            mt-2
                            text-emerald-400
                            text-sm
                        ">
                            +0.12 dari semester lalu
                        </p>
                    </div>

                    {/* IPS */}

                    <div className="
                        rounded-2xl
                        bg-white
                        border
                        p-6
                        flex
                        justify-between
                    ">
                        <div>

                            <p className="
                                text-xs
                                uppercase
                                tracking-widest
                                text-slate-500
                            ">
                                IPS Semester Ini
                            </p>

                            <h2 className="
                                mt-2
                                text-3xl
                                font-bold
                            ">
                                3.78
                            </h2>

                            <div className="
                                mt-3
                                flex items-center gap-2
                            ">
                                <div className="
                                    h-2
                                    w-24
                                    rounded-full
                                    bg-slate-200
                                ">
                                    <div className="
                                        h-2
                                        w-[80%]
                                        rounded-full
                                        bg-emerald-600
                                    "/>
                                </div>

                                <span className="
                                    text-xs
                                    text-emerald-700
                                    font-semibold
                                ">
                                    Top 5%
                                </span>
                            </div>

                        </div>

                        <div className="
                            h-12 w-12
                            rounded-full
                            bg-emerald-100
                            flex items-center
                            justify-center
                        ">
                            <BarChart3
                                size={22}
                                className="text-emerald-700"
                            />
                        </div>

                    </div>

                    {/* SKS */}

                    <div className="
                        rounded-2xl
                        bg-white
                        border
                        p-6
                        flex
                        justify-between
                    ">
                        <div>

                            <p className="
                                text-xs
                                uppercase
                                tracking-widest
                                text-slate-500
                            ">
                                Total SKS
                            </p>

                            <h2 className="
                                mt-2
                                text-2xl
                                font-bold
                            ">
                                124
                                <span className="
                                    text-lg
                                    text-slate-400
                                ">
                                    /144
                                </span>
                            </h2>

                            <p className="
                                mt-2
                                text-sm
                                text-slate-500
                            ">
                                20 SKS remaining for graduation
                            </p>

                        </div>

                        <div className="
                            h-12 w-12
                            rounded-full
                            bg-slate-100
                            flex items-center
                            justify-center
                        ">
                            <GraduationCap
                                size={22}
                                className="text-emerald-700"
                            />
                        </div>

                    </div>

                </div>

                {/* TABLE */}

                <div className="
                    mt-6
                    rounded-2xl
                    bg-white
                    border
                    overflow-hidden
                ">

                    <div className="
                        flex justify-between
                        items-center
                        p-6
                    ">
                        <h2 className="
                            text-lg
                            font-bold
                        ">
                            Detail Mata Kuliah
                        </h2>

                        <div className="flex gap-2">

                            <span className="
                                rounded-full
                                bg-emerald-100
                                px-3 py-1.5
                                text-xs
                                text-emerald-700
                            ">
                                Passed: 6
                            </span>

                            <span className="
                                rounded-full
                                bg-slate-100
                                px-3 py-1.5
                                text-xs
                            ">
                                Total: 7
                            </span>

                        </div>
                    </div>

                    <table className="w-full text-sm">

                        <thead className="
                            bg-slate-900
                            text-white
                            text-xs
                        ">
                            <tr>
                                <th className="py-3">MATA KULIAH</th>
                                <th>TUGAS</th>
                                <th>UTS</th>
                                <th>UAS</th>
                                <th>NILAI AKHIR</th>
                                <th>FEEDBACK</th>
                            </tr>
                        </thead>

                        <tbody>

                            {
                                nilai.map((item)=>(
                                    <tr
                                        key={item.id}
                                        className="
                                            border-b
                                            hover:bg-slate-50
                                        "
                                    >
                                        <td className="p-4">

                                            <div className="
                                                flex gap-3
                                            ">
                                                <div className="
                                                    w-1.5
                                                    rounded-full
                                                    bg-emerald-700
                                                "/>

                                                <div>
                                                    <h3 className="
                                                        text-sm
                                                        font-bold
                                                    ">
                                                        {item.matkul}
                                                    </h3>

                                                    <p className="
                                                        text-xs
                                                        text-slate-500
                                                    ">
                                                        {item.kode} • {item.sks} SKS
                                                    </p>
                                                </div>
                                            </div>

                                        </td>

                                        <td className="text-center">{item.tugas}</td>
                                        <td className="text-center">{item.uts}</td>
                                        <td className="text-center">{item.uas}</td>

                                        <td className="text-center">
                                            <span className="
                                                rounded-lg
                                                bg-emerald-100
                                                px-3 py-1
                                                text-xs
                                                font-bold
                                                text-emerald-700
                                            ">
                                                {item.grade}
                                            </span>
                                        </td>

                                        <td className="
                                            max-w-xs
                                            px-4 py-3
                                            text-xs
                                            text-slate-600
                                        ">
                                            "{item.feedback}"
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </main>

        </div>
    );
}