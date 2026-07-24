import { useState, useRef } from "react";
import { UploadCloud, Send, FileCheck, AlertCircle, File } from "lucide-react";

export default function PengumpulanPanel({ onSubmit, isSubmitting, isLewatDeadline }) {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef(null);

    const handleFileSelect = (selectedFile) => {
        if (selectedFile) {
            if (selectedFile.size > 25 * 1024 * 1024) {
                alert("Ukuran file terlalu besar. Maksimal 25MB.");
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileSelect(e.dataTransfer.files[0]);
    };

    const handleSubmit = () => {
        if (!file) return;
        onSubmit(file);
    };

    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 h-fit sticky top-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-200">
                    <UploadCloud className="text-white" size={18} />
                </div>
                <div>
                    <h2 className="font-bold text-lg text-slate-800">Pengumpulan</h2>
                    <p className="text-xs text-slate-400">Upload file tugas Anda</p>
                </div>
            </div>

            {/* Peringatan Deadline — tetap bisa submit, cuma diberi tahu */}
            {isLewatDeadline && (
                <div className="mb-4 p-3 bg-red-50 rounded-xl border border-red-200 flex items-start gap-2">
                    <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-600">
                        Deadline sudah lewat. Anda tetap bisa mengumpulkan, tapi akan ditandai <b>Terlambat</b> dan berpotensi kena pinalti nilai.
                    </p>
                </div>
            )}

            {/* Drop Zone — tetap aktif walau lewat deadline */}
            <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${
                    isDragging
                        ? "border-emerald-500 bg-emerald-50/50 scale-105"
                        : isLewatDeadline
                            ? "border-red-200 hover:border-red-300 hover:bg-red-50/30"
                            : "border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30"
                }`}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,.docx,.doc,.zip,.rar"
                    className="hidden"
                    onChange={(e) => handleFileSelect(e.target.files[0])}
                />

                {file ? (
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-3">
                            <FileCheck size={32} className="text-emerald-600" />
                        </div>
                        <p className="font-semibold text-emerald-600 text-sm">{file.name}</p>
                        <p className="text-xs text-slate-400 mt-1">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <button
                            onClick={(e) => { e.stopPropagation(); setFile(null); }}
                            className="mt-2 text-xs text-red-500 hover:text-red-600 font-medium"
                        >
                            Hapus file
                        </button>
                    </div>
                ) : (
                    <>
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 ${isLewatDeadline ? "bg-red-50" : "bg-emerald-50"}`}>
                            <UploadCloud size={32} className={isLewatDeadline ? "text-red-400" : "text-emerald-400"} />
                        </div>
                        <p className="font-semibold text-slate-700 text-sm">Drag and Drop file di sini</p>
                        <p className="text-xs text-slate-400 mt-1">atau Klik untuk Upload</p>
                        <div className="flex justify-center gap-2 mt-3">
                            {["PDF", "DOCX", "DOC", "ZIP"].map((ext) => (
                                <span key={ext} className="text-[10px] font-semibold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-500">
                                    {ext}
                                </span>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Info Penting */}
            <div className="bg-gradient-to-r from-slate-50 to-emerald-50/30 rounded-xl p-4 mt-4 border border-slate-100">
                <p className="font-semibold text-slate-700 text-xs flex items-center gap-1.5 mb-2">
                    <AlertCircle size={14} className="text-emerald-500" />
                    Penting:
                </p>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                    <li>Pastikan file yang dikirim sudah sesuai dengan instruksi tugas.</li>
                    <li>Maksimal ukuran file <span className="font-semibold">25MB</span>.</li>
                    {isLewatDeadline && (
                        <li className="text-red-500 font-medium">Terlambat mengumpul akan dikenakan pinalti nilai sesuai kebijakan dosen.</li>
                    )}
                </ul>
            </div>

            {/* Submit Button — tetap aktif, teks berubah kalau telat */}
            <button
                onClick={handleSubmit}
                disabled={!file || isSubmitting}
                className={`w-full mt-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                    !file || isSubmitting
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                        : isLewatDeadline
                            ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300 hover:-translate-y-0.5"
                            : "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5"
                }`}
            >
                <Send size={16} />
                {isSubmitting ? "Mengirim..." : isLewatDeadline ? "Kirim Tugas (Terlambat)" : "Kirim Tugas"}
            </button>

            {file && (
                <div className="mt-3 flex items-center gap-2 justify-center text-xs text-slate-400">
                    <File size={12} />
                    <span>{file.name}</span>
                    <span className="text-emerald-500 font-medium">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                </div>
            )}
        </div>
    );
}