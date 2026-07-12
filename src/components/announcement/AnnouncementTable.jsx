import {Bell,Pencil,Trash2} from "lucide-react";

export default function AnnouncementTable({

pengumuman,
onEdit,
onDelete

}){

return(

<div className="rounded-2xl bg-white border shadow-sm overflow-hidden">

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

{

pengumuman.map((item)=>(

<tr
key={item.id}
className="border-t hover:bg-slate-50"
>

<td className="px-6 py-4">

<div className="flex items-center gap-3">

<div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">

<Bell size={18}/>

</div>

{item.judul}

</div>

</td>

<td className="px-6 py-4">{item.isi}</td>

<td className="px-6 py-4">
{item.pembuat?.name}
</td>

<td className="px-6 py-4">
{item.tanggal?.split("T")[0]}
</td>

<td className="px-6 py-4">

<span className="bg-emerald-100 text-emerald-700 rounded-full px-3 py-1">

{item.status}

</span>

</td>

<td>

<div className="flex justify-center gap-2">

<button
onClick={()=>onEdit(item)}
className="bg-blue-500 text-white rounded-lg px-3 py-2 flex items-center gap-1"
>

<Pencil size={15}/>

Edit

</button>

<button
onClick={()=>onDelete(item)}
className="bg-red-500 text-white rounded-lg px-3 py-2 flex items-center gap-1"
>

<Trash2 size={15}/>

Hapus

</button>

</div>

</td>

</tr>

))

}

</tbody>

</table>

</div>

)

}