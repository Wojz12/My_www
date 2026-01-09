'use server'

import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// API Key for n8n webhook authentication
const API_KEY = process.env.ARC_AGI_UPDATE_KEY || 'your-secret-key-here'

interface LeaderboardEntry {
    rank: number
    model: string
    author: string
    score: string
}

interface UpdatePayload {
    leaderboard: LeaderboardEntry[]
}

export async function POST(request: NextRequest) {
    try {
        // Verify API key
        const authHeader = request.headers.get('authorization')
        if (!authHeader || authHeader !== `Bearer ${API_KEY}`) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
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
                    { success: false, error: 'Invalid leaderboard entry format' },
                    { status: 400 }
                )
            }
        }

        // Update dictionaries
        const dictionariesPath = path.join(process.cwd(), 'src', 'dictionaries')
        const languages = ['en', 'pl']

        for (const lang of languages) {
            const filePath = path.join(dictionariesPath, `${lang}.json`)
            const content = await fs.readFile(filePath, 'utf-8')
            const dictionary = JSON.parse(content)

            // Update leaderboard
            dictionary.aiProgres.bestModel.leaderboard = body.leaderboard.slice(0, 5)

            // Write back
            await fs.writeFile(filePath, JSON.stringify(dictionary, null, 4), 'utf-8')
        }

        return NextResponse.json({
            success: true,
            message: 'Leaderboard updated successfully',
            updatedAt: new Date().toISOString(),
            entriesCount: body.leaderboard.length
        })
    } catch (error) {
        console.error('Error updating leaderboard:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function GET() {
    return NextResponse.json({
        message: 'ARC-AGI Leaderboard Update API',
        usage: 'POST with Bearer token and leaderboard array',
        example: {
            leaderboard: [
                { rank: 1, model: 'Model Name', author: 'Author', score: '50.0%' }
            ]
        }
    })
}
