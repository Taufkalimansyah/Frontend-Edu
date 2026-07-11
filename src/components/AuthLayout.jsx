import React from "react";
import { GraduationCap, Sparkles } from "lucide-react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_35%),linear-gradient(135deg,_#020617,_#111827)] text-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/80 shadow-2xl shadow-emerald-950/30 backdrop-blur">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-700 p-8 sm:p-10 lg:p-12">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                <GraduationCap size={22} />
              </div>
              <div>
                <p className="text-lg font-semibold">EduOnline</p>
                <p className="text-sm text-emerald-100">Learning Management System</p>
              </div>
            </div>

            <div className="mt-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-emerald-50">
                <Sparkles size={14} />
                Auth terhubung ke backend Laravel
              </div>
              <h1 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
                Masuk atau daftarkan akun Anda untuk mulai belajar.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-emerald-50/90">
                Semua proses login dan register diproses melalui endpoint Laravel Sanctum yang terpisah dan rapi.
              </p>
            </div>

          </div>

          <div className="p-8 sm:p-10 lg:p-12">{children}</div>
        </div>
      </div>
    </div>
  );
}
