import Tesseract from 'tesseract.js'
import { ExtractedPrescriptionData, Medicine } from '@/types/prescription'

/**
 * Tesseract.js OCR implementation
 * Extracts text from prescription images and parses medicine information
 */
export async function tesseractOCR(file: File): Promise<ExtractedPrescriptionData> {
    try {
        console.log('Starting OCR processing...')

        // Perform OCR on the image with optimized settings
        const { data: { text } } = await Tesseract.recognize(
            file,
            'eng', // English language (faster than eng+hin)
            {
                logger: (m) => {
                    if (m.status === 'recognizing text') {
                        console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`)
                    }
                },
                // Optimize for speed
                tessedit_pageseg_mode: Tesseract.PSM.AUTO,
                preserve_interword_spaces: '0',
            }
        )

        console.log('OCR completed. Extracted text:', text)

        // Parse the extracted text
        const parsedData = parsePrescriptionText(text)

        return parsedData
    } catch (error) {
        console.error('OCR Error:', error)
        throw new Error('Failed to process prescription image')
    }
}

/**
 * Helper function to parse prescription text
 * Extracts structured data from OCR text
 */
function parsePrescriptionText(text: string): ExtractedPrescriptionData {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0)

    // Extract doctor name (look for "Dr." or "Doctor")
    let doctorName: string | undefined
    for (const line of lines) {
        if (line.match(/dr\.?|doctor/i)) {
            doctorName = line.replace(/^(dr\.?|doctor)\s*/i, '').trim()
            if (doctorName.length > 3) break
        }
    }

    // Extract date (look for date patterns)
    let date: string | undefined
    const datePatterns = [
        /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/,  // DD/MM/YYYY or DD-MM-YYYY
        /(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/,    // YYYY/MM/DD
    ]
    for (const line of lines) {
        for (const pattern of datePatterns) {
            const match = line.match(pattern)
            if (match) {
                date = match[0]
                break
            }
        }
        if (date) break
    }

    // Extract medicines
    const medicines: Medicine[] = []

    // Common medicine name patterns (look for capitalized words, numbers, mg/ml)
    const medicinePattern = /([A-Z][a-zA-Z]+(?:\s+[A-Z]?[a-zA-Z]+)*)\s*(\d+\s*(?:mg|ml|mcg|g|iu)?)?/gi

    // Dosage patterns: 1-0-1, 1-1-1, 0-0-1, BD, TDS, OD, etc.
    const dosagePatterns = [
        /(\d+)-(\d+)-(\d+)/,  // 1-0-1 format
        /\b(bd|bid)\b/i,      // Twice daily
        /\b(tds|tid)\b/i,     // Three times daily
        /\b(od|qd)\b/i,       // Once daily
        /\b(qid)\b/i,         // Four times daily
    ]

    // Duration patterns: 5 days, 2 weeks, 1 month
    const durationPattern = /(\d+)\s*(day|days|week|weeks|month|months)/i

    let currentMedicine: Partial<Medicine> | null = null

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]

        // Check if line contains a medicine name
        const medicineMatch = line.match(medicinePattern)
        if (medicineMatch && medicineMatch[0].length > 3) {
            // Save previous medicine if exists
            if (currentMedicine && currentMedicine.name) {
                medicines.push({
                    name: currentMedicine.name,
                    dosagePattern: currentMedicine.dosagePattern || '1-0-1',
                    durationDays: currentMedicine.durationDays || 7,
                    notes: currentMedicine.notes || '',
                })
            }

            // Start new medicine
            currentMedicine = {
                name: medicineMatch[0].trim(),
                dosagePattern: '1-0-1',
                durationDays: 7,
                notes: '',
            }
        }

        // Check for dosage pattern in current or next line
        if (currentMedicine) {
            for (const pattern of dosagePatterns) {
                const dosageMatch = line.match(pattern)
                if (dosageMatch) {
                    if (dosageMatch[0].match(/\d+-\d+-\d+/)) {
                        currentMedicine.dosagePattern = dosageMatch[0]
                    } else if (dosageMatch[0].match(/bd|bid/i)) {
                        currentMedicine.dosagePattern = '1-0-1'
                    } else if (dosageMatch[0].match(/tds|tid/i)) {
                        currentMedicine.dosagePattern = '1-1-1'
                    } else if (dosageMatch[0].match(/od|qd/i)) {
                        currentMedicine.dosagePattern = '1-0-0'
                    } else if (dosageMatch[0].match(/qid/i)) {
                        currentMedicine.dosagePattern = '1-1-1-1'
                    }
                    break
                }
            }

            // Check for duration
            const durationMatch = line.match(durationPattern)
            if (durationMatch) {
                const number = parseInt(durationMatch[1])
                const unit = durationMatch[2].toLowerCase()
                if (unit.includes('week')) {
                    currentMedicine.durationDays = number * 7
                } else if (unit.includes('month')) {
                    currentMedicine.durationDays = number * 30
                } else {
                    currentMedicine.durationDays = number
                }
            }

            // Collect notes (instructions like "after meals", "before bed", etc.)
            if (line.match(/after|before|with|meals|food|breakfast|lunch|dinner|bedtime|empty stomach/i)) {
                currentMedicine.notes = (currentMedicine.notes || '') + ' ' + line
                currentMedicine.notes = currentMedicine.notes.trim()
            }
        }
    }

    // Add the last medicine
    if (currentMedicine && currentMedicine.name) {
        medicines.push({
            name: currentMedicine.name,
            dosagePattern: currentMedicine.dosagePattern || '1-0-1',
            durationDays: currentMedicine.durationDays || 7,
            notes: currentMedicine.notes || '',
        })
    }

    // If no medicines found, provide helpful message
    if (medicines.length === 0) {
        console.warn('No medicines detected in the prescription. The image quality may be poor or the format is not recognized.')
    }

    return {
        doctorName,
        date,
        medicines,
    }
}
