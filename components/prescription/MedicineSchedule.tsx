'use client'

import { Medicine } from '@/types/prescription'

interface MedicineScheduleProps {
    medicines: Medicine[]
}

export default function MedicineSchedule({ medicines }: MedicineScheduleProps) {
    const parseDosagePattern = (pattern: string) => {
        const parts = pattern.split('-')
        return {
            morning: parts[0] || '0',
            afternoon: parts[1] || '0',
            night: parts[2] || '0',
        }
    }

    return (
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
                    </tr>
                </thead>
                <tbody>
                    {medicines.map((medicine, index) => {
                        const dosage = parseDosagePattern(medicine.dosagePattern)
                        return (
                            <tr key={index} className="border-b hover:bg-gray-50">
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
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
