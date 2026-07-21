import { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";
import OverviewCards from "../../components/dashboard/OverviewCards";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";

import {
  getUsers,
  getClasses,
  getAnnouncements,
} from "../../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    mahasiswa: 0,
    kelas: 0,
    mataKuliah: 0,
    pengumuman: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [usersRes, kelasRes, announcementRes] = await Promise.all([
        getUsers(),
        getClasses(),
        getAnnouncements(),
      ]);

      const users = usersRes.data || [];

      setStats({
        mahasiswa: users.filter((u) => u.role === "mahasiswa").length,
        kelas: kelasRes.data.length,
        mataKuliah: kelasRes.data.length,
        pengumuman: announcementRes.data.length,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <main className="flex-1 ml-72 p-10">
        <Header />

        <OverviewCards stats={stats} />

        <WelcomeBanner />
      </main>
    </div>
  );
}