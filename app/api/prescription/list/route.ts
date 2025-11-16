import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const userId = searchParams.get('userId')

        // Fetch prescriptions for the user
        const prescriptions = await prisma.prescription.findMany({
            where: userId ? { userId } : {},
            include: {
                medicines: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json({
            prescriptions,
        })
    } catch (error) {
        console.error('Prescription list error:', error)

        const errorMessage = error instanceof Error
            ? error.message
            : 'Failed to fetch prescriptions'

        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        )
    }
}
