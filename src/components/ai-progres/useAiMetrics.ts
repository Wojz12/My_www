'use client'

import { useState, useEffect } from 'react'

interface AiMetricsData {
    bestModel: {
        name: string
        score: number
        benchmark: string
        lastUpdated: string
    }
    computePower: {
        value: string
        unit: string
        yearlyGrowth: string
        data: { year: number; value: number }[]
        lastUpdated: string
    }
    agiDate: {
        rangeStart: number
        rangeEnd: number
        sources: { name: string; url: string }[]
        lastUpdated: string
    }
    lastUpdated: string
}

interface UseAiMetricsResult {
    data: AiMetricsData | null
    loading: boolean
    error: string | null
    refetch: () => void
}

export function useAiMetrics(): UseAiMetricsResult {
    const [data, setData] = useState<AiMetricsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchMetrics = async () => {
        try {
            setLoading(true)
            setError(null)

            const response = await fetch('/api/ai-metrics')

            if (!response.ok) {
                throw new Error('Failed to fetch metrics')
            }

            const result = await response.json()

            if (result.success && result.data) {
                setData(result.data)
            } else {
                throw new Error('Invalid response format')
            }
        } catch (err) {
            console.error('Error fetching AI metrics:', err)
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMetrics()
    }, [])

    return { data, loading, error, refetch: fetchMetrics }
}
