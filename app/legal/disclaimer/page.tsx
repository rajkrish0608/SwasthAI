import Container from '@/components/layout/Container'
import Card from '@/components/ui/Card'

export default function DisclaimerPage() {
    return (
        <Container className="py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                    Medical Disclaimer
                </h1>

                <div className="space-y-6">
                    <Card className="bg-red-50 border-red-200">
                        <h2 className="text-xl font-semibold text-red-900 mb-3">
                            ⚠️ Important Notice
                        </h2>
                        <p className="text-red-800">
                            SwasthAI is NOT a medical device and is NOT a replacement for professional
                            medical advice, diagnosis, or treatment. In case of emergency, contact a
                            doctor or hospital immediately (call 108/102).
                        </p>
                    </Card>

                    <Card>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            Intended Use
                        </h2>
                        <p className="text-gray-700">
                            SwasthAI is a health information and wellness tool designed to help users:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                            <li>Understand their medical prescriptions</li>
                            <li>Track their health metrics (BMI, diet, etc.)</li>
                            <li>Get general guidance on common symptoms</li>
                            <li>Access health and wellness information</li>
                        </ul>
                    </Card>

                    <Card>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            Limitations
                        </h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>
                                <strong>Not a Diagnosis Tool:</strong> SwasthAI does not diagnose medical
                                conditions. Only qualified healthcare professionals can provide diagnoses.
                            </li>
                            <li>
                                <strong>Not a Prescription Service:</strong> SwasthAI helps you understand
                                existing prescriptions but does not prescribe medications.
                            </li>
                            <li>
                                <strong>OCR Accuracy:</strong> Prescription scanning may contain errors.
                                Always verify extracted information against the original prescription.
                            </li>
                            <li>
                                <strong>Symptom Checker Limitations:</strong> The symptom checker provides
                                general guidance only and may not account for all medical conditions or
                                individual circumstances.
                            </li>
                            <li>
                                <strong>Diet Suggestions:</strong> Diet plans are general wellness guidance
                                and not personalized medical nutrition therapy.
                            </li>
                        </ul>
                    </Card>

                    <Card>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            No Medical Advice
                        </h2>
                        <p className="text-gray-700">
                            The information provided by SwasthAI is for educational and informational
                            purposes only. It is not intended as a substitute for professional medical
                            advice, diagnosis, or treatment. Always seek the advice of your physician
                            or other qualified health provider with any questions you may have regarding
                            a medical condition.
                        </p>
                    </Card>

                    <Card>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            User Responsibility
                        </h2>
                        <p className="text-gray-700 mb-3">
                            By using SwasthAI, you acknowledge and agree that:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>You will not rely solely on SwasthAI for medical decisions</li>
                            <li>You will consult qualified healthcare professionals for medical advice</li>
                            <li>You will verify all prescription information with your doctor or pharmacist</li>
                            <li>You understand the limitations of AI and automated systems</li>
                            <li>You will seek immediate medical attention for emergencies</li>
                        </ul>
                    </Card>

                    <Card>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            Emergency Situations
                        </h2>
                        <p className="text-gray-700 mb-3">
                            If you are experiencing a medical emergency, do NOT use SwasthAI. Instead:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>Call emergency services: 108 (Ambulance) or 102 (Medical Emergency)</li>
                            <li>Go to the nearest emergency room</li>
                            <li>Contact your doctor immediately</li>
                        </ul>
                        <p className="text-gray-700 mt-3">
                            Emergency symptoms include: chest pain, difficulty breathing, severe bleeding,
                            loss of consciousness, severe injuries, stroke symptoms, severe allergic reactions.
                        </p>
                    </Card>

                    <Card>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            Liability Disclaimer
                        </h2>
                        <p className="text-gray-700">
                            SwasthAI and its creators, developers, and affiliates are not liable for any
                            damages, injuries, or adverse outcomes resulting from the use or misuse of
                            this application. Users assume all risks associated with using the information
                            and features provided.
                        </p>
                    </Card>

                    <Card className="bg-blue-50 border-blue-200">
                        <h2 className="text-xl font-semibold text-blue-900 mb-3">
                            Questions or Concerns?
                        </h2>
                        <p className="text-blue-800">
                            If you have questions about this disclaimer or SwasthAI's features, please
                            contact us. For medical questions, please consult a qualified healthcare
                            professional.
                        </p>
                    </Card>
                </div>

                <div className="mt-8 text-center text-sm text-gray-500">
                    Last updated: November 2025
                </div>
            </div>
        </Container>
    )
}
