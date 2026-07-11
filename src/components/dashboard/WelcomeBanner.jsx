export default function WelcomeBanner() {
  return (
    <div className="mt-10 rounded-3xl bg-gradient-to-r from-emerald-600 to-emerald-500 p-10 text-white">

      <h2 className="text-3xl font-bold">
        Dashboard Administrator
      </h2>

      <p className="mt-4 max-w-3xl leading-8 text-emerald-50">
        Selamat datang di sistem EduOnline. Dari dashboard ini Anda dapat
        mengelola data mahasiswa, dosen, kelas, mata kuliah, materi,
        tugas, absensi, nilai, serta pengumuman dalam satu aplikasi.
      </p>

    </div>
  );
}