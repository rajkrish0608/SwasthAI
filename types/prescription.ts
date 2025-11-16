export interface Medicine {
    id?: string
    name: string
    dosagePattern: string // e.g., "1-0-1", "0-0-1", "1/2-0-1/2"
    durationDays?: number
    notes?: string
}

export interface Prescription {
    id?: string
    doctorName?: string
    prescribedAt?: Date
    notes?: string
    medicines: Medicine[]
}

export interface ExtractedPrescriptionData {
    doctorName?: string
    date?: string
    medicines: Medicine[]
}
