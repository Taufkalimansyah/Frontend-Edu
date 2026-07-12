export default function DeleteAnnouncementModal({

    open,
    onClose,
    onDelete

}){

if(!open) return null;

return(

<div className="fixed inset-0 bg-black/40 flex justify-center items-center">

<div className="bg-white rounded-xl p-6 w-[420px]">

<h2 className="font-bold text-lg">
Hapus Pengumuman
</h2>

<p className="mt-3 text-slate-500">
Yakin ingin menghapus pengumuman ini?
</p>

<div className="flex justify-end gap-3 mt-6">

<button
onClick={onClose}
className="border rounded-lg px-4 py-2"
>
Batal
</button>

<button
onClick={onDelete}
className="bg-red-500 text-white rounded-lg px-4 py-2"
>
Hapus
</button>

</div>

</div>

</div>

)

}