export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
            Selamat Datang Admin
          </h2>
          <p className="mt-2 text-slate-500 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span>Senin, 18 Juli 2026</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-200">
              A
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
}