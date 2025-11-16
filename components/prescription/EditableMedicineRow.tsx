'use client'

import { useState } from 'react'
import { Medicine } from '@/types/prescription'
import Input from '../ui/Input'
import Button from '../ui/Button'

interface EditableMedicineRowProps {
    medicine: Medicine
    onUpdate: (medicine: Medicine) => void
    onRemove: () => void
}

export default function EditableMedicineRow({
    medicine,
    onUpdate,
    onRemove,
}: EditableMedicineRowProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedMedicine, setEditedMedicine] = useState(medicine)

    const parseDosagePattern = (pattern: string) => {
        const parts = pattern.split('-')
        return {
            morning: parts[0] || '0',
            afternoon: parts[1] || '0',
            night: parts[2] || '0',
        }
    }

    const createDosagePattern = (morning: string, afternoon: string, night: string) => {
        return `${morning}-${afternoon}-${night}`
    }

    const dosage = parseDosagePattern(editedMedicine.dosagePattern)

    const handleSave = () => {
        onUpdate(editedMedicine)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setEditedMedicine(medicine)
        setIsEditing(false)
    }

    if (!isEditing) {
        return (
            <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {medicine.name}
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-700">
                    {dosage.morning}
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-700">
                    {dosage.afternoon}
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-700">
                    {dosage.night}
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-700">
                    {medicine.durationDays ? `${medicine.durationDays} days` : '-'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                    {medicine.notes || '-'}
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </Button>
                    <Button
                        size="sm"
                        variant="danger"
                        onClick={onRemove}
                    >
                        Remove
                    </Button>
                </td>
            </tr>
        )
    }

    return (
        <tr className="border-b bg-blue-50">
            <td className="px-4 py-3">
                <Input
                    value={editedMedicine.name}
                    onChange={(e) =>
                        setEditedMedicine({ ...editedMedicine, name: e.target.value })
                    }
                    placeholder="Medicine name"
                />
            </td>
            <td className="px-4 py-3">
                <Input
                    type="text"
                    value={dosage.morning}
                    onChange={(e) =>
                        setEditedMedicine({
                            ...editedMedicine,
                            dosagePattern: createDosagePattern(
                                e.target.value,
                                dosage.afternoon,
                                dosage.night
                            ),
                        })
                    }
                    placeholder="0"
                    className="text-center"
                />
            </td>
            <td className="px-4 py-3">
                <Input
                    type="text"
                    value={dosage.afternoon}
                    onChange={(e) =>
                        setEditedMedicine({
                            ...editedMedicine,
                            dosagePattern: createDosagePattern(
                                dosage.morning,
                                e.target.value,
                                dosage.night
                            ),
                        })
                    }
                    placeholder="0"
                    className="text-center"
                />
            </td>
            <td className="px-4 py-3">
                <Input
                    type="text"
                    value={dosage.night}
                    onChange={(e) =>
                        setEditedMedicine({
                            ...editedMedicine,
                            dosagePattern: createDosagePattern(
                                dosage.morning,
                                dosage.afternoon,
                                e.target.value
                            ),
                        })
                    }
                    placeholder="0"
                    className="text-center"
                />
            </td>
            <td className="px-4 py-3">
                <Input
                    type="number"
                    value={editedMedicine.durationDays || ''}
                    onChange={(e) =>
                        setEditedMedicine({
                            ...editedMedicine,
                            durationDays: parseInt(e.target.value) || undefined,
                        })
                    }
                    placeholder="Days"
                />
            </td>
            <td className="px-4 py-3">
                <Input
                    value={editedMedicine.notes || ''}
                    onChange={(e) =>
                        setEditedMedicine({ ...editedMedicine, notes: e.target.value })
                    }
                    placeholder="Notes"
                />
            </td>
            <td className="px-4 py-3 text-right space-x-2">
                <Button size="sm" onClick={handleSave}>
                    Save
                </Button>
                <Button size="sm" variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
            </td>
        </tr>
    )
}
