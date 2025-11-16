import { ExtractedPrescriptionData } from '@/types/prescription'

/**
 * Mock OCR implementation that returns sample prescription data
 * This is used for MVP development and testing
 * Replace with real OCR service in production
 */
export async function mockOCR(file: File): Promise<ExtractedPrescriptionData> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Return realistic sample data with Indian medicine names
    return {
        doctorName: 'Dr. Rajesh Kumar',
        date: new Date().toISOString().split('T')[0],
        medicines: [
            {
                name: 'Metformin 500mg',
                dosagePattern: '1-0-1', // Morning and Night
                durationDays: 30,
                notes: 'Take after meals',
            },
            {
                name: 'Amlodipine 5mg',
                dosagePattern: '0-0-1', // Night only
                durationDays: 30,
                notes: 'Take before bedtime',
            },
            {
                name: 'Vitamin D3 60000 IU',
                dosagePattern: '1-0-0', // Morning only
                durationDays: 7,
                notes: 'Once weekly',
            },
        ],
    }
}
