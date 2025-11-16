export interface SymptomInput {
    description: string
    age?: number
    gender?: string
    language?: string
}

export interface TriageResult {
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'
    summary: string
    homeCareTips: string[]
    homeMedicines?: string[]
    dietSuggestions?: string[]
    doctorRecommendation: string
}

export interface ChatMessage {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
    language?: string
    triageResult?: TriageResult
}
