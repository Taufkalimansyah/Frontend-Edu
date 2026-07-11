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

      <StatCard
        title="Mahasiswa"
        value="121"
        icon={Users}
      />

      <StatCard
        title="Kelas"
        value="14"
        icon={GraduationCap}
      />

      <StatCard
        title="Mata Kuliah"
        value="32"
        icon={BookOpen}
      />

      <StatCard
        title="Pengumuman"
        value="8"
        icon={Bell}
      />

    </div>
  );
}