export default function StatCard({
  title,
  value,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

      <div className="flex justify-between">

        <div>

          <p className="text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-800">
            {value}
          </h2>

        </div>

        <div className="rounded-2xl bg-emerald-100 p-4">

          <Icon
            className="text-emerald-600"
            size={26}
          />

        </div>

      </div>

    </div>
  );
}