import { useState } from "react";
import Sidebar from "../../components/dosen/Sidebar";
import DashboardStats from "../../components/dosen/DashboardStats";
import DashboardCharts from "../../components/dosen/DashboardCharts";
import RecentActivities from "../../components/dosen/RecentActivities";
import QuickActions from "../../components/dosen/QuickActions";
import { 
  Users, 
  BookOpen, 
  ClipboardList, 
  FileUp, 
  CalendarDays,
  TrendingUp,
  Clock
} from "lucide-react";

// Data dummy untuk aktivitas terbaru
const dummyActivities = [
  {
    id: 1,
    type: "tugas",
    title: "Tugas 1: Analisis Algoritma",
    description: "Deadline dalam 3 hari",
    time: "2 jam yang lalu",
    status: "pending",
    icon: ClipboardList,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    id: 2,
    type: "materi",
    title: "Modul 2 - Struktur Data",
    description: "Berhasil diupload",
    time: "5 jam yang lalu",
    status: "success",
    icon: FileUp,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-50"
  },
  {
    id: 3,
    type: "penilaian",
    title: "Penilaian Tugas 1",
    description: "5 mahasiswa belum dinilai",
    time: "1 hari yang lalu",
    status: "warning",
    icon: TrendingUp,
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-50"
  },
  {
    id: 4,
    type: "absensi",
    title: "Absensi Pertemuan 3",
    description: "3 mahasiswa tidak hadir",
    time: "2 hari yang lalu",
    status: "error",
    icon: CalendarDays,
    iconColor: "text-red-500",
    bgColor: "bg-red-50"
  },
  {
    id: 5,
    type: "kelas",
    title: "Kelas IF-3A",
    description: "Materi baru tersedia",
    time: "3 hari yang lalu",
    status: "info",
    icon: BookOpen,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50"
  }
];

// Data dummy untuk statistik
const statsData = {
  totalKelas: 4,
  totalMahasiswa: 126,
  tugasAktif: 8,
  materiUpload: 32,
  persentaseKehadiran: 85,
  rataRataNilai: 78
};

export default function Dashboard() {
  const [activities] = useState(dummyActivities);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      
      <main className="ml-72 flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-200">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                  Dashboard Dosen
                </h1>
                <p className="text-slate-500 mt-1 flex items-center gap-2">
                  <Clock size={16} />
                  Selamat datang kembali! Semangat mengajar hari ini
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-600">Online</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <DashboardStats stats={statsData} />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <DashboardCharts />
          </div>
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>

        {/* Recent Activities */}
        <RecentActivities activities={activities} />
      </main>
    </div>
  );
}