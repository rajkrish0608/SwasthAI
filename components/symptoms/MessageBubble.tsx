import { ChatMessage } from '@/types/symptom'
import Badge from '../ui/Badge'

interface MessageBubbleProps {
    message: ChatMessage
}

export default function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.role === 'user'

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
                <div
                    className={`rounded-lg px-4 py-3 ${isUser
                            ? 'bg-primary-blue text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>

                {/* Triage Result */}
                {message.triageResult && !isUser && (
                    <div className="mt-3 space-y-3">
                        {/* Risk Badge */}
                        <div>
                            <Badge
                                variant={
                                    message.triageResult.riskLevel === 'LOW'
                                        ? 'low'
                                        : message.triageResult.riskLevel === 'MEDIUM'
                                            ? 'medium'
                                            : 'high'
                                }
                            >
                                {message.triageResult.riskLevel} RISK
                            </Badge>
                        </div>

                        {/* Summary */}
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <p className="text-sm font-medium text-gray-900 mb-2">
                                Assessment:
                            </p>
                            <p className="text-sm text-gray-700">
                                {message.triageResult.summary}
                            </p>
                        </div>

                        {/* Home Care Tips */}
                        {message.triageResult.homeCareTips.length > 0 && (
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <p className="text-sm font-medium text-gray-900 mb-2">
                                    Home Care Tips:
                                </p>
                                <ul className="space-y-1">
                                    {message.triageResult.homeCareTips.map((tip, index) => (
                                        <li key={index} className="text-sm text-gray-700">
                                            • {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Doctor Recommendation */}
                        <div
                            className={`rounded-lg p-3 border ${message.triageResult.riskLevel === 'HIGH'
                                    ? 'bg-red-50 border-red-200'
                                    : message.triageResult.riskLevel === 'MEDIUM'
                                        ? 'bg-amber-50 border-amber-200'
                                        : 'bg-blue-50 border-blue-200'
                                }`}
                        >
                            <p className="text-sm font-medium text-gray-900 mb-1">
                                Recommendation:
                            </p>
                            <p className="text-sm text-gray-800">
                                {message.triageResult.doctorRecommendation}
                            </p>
                        </div>
                    </div>
                )}

                <p className="text-xs text-gray-500 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
            </div>
        </div>
    )
}
