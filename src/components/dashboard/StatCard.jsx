import { useState, useEffect } from "react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  gradient = "from-emerald-500 to-emerald-400",
  bgGradient = "from-emerald-50 to-emerald-100",
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const end = Number(value) || 0;
    const duration = 1200; // 1.2 detik
    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;

      const progress = Math.min((currentTime - startTime) / duration, 1);

      setDisplayValue(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <div className="group relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative flex justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 tracking-wide">
            {title}
          </p>

          <h2 className="mt-2 text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            {displayValue}
          </h2>

          <div className="mt-1 flex items-center gap-1">
            <span className="inline-block w-1 h-1 bg-emerald-500 rounded-full"></span>
            <span className="text-xs text-slate-400">
              Data terbaru
            </span>
          </div>
        </div>

        <div className={`rounded-2xl bg-gradient-to-br ${bgGradient} p-4 shadow-inner`}>
          <Icon className="text-emerald-600" size={28} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
}