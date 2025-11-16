'use client'

import { useState, useRef } from 'react'
import Button from '../ui/Button'
import ErrorMessage from '../ui/ErrorMessage'

interface FileUploadProps {
    onFileSelect: (file: File) => void
    isLoading?: boolean
}

export default function FileUpload({ onFileSelect, isLoading = false }: FileUploadProps) {
    const [dragActive, setDragActive] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [error, setError] = useState<string>('')
    const [preview, setPreview] = useState<string>('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const validateFile = (file: File): string | null => {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
        if (!validTypes.includes(file.type)) {
            return 'Invalid file type. Please upload a JPEG, PNG, or PDF file.'
        }

        const maxSize = 10 * 1024 * 1024 // 10MB
        if (file.size > maxSize) {
            return 'File too large. Maximum size is 10MB.'
        }

        return null
    }

    const handleFile = (file: File) => {
        const validationError = validateFile(file)
        if (validationError) {
            setError(validationError)
            return
        }

        setError('')
        setSelectedFile(file)

        // Create preview for images
        if (file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        } else {
            setPreview('')
        }

        onFileSelect(file)
    }

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0])
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
        }
    }

    const handleButtonClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className="w-full">
            <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${dragActive
                    ? 'border-primary-green bg-green-50'
                    : 'border-gray-300 hover:border-primary-green'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={handleButtonClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleButtonClick()
                    }
                }}
                aria-label="Upload prescription file"
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/png,image/jpg,application/pdf"
                    onChange={handleChange}
                    disabled={isLoading}
                    aria-label="File input for prescription upload"
                />

                {!selectedFile ? (
                    <div className="space-y-4">
                        <div className="text-6xl">📋</div>
                        <div>
                            <p className="text-lg font-medium text-gray-900 mb-2">
                                Upload Prescription
                            </p>
                            <p className="text-sm text-gray-600 mb-4">
                                Drag and drop your prescription here, or click to browse
                            </p>
                            <Button type="button" disabled={isLoading}>
                                Choose File
                            </Button>
                        </div>
                        <p className="text-xs text-gray-500">
                            Supports: JPEG, PNG, PDF (Max 10MB)
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {preview && (
                            <img
                                src={preview}
                                alt="Prescription preview"
                                className="max-h-64 mx-auto rounded-lg"
                            />
                        )}
                        <div>
                            <p className="text-sm font-medium text-gray-900">
                                {selectedFile.name}
                            </p>
                            <p className="text-xs text-gray-500">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                        {!isLoading && (
                            <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedFile(null)
                                    setPreview('')
                                    if (fileInputRef.current) {
                                        fileInputRef.current.value = ''
                                    }
                                }}
                            >
                                Change File
                            </Button>
                        )}
                    </div>
                )}
            </div>

            {error && (
                <div className="mt-4">
                    <ErrorMessage message={error} />
                </div>
            )}
        </div>
    )
}
