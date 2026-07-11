export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="mb-10">

      <h2 className="text-4xl font-bold text-slate-800">
        Selamat Datang Admin
      </h2>

      <p className="mt-2 text-slate-500">
      </p>

    </div>
  );
}