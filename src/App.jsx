import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Mahasiswa from "./pages/admin/Mahasiswa";
import Pengumuman from "./pages/admin/Pengumuman";



export default function App() {
  return (
    <Routes>
      {/* Redirect root */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard (Protected) */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/pengumuman"
        element={
          <ProtectedRoute>
            <Pengumuman />
          </ProtectedRoute>
        }
      />

      <Route 
    path="/admin/mahasiswa" 
    element={<Mahasiswa />} 
/>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>

    
  );
}