import Card from '../ui/Card'
import { DietPlan as DietPlanType } from '@/types/health'

interface DietPlanProps {
    dietPlan: DietPlanType
    bmiCategory: string
}

export default function DietPlan({ dietPlan, bmiCategory }: DietPlanProps) {
    return (
        <div className="space-y-6">
            {/* Meal Suggestions */}
            <Card>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Personalized Meal Plan
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Breakfast */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                            <span className="text-2xl mr-2">🌅</span>
                            Breakfast
                        </h4>
                        <ul className="space-y-1">
                            {dietPlan.breakfast.map((item, index) => (
                                <li key={index} className="text-sm text-gray-700">
                                    • {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Lunch */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                            <span className="text-2xl mr-2">☀️</span>
                            Lunch
                        </h4>

                        <ul className="space-y-1">
                            {dietPlan.lunch.map((item, index) => (
                                <li key={index} className="text-sm text-gray-700">
                                    • {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Snacks */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                            <span className="text-2xl mr-2">🍎</span>
                            Snacks
                        </h4>
                        <ul className="space-y-1">
                            {dietPlan.snacks.map((item, index) => (
                                <li key={index} className="text-sm text-gray-700">
                                    • {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Dinner */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                            <span className="text-2xl mr-2">🌙</span>
                            Dinner
                        </h4>
                        <ul className="space-y-1">
                            {dietPlan.dinner.map((item, index) => (
                                <li key={index} className="text-sm text-gray-700">
                                    • {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Card>

            {/* Good to Include */}
            <Card className="bg-green-50 border-green-200">
                <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
                    <span className="text-2xl mr-2">✅</span>
                    Good to Include
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {dietPlan.goodToInclude.map((item, index) => (
                        <li key={index} className="text-sm text-green-800">
                            • {item}
                        </li>
                    ))}
                </ul>
            </Card>

            {/* Limit/Avoid */}
            <Card className="bg-red-50 border-red-200">
                <h3 className="text-lg font-semibold text-red-900 mb-3 flex items-center">
                    <span className="text-2xl mr-2">⚠️</span>
                    Limit or Avoid
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {dietPlan.limitAvoid.map((item, index) => (
                        <li key={index} className="text-sm text-red-800">
                            • {item}
                        </li>
                    ))}
                </ul>
            </Card>

            {/* Disclaimer */}
            <Card className="bg-amber-50 border-amber-200">
                <p className="text-sm text-amber-900">
                    <strong>Disclaimer:</strong> This is general wellness guidance only, not a substitute
                    for a doctor or dietician. For personalized nutrition advice, especially if you have
                    health conditions, please consult a qualified healthcare professional.
                </p>
            </Card>
        </div>
    )
}
