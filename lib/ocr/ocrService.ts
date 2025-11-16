import { ExtractedPrescriptionData } from '@/types/prescription'
import { mockOCR } from './mockOCR'
import { tesseractOCR } from './tesseractOCR'

/**
 * OCR Service Abstraction Layer
 * 
 * This service provides a unified interface for prescription OCR,
 * allowing easy switching between mock and real implementations.
 * 
 * Configuration:
 * - Set USE_MOCK_OCR=true in .env to use mock data (default for MVP)
 * - Set USE_MOCK_OCR=false to use real Tesseract.js OCR
 * 
 * Future enhancements:
 * - Add support for cloud OCR services (Google Vision, AWS Textract, Azure)
 * - Add support for specialized medical OCR services
 * - Implement caching for processed prescriptions
 * - Add confidence scoring for extracted data
 */
export async function extractPrescriptionFromImage(
    file: File
): Promise<ExtractedPrescriptionData> {
    // Validate file
    if (!file) {
        throw new Error('No file provided')
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
    if (!validTypes.includes(file.type)) {
        throw new Error('Invalid file type. Please upload a JPEG, PNG, or PDF file.')
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
        throw new Error('File too large. Maximum size is 10MB.')
    }

    // Choose OCR implementation based on environment variable
    const useMockOCR = process.env.USE_MOCK_OCR === 'true'

    try {
        if (useMockOCR) {
            console.log('Using mock OCR for prescription extraction')
            return await mockOCR(file)
        } else {
            console.log('Using Tesseract.js OCR for prescription extraction')
            return await tesseractOCR(file)
        }
    } catch (error) {
        console.error('OCR extraction failed:', error)
        throw new Error('Failed to extract prescription data. Please try again.')
    }
}

/**
 * Validate extracted prescription data
 * Ensures the data has required fields and proper format
 */
export function validatePrescriptionData(
    data: ExtractedPrescriptionData
): boolean {
    if (!data.medicines || data.medicines.length === 0) {
        return false
    }

    // Validate each medicine has required fields
    for (const medicine of data.medicines) {
        if (!medicine.name || !medicine.dosagePattern) {
            return false
        }
    }

    return true
}
