import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function KalenderMini() {
    const [currentDate, setCurrentDate] = useState(new Date());
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    const bulanNama = currentDate.toLocaleDateString("id-ID", { month: "long", year: "numeric" });

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const today = new Date();
    const isToday = (day) => {
        return day === today.getDate() && 
               month === today.getMonth() && 
               year === today.getFullYear();
    };

    return (
        <div className="rounded-3xl bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-emerald-100 rounded-lg">
                        <Calendar size={16} className="text-emerald-600" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800">Kalender</h2>
                </div>
                <div className="flex items-center gap-1">
                    <button 
                        onClick={prevMonth}
                        className="p-1 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                    >
                        <ChevronLeft size={16} className="text-slate-400" />
                    </button>
                    <span className="text-xs font-medium text-slate-600 min-w-[100px] text-center">
                        {bulanNama}
                    </span>
                    <button 
                        onClick={nextMonth}
                        className="p-1 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                    >
                        <ChevronRight size={16} className="text-slate-400" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-400 mb-2">
                {["M", "S", "S", "R", "K", "J", "S"].map((d, i) => (
                    <span key={i} className="py-1">{d}</span>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {cells.map((d, i) => (
                    <div
                        key={i}
                        className={`
                            h-9 w-9 flex items-center justify-center mx-auto rounded-full
                            ${d && isToday(d) 
                                ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold shadow-md shadow-emerald-200' 
                                : d 
                                    ? 'text-slate-700 hover:bg-emerald-50 transition-colors duration-200' 
                                    : 'text-slate-300'
                            }
                        `}
                    >
                        {d || ""}
                    </div>
                ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-center gap-4 text-[10px] text-slate-400">
                <div className="flex items-center gap-1.5">
                    <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
                    <span>Hari ini</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="inline-block w-2.5 h-2.5 bg-slate-200 rounded-full"></span>
                    <span>Bulan ini</span>
                </div>
            </div>
        </div>
    );
}