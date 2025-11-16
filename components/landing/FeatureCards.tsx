import Card from '../ui/Card'

export default function FeatureCards() {
    const features = [
        {
            title: 'Prescription Scanner',
            description: 'Upload your prescription and get an automated medicine schedule with reminders.',
            icon: '📋',
            color: 'bg-blue-50',
        },
        {
            title: 'BMI & Indian Diet',
            description: 'Track your health metrics and get personalized diet suggestions based on Indian cuisine.',
            icon: '🥗',
            color: 'bg-green-50',
        },
        {
            title: 'Symptom Checker',
            description: 'Describe your symptoms and get AI-powered guidance on when to see a doctor.',
            icon: '🩺',
            color: 'bg-purple-50',
        },
        {
            title: 'Built for India',
            description: 'Multi-language support, Indian foods, and designed for all ages and tech levels.',
            icon: '🇮🇳',
            color: 'bg-orange-50',
        },
    ]

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                    Everything You Need for Better Health
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} className="text-center hover:shadow-md transition-shadow">
                            <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center text-3xl mx-auto mb-4`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
