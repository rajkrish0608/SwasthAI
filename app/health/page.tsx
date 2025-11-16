'use client'

import { useState } from 'react'
import Container from '@/components/layout/Container'
import Card from '@/components/ui/Card'
import HealthForm from '@/components/health/HealthForm'
import BMICard from '@/components/health/BMICard'
import DietPlan from '@/components/health/DietPlan'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { HealthProfile, BMIResult, DietPlan as DietPlanType } from '@/types/health'
import { getUserId } from '@/lib/utils/userIdentification'
import { generateDietPlan } from '@/lib/diet/dietEngine'

export default function HealthPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [bmiResult, setBmiResult] = useState<BMIResult | null>(null)
    const [dietPlan, setDietPlan] = useState<DietPlanType | null>(null)
    const [savedProfile, setSavedProfile] = useState<HealthProfile | null>(null)

    const handleSubmit = async (profile: HealthProfile) => {
        setIsLoading(true)
        setError('')

        try {
            const userId = getUserId()

            const response = await fetch('/api/health/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    ...profile,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to save health profile')
            }

            const data = await response.json()

            // Set BMI result
            setBmiResult(data.bmiResult)

            // Generate diet plan
            const plan = generateDietPlan({
                ...profile,
                bmi: data.bmiResult.value,
                bmiCategory: data.bmiResult.category,
            })
            setDietPlan(plan)

            setSavedProfile(profile)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Container className="py-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Health Profile & Diet Plan
                    </h1>
                    <p className="text-lg text-gray-600">
                        Track your BMI and get personalized Indian diet suggestions
                    </p>
                </div>

                {/* Health Form */}
                {!bmiResult && (
                    <Card>
                        <HealthForm
                            onSubmit={handleSubmit}
                            isLoading={isLoading}
                            initialData={savedProfile || undefined}
                        />
                    </Card>
                )}

                {/* Loading State */}
                {isLoading && (
                    <Card className="text-center py-12">
                        <LoadingSpinner size="lg" className="mb-4" />
                        <p className="text-gray-600">Calculating your BMI and generating diet plan...</p>
                    </Card>
                )}

                {/* Error State */}
                {error && (
                    <Card className="bg-red-50 border-red-200 mb-8">
                        <p className="text-red-800">{error}</p>
                    </Card>
                )}

                {/* Results */}
                {bmiResult && dietPlan && !isLoading && (
                    <div className="space-y-8">
                        {/* BMI Result */}
                        <BMICard bmiResult={bmiResult} />

                        {/* Diet Plan */}
                        <DietPlan dietPlan={dietPlan} bmiCategory={bmiResult.category} />

                        {/* Update Profile Button */}
                        <Card>
                            <div className="text-center">
                                <button
                                    onClick={() => {
                                        setBmiResult(null)
                                        setDietPlan(null)
                                    }}
                                    className="text-primary-blue hover:text-blue-700 font-medium"
                                >
                                    Update Health Profile
                                </button>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </Container>
    )
}
