import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { assessSymptoms } from '@/lib/triage/triageEngine'
import { analyzeSymptoms, isGeminiConfigured } from '@/lib/ai/geminiService'
import { getComprehensiveMockAI } from '@/lib/ai/comprehensiveMockAI'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { description, age, gender, userId, language } = body

        if (!description) {
            return NextResponse.json(
                { error: 'Symptom description is required' },
                { status: 400 }
            )
        }

        // Try AI-powered multilingual triage first
        let triageResult
        let detectedLanguage = 'english'
        let provider = 'rule-based'
        let aiError = null

        // Try real Gemini AI first, fallback to comprehensive mock AI
        try {
            if (isGeminiConfigured()) {
                console.log('🤖 Using Real Gemini AI...')
                const aiResult = await analyzeSymptoms(description, language)
                triageResult = {
                    riskLevel: aiResult.riskLevel,
                    summary: aiResult.summary,
                    homeCareTips: aiResult.homeCareTips,
                    homeMedicines: aiResult.homeMedicines,
                    dietSuggestions: aiResult.dietSuggestions,
                    doctorRecommendation: aiResult.doctorRecommendation,
                }
                detectedLanguage = aiResult.detectedLanguage
                provider = 'gemini-ai-real'
                console.log('✅ Real AI response received!')
            } else {
                throw new Error('Gemini API not configured')
            }
        } catch (error) {
            console.log('⚠️ Real AI failed, using comprehensive mock AI')
            console.error('AI Error:', error)
            const mockResult = getComprehensiveMockAI(description)
            triageResult = {
                riskLevel: mockResult.riskLevel,
                summary: mockResult.summary,
                homeCareTips: mockResult.homeCareTips,
                homeMedicines: mockResult.homeMedicines,
                dietSuggestions: mockResult.dietSuggestions,
                doctorRecommendation: mockResult.doctorRecommendation,
            }
            detectedLanguage = mockResult.detectedLanguage
            provider = 'comprehensive-mock-ai-fallback'
            aiError = 'Real AI unavailable, using smart fallback'
        }

        // Save to database (skip if userId causes foreign key error)
        try {
            await prisma.symptomSession.create({
                data: {
                    userId: null, // Don't link to user for now to avoid foreign key errors
                    description,
                    riskLevel: triageResult.riskLevel,
                    resultJson: JSON.stringify({ ...triageResult, language: detectedLanguage, provider }),
                },
            })
        } catch (dbError) {
            console.error('Failed to save symptom session:', dbError)
            // Don't fail the request if database save fails
        }

        return NextResponse.json({
            ...triageResult,
            language: detectedLanguage,
            provider,
            aiError,
            message: aiError ? 'Using basic triage. For AI features, add GEMINI_API_KEY to .env' : undefined,
        })
    } catch (error) {
        console.error('Triage error:', error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to assess symptoms' },
            { status: 500 }
        )
    }
}
