import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { assessSymptoms } from '@/lib/triage/triageEngine'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { description, age, gender, userId } = body

        if (!description) {
            return NextResponse.json(
                { error: 'Symptom description is required' },
                { status: 400 }
            )
        }

        // Assess symptoms using rule-based engine
        const triageResult = assessSymptoms({
            description,
            age,
            gender,
        })

        // Save symptom session to database
        try {
            await prisma.symptomSession.create({
                data: {
                    userId: userId || null,
                    description,
                    riskLevel: triageResult.riskLevel,
                    resultJson: JSON.stringify(triageResult),
                },
            })
        } catch (dbError) {
            // Log error but don't fail the request
            console.error('Failed to save symptom session:', dbError)
        }

        return NextResponse.json(triageResult)
    } catch (error) {
        console.error('Triage error:', error)

        const errorMessage = error instanceof Error
            ? error.message
            : 'Failed to assess symptoms'

        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        )
    }
}
