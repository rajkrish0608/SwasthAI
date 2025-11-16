import { NextRequest, NextResponse } from 'next/server'
import { extractPrescriptionFromImage } from '@/lib/ocr/ocrService'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            )
        }

        // Extract prescription data using OCR service
        const extractedData = await extractPrescriptionFromImage(file)

        // Return extracted data
        return NextResponse.json(extractedData)
    } catch (error) {
        console.error('Prescription extraction error:', error)

        const errorMessage = error instanceof Error
            ? error.message
            : 'Failed to extract prescription data'

        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        )
    }
}
