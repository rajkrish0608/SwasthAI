import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    children: React.ReactNode
}

export default function Button({
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    ...props
}: ButtonProps) {
    const baseStyles = 'font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2'

    const variantStyles = {
        primary: 'bg-primary-green text-white hover:bg-green-600 active:bg-green-700 focus:ring-primary-green',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 focus:ring-gray-400',
        danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-600',
    }

    const sizeStyles = {
        sm: 'px-4 py-2 text-sm min-h-[36px]',
        md: 'px-6 py-3 text-base min-h-[44px]',
        lg: 'px-8 py-4 text-lg min-h-[52px]',
    }

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}
