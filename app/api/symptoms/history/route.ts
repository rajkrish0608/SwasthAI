import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

/**
 * Get symptom check history for a user
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

        const sessions = await prisma.symptomSession.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 50, // Last 50 sessions
        })

        const history = sessions.map(session => ({
            id: session.id,
            description: session.description,
            riskLevel: session.riskLevel,
            result: JSON.parse(session.resultJson),
            createdAt: session.createdAt,
        }))

        return NextResponse.json({ history })
    } catch (error) {
        console.error('History fetch error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch history' },
            { status: 500 }
        )
    }
}
