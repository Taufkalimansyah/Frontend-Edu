import Sidebar from "../../components/dosen/Sidebar";

export default function Penilaian(){

    return(
        <div className="flex">

            <Sidebar/>

            <main className="ml-72 flex-1 p-10">

                <table className="w-full bg-white rounded-2xl">

                    <thead>
                        <tr>
                            <th>Mahasiswa</th>
                            <th>Tugas</th>
                            <th>File</th>
                            <th>Nilai</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>Randy</td>
                            <td>Tugas 1</td>
                            <td>download.pdf</td>

                            <td>
                                <input
                                    className="border p-2 rounded"
                                    type="number"
                                />
                            </td>

                            <td>
                                <textarea
                                    className="border p-2 rounded"
                                />
                            </td>

                        </tr>

                    </tbody>

                </table>

            </main>

        </div>
    )
}