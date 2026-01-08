import { NextResponse } from 'next/server'

// In-memory cache for metrics (will be updated via webhook)
// In production, this would be stored in a database
let cachedMetrics = {
    bestModel: {
        name: 'OpenAI o3',
        score: 88,
        benchmark: 'ARC-AGI',
        lastUpdated: new Date().toISOString(),
    },
    computePower: {
        value: '10²⁴',
        unit: 'FLOP',
        yearlyGrowth: '~10x',
        data: [
            { year: 2012, value: 10 },
            { year: 2014, value: 15 },
            { year: 2016, value: 22 },
            { year: 2017, value: 32 },
            { year: 2018, value: 45 },
            { year: 2019, value: 55 },
            { year: 2020, value: 65 },
            { year: 2021, value: 72 },
            { year: 2022, value: 78 },
            { year: 2023, value: 85 },
            { year: 2024, value: 92 },
            { year: 2025, value: 98 },
        ],
        lastUpdated: new Date().toISOString(),
    },
    agiDate: {
        rangeStart: 2028,
        rangeEnd: 2032,
        sources: [
            { name: 'Situational Awareness (Aschenbrenner)', url: 'https://situational-awareness.ai/' },
            { name: 'AGI Timelines Dashboard', url: 'https://ai-timelines.com/' },
        ],
        lastUpdated: new Date().toISOString(),
    },
    lastUpdated: new Date().toISOString(),
}

// GET endpoint - return current metrics
export async function GET() {
    return NextResponse.json({
        success: true,
        data: cachedMetrics,
    })
}

// POST endpoint - update metrics via webhook (from n8n)
export async function POST(request: Request) {
    try {
        // Verify webhook token
        const webhookToken = process.env.N8N_AI_METRICS_TOKEN
        const authHeader = request.headers.get('x-webhook-token')

        if (webhookToken && authHeader !== webhookToken) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await request.json()

        // Update cached metrics with new data
        if (body.bestModel) {
            cachedMetrics.bestModel = {
                ...cachedMetrics.bestModel,
                ...body.bestModel,
                lastUpdated: new Date().toISOString(),
            }
        }

        if (body.computePower) {
            cachedMetrics.computePower = {
                ...cachedMetrics.computePower,
                ...body.computePower,
                lastUpdated: new Date().toISOString(),
            }
        }

        if (body.agiDate) {
            cachedMetrics.agiDate = {
                ...cachedMetrics.agiDate,
                ...body.agiDate,
                lastUpdated: new Date().toISOString(),
            }
        }

        cachedMetrics.lastUpdated = new Date().toISOString()

        console.log('AI metrics updated:', cachedMetrics.lastUpdated)

        return NextResponse.json({
            success: true,
            message: 'Metrics updated successfully',
            lastUpdated: cachedMetrics.lastUpdated,
        })
    } catch (error) {
        console.error('Error updating AI metrics:', error)
        return NextResponse.json(
            { error: 'Failed to update metrics' },
            { status: 500 }
        )
    }
}
