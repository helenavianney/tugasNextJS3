const students = [
    {
        id: 1,
        nisn: '1234567890',
        nama: 'John Doe',
        absensi: 'Sakit',
    },
    {
        id: 2,
        nisn: '0987654321',
        nama: 'Jane Doe',
        absensi: 'Hadir',
    },
];

export async function GET() {

    return new Response(JSON.stringify(students), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    const { nisn, nama, absensi } = body;

    const newStudent = {
        id: Date.now(),
        nisn: nisn,
        nama: nama,
        absensi: absensi,
    };

    students.push(newStudent);
    
    return new Response(JSON.stringify(newStudent), {
        status: 201,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function PATCH(request: Request) {
    const body = await request.json();
    const { id, nisn, nama, absensi } = body;

    const studentIndex = students.findIndex(student => student.id === id);
    
    if (studentIndex === -1) {
        return new Response(JSON.stringify({ error: 'Student not found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    students[studentIndex] = { id, nisn, nama, absensi };

    return new Response(JSON.stringify(students[studentIndex]), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '0');

    const studentIndex = students.findIndex(student => student.id === id);
    
    if (studentIndex === -1) {
        return new Response(JSON.stringify({ error: 'Student not found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const deletedStudent = students.splice(studentIndex, 1)[0];

    return new Response(JSON.stringify({ message: 'Student deleted successfully', student: deletedStudent }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}