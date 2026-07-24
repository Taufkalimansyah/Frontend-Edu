import { useEffect, useState } from "react";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      };
      const formattedDate = now.toLocaleDateString('id-ID', options);
      setCurrentDate(formattedDate);
    };

    updateDate();
    
    // Update setiap menit (opsional)
    const interval = setInterval(updateDate, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
            Selamat Datang {user?.name ? `, ${user.name}` : "Admin"}
          </h2>
          <p className="mt-2 text-slate-500 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span>{currentDate || "Memuat tanggal..."}</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-200">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
}