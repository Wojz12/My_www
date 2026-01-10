import { NextRequest, NextResponse } from 'next/server'

// API Key for n8n webhook authentication
const API_KEY = process.env.ARC_AGI_UPDATE_KEY || 'default-key-12345'

interface LeaderboardEntry {
    rank: number
    model: string
    author: string
    score: string
}

interface UpdatePayload {
    leaderboard: LeaderboardEntry[]
}

// In-memory storage (resets on serverless cold start)
// For production, use a database like Supabase, MongoDB, or Vercel KV
let cachedLeaderboard: LeaderboardEntry[] = [
    { rank: 1, model: "GPT-5.2 Pro (High)", author: "OpenAI", score: "54.2%" },
    { rank: 2, model: "Gemini 3 Pro (Refine.)", author: "Poetiq", score: "54.0%" },
    { rank: 3, model: "GPT-5.2 (X-High)", author: "OpenAI", score: "52.9%" },
    { rank: 4, model: "Gemini 3 Deep Think", author: "Google", score: "45.1%" },
    { rank: 5, model: "GPT-5.2 (High)", author: "OpenAI", score: "43.3%" }
]

let lastUpdated: string = new Date().toISOString()

export async function POST(request: NextRequest) {
    try {
        // Verify API key
        const authHeader = request.headers.get('authorization')
        const expectedAuth = `Bearer ${API_KEY}`

        console.log('Received auth:', authHeader)
        console.log('Expected auth:', expectedAuth)

        if (!authHeader || authHeader !== expectedAuth) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized', receivedAuth: authHeader?.substring(0, 20) },
                { status: 401 }
            )
        }

        const body: UpdatePayload = await request.json()

        if (!body.leaderboard || !Array.isArray(body.leaderboard)) {
            return NextResponse.json(
                { success: false, error: 'Invalid payload: leaderboard array required' },
                { status: 400 }
            )
        }

        // Validate leaderboard entries
        for (const entry of body.leaderboard) {
            if (
                typeof entry.rank !== 'number' ||
                typeof entry.model !== 'string' ||
                typeof entry.author !== 'string' ||
                typeof entry.score !== 'string'
            ) {
                return NextResponse.json(
                    { success: false, error: 'Invalid leaderboard entry format', received: entry },
                    { status: 400 }
                )
            }
        }

        // Update in-memory cache
        cachedLeaderboard = body.leaderboard.slice(0, 5)
        lastUpdated = new Date().toISOString()

        console.log('Leaderboard updated:', cachedLeaderboard)

        return NextResponse.json({
            success: true,
            message: 'Leaderboard updated successfully (in-memory cache)',
            updatedAt: lastUpdated,
            entriesCount: cachedLeaderboard.length,
            note: 'For persistent storage, connect to a database like Supabase or Vercel KV'
        })
    } catch (error) {
        console.error('Error updating leaderboard:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error', details: String(error) },
            { status: 500 }
        )
    }
}

export async function GET() {
    return NextResponse.json({
        message: 'ARC-AGI Leaderboard API',
        status: 'active',
        lastUpdated,
        leaderboard: cachedLeaderboard,
        usage: {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY',
                'Content-Type': 'application/json'
            },
            body: {
                leaderboard: [
                    { rank: 1, model: 'Model Name', author: 'Author', score: '50.0%' }
                ]
            }
        }
    })
}
