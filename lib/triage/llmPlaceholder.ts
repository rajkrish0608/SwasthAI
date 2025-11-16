import { SymptomInput, TriageResult } from '@/types/symptom'
import { assessSymptoms } from './triageEngine'

/**
 * LLM Integration Placeholder
 * 
 * This function is a placeholder for future LLM integration (OpenAI, Anthropic, etc.)
 * Currently uses the rule-based triage engine
 * 
 * To integrate with an LLM:
 * 1. Add your API key to .env: LLM_API_KEY=your-key-here
 * 2. Install the LLM SDK: npm install openai (or other provider)
 * 3. Implement the API call below
 * 4. Parse the LLM response into TriageResult format
 */
export async function callLLMForSymptomAdvice(
    input: SymptomInput
): Promise<TriageResult> {
    // TODO: Integrate with LLM provider
    // Example OpenAI integration:
    /*
    const apiKey = process.env.LLM_API_KEY
    
    if (!apiKey) {
      console.warn('LLM_API_KEY not configured, using rule-based engine')
      return assessSymptoms(input)
    }
  
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are a medical triage assistant for India. Classify symptoms as LOW, MEDIUM, or HIGH risk.
              Consider Indian diseases like malaria, dengue, typhoid, etc.
              Provide home care tips and doctor recommendations.
              Always include safety disclaimers.`
            },
            {
              role: 'user',
              content: `Patient symptoms: ${input.description}
              Age: ${input.age || 'not provided'}
              Gender: ${input.gender || 'not provided'}
              
              Provide triage assessment in JSON format:
              {
                "riskLevel": "LOW|MEDIUM|HIGH",
                "summary": "brief summary",
                "homeCareTips": ["tip1", "tip2"],
                "doctorRecommendation": "recommendation"
              }`
            }
          ],
          temperature: 0.3,
        }),
      })
  
      const data = await response.json()
      const result = JSON.parse(data.choices[0].message.content)
      
      return result as TriageResult
    } catch (error) {
      console.error('LLM call failed, falling back to rule-based engine:', error)
      return assessSymptoms(input)
    }
    */

    // For now, use rule-based engine
    console.log('Using rule-based triage engine (LLM not configured)')
    return assessSymptoms(input)
}

/**
 * Check if LLM is configured
 */
export function isLLMConfigured(): boolean {
    return !!process.env.LLM_API_KEY
}
