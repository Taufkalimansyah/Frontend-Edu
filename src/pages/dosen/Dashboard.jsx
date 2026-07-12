import Sidebar from "../../components/dosen/Sidebar";

export default function Dashboard() {

    return (
        <div className="flex bg-slate-100 min-h-screen">

            <Sidebar/>

            <main className="ml-72 flex-1 p-10">

                <h1 className="text-4xl font-bold">
                    Dashboard Dosen
                </h1>

                <div className="
                    mt-10
                    grid grid-cols-4 gap-6
                ">

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h3>Total Kelas</h3>
                        <p className="text-5xl font-bold text-emerald-600 mt-3">
                            4
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h3>Total Mahasiswa</h3>
                        <p className="text-5xl font-bold text-blue-600 mt-3">
                            126
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h3>Tugas Aktif</h3>
                        <p className="text-5xl font-bold text-orange-500 mt-3">
                            8
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h3>Materi Upload</h3>
                        <p className="text-5xl font-bold text-purple-600 mt-3">
                            32
                        </p>
                    </div>

                </div>

            </main>

        </div>
    );
}