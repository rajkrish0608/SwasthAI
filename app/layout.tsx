import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'SwasthAI - Your Indian Health Companion',
    description: 'Scan prescriptions, track your health, get Indian diet tips, and know when to see a doctor.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} flex flex-col min-h-screen`}>
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
