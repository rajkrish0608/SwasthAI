'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import PrescriptionCard from '@/components/prescription/PrescriptionCard'
import { getUserId } from '@/lib/utils/userIdentification'

interface Prescription {
    id: string
    doctorName?: string
    prescribedAt?: string
    createdAt: string
    medicines: any[]
}

export default function PrescriptionHistoryPage() {
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchPrescriptions()
    }, [])

    const fetchPrescriptions = async () => {
        try {
            const userId = getUserId()
            const response = await fetch(`/api/prescription/list?userId=${userId}`)

            if (!response.ok) {
                throw new Error('Failed to fetch prescriptions')
            }

            const data = await response.json()
            setPrescriptions(data.prescriptions || [])
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Container className="py-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            Prescription History
                        </h1>
                        <p className="text-gray-600">
                            View and manage your saved prescriptions
                        </p>
                    </div>
                    <Link href="/prescription">
                        <Button>+ New Prescription</Button>
                    </Link>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <Card className="text-center py-12">
                        <LoadingSpinner size="lg" className="mb-4" />
                        <p className="text-gray-600">Loading prescriptions...</p>
                    </Card>
                )}

                {/* Error State */}
                {error && !isLoading && (
                    <Card className="bg-red-50 border-red-200">
                        <p className="text-red-800">{error}</p>
                    </Card>
                )}

                {/* Empty State */}
                {!isLoading && !error && prescriptions.length === 0 && (
                    <Card className="text-center py-12">
                        <div className="text-6xl mb-4">📋</div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            No Prescriptions Yet
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Start by scanning your first prescription
                        </p>
                        <Link href="/prescription">
                            <Button>Scan Prescription</Button>
                        </Link>
                    </Card>
                )}

                {/* Prescriptions List */}
                {!isLoading && !error && prescriptions.length > 0 && (
                    <div className="space-y-4">
                        {prescriptions.map((prescription) => (
                            <PrescriptionCard
                                key={prescription.id}
                                id={prescription.id}
                                doctorName={prescription.doctorName || undefined}
                                prescribedAt={prescription.prescribedAt ? new Date(prescription.prescribedAt) : undefined}
                                medicineCount={prescription.medicines.length}
                                createdAt={new Date(prescription.createdAt)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Container>
    )
}
