import Card from '../ui/Card'
import { BMIResult } from '@/types/health'

interface BMICardProps {
    bmiResult: BMIResult
}

export default function BMICard({ bmiResult }: BMICardProps) {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-800 border-blue-200',
        green: 'bg-green-100 text-green-800 border-green-200',
        yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        red: 'bg-red-100 text-red-800 border-red-200',
    }

    const bgColorClasses = {
        blue: 'bg-blue-50',
        green: 'bg-green-50',
        yellow: 'bg-yellow-50',
        red: 'bg-red-50',
    }

    return (
        <Card className={`${bgColorClasses[bmiResult.color as keyof typeof bgColorClasses]} border-2`}>
            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your BMI Result</h3>

                {/* BMI Value */}
                <div className="mb-4">
                    <div className="text-5xl font-bold text-gray-900 mb-2">
                        {bmiResult.value}
                    </div>
                    <div
                        className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border ${colorClasses[bmiResult.color as keyof typeof colorClasses]
                            }`}
                    >
                        {bmiResult.category}
                    </div>
                </div>

                {/* BMI Scale */}
                <div className="mb-6">
                    <div className="h-3 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-400 rounded-full relative">
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-900 rounded-full border-2 border-white shadow-lg"
                            style={{
                                left: `${Math.min(Math.max(((bmiResult.value - 15) / 25) * 100, 0), 100)}%`,
                                transform: 'translate(-50%, -50%)',
                            }}
                        />
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-2">
                        <span>15</span>
                        <span>18.5</span>
                        <span>25</span>
                        <span>30</span>
                        <span>40</span>
                    </div>
                </div>

                {/* Risk Hint */}
                <div className="text-sm text-gray-700 bg-white rounded-lg p-4">
                    <p className="font-medium mb-1">What this means:</p>
                    <p>{bmiResult.riskHint}</p>
                </div>

                {/* BMI Categories Reference */}
                <div className="mt-6 text-left">
                    <p className="text-xs font-semibold text-gray-700 mb-2">BMI Categories:</p>
                    <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex justify-between">
                            <span>Underweight:</span>
                            <span className="font-medium">&lt; 18.5</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Normal:</span>
                            <span className="font-medium">18.5 - 24.9</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Overweight:</span>
                            <span className="font-medium">25 - 29.9</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Obese:</span>
                            <span className="font-medium">≥ 30</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
