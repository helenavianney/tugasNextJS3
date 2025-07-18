import { prisma } from '@/lib/prisma'

export async function GET() {
    const students = await prisma.student.findMany()

    return new Response(JSON.stringify(students), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function POST(request: Request) {
    const { nisn, nama, absensi } = await request.json()

    const newStudent = await prisma.student.create({
        data: {
            nisn,
            nama,
            absensi,
        }
    });
    
    return new Response(JSON.stringify(newStudent), {
        status: 201,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function PATCH(request: Request) {
    const { id, nisn, nama, absensi } = await request.json();

    const updatedStudent = await prisma.student.update({
        where: { id },
        data: { nisn, nama, absensi },
    })

    return new Response(JSON.stringify(updatedStudent), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '0');

    const deletedStudent = await prisma.student.delete({
        where: { id },
    })
    
    return new Response(JSON.stringify({ message: 'Student deleted successfully', student: deletedStudent }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}