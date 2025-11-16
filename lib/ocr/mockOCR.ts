import { ExtractedPrescriptionData } from '@/types/prescription'

/**
 * Mock OCR implementation that returns sample prescription data
 * This is used for MVP development and testing
 * Replace with real OCR service in production
 */

// Sample medicine database with common Indian medicines
const SAMPLE_MEDICINES = [
    { name: 'Paracetamol 650mg', dosagePattern: '1-1-1', durationDays: 5, notes: 'Take after meals' },
    { name: 'Metformin 500mg', dosagePattern: '1-0-1', durationDays: 30, notes: 'Take after meals' },
    { name: 'Amlodipine 5mg', dosagePattern: '0-0-1', durationDays: 30, notes: 'Take before bedtime' },
    { name: 'Atorvastatin 10mg', dosagePattern: '0-0-1', durationDays: 30, notes: 'Take at night' },
    { name: 'Aspirin 75mg', dosagePattern: '0-0-1', durationDays: 30, notes: 'Take after dinner' },
    { name: 'Pantoprazole 40mg', dosagePattern: '1-0-0', durationDays: 15, notes: 'Take before breakfast' },
    { name: 'Azithromycin 500mg', dosagePattern: '1-0-0', durationDays: 3, notes: 'Take on empty stomach' },
    { name: 'Amoxicillin 500mg', dosagePattern: '1-0-1', durationDays: 7, notes: 'Complete the course' },
    { name: 'Cetirizine 10mg', dosagePattern: '0-0-1', durationDays: 10, notes: 'Take at bedtime' },
    { name: 'Vitamin D3 60000 IU', dosagePattern: '1-0-0', durationDays: 7, notes: 'Once weekly' },
    { name: 'Calcium 500mg', dosagePattern: '1-0-1', durationDays: 30, notes: 'Take with milk' },
    { name: 'Levothyroxine 50mcg', dosagePattern: '1-0-0', durationDays: 30, notes: 'Take on empty stomach' },
    { name: 'Glimepiride 2mg', dosagePattern: '1-0-0', durationDays: 30, notes: 'Take before breakfast' },
    { name: 'Losartan 50mg', dosagePattern: '1-0-0', durationDays: 30, notes: 'Take in morning' },
    { name: 'Clopidogrel 75mg', dosagePattern: '0-0-1', durationDays: 30, notes: 'Take after dinner' },
    { name: 'Montelukast 10mg', dosagePattern: '0-0-1', durationDays: 30, notes: 'Take at night' },
    { name: 'Dolo 650mg', dosagePattern: '1-1-1', durationDays: 3, notes: 'SOS for fever' },
    { name: 'Crocin Advance 500mg', dosagePattern: '1-0-1', durationDays: 5, notes: 'For pain relief' },
    { name: 'Combiflam', dosagePattern: '1-1-1', durationDays: 3, notes: 'Take after meals' },
    { name: 'Ranitidine 150mg', dosagePattern: '1-0-1', durationDays: 14, notes: 'Take before meals' },
]

const SAMPLE_DOCTORS = [
    'Dr. Rajesh Kumar',
    'Dr. Priya Sharma',
    'Dr. Amit Patel',
    'Dr. Sunita Reddy',
    'Dr. Vikram Singh',
    'Dr. Anjali Mehta',
    'Dr. Suresh Iyer',
    'Dr. Kavita Desai',
]

/**
 * Get random items from an array
 */
function getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
}

/**
 * Get random item from an array
 */
function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
}

export async function mockOCR(file: File): Promise<ExtractedPrescriptionData> {
    // Simulate processing delay (shorter for better UX)
    await new Promise(resolve => setTimeout(resolve, 800))

    // Use file name or size as seed for consistent results for same file
    const seed = file.name + file.size
    const hashCode = seed.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0)
        return a & a
    }, 0)

    // Use hash to select medicines consistently
    const startIndex = Math.abs(hashCode) % (SAMPLE_MEDICINES.length - 3)
    const selectedMedicines = SAMPLE_MEDICINES.slice(startIndex, startIndex + 3)
    const doctorIndex = Math.abs(hashCode) % SAMPLE_DOCTORS.length

    // Return realistic sample data (same for same file)
    return {
        doctorName: SAMPLE_DOCTORS[doctorIndex],
        date: new Date().toISOString().split('T')[0],
        medicines: selectedMedicines,
    }
}
