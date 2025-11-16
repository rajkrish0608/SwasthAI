import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { userId, doctorName, prescribedAt, notes, medicines } = body

        // Validate required fields
        if (!medicines || medicines.length === 0) {
            return NextResponse.json(
                { error: 'At least one medicine is required' },
                { status: 400 }
            )
        }

        // Create prescription with medicines
        const prescription = await prisma.prescription.create({
            data: {
                userId: userId || null,
                doctorName: doctorName || null,
                prescribedAt: prescribedAt ? new Date(prescribedAt) : null,
                notes: notes || null,
                medicines: {
                    create: medicines.map((medicine: any) => ({
                        name: medicine.name,
                        dosagePattern: medicine.dosagePattern,
                        durationDays: medicine.durationDays || null,
                        notes: medicine.notes || null,
                    })),
                },
            },
            include: {
                medicines: true,
            },
        })

        return NextResponse.json({
            success: true,
            prescription,
        })
    } catch (error) {
        console.error('Prescription save error:', error)

        const errorMessage = error instanceof Error
            ? error.message
            : 'Failed to save prescription'

        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        )
    }
}
