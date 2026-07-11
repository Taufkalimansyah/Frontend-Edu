import React, { useEffect, useState } from "react";
import { Loader2, LogOut } from "lucide-react";
import AuthLayout from "./components/AuthLayout";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { login, logout, me, register } from "./services/api";

function setAuthToken(token) {
  if (token) {
    localStorage.setItem("eduonline_token", token);
  } else {
    localStorage.removeItem("eduonline_token");
  }
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("login");

  useEffect(() => {
    const token = localStorage.getItem("eduonline_token");
    if (!token) {
      setLoading(false);
      return;
    }

    me()
      .then((res) => setUser(res.data))
      .catch(() => {
        setAuthToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = async ({ email, password }) => {
    setError("");
    setAuthLoading(true);

    try {
      const res = await login(email, password);
      const { token, user: loggedUser } = res.data;
      setAuthToken(token);
      setUser(loggedUser);
    } catch (err) {
      const message = err?.response?.data?.message || err?.response?.data?.errors?.email?.[0] || "Login gagal. Periksa koneksi backend Laravel Anda.";
      setError(message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async ({ name, email, password, role }) => {
    setError("");
    setAuthLoading(true);

    try {
      const res = await register({ name, email, password, role });
      const { token, user: registeredUser } = res.data;
      setAuthToken(token);
      setUser(registeredUser);
    } catch (err) {
      const message = err?.response?.data?.message || err?.response?.data?.errors?.email?.[0] || "Registrasi gagal.";
      setError(message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    } finally {
      setAuthToken(null);
      setUser(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
          <p className="text-sm text-slate-400">Memeriksa sesi login...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <AuthLayout>
        <div className="flex flex-col gap-3">
          <div className="flex rounded-full bg-slate-800/70 p-1">
            <button
              type="button"
              onClick={() => { setMode("login"); setError(""); }}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${mode === "login" ? "bg-emerald-500 text-slate-950" : "text-slate-300"}`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => { setMode("register"); setError(""); }}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${mode === "register" ? "bg-emerald-500 text-slate-950" : "text-slate-300"}`}
            >
              Register
            </button>
          </div>

          {mode === "login" ? (
            <LoginForm onSubmit={handleLogin} loading={authLoading} error={error} />
          ) : (
            <RegisterForm onSubmit={handleRegister} loading={authLoading} error={error} />
          )}
        </div>
      </AuthLayout>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-emerald-950/20">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Sesi aktif</p>
            <h1 className="mt-2 text-2xl font-semibold text-white">Selamat datang, {user.name}</h1>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-emerald-400 hover:text-white"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6">
          <p className="text-sm text-emerald-200">Anda berhasil login ke backend Laravel</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">Nama</p>
              <p className="mt-1 font-semibold text-white">{user.name}</p>
            </div>
            <div className="rounded-2xl bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">Email</p>
              <p className="mt-1 font-semibold text-white">{user.email}</p>
            </div>
            <div className="rounded-2xl bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">Role</p>
              <p className="mt-1 font-semibold text-white">{user.role}</p>
            </div>
            <div className="rounded-2xl bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">Status</p>
              <p className="mt-1 font-semibold text-emerald-400">Token aktif</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}