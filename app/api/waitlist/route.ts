import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, phone, city, concern } = body

        // Validate required fields
        if (!name || !phone) {
            return NextResponse.json(
                { error: 'Name and phone number are required' },
                { status: 400 }
            )
        }

        // Create waitlist entry
        const entry = await prisma.consultWaitlist.create({
            data: {
                name,
                phone,
                city: city || null,
                concern: concern || null,
            },
        })

        return NextResponse.json({
            success: true,
            id: entry.id,
        })
    } catch (error) {
        console.error('Waitlist error:', error)

        const errorMessage = error instanceof Error
            ? error.message
            : 'Failed to join waitlist'

        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        )
    }
}
