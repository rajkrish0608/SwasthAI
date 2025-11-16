import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    helperText?: string
}

export default function Input({
    label,
    error,
    helperText,
    className = '',
    id,
    ...props
}: InputProps) {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`
    const errorId = error ? `${inputId}-error` : undefined
    const helperId = helperText ? `${inputId}-helper` : undefined

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                    {props.required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
                </label>
            )}
            <input
                id={inputId}
                className={`w-full px-4 py-3 border rounded-lg text-base transition-colors ${error
                    ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent'
                    : 'border-gray-300 focus:ring-2 focus:ring-primary-blue focus:border-transparent'
                    } disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? errorId : helperId}
                {...props}
            />
            {error && (
                <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">{error}</p>
            )}
            {helperText && !error && (
                <p id={helperId} className="mt-1 text-sm text-gray-500">{helperText}</p>
            )}
        </div>
    )
}
