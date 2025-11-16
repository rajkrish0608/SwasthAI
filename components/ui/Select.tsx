import React from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    error?: string
    helperText?: string
    options: { value: string; label: string }[]
}

export default function Select({
    label,
    error,
    helperText,
    options,
    className = '',
    id,
    ...props
}: SelectProps) {
    const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-')}`
    const errorId = error ? `${selectId}-error` : undefined
    const helperId = helperText ? `${selectId}-helper` : undefined

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                    {props.required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
                </label>
            )}
            <select
                id={selectId}
                className={`w-full px-4 py-3 border rounded-lg text-base transition-colors ${error
                    ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent'
                    : 'border-gray-300 focus:ring-2 focus:ring-primary-blue focus:border-transparent'
                    } disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? errorId : helperId}
                {...props}
            >
                <option value="">Select an option</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">{error}</p>
            )}
            {helperText && !error && (
                <p id={helperId} className="mt-1 text-sm text-gray-500">{helperText}</p>
            )}
        </div>
    )
}
