/**
 * Environment Variable Validation
 * 
 * This utility validates required environment variables on application startup
 * and provides helpful error messages if configuration is missing or invalid.
 */

interface EnvConfig {
    DATABASE_URL: string
    NODE_ENV: string
    USE_MOCK_OCR: string
    LLM_PROVIDER?: string
    LLM_API_KEY?: string
}

/**
 * Validate required environment variables
 * Throws an error if any required variables are missing or invalid
 */
export function validateEnv(): EnvConfig {
    const errors: string[] = []

    // Required variables
    if (!process.env.DATABASE_URL) {
        errors.push('DATABASE_URL is required. Set it in your .env file.')
    }

    if (!process.env.NODE_ENV) {
        errors.push('NODE_ENV is required. Should be "development", "production", or "test".')
    } else if (!['development', 'production', 'test'].includes(process.env.NODE_ENV)) {
        errors.push(`NODE_ENV must be "development", "production", or "test". Got: ${process.env.NODE_ENV}`)
    }

    // Optional but validated if present
    if (process.env.USE_MOCK_OCR && !['true', 'false'].includes(process.env.USE_MOCK_OCR)) {
        errors.push('USE_MOCK_OCR must be "true" or "false"')
    }

    if (process.env.LLM_PROVIDER) {
        const validProviders = ['openai', 'claude', 'gemini', 'rule_based']
        if (!validProviders.includes(process.env.LLM_PROVIDER)) {
            errors.push(`LLM_PROVIDER must be one of: ${validProviders.join(', ')}. Got: ${process.env.LLM_PROVIDER}`)
        }
    }

    // Throw error if any validation failed
    if (errors.length > 0) {
        throw new Error(
            `Environment variable validation failed:\n${errors.map(e => `  - ${e}`).join('\n')}\n\n` +
            'Please check your .env file and ensure all required variables are set correctly.\n' +
            'See .env.example for reference.'
        )
    }

    return {
        DATABASE_URL: process.env.DATABASE_URL!,
        NODE_ENV: process.env.NODE_ENV!,
        USE_MOCK_OCR: process.env.USE_MOCK_OCR || 'true',
        LLM_PROVIDER: process.env.LLM_PROVIDER,
        LLM_API_KEY: process.env.LLM_API_KEY,
    }
}

/**
 * Get environment configuration with defaults
 * Safe to use after validateEnv() has been called
 */
export function getEnvConfig(): EnvConfig {
    return {
        DATABASE_URL: process.env.DATABASE_URL!,
        NODE_ENV: process.env.NODE_ENV!,
        USE_MOCK_OCR: process.env.USE_MOCK_OCR || 'true',
        LLM_PROVIDER: process.env.LLM_PROVIDER || 'rule_based',
        LLM_API_KEY: process.env.LLM_API_KEY,
    }
}

/**
 * Check if running in development mode
 */
export function isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development'
}

/**
 * Check if running in production mode
 */
export function isProduction(): boolean {
    return process.env.NODE_ENV === 'production'
}

/**
 * Check if using mock OCR
 */
export function useMockOCR(): boolean {
    return process.env.USE_MOCK_OCR !== 'false'
}

/**
 * Get LLM provider
 */
export function getLLMProvider(): string {
    return process.env.LLM_PROVIDER || 'rule_based'
}

/**
 * Check if LLM is configured
 */
export function isLLMConfigured(): boolean {
    const provider = getLLMProvider()
    if (provider === 'rule_based') return true

    // Check if API key is set for the provider
    if (provider === 'openai') return !!process.env.LLM_API_KEY
    if (provider === 'claude') return !!process.env.CLAUDE_API_KEY
    if (provider === 'gemini') return !!process.env.GEMINI_API_KEY

    return false
}

// Validate environment on module load (server-side only)
if (typeof window === 'undefined') {
    try {
        validateEnv()
        console.log('✅ Environment variables validated successfully')
    } catch (error) {
        console.error('❌ Environment validation failed:')
        console.error(error)
        // Don't exit in development to allow hot reload
        if (process.env.NODE_ENV === 'production') {
            process.exit(1)
        }
    }
}
