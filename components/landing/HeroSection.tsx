import Link from 'next/link'
import Button from '../ui/Button'

export default function HeroSection() {
    return (
        <section className="py-20 bg-gradient-to-b from-green-50 to-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                    SwasthAI – Your Indian Health Companion
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
                    Scan prescriptions, track your health, get Indian diet tips, and know when to see a doctor.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/prescription">
                        <Button size="lg" className="w-full sm:w-auto">
                            Scan Prescription
                        </Button>
                    </Link>
                    <Link href="/symptoms">
                        <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                            Check Symptoms
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
