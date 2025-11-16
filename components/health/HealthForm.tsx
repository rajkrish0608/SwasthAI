'use client'

import { useState } from 'react'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Button from '../ui/Button'
import { HealthProfile } from '@/types/health'

interface HealthFormProps {
    onSubmit: (profile: HealthProfile) => void
    isLoading?: boolean
    initialData?: HealthProfile
}

export default function HealthForm({ onSubmit, isLoading = false, initialData }: HealthFormProps) {
    const [formData, setFormData] = useState<HealthProfile>(initialData || {})
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleChange = (field: keyof HealthProfile, value: any) => {
        setFormData({ ...formData, [field]: value })
        // Clear error for this field
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' })
        }
    }

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {}

        if (!formData.age || formData.age < 1 || formData.age > 120) {
            newErrors.age = 'Age must be between 1 and 120'
        }

        if (!formData.heightCm || formData.heightCm < 50 || formData.heightCm > 250) {
            newErrors.heightCm = 'Height must be between 50 and 250 cm'
        }

        if (!formData.weightKg || formData.weightKg < 20 || formData.weightKg > 300) {
            newErrors.weightKg = 'Weight must be between 20 and 300 kg'
        }

        if (formData.bpSystolic && (formData.bpSystolic < 60 || formData.bpSystolic > 250)) {
            newErrors.bpSystolic = 'Systolic BP must be between 60 and 250'
        }

        if (formData.bpDiastolic && (formData.bpDiastolic < 40 || formData.bpDiastolic > 150)) {
            newErrors.bpDiastolic = 'Diastolic BP must be between 40 and 150'
        }

        if (formData.bloodSugar && (formData.bloodSugar < 50 || formData.bloodSugar > 500)) {
            newErrors.bloodSugar = 'Blood sugar must be between 50 and 500'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validate()) {
            onSubmit(formData)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Age"
                        type="number"
                        value={formData.age || ''}
                        onChange={(e) => handleChange('age', parseInt(e.target.value) || undefined)}
                        error={errors.age}
                        required
                        placeholder="Enter your age"
                    />
                    <Select
                        label="Gender"
                        value={formData.gender || ''}
                        onChange={(e) => handleChange('gender', e.target.value)}
                        options={[
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' },
                            { value: 'other', label: 'Other' },
                        ]}
                        required
                    />
                </div>
            </div>

            {/* Physical Measurements */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Physical Measurements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Height (cm)"
                        type="number"
                        value={formData.heightCm || ''}
                        onChange={(e) => handleChange('heightCm', parseFloat(e.target.value) || undefined)}
                        error={errors.heightCm}
                        required
                        placeholder="e.g., 170"
                    />
                    <Input
                        label="Weight (kg)"
                        type="number"
                        value={formData.weightKg || ''}
                        onChange={(e) => handleChange('weightKg', parseFloat(e.target.value) || undefined)}
                        error={errors.weightKg}
                        required
                        placeholder="e.g., 70"
                    />
                </div>
            </div>

            {/* Health Metrics (Optional) */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Metrics (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        label="BP Systolic"
                        type="number"
                        value={formData.bpSystolic || ''}
                        onChange={(e) => handleChange('bpSystolic', parseInt(e.target.value) || undefined)}
                        error={errors.bpSystolic}
                        placeholder="e.g., 120"
                        helperText="Upper number"
                    />
                    <Input
                        label="BP Diastolic"
                        type="number"
                        value={formData.bpDiastolic || ''}
                        onChange={(e) => handleChange('bpDiastolic', parseInt(e.target.value) || undefined)}
                        error={errors.bpDiastolic}
                        placeholder="e.g., 80"
                        helperText="Lower number"
                    />
                    <Input
                        label="Blood Sugar (mg/dL)"
                        type="number"
                        value={formData.bloodSugar || ''}
                        onChange={(e) => handleChange('bloodSugar', parseInt(e.target.value) || undefined)}
                        error={errors.bloodSugar}
                        placeholder="e.g., 100"
                        helperText="Fasting or random"
                    />
                </div>
            </div>

            {/* Lifestyle */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lifestyle</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                        label="Activity Level"
                        value={formData.activityLevel || ''}
                        onChange={(e) => handleChange('activityLevel', e.target.value)}
                        options={[
                            { value: 'low', label: 'Low (Sedentary)' },
                            { value: 'medium', label: 'Medium (Moderate exercise)' },
                            { value: 'high', label: 'High (Very active)' },
                        ]}
                    />
                    <Select
                        label="Food Preference"
                        value={formData.foodPreference || ''}
                        onChange={(e) => handleChange('foodPreference', e.target.value)}
                        options={[
                            { value: 'veg', label: 'Vegetarian' },
                            { value: 'nonveg', label: 'Non-Vegetarian' },
                            { value: 'eggetarian', label: 'Eggetarian' },
                        ]}
                    />
                </div>
            </div>

            {/* Region */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                <Select
                    label="Region"
                    value={formData.region || ''}
                    onChange={(e) => handleChange('region', e.target.value)}
                    options={[
                        { value: 'north', label: 'North India' },
                        { value: 'south', label: 'South India' },
                        { value: 'east', label: 'East India' },
                        { value: 'west', label: 'West India' },
                    ]}
                    helperText="Helps provide region-specific diet suggestions"
                />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <Button type="submit" disabled={isLoading} size="lg">
                    {isLoading ? 'Calculating...' : 'Calculate BMI & Get Diet Plan'}
                </Button>
            </div>
        </form>
    )
}
