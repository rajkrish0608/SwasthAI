'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Container from './Container'

export default function Navbar() {
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/prescription', label: 'Scan Prescription' },
        { href: '/health', label: 'Health Profile' },
        { href: '/symptoms', label: 'Symptoms' },
    ]

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/'
        return pathname.startsWith(href)
    }

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <Container>
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2 rounded-lg" aria-label="SwasthAI Home">
                        <div className="w-8 h-8 bg-primary-green rounded-lg flex items-center justify-center" aria-hidden="true">
                            <span className="text-white font-bold text-lg">S</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">SwasthAI</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8" role="navigation" aria-label="Main navigation">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2 rounded px-2 py-1 ${isActive(link.href)
                                    ? 'text-primary-green'
                                    : 'text-gray-600 hover:text-primary-green'
                                    }`}
                                aria-current={isActive(link.href) ? 'page' : undefined}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary-green hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-expanded={mobileMenuOpen}
                        aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
                    >
                        <span className="sr-only">{mobileMenuOpen ? 'Close' : 'Open'} main menu</span>
                        {mobileMenuOpen ? (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200" role="navigation" aria-label="Mobile navigation">
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2 rounded px-2 py-1 ${isActive(link.href)
                                        ? 'text-primary-green'
                                        : 'text-gray-600 hover:text-primary-green'
                                        }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    aria-current={isActive(link.href) ? 'page' : undefined}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </Container>
        </nav>
    )
}
