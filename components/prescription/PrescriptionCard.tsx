import Link from 'next/link'
import Card from '../ui/Card'
import Button from '../ui/Button'

interface PrescriptionCardProps {
    id: string
    doctorName?: string
    prescribedAt?: Date
    medicineCount: number
    createdAt: Date
}

export default function PrescriptionCard({
    id,
    doctorName,
    prescribedAt,
    medicineCount,
    createdAt,
}: PrescriptionCardProps) {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    return (
        <Card className="hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">📋</span>
                        <h3 className="text-lg font-semibold text-gray-900">
                            {doctorName || 'Prescription'}
                        </h3>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                        {prescribedAt && (
                            <p>
                                <span className="font-medium">Date:</span> {formatDate(prescribedAt)}
                            </p>
                        )}
                        <p>
                            <span className="font-medium">Medicines:</span> {medicineCount}
                        </p>
                        <p className="text-xs text-gray-500">
                            Saved on {formatDate(createdAt)}
                        </p>
                    </div>
                </div>
                <div>
                    <Link href={`/prescription/${id}`}>
                        <Button size="sm">View</Button>
                    </Link>
                </div>
            </div>
        </Card>
    )
}
