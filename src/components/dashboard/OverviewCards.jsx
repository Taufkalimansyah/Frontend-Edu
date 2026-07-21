import {
  Users,
  GraduationCap,
  BookOpen,
  Bell,
} from "lucide-react";

import StatCard from "./StatCard";

export default function OverviewCards({ stats }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Mahasiswa"
        value={stats.mahasiswa}
        icon={Users}
        gradient="from-blue-500 to-blue-400"
        bgGradient="from-blue-50 to-blue-100"
      />

      <StatCard
        title="Kelas"
        value={stats.kelas}
        icon={GraduationCap}
        gradient="from-purple-500 to-purple-400"
        bgGradient="from-purple-50 to-purple-100"
      />

      <StatCard
        title="Mata Kuliah"
        value={stats.mataKuliah}
        icon={BookOpen}
        gradient="from-orange-500 to-orange-400"
        bgGradient="from-orange-50 to-orange-100"
      />

      <StatCard
        title="Pengumuman"
        value={stats.pengumuman}
        icon={Bell}
        gradient="from-pink-500 to-pink-400"
        bgGradient="from-pink-50 to-pink-100"
      />

    </div>
  );
}