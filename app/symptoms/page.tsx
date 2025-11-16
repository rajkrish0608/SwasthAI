'use client'

import { useState } from 'react'
import Container from '@/components/layout/Container'
import Card from '@/components/ui/Card'
import ChatInterface from '@/components/symptoms/ChatInterface'
import { ChatMessage } from '@/types/symptom'
import { getGreetingMessage } from '@/lib/triage/triageEngine'
import { getUserId } from '@/lib/utils/userIdentification'

export default function SymptomsPage() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            role: 'assistant',
            content: getGreetingMessage(),
            timestamp: new Date(),
        },
    ])
    const [isLoading, setIsLoading] = useState(false)

    const handleSendMessage = async (message: string) => {
        // Add user message
        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: message,
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, userMessage])

        setIsLoading(true)

        try {
            const userId = getUserId()

            const response = await fetch('/api/triage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: message,
                    userId,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to assess symptoms')
            }

            const triageResult = await response.json()

            // Add assistant response
            const assistantMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'I\'ve assessed your symptoms. Here\'s what I found:',
                timestamp: new Date(),
                triageResult,
            }
            setMessages((prev) => [...prev, assistantMessage])
        } catch (error) {
            // Add error message
            const errorMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again or consult a doctor directly.',
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Container className="py-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Symptom Checker
                    </h1>
                    <p className="text-lg text-gray-600">
                        Describe your symptoms and get guidance on what to do next
                    </p>
                </div>

                {/* Disclaimer */}
                <Card className="mb-8 bg-red-50 border-red-200">
                    <div className="flex items-start">
                        <svg
                            className="w-6 h-6 text-red-600 mt-0.5 mr-3 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <div>
                            <p className="text-sm font-medium text-red-900">
                                Important: This tool does NOT provide diagnosis or prescriptions.
                            </p>
                            <p className="text-sm text-red-800 mt-1">
                                For emergencies, contact a doctor or hospital immediately (call 108/102).
                                This is guidance only - always consult a healthcare professional for medical advice.
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Chat Interface */}
                <ChatInterface
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                />

                {/* Additional Info */}
                <Card className="mt-8 bg-blue-50 border-blue-200">
                    <h3 className="text-sm font-semibold text-blue-900 mb-2">
                        When to seek immediate medical attention:
                    </h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Chest pain or difficulty breathing</li>
                        <li>• Severe bleeding or injuries</li>
                        <li>• Loss of consciousness or confusion</li>
                        <li>• Severe allergic reactions</li>
                        <li>• Symptoms of stroke (face drooping, arm weakness, speech difficulty)</li>
                    </ul>
                </Card>
            </div>
        </Container>
    )
}
