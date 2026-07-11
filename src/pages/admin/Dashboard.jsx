import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";
import OverviewCards from "../../components/dashboard/OverviewCards";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <main className="flex-1 ml-72 p-10">
        <Header />

        <OverviewCards />

        <WelcomeBanner />
      </main>
    </div>
  );
}