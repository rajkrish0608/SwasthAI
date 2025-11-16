import Card from '../ui/Card'

export default function BuiltForIndiaSection() {
    const features = [
        {
            title: 'Multi-Language Support',
            description: 'Available in Hindi, Tamil, Telugu, and more Indian languages.',
            icon: '🗣️',
        },
        {
            title: 'Indian Cuisine Database',
            description: 'Diet suggestions based on regional Indian foods you actually eat.',
            icon: '🍛',
        },
        {
            title: 'Elder-Friendly Design',
            description: 'Large buttons, clear text, and simple navigation for all ages.',
            icon: '👴',
        },
        {
            title: 'Works Offline',
            description: 'Core features work even with poor internet connectivity.',
            icon: '📱',
        },
    ]

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Built for India
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Designed specifically for Indian users, with features that work in real Indian conditions.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} className="text-center">
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {feature.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
