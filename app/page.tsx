'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const response = await fetch('/api/absensi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Data berhasil dikirim');
      router.push('/absensi');
    } else {
      const errorText = await response.text();
      console.error('Error response:', errorText);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form 
        onSubmit={handleSubmit} 
        className="bg-slate-300 w-full lg:w-1/3 px-6 py-4 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Daftar Kehadiran Siswa</h1>

        <div className="mb-4">
          <label className="text-lg" htmlFor="nisn">NISN</label>
          <input 
            className="block py-2 px-4 mt-1 w-full rounded-lg bg-slate-50 "
            name="nisn"
            type="text" 
            inputMode="numeric" 
            id="nisn" 
            maxLength={10} 
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-lg" htmlFor="nama">Nama</label>
          <input 
            className="block py-2 px-4 mt-1 w-full rounded-lg bg-slate-50 "
            id="nama" 
            name="nama" 
            type="text"
          />
        </div>

        <div className="mb-4">
          <label className="text-lg" htmlFor="absensi">Status Absensi</label>
          <select name="absensi" id="absensi" className="block py-2 px-4 mt-1 w-full rounded-lg bg-slate-50">
            <option value="Hadir">Hadir</option>
            <option value="Sakit">Sakit</option>
            <option value="Izin">Izin</option>
            <option value="Alpha">Alpha</option>
          </select>
        </div>

        <button 
          type="submit"
          className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 float-right mt-4 cursor-pointer">
          Simpan
        </button>

      </form>
    </div>
  );
}
