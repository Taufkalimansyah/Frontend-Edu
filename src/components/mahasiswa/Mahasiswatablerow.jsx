import { Pencil, Trash2 } from "lucide-react";

export default function MahasiswaTableRow({ mhs, onEdit, onDelete }) {
    return (
        <tr className="border-t hover:bg-slate-50">
            <td className="px-6 py-4 font-medium">{mhs.name}</td>

            <td className="px-6 py-4 text-slate-600">{mhs.email}</td>

            <td className="px-6 py-4 text-slate-600">{mhs.nim ?? "-"}</td>

            <td className="px-6 py-4 text-slate-600">{mhs.bidang ?? "-"}</td>

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
                    {mhs.email_verified_at ? "Aktif" : "Belum Verifikasi"}
                </span>
            </td>

            <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                    <button
                        onClick={() => onEdit(mhs)}
                        className="
                        flex items-center gap-1
                        rounded-lg
                        bg-blue-500
                        px-3 py-2
                        text-white
                        text-sm
                        "
                    >
                        <Pencil size={15} />
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(mhs)}
                        className="
                        flex items-center gap-1
                        rounded-lg
                        bg-red-500
                        px-3 py-2
                        text-white
                        text-sm
                        "
                    >
                        <Trash2 size={15} />
                        Hapus
                    </button>
                </div>
            </td>
        </tr>
    );
}