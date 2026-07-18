import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/dosen/Sidebar";
import { createClass } from "../../services/api";

export default function TambahKelas() {
    const navigate = useNavigate();
    const [nama, setNama] = useState("");
    const [kode, setKode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setError("");

        // Validasi
        if (!nama.trim()) {
            setError("Nama kelas harus diisi");
            return;
        }

        if (!kode.trim()) {
            setError("Kode kelas harus diisi");
            return;
        }

        setLoading(true);

        try {
            console.log("Mengirim data:", { nama: nama.trim(), kode: kode.trim() });

            const response = await createClass({
                nama: nama.trim(),
                kode: kode.trim()
            });

            console.log("Response dari server:", response);

            // Cek apakah response berhasil
            if (response.status === 200 || response.status === 201) {
                // Simpan data kelas yang baru dibuat ke localStorage untuk sementara
                // (opsional, jika ingin menampilkan notifikasi di halaman Kelas Saya)
                const newClass = response.data.data || response.data;
                localStorage.setItem('new_class_added', JSON.stringify({
                    id: newClass.id,
                    nama: newClass.nama,
                    kode: newClass.kode,
                    created_at: new Date().toISOString()
                }));

                alert("✨ Kelas berhasil dibuat!");
                
                // Reset form
                setNama("");
                setKode("");
                
                // Navigasi ke halaman kelas saya dengan state
                navigate("/dosen/kelas-saya", { 
                    state: { 
                        newClass: newClass,
                        message: "Kelas baru berhasil ditambahkan!" 
                    }
                });
            } else {
                throw new Error("Gagal membuat kelas");
            }
            
        } catch (error) {
            console.error("Error detail:", error);
            
            // Handle error
            if (error.response) {
                const status = error.response.status;
                const data = error.response.data;
                
                let errorMessage = "Terjadi kesalahan pada server";
                
                if (status === 422 && data.errors) {
                    const errors = Object.values(data.errors).flat();
                    errorMessage = errors.join("\n");
                } else if (status === 401) {
                    errorMessage = "Sesi Anda telah berakhir. Silakan login kembali.";
                } else if (status === 403) {
                    errorMessage = "Anda tidak memiliki izin untuk membuat kelas";
                } else if (status === 409) {
                    errorMessage = "Kode kelas sudah digunakan. Gunakan kode yang berbeda.";
                } else if (data?.message) {
                    errorMessage = data.message;
                }
                
                setError(errorMessage);
                alert(`❌ Gagal membuat kelas:\n${errorMessage}`);
            } else if (error.request) {
                setError("Server tidak merespon. Periksa koneksi internet Anda.");
                alert("❌ Gagal membuat kelas: Server tidak merespon");
            } else {
                setError(error.message || "Terjadi kesalahan yang tidak diketahui");
                alert(`❌ Gagal membuat kelas: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
            <Sidebar />
            
            <main className="ml-72 flex-1 p-8 md:p-10">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-100 rounded-xl">
                            <span className="text-emerald-600 text-2xl">📚</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                            Tambah Kelas
                        </h1>
                    </div>
                    <p className="text-slate-500 ml-14">
                        Buat kelas baru untuk memulai pembelajaran
                    </p>
                </div>

                {/* Form Card */}
                <div className="max-w-3xl">
                    <form
                        onSubmit={submit}
                        className="
                            bg-white rounded-3xl shadow-xl shadow-slate-200/50
                            p-8 md:p-10
                            border border-slate-100
                            transition-all duration-300
                            hover:shadow-2xl hover:shadow-slate-200/60
                        "
                    >
                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600">
                                <div className="flex items-start gap-3">
                                    <span className="text-xl">⚠️</span>
                                    <div>
                                        <p className="font-semibold">Error:</p>
                                        <p className="whitespace-pre-line">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Form Fields */}
                        <div className="space-y-6">
                            {/* Nama Kelas */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    <span className="text-emerald-500">📖</span>
                                    Nama Kelas
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Pemrograman Web Dasar"
                                    value={nama}
                                    onChange={(e) => {
                                        setNama(e.target.value);
                                        setError("");
                                    }}
                                    className={`
                                        w-full border-2 rounded-2xl
                                        px-5 py-4
                                        text-slate-700 placeholder:text-slate-400
                                        focus:outline-none focus:ring-4
                                        transition-all duration-200
                                        bg-slate-50/50
                                        ${error && !nama.trim() 
                                            ? 'border-red-500 focus:ring-red-100' 
                                            : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100'
                                        }
                                    `}
                                    required
                                />
                            </div>

                            {/* Kode Kelas */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    <span className="text-emerald-500">#️⃣</span>
                                    Kode Kelas
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Contoh: PW-2024-A"
                                    value={kode}
                                    onChange={(e) => {
                                        setKode(e.target.value);
                                        setError("");
                                    }}
                                    className={`
                                        w-full border-2 rounded-2xl
                                        px-5 py-4
                                        text-slate-700 placeholder:text-slate-400
                                        focus:outline-none focus:ring-4
                                        transition-all duration-200
                                        bg-slate-50/50
                                        ${error && !kode.trim() 
                                            ? 'border-red-500 focus:ring-red-100' 
                                            : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100'
                                        }
                                    `}
                                    required
                                />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="my-8 border-t border-slate-200"></div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="
                                    flex-1 flex items-center justify-center gap-2
                                    bg-emerald-600 hover:bg-emerald-700
                                    text-white font-semibold
                                    px-8 py-4 rounded-2xl
                                    transition-all duration-200
                                    hover:shadow-lg hover:shadow-emerald-200
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                    group
                                "
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Menyimpan...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-xl group-hover:scale-110 transition-transform">💾</span>
                                        <span>Simpan Kelas</span>
                                    </>
                                )}
                            </button>
                            
                            <button
                                type="button"
                                onClick={() => navigate("/dosen/kelas-saya")}
                                className="
                                    flex-1 flex items-center justify-center gap-2
                                    bg-slate-100 hover:bg-slate-200
                                    text-slate-700 font-semibold
                                    px-8 py-4 rounded-2xl
                                    transition-all duration-200
                                    hover:shadow-lg hover:shadow-slate-200
                                "
                            >
                                <span className="text-xl">✖</span>
                                <span>Batal</span>
                            </button>
                        </div>
                    </form>

                    {/* Info Card */}
                    <div className="mt-6 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                        <p className="text-sm text-slate-600 flex items-start gap-3">
                            <span className="text-emerald-500 text-lg">💡</span>
                            <span>
                                <strong className="text-slate-800">Tips:</strong> 
                                Gunakan kode kelas yang mudah diingat dan unik. 
                                Contoh: mata-kuliah-tahun-rombel
                            </span>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}