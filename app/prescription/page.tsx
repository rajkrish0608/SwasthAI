'use client'

import { useState } from 'react'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import FileUpload from '@/components/prescription/FileUpload'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import EditableMedicineRow from '@/components/prescription/EditableMedicineRow'
import { ExtractedPrescriptionData, Medicine } from '@/types/prescription'
import { getUserId } from '@/lib/utils/userIdentification'
import { useRouter } from 'next/navigation'

export default function PrescriptionPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [extractedData, setExtractedData] = useState<ExtractedPrescriptionData | null>(null)
    const [medicines, setMedicines] = useState<Medicine[]>([])
    const [doctorName, setDoctorName] = useState('')
    const [prescriptionDate, setPrescriptionDate] = useState('')
    const [notes, setNotes] = useState('')
    const [error, setError] = useState<string>('')
    const [showSchedule, setShowSchedule] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)

    const handleFileSelect = async (file: File) => {
        setIsLoading(true)
        setError('')
        setExtractedData(null)
        setShowSchedule(false)

        try {
            const formData = new FormData()
            formData.append('file', file)

            const response = await fetch('/api/prescription/extract', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to extract prescription')
            }

            const data = await response.json()
            setExtractedData(data)
            setMedicines(data.medicines || [])
            setDoctorName(data.doctorName || '')
            setPrescriptionDate(data.date || new Date().toISOString().split('T')[0])
            setShowSchedule(true)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    const handleUpdateMedicine = (index: number, updatedMedicine: Medicine) => {
        const newMedicines = [...medicines]
        newMedicines[index] = updatedMedicine
        setMedicines(newMedicines)
    }

    const handleRemoveMedicine = (index: number) => {
        setMedicines(medicines.filter((_, i) => i !== index))
    }

    const handleAddMedicine = () => {
        setMedicines([
            ...medicines,
            {
                name: '',
                dosagePattern: '0-0-0',
                durationDays: 7,
                notes: '',
            },
        ])
    }

    const handleSavePrescription = async () => {
        setIsSaving(true)
        setError('')
        setSaveSuccess(false)

        try {
            const userId = getUserId()

            const response = await fetch('/api/prescription/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    doctorName,
                    prescribedAt: prescriptionDate,
                    notes,
                    medicines,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to save prescription')
            }

            setSaveSuccess(true)
            setTimeout(() => {
                router.push('/prescription/history')
            }, 1500)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save prescription')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <Container className="py-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Prescription Scanner
                    </h1>
                    <p className="text-lg text-gray-600">
                        Upload your prescription to get an automated medicine schedule
                    </p>
                </div>

                {/* Disclaimer */}
                <Card className="mb-8 bg-amber-50 border-amber-200">
                    <div className="flex items-start">
                        <svg
                            className="w-6 h-6 text-amber-600 mt-0.5 mr-3 flex-shrink-0"
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
                            <p className="text-sm font-medium text-amber-900">
                                Important: This tool only helps you understand your prescription.
                            </p>
                            <p className="text-sm text-amber-800 mt-1">
                                Always follow your doctor's advice and consult them if you have any questions.
                            </p>
                        </div>
                    </div>
                </Card>

                {/* File Upload */}
                {!showSchedule && (
                    <Card className="mb-8">
                        <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} />
                    </Card>
                )}

                {/* Loading State */}
                {isLoading && (
                    <Card className="text-center py-12">
                        <LoadingSpinner size="lg" className="mb-4" />
                        <p className="text-gray-600">Extracting prescription data...</p>
                        <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
                    </Card>
                )}

                {/* Error State */}
                {error && (
                    <Card className="bg-red-50 border-red-200 mb-8">
                        <div className="flex items-start">
                            <svg
                                className="w-6 h-6 text-red-600 mt-0.5 mr-3 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div>
                                <p className="text-sm font-medium text-red-900">Error</p>
                                <p className="text-sm text-red-800 mt-1">{error}</p>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Medicine Schedule Editor */}
                {showSchedule && medicines.length > 0 && (
                    <div className="space-y-6">
                        {/* Prescription Details */}
                        <Card>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Prescription Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Doctor Name
                                    </label>
                                    <input
                                        type="text"
                                        value={doctorName}
                                        onChange={(e) => setDoctorName(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                                        placeholder="Dr. Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={prescriptionDate}
                                        onChange={(e) => setPrescriptionDate(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </Card>

                        {/* Medicine Schedule Table */}
                        <Card>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Medicine Schedule
                                </h2>
                                <Button size="sm" onClick={handleAddMedicine}>
                                    + Add Medicine
                                </Button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">
                                                Medicine Name
                                            </th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b">
                                                Morning
                                            </th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b">
                                                Afternoon
                                            </th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b">
                                                Night
                                            </th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b">
                                                Duration
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">
                                                Notes
                                            </th>
                                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 border-b">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {medicines.map((medicine, index) => (
                                            <EditableMedicineRow
                                                key={index}
                                                medicine={medicine}
                                                onUpdate={(updated) => handleUpdateMedicine(index, updated)}
                                                onRemove={() => handleRemoveMedicine(index)}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                        {/* Actions */}
                        <Card>
                            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        setShowSchedule(false)
                                        setMedicines([])
                                        setExtractedData(null)
                                    }}
                                >
                                    Scan Another Prescription
                                </Button>
                                <div className="flex gap-4">
                                    <Link href="/prescription/history">
                                        <Button variant="secondary">View History</Button>
                                    </Link>
                                    <Button
                                        onClick={handleSavePrescription}
                                        disabled={isSaving || medicines.length === 0}
                                    >
                                        {isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Prescription'}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </Container>
    )
}
