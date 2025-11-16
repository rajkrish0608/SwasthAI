'use client'

import { useState } from 'react'
import Container from '@/components/layout/Container'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function ConsultPage() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        city: '',
        concern: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error('Failed to join waitlist')
            }

            setSubmitted(true)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (submitted) {
        return (
            <Container className="py-12">
                <div className="max-w-2xl mx-auto text-center">
                    <Card className="bg-green-50 border-green-200">
                        <div className="text-6xl mb-4">✅</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Thank You!
                        </h2>
                        <p className="text-gray-700 mb-2">
                            You've been added to our teleconsultation waitlist.
                        </p>
                        <p className="text-gray-600">
                            We'll contact you at {formData.phone} when this feature is available.
                        </p>
                    </Card>
                </div>
            </Container>
        )
    }

    return (
        <Container className="py-12">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🩺</div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Teleconsultation
                    </h1>
                    <p className="text-lg text-gray-600">
                        Coming Soon: Talk to real doctors via video or audio
                    </p>
                </div>

                {/* Feature Description */}
                <Card className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        What to Expect
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">📹</span>
                            <div>
                                <h3 className="font-medium text-gray-900">Video & Audio Consultations</h3>
                                <p className="text-sm text-gray-600">
                                    Connect with qualified doctors from the comfort of your home
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">💊</span>
                            <div>
                                <h3 className="font-medium text-gray-900">Digital Prescriptions</h3>
                                <p className="text-sm text-gray-600">
                                    Receive prescriptions directly in the app
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🌐</span>
                            <div>
                                <h3 className="font-medium text-gray-900">Low-Bandwidth Support</h3>
                                <p className="text-sm text-gray-600">
                                    Works even with slow internet connections
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🗣️</span>
                            <div>
                                <h3 className="font-medium text-gray-900">Multiple Languages</h3>
                                <p className="text-sm text-gray-600">
                                    Consult in your preferred Indian language
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Waitlist Form */}
                <Card>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Join the Waitlist
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Be the first to know when teleconsultation is available
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            placeholder="Your full name"
                        />
                        <Input
                            label="Phone Number"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                            placeholder="10-digit mobile number"
                        />
                        <Input
                            label="City"
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            placeholder="Your city"
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Primary Health Concern
                            </label>
                            <textarea
                                value={formData.concern}
                                onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                                rows={3}
                                placeholder="What would you like to consult about?"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                        )}

                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                        </Button>
                    </form>
                </Card>
            </div>
        </Container>
    )
}
