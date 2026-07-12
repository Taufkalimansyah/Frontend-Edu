import { useEffect, useState } from "react";

export default function AnnouncementModal({
    open,
    onClose,
    onSave,
    editing,
    error,
    saving
}) {

    const [form,setForm]=useState({
        judul:"",
        isi:"",
        tanggal:"",
        status:"aktif"
    });

    useEffect(()=>{

        if(editing){

            setForm({
                judul:editing.judul,
                isi:editing.isi,
                tanggal:editing.tanggal,
                status:editing.status.toLowerCase()
            });

        }else{

            setForm({
                judul:"",
                isi:"",
                tanggal:"",
                status:"aktif"
            });

        }

    },[editing]);

    if(!open) return null;

    return(

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

        <div className="bg-white rounded-2xl w-[550px] p-8">

            <h2 className="text-xl font-bold mb-6">

                {
                    editing
                    ?
                    "Edit Pengumuman"
                    :
                    "Tambah Pengumuman"
                }

            </h2>

            <form
                onSubmit={(e)=>{

                    e.preventDefault();

                    onSave(form);

                }}
            >

                <div className="space-y-4">

                    <div>
                        <input
                            className={`w-full border rounded-lg p-3 ${error ? "border-red-500" : ""}`}
                            placeholder="Judul"
                            value={form.judul}
                            onChange={(e)=>
                                setForm({
                                    ...form,
                                    judul:e.target.value
                                })
                            }
                        />

                        {
                            error &&
                            <p className="text-sm text-red-500 mt-1">
                                {error}
                            </p>
                        }
                    </div>

                    <textarea
                        rows={5}
                        className="w-full border rounded-lg p-3"
                        placeholder="Isi Pengumuman"
                        value={form.isi}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                isi:e.target.value
                            })
                        }
                    />

                    <input
                        type="date"
                        className="w-full border rounded-lg p-3"
                        value={form.tanggal}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                tanggal:e.target.value
                            })
                        }
                    />

                    <select
                        className="w-full border rounded-lg p-3"
                        value={form.status}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                status:e.target.value
                            })
                        }
                    >
                        <option value="aktif">Aktif</option>
                        <option value="nonaktif">Nonaktif</option>
                    </select>

                </div>

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border"
                    >
                        Batal
                    </button>

                    <button
                        disabled={saving}
                        className="px-4 py-2 rounded-lg bg-emerald-600 text-white disabled:opacity-50"
                    >
                        {
                            saving
                            ?
                            "Menyimpan..."
                            :
                            editing
                            ?
                            "Simpan"
                            :
                            "Tambah"
                        }
                    </button>

                </div>

            </form>

        </div>

    </div>

    )

}