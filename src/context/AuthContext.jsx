import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService";
import { getToken, clearToken } from "../services/tokenStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // restoring session on first load
  const [authLoading, setAuthLoading] = useState(false); // login/register submit in flight
  const [error, setError] = useState("");

  // On first mount: if a token exists, ask the backend who it belongs to.
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    authService
      .me()
      .then((res) => setUser(res.data))
      .catch(() => {
        clearToken();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleLogin({ email, password }) {
    setError("");
    setAuthLoading(true);
    try {
      const loggedUser = await authService.login(email, password);
      setUser(loggedUser);
      return loggedUser;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.email?.[0] ||
        "Login gagal. Periksa koneksi backend Laravel Anda.";
      setError(message);
      throw err;
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleRegister(payload) {
    setError("");
    setAuthLoading(true);
    try {
      const newUser = await authService.register(payload);
      setUser(newUser);
      return newUser;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.email?.[0] ||
        "Registrasi gagal. Periksa kembali data Anda.";
      setError(message);
      throw err;
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authLoading,
        error,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
