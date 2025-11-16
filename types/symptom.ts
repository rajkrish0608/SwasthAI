export interface SymptomInput {
    description: string
    age?: number
    gender?: string
}

export interface TriageResult {
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'
    summary: string
    homeCareTips: string[]
    doctorRecommendation: string
}

export interface ChatMessage {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
    triageResult?: TriageResult
}
