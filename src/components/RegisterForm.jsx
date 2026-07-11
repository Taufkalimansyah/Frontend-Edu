import React, { useState } from "react";
import { Loader2, UserPlus } from "lucide-react";

export default function RegisterForm({ onSubmit, loading, error }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "mahasiswa" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-white">Buat akun baru</h2>
      <p className="mt-2 text-sm text-slate-400">Daftar sebagai mahasiswa atau dosen.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">Nama lengkap</span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 py-3 px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-500"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 py-3 px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-500"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">Password</span>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 py-3 px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-500"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">Role</span>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 py-3 px-4 text-sm text-white outline-none focus:border-emerald-500"
          >
            <option value="mahasiswa">Mahasiswa</option>
            <option value="dosen">Dosen</option>
          </select>
        </label>

        {error ? <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</div> : null}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus size={16} />}
          {loading ? "Mendaftarkan..." : "Daftar"}
        </button>
      </form>
    </>
  );
}
