export default function KelasSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-3xl p-6 animate-pulse">
                    <div className="h-32 bg-slate-200 rounded-xl mb-4"></div>
                    <div className="h-6 bg-slate-200 rounded-lg mb-2 w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded-lg w-1/2 mb-4"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-slate-200 rounded-lg w-2/3"></div>
                        <div className="h-4 bg-slate-200 rounded-lg w-1/2"></div>
                    </div>
                    <div className="mt-4 h-10 bg-slate-200 rounded-xl w-full"></div>
                </div>
            ))}
        </div>
    );
}