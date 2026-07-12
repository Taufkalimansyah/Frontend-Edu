import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";

import DashboardAdmin from "./pages/admin/Dashboard";
import Mahasiswa from "./pages/admin/Mahasiswa";
import Pengumuman from "./pages/admin/Pengumuman";

import DashboardMahasiswa from "./pages/mahasiswa/Dashboard";
import KelasSaya from "./pages/mahasiswa/KelasSaya";
import DetailKelas from "./pages/mahasiswa/DetailKelas";
import Nilai from "./pages/mahasiswa/Nilai";

import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* Redirect */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Login */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* ================= ADMIN ================= */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <DashboardAdmin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/mahasiswa"
        element={
          <ProtectedRoute role="admin">
            <Mahasiswa />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/pengumuman"
        element={
          <ProtectedRoute role="admin">
            <Pengumuman />
          </ProtectedRoute>
        }
      />

      {/* ================= MAHASISWA ================= */}

      <Route
        path="/mahasiswa/dashboard"
        element={
          <ProtectedRoute role="mahasiswa">
            <DashboardMahasiswa />
          </ProtectedRoute>
        }
      />

      <Route
        path="/mahasiswa/kelas"
        element={
          <ProtectedRoute role="mahasiswa">
            <KelasSaya />
          </ProtectedRoute>
        }
      />

      <Route
        path="/mahasiswa/kelas/:id"
        element={
          <ProtectedRoute role="mahasiswa">
            <DetailKelas />
          </ProtectedRoute>
        }
      />

      <Route
        path="/mahasiswa/nilai"
        element={
          <ProtectedRoute role="mahasiswa">
            <Nilai />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}