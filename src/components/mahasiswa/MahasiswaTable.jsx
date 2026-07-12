import MahasiswaTableRow from "./MahasiswaTableRow";

export default function MahasiswaTable({ data, loading, onEdit, onDelete }) {
    if (loading) {
        return (
            <div className="rounded-2xl bg-white border shadow-sm p-10 text-center text-slate-500">
                Memuat data mahasiswa...
            </div>
        );
    }

    if (!data.length) {
        return (
            <div className="rounded-2xl bg-white border shadow-sm p-10 text-center text-slate-500">
                Belum ada data mahasiswa.
            </div>
        );
    }

    return (
        <div
            className="
            rounded-2xl
            bg-white
            border
            shadow-sm
            overflow-hidden
            "
        >
            <table className="w-full">
                <thead className="bg-emerald-50">
                    <tr>
                        <th className="px-6 py-4 text-left">Nama</th>
                        <th className="px-6 py-4 text-left">Email</th>
                        <th className="px-6 py-4 text-left">NIM</th>
                        <th className="px-6 py-4 text-left">Jurusan</th>
                        <th className="px-6 py-4 text-left">Status</th>
                        <th className="px-6 py-4 text-center">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((mhs) => (
                        <MahasiswaTableRow
                            key={mhs.id}
                            mhs={mhs}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}