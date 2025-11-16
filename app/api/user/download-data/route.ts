import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

/**
 * Download all user data (GDPR compliance)
 * Returns JSON file with all user's health data
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            )
        }

        // Fetch all user data
        const [healthProfile, prescriptions, symptomSessions] = await Promise.all([
            prisma.healthProfile.findUnique({
                where: { userId },
            }),
            prisma.prescription.findMany({
                where: { userId },
                include: { medicines: true },
                orderBy: { createdAt: 'desc' },
            }),
            prisma.symptomSession.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
            }),
        ])

        // Compile all data
        const userData = {
            exportDate: new Date().toISOString(),
            userId,
            healthProfile: healthProfile || null,
            prescriptions: prescriptions.map(p => ({
                id: p.id,
                doctorName: p.doctorName,
                prescribedAt: p.prescribedAt,
                notes: p.notes,
                createdAt: p.createdAt,
                medicines: p.medicines,
            })),
            symptomSessions: symptomSessions.map(s => ({
                id: s.id,
                description: s.description,
                riskLevel: s.riskLevel,
                result: JSON.parse(s.resultJson),
                createdAt: s.createdAt,
            })),
            statistics: {
                totalPrescriptions: prescriptions.length,
                totalSymptomChecks: symptomSessions.length,
                accountCreated: healthProfile?.createdAt || null,
            },
        }

        // Return as downloadable JSON
        return new NextResponse(JSON.stringify(userData, null, 2), {
            headers: {
                'Content-Type': 'application/json',
                'Content-Disposition': `attachment; filename="swasthai-data-${userId}-${Date.now()}.json"`,
            },
        })
    } catch (error) {
        console.error('Download data error:', error)
        return NextResponse.json(
            { error: 'Failed to download data' },
            { status: 500 }
        )
    }
}
