import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { calculateBMI } from '@/lib/utils/bmiCalculator'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {
            userId,
            age,
            gender,
            heightCm,
            weightKg,
            bpSystolic,
            bpDiastolic,
            bloodSugar,
            activityLevel,
            foodPreference,
            region,
        } = body

        // Calculate BMI
        const bmiResult = calculateBMI(heightCm, weightKg)

        // Create or update health profile
        const healthProfile = await prisma.healthProfile.upsert({
            where: { userId: userId || 'temp' },
            update: {
                age,
                gender,
                heightCm,
                weightKg,
                bmi: bmiResult.value,
                bmiCategory: bmiResult.category,
                bpSystolic: bpSystolic || null,
                bpDiastolic: bpDiastolic || null,
                bloodSugar: bloodSugar || null,
                activityLevel: activityLevel || null,
                foodPreference: foodPreference || null,
                region: region || null,
            },
            create: {
                userId: userId || 'temp',
                age,
                gender,
                heightCm,
                weightKg,
                bmi: bmiResult.value,
                bmiCategory: bmiResult.category,
                bpSystolic: bpSystolic || null,
                bpDiastolic: bpDiastolic || null,
                bloodSugar: bloodSugar || null,
                activityLevel: activityLevel || null,
                foodPreference: foodPreference || null,
                region: region || null,
            },
        })

        return NextResponse.json({
            success: true,
            healthProfile,
            bmiResult,
        })
    } catch (error) {
        console.error('Health profile save error:', error)

        const errorMessage = error instanceof Error
            ? error.message
            : 'Failed to save health profile'

        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        )
    }
}
