/**
 * Simple user identification system for MVP
 * Uses localStorage to generate and store a unique user ID
 * 
 * In production, replace with proper authentication (NextAuth.js, etc.)
 */

export function getUserId(): string {
    if (typeof window === 'undefined') {
        // Server-side: return a temporary ID
        return 'server-temp-id'
    }

    const STORAGE_KEY = 'swasthai_user_id'

    // Check if user ID already exists
    let userId = localStorage.getItem(STORAGE_KEY)

    if (!userId) {
        // Generate new UUID
        userId = generateUUID()
        localStorage.setItem(STORAGE_KEY, userId)
    }

    return userId
}

function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

/**
 * Clear user ID (for testing or logout)
 */
export function clearUserId(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('swasthai_user_id')
    }
}
