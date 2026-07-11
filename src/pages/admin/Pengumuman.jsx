import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import { Bell, Plus, Pencil, Trash2 } from "lucide-react";

export default function Pengumuman() {
  const [pengumuman] = useState([
    {
      id: 1,
      judul: "Jadwal Ujian Akhir Semester",
      isi: "Ujian akhir semester dilaksanakan mulai tanggal 20 Juli 2026.",
      pembuat: "Admin EduOnline",
      tanggal: "11 Juli 2026",
      status: "Aktif",
    },
    {
      id: 2,
      judul: "Maintenance Sistem LMS",
      isi: "Sistem LMS akan mengalami maintenance pada malam hari.",
      pembuat: "Admin EduOnline",
      tanggal: "10 Juli 2026",
      status: "Aktif",
    },
    {
      id: 3,
      judul: "Pendaftaran Kelas Baru",
      isi: "Mahasiswa dapat melakukan pendaftaran kelas semester baru.",
      pembuat: "Admin EduOnline",
      tanggal: "05 Juli 2026",
      status: "Aktif",
    },
  ]);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Admin */}
      <Sidebar />

      {/* Content */}
      <main className="flex-1 ml-72 p-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Pengumuman</h1>
            <p className="text-slate-500 mt-1">
              Kelola informasi dan pemberitahuan untuk pengguna EduOnline
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
            <Plus size={18} />
            Tambah Pengumuman
          </button>
        </div>

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
                <th className="px-6 py-4 text-left">Judul</th>
                <th className="px-6 py-4 text-left">Isi</th>
                <th className="px-6 py-4 text-left">Pembuat</th>
                <th className="px-6 py-4 text-left">Tanggal</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {pengumuman.map((item) => (
                <tr key={item.id} className="border-t hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
                        <Bell size={18} />
                      </div>
                      <span className="font-medium">{item.judul}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-slate-600 max-w-md">
                    {item.isi}
                  </td>

                  <td className="px-6 py-4 text-slate-600">{item.pembuat}</td>

                  <td className="px-6 py-4 text-slate-600">{item.tanggal}</td>

                  <td className="px-6 py-4">
                    <span
                      className="
                      rounded-full
                      bg-emerald-100
                      px-3 py-1
                      text-sm
                      text-emerald-700
                      "
                    >
                      {item.status}
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
                        hover:bg-blue-600
                        "
                      >
                        <Pencil size={15} />
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
                        hover:bg-red-600
                        "
                      >
                        <Trash2 size={15} />
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}