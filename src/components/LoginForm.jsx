import React, { useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

export default function LoginForm({ onSubmit, loading, error }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, role, password });
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-white">Masuk ke EduOnline</h2>
      <p className="mt-2 text-sm text-slate-400">Silakan gunakan kredensial akun Anda.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">Email</span>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Masukan Email"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 py-3 pl-10 pr-4 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-500"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">
              Role
          </span>

          <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 py-3 px-4 text-sm text-white outline-none focus:border-emerald-500"
          >
              <option value="">Pilih Role</option>
              <option value="admin">Admin</option>
              <option value="dosen">Dosen</option>
              <option value="mahasiswa">Mahasiswa</option>
          </select>
      </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">Password</span>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Masukkan password"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 py-3 pl-10 pr-12 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </label>

        {error ? <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</div> : null}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {loading ? "Memproses login..." : "Masuk"}
        </button>
      </form>
    </>
  );
}
