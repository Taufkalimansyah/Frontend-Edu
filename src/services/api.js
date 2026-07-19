import axios from "axios";

/**
 * Fetch layer terpusat — semua komponen React memanggil fungsi di sini,
 * bukan axios langsung. Ini yang dipakai untuk mengganti versi "simulasi"
 * di App.jsx dengan backend Laravel yang sesungguhnya.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

// Sisipkan token Sanctum ke setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("eduonline_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const register = (payload) => api.post("/register", payload);
export const login = (email, role, password) => api.post("/login", { email, role, password });
export const logout = () => api.post("/logout");
export const me = () => api.get("/me");

// Kelas
export const getClasses = () => api.get("/classes");
export const getClass = (id) => api.get(`/classes/${id}`);
export const createClass = (payload) => api.post("/classes", payload);
export const updateClass = (id, payload) =>api.put(`/classes/${id}`, payload);
export const deleteClass = (id) =>api.delete(`/classes/${id}`);

// Materi (multipart/form-data karena ada file)
export const uploadMateri = (classId, formData) =>
  api.post(`/classes/${classId}/materials`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const downloadMateri = (materiId) =>
  api.get(`/materials/${materiId}/download`, { responseType: "blob" });

// Tugas & pengumpulan
export const createTugas = (classId, payload) => api.post(`/classes/${classId}/assignments`, payload);
export const submitTugas = (tugasId, formData) =>
  api.post(`/assignments/${tugasId}/submissions`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getSubmissionsForDosen = () => api.get("/submissions");
export const gradeSubmission = (id, nilai, feedback) => api.put(`/submissions/${id}`, { nilai, feedback });

// Nilai akhir
export const getGrades = () => api.get("/grades");

// Absensi
export const getAttendance = (classId) => api.get(`/classes/${classId}/attendance`);

// Pengumuman
export const getAnnouncements = () => api.get("/announcements");
export const postAnnouncement = (payload) => api.post("/announcements", payload);
export const updateAnnouncement = (id, payload) =>api.put(`/announcements/${id}`, payload);
export const deleteAnnouncement = (id) =>api.delete(`/announcements/${id}`);

// User (admin)
export const getUsers = (q = "") => api.get(`/users?q=${q}`);
export const createUser = (payload) => api.post("/users", payload);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export default api;
