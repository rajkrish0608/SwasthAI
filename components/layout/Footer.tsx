import Link from 'next/link'
import Container from './Container'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const footerLinks = [
        { href: '/about', label: 'About' },
        { href: '/privacy', label: 'Privacy' },
        { href: '/legal/disclaimer', label: 'Disclaimer' },
        { href: '/contact', label: 'Contact' },
    ]

    return (
        <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
            <Container>
                <div className="py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/* Logo and tagline */}
                        <div className="flex flex-col items-center md:items-start">
                            <div className="flex items-center space-x-2 mb-2">
                                <div className="w-6 h-6 bg-primary-green rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">S</span>
                                </div>
                                <span className="text-lg font-bold text-gray-900">SwasthAI</span>
                            </div>
                            <p className="text-sm text-gray-600">Your Indian Health Companion</p>
                        </div>

                        {/* Links */}
                        <div className="flex flex-wrap justify-center gap-6">
                            {footerLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-gray-600 hover:text-primary-green transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Copyright and disclaimer */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-xs text-gray-500 text-center">
                            © {currentYear} SwasthAI. All rights reserved.
                        </p>
                        <p className="text-xs text-gray-500 text-center mt-2">
                            SwasthAI is not a medical device and is not a replacement for professional medical advice.
                        </p>
                    </div>
                </div>
            </Container>
        </footer>
    )
}
