export default function WelcomeBanner() {
  return (
    <div className="relative mt-10 rounded-3xl bg-gradient-to-r from-emerald-600 to-emerald-400 p-10 text-white shadow-2xl shadow-emerald-200/50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4"></div>
      <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/10 rounded-full"></div>
      
      {/* Floating Bubbles */}
      <div className="absolute top-8 right-20 w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-8 right-32 w-3 h-3 bg-white/20 rounded-full animate-pulse delay-100"></div>
      <div className="absolute top-20 right-10 w-2 h-2 bg-white/20 rounded-full animate-pulse delay-200"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            🎯 Admin Area
          </span>
        </div>
        
        <h2 className="text-4xl font-bold mb-3">
          Dashboard Administrator
        </h2>

        <p className="max-w-3xl leading-relaxed text-emerald-50 text-lg">
          Selamat datang di sistem EduOnline. Dari dashboard ini Anda dapat
          mengelola data mahasiswa, dosen, kelas, mata kuliah, materi,
          tugas, absensi, nilai, serta pengumuman dalam satu aplikasi.
        </p>
        
        <div className="mt-6 flex items-center gap-4">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-white/30 border-2 border-white flex items-center justify-center text-xs font-bold">A</div>
            <div className="w-8 h-8 rounded-full bg-white/30 border-2 border-white flex items-center justify-center text-xs font-bold">B</div>
            <div className="w-8 h-8 rounded-full bg-white/30 border-2 border-white flex items-center justify-center text-xs font-bold">C</div>
            <div className="w-8 h-8 rounded-full bg-white/40 border-2 border-white flex items-center justify-center text-xs font-bold">+</div>
          </div>
          <span className="text-emerald-50/80 text-sm">Tim EduOnline siap membantu</span>
        </div>
      </div>
    </div>
  );
}