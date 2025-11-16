'use client'

import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from '@/types/symptom'
import MessageBubble from './MessageBubble'
import Button from '../ui/Button'
import LoadingSpinner from '../ui/LoadingSpinner'

interface ChatInterfaceProps {
    onSendMessage: (message: string) => Promise<void>
    messages: ChatMessage[]
    isLoading: boolean
}

export default function ChatInterface({
    onSendMessage,
    messages,
    isLoading,
}: ChatInterfaceProps) {
    const [input, setInput] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        const message = input.trim()
        setInput('')
        await onSendMessage(message)
    }

    return (
        <div className="flex flex-col h-[600px] bg-white rounded-xl border border-gray-200">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                ))}

                {isLoading && (
                    <div className="flex justify-start mb-4">
                        <div className="bg-gray-100 rounded-lg px-4 py-3">
                            <LoadingSpinner size="sm" />
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Describe your symptoms..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                        disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading || !input.trim()}>
                        Send
                    </Button>
                </form>
            </div>
        </div>
    )
}
