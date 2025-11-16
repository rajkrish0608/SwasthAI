import React from 'react'

interface BadgeProps {
    variant: 'low' | 'medium' | 'high' | 'info'
    children: React.ReactNode
    className?: string
}

export default function Badge({ variant, children, className = '' }: BadgeProps) {
    const variantStyles = {
        low: 'bg-green-100 text-green-800 border-green-200',
        medium: 'bg-amber-100 text-amber-800 border-amber-200',
        high: 'bg-red-100 text-red-800 border-red-200',
        info: 'bg-blue-100 text-blue-800 border-blue-200',
    }

    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${variantStyles[variant]} ${className}`}
        >
            {children}
        </span>
    )
}
