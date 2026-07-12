import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";

/* ================= ADMIN ================= */
import DashboardAdmin from "./pages/admin/Dashboard";
import Mahasiswa from "./pages/admin/Mahasiswa";
import Pengumuman from "./pages/admin/Pengumuman";

/* ================= MAHASISWA ================= */
import DashboardMahasiswa from "./pages/mahasiswa/Dashboard";
import KelasSaya from "./pages/mahasiswa/KelasSaya";
import DetailKelas from "./pages/mahasiswa/DetailKelas";
import Nilai from "./pages/mahasiswa/Nilai";

/* ================= DOSEN ================= */
import DashboardDosen from "./pages/dosen/Dashboard";
import KelasDosen from "./pages/dosen/KelasSaya";
import TambahKelas from "./pages/dosen/TambahKelas";
import UploadMateri from "./pages/dosen/UploadMateri";
import BuatTugas from "./pages/dosen/BuatTugas";
import Penilaian from "./pages/dosen/Penilaian";
import Absensi from "./pages/dosen/Absensi";

/* ================= PROTECTED ROUTE ================= */
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* Redirect root */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Login */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* ====================================================== */}
      {/* ====================== ADMIN ========================= */}
      {/* ====================================================== */}

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

      {/* ====================================================== */}
      {/* ==================== MAHASISWA ======================= */}
      {/* ====================================================== */}

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

      {/* ====================================================== */}
      {/* ======================= DOSEN ======================== */}
      {/* ====================================================== */}

      <Route
        path="/dosen/dashboard"
        element={
          <ProtectedRoute role="dosen">
            <DashboardDosen />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dosen/kelas"
        element={
          <ProtectedRoute role="dosen">
            <KelasDosen />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dosen/tambah-kelas"
        element={
          <ProtectedRoute role="dosen">
            <TambahKelas />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dosen/upload-materi"
        element={
          <ProtectedRoute role="dosen">
            <UploadMateri />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dosen/tugas"
        element={
          <ProtectedRoute role="dosen">
            <BuatTugas />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dosen/penilaian"
        element={
          <ProtectedRoute role="dosen">
            <Penilaian />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dosen/absensi"
        element={
          <ProtectedRoute role="dosen">
            <Absensi />
          </ProtectedRoute>
        }
      />

      {/* ====================================================== */}
      {/* ======================== 404 ========================= */}
      {/* ====================================================== */}

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}