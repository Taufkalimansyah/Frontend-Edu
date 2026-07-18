export default function StatCard({
  title,
  value,
  icon: Icon,
  gradient = "from-emerald-500 to-emerald-400",
  bgGradient = "from-emerald-50 to-emerald-100",
}) {
  return (
    <div className="group relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative flex justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 tracking-wide">
            {title}
          </p>
          <h2 className="mt-2 text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            {value}
          </h2>
          <div className="mt-1 flex items-center gap-1">
            <span className="inline-block w-1 h-1 bg-emerald-500 rounded-full"></span>
            <span className="text-xs text-slate-400">+12% dari bulan lalu</span>
          </div>
        </div>

        <div className={`rounded-2xl bg-gradient-to-br ${bgGradient} p-4 shadow-inner`}>
          <div className={`bg-gradient-to-r ${gradient} bg-clip-text`}>
            <Icon className="text-emerald-600" size={28} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
}