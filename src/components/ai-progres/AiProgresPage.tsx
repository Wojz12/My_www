'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Cpu, Calendar, HelpCircle, ExternalLink, Loader2 } from 'lucide-react'
import MetricCard from './MetricCard'
import ComputeChart from './ComputeChart'
import { useAiMetrics } from './useAiMetrics'

interface AiProgresPageProps {
    dictionary: {
        title: string
        subtitle: string
        heroDescription: string
        bestModel: {
            title: string
            description: string
            modelName: string
            score: string
        }
        computePower: {
            title: string
            description: string
            value: string
        }
        agiDate: {
            title: string
            description: string
            range: string
            source1: string
            source2: string
        }
        howToUnderstand: {
            title: string
            content: string
        }
        sources: {
            title: string
            updatedAt: string
            arcAgi: string
            situational: string
            timelines: string
        }
    }
}

export default function AiProgresPage({ dictionary }: AiProgresPageProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    // Fetch live data from API
    const { data: apiData, loading } = useAiMetrics()

    // Use API data if available, fallback to dictionary
    const bestModelName = apiData?.bestModel?.name || dictionary.bestModel.modelName
    const bestModelScore = apiData?.bestModel?.score
        ? `${apiData.bestModel.score}%`
        : dictionary.bestModel.score
    const computeValue = apiData?.computePower?.value
        ? `${apiData.computePower.value} ${apiData.computePower.unit}`
        : dictionary.computePower.value
    const computeData = apiData?.computePower?.data
    const agiRange = apiData?.agiDate
        ? `${apiData.agiDate.rangeStart}-${apiData.agiDate.rangeEnd}`
        : dictionary.agiDate.range
    const lastUpdated = apiData?.lastUpdated
        ? new Date(apiData.lastUpdated).toLocaleDateString()
        : new Date().toLocaleDateString()

    return (
        <section className="relative py-20" ref={ref}>
            <div className="section-container">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="section-title text-4xl md:text-5xl">{dictionary.title}</h1>
                    <p className="section-subtitle mx-auto max-w-2xl">
                        {dictionary.subtitle}
                    </p>
                    <p className="text-gray-400 mt-4 max-w-xl mx-auto">
                        {dictionary.heroDescription}
                    </p>
                    {loading && (
                        <div className="flex items-center justify-center gap-2 mt-4 text-primary-400">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">Loading live data...</span>
                        </div>
                    )}
                </motion.div>

                {/* Metrics Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {/* Best Model Card */}
                    <MetricCard
                        icon={Brain}
                        title={dictionary.bestModel.title}
                        value={bestModelName}
                        subValue={bestModelScore}
                        description={dictionary.bestModel.description}
                        delay={0}
                        isInView={isInView}
                    />

                    {/* Compute Power Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="glass-card p-6 rounded-2xl group hover:border-primary-500/30 transition-all duration-300"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Cpu className="w-6 h-6 text-primary-400" />
                            </div>
                            <span className="text-2xl font-bold text-primary-400">
                                {computeValue}
                            </span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            {dictionary.computePower.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                            {dictionary.computePower.description}
                        </p>
                        <ComputeChart data={computeData} />
                    </motion.div>

                    {/* AGI Date Card */}
                    <MetricCard
                        icon={Calendar}
                        title={dictionary.agiDate.title}
                        value={agiRange}
                        description={dictionary.agiDate.description}
                        delay={0.2}
                        isInView={isInView}
                        extraContent={
                            <div className="mt-3 text-xs text-gray-500 space-y-1">
                                <p>📊 {dictionary.agiDate.source1}</p>
                                <p>📈 {dictionary.agiDate.source2}</p>
                            </div>
                        }
                    />

                    {/* How to Understand Card */}
                    <MetricCard
                        icon={HelpCircle}
                        title={dictionary.howToUnderstand.title}
                        description={dictionary.howToUnderstand.content}
                        delay={0.3}
                        isInView={isInView}
                        isLarge
                    />
                </div>

                {/* Sources Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="glass-card p-6 rounded-2xl"
                >
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <ExternalLink className="w-5 h-5 text-primary-400" />
                        {dictionary.sources.title}
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <a
                            href="https://arcprize.org/leaderboard"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-300 hover:text-primary-400 transition-colors p-3 rounded-xl bg-white/5 hover:bg-white/10"
                        >
                            <Brain className="w-4 h-4" />
                            <span className="text-sm">{dictionary.sources.arcAgi}</span>
                        </a>
                        <a
                            href="https://situational-awareness.ai/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-300 hover:text-primary-400 transition-colors p-3 rounded-xl bg-white/5 hover:bg-white/10"
                        >
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{dictionary.sources.situational}</span>
                        </a>
                        <a
                            href="https://ai-timelines.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-300 hover:text-primary-400 transition-colors p-3 rounded-xl bg-white/5 hover:bg-white/10"
                        >
                            <Cpu className="w-4 h-4" />
                            <span className="text-sm">{dictionary.sources.timelines}</span>
                        </a>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                        {dictionary.sources.updatedAt}: {lastUpdated}
                        {apiData && <span className="ml-2 text-primary-400">• Live data</span>}
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
