'use client';
import { useEffect, useState } from 'react'
import Link from 'next/link'

type Student = {
  id: number;
  nisn: string;
  nama: string;
  absensi: string;
}

export default function AbsensiPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ nisn: '', nama: '', absensi: '' });

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch('/api/absensi');
      const data = await response.json();
      setStudents(data);
    };

    fetchStudents();
  }, []);

  const handleEdit = (student: Student) => {
    setEditingId(student.id);
    setEditData({ nisn: student.nisn, nama: student.nama, absensi: student.absensi });
  };

  const handleUpdate = async (id: number) => {
    const response = await fetch('/api/absensi', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...editData })
    });

    if (response.ok) {
      setStudents(students.map(s => s.id === id ? { id, ...editData } : s));
      setEditingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Yakin ingin menghapus data ini?')) {
      const response = await fetch(`/api/absensi?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setStudents(students.filter(s => s.id !== id));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Data Kehadiran Siswa</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left">No</th>
                <th className="px-6 py-3 text-left">NISN</th>
                <th className="px-6 py-3 text-left">Nama</th>
                <th className="px-6 py-3 text-left">Status Absensi</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id} className="border-b border-slate-200 hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    {editingId === student.id ? (
                      <input 
                        value={editData.nisn} 
                        onChange={(e) => setEditData({...editData, nisn: e.target.value})}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : student.nisn}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === student.id ? (
                      <input 
                        value={editData.nama} 
                        onChange={(e) => setEditData({...editData, nama: e.target.value})}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : student.nama}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === student.id ? (
                      <select 
                        value={editData.absensi} 
                        onChange={(e) => setEditData({...editData, absensi: e.target.value})}
                        className="border rounded px-2 py-1 w-full"
                      >
                        <option value="Hadir">Hadir</option>
                        <option value="Sakit">Sakit</option>
                        <option value="Izin">Izin</option>
                        <option value="Alpha">Alpha</option>
                      </select>
                    ) : (
                      <span className='px-3 py-1 rounded-full text-sm font-medium'>
                        {student.absensi}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === student.id ? (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleUpdate(student.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button 
                          onClick={() => setEditingId(null)}
                          className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEdit(student)}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(student.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="text-center mt-8">
          <Link 
            href={"/"} 
            className="bg-slate-700 text-white px-6 py-3 rounded-lg hover:bg-slate-600 inline-block"
          >
            Tambah Data Baru
          </Link>
        </div>
      </div>
    </div>
  );
}