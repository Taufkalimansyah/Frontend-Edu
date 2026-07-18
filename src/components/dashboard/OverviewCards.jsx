import {
  Users,
  GraduationCap,
  BookOpen,
  Bell,
} from "lucide-react";

import StatCard from "./StatCard";

export default function OverviewCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <div className="transform transition-all duration-300 hover:-translate-y-2">
        <StatCard
          title="Mahasiswa"
          value="121"
          icon={Users}
          gradient="from-blue-500 to-blue-400"
          bgGradient="from-blue-50 to-blue-100"
        />
      </div>
      <div className="transform transition-all duration-300 hover:-translate-y-2 hover:delay-100">
        <StatCard
          title="Kelas"
          value="14"
          icon={GraduationCap}
          gradient="from-purple-500 to-purple-400"
          bgGradient="from-purple-50 to-purple-100"
        />
      </div>
      <div className="transform transition-all duration-300 hover:-translate-y-2 hover:delay-200">
        <StatCard
          title="Mata Kuliah"
          value="32"
          icon={BookOpen}
          gradient="from-orange-500 to-orange-400"
          bgGradient="from-orange-50 to-orange-100"
        />
      </div>
      <div className="transform transition-all duration-300 hover:-translate-y-2 hover:delay-300">
        <StatCard
          title="Pengumuman"
          value="8"
          icon={Bell}
          gradient="from-pink-500 to-pink-400"
          bgGradient="from-pink-50 to-pink-100"
        />
      </div>
    </div>
  );
}