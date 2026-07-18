import { Pencil, Trash2, Mail, User, BookOpen, GraduationCap } from "lucide-react";

export default function MahasiswaTableRow({ mhs, onEdit, onDelete }) {
    return (
        <tr className="group hover:bg-emerald-50/50 transition-colors duration-200">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-emerald-200 group-hover:scale-110 transition-transform duration-300">
                        {mhs.name?.charAt(0) || '?'}
                    </div>
                    <div>
                        <p className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors duration-200">
                            {mhs.name}
                        </p>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                            <User size={10} />
                            {mhs.role || 'Mahasiswa'}
                        </p>
                    </div>
                </div>
            </td>

            <td className="px-6 py-4">
                <div className="flex items-center gap-1.5 text-slate-600">
                    <Mail size={14} className="text-slate-400" />
                    <span className="text-sm">{mhs.email}</span>
                </div>
            </td>

            <td className="px-6 py-4">
                <span className={`
                    inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                    ${mhs.role === 'dosen' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-emerald-100 text-emerald-700'
                    }
                `}>
                    <span className={`w-1.5 h-1.5 rounded-full ${mhs.role === 'dosen' ? 'bg-purple-500' : 'bg-emerald-500'}`}></span>
                    {mhs.role || 'Mahasiswa'}
                </span>
            </td>

            <td className="px-6 py-4">
                <div className="flex items-center gap-1.5 text-slate-600">
                    <BookOpen size={14} className="text-slate-400" />
                    <span className="text-sm font-mono">{mhs.nim ?? "-"}</span>
                </div>
            </td>

            <td className="px-6 py-4">
                <div className="flex items-center gap-1.5 text-slate-600">
                    <GraduationCap size={14} className="text-slate-400" />
                    <span className="text-sm">{mhs.bidang ?? "-"}</span>
                </div>
            </td>

            <td className="px-6 py-4">
                <span className={`
                    inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                    ${mhs.email_verified_at 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-amber-100 text-amber-700'
                    }
                `}>
                    <span className={`w-1.5 h-1.5 rounded-full ${mhs.email_verified_at ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                    {mhs.email_verified_at ? "Aktif" : "Belum Verifikasi"}
                </span>
            </td>

            <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                    <button
                        onClick={() => onEdit(mhs)}
                        className="group/btn relative px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 text-white text-xs font-medium shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5"
                    >
                        <Pencil size={14} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                        Edit
                        <span className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></span>
                    </button>
                    <button
                        onClick={() => onDelete(mhs)}
                        className="group/btn relative px-3 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-400 text-white text-xs font-medium shadow-md shadow-red-200 hover:shadow-lg hover:shadow-red-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5"
                    >
                        <Trash2 size={14} className="group-hover/btn:scale-110 transition-transform duration-300" />
                        Hapus
                        <span className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></span>
                    </button>
                </div>
            </td>
        </tr>
    );
}