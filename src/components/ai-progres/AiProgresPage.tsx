'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Cpu, Calendar, HelpCircle, ExternalLink } from 'lucide-react'
import MetricCard from './MetricCard'

interface AiProgresPageProps {
    dictionary: {
        title: string
        subtitle: string
        heroDescription: string
        bestModel: {
            title: string
            description: string
            leaderboardTitle: string
            leaderboard: { rank: number; model: string; author: string; score: string }[]
        }
        computePower: {
            title: string
            description: string
            value: string
            longDescription: string
            articleLink: string
        }
        agiDate: {
            title: string
            description: string
            range: string
            industryLeadersTitle: string
            industryLeaders: string[]
            researchersTitle: string
            researchers: string[]
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
            agiClock: string
        }
    }
}

export default function AiProgresPage({ dictionary }: AiProgresPageProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

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
                </motion.div>

                {/* Metrics Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {/* ARC-AGI Leaderboard Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0 }}
                        className="glass-card p-6 rounded-2xl group hover:border-primary-500/30 transition-all duration-300"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Brain className="w-6 h-6 text-primary-400" />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            {dictionary.bestModel.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                            {dictionary.bestModel.description}
                        </p>
                        <div className="mt-4">
                            <p className="text-xs text-gray-500 mb-2 font-semibold">{dictionary.bestModel.leaderboardTitle}</p>
                            <div className="space-y-2">
                                {dictionary.bestModel.leaderboard.map((item) => (
                                    <div
                                        key={item.rank}
                                        className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${item.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                                                item.rank === 2 ? 'bg-gray-400/20 text-gray-300' :
                                                    item.rank === 3 ? 'bg-orange-500/20 text-orange-400' :
                                                        'bg-white/10 text-gray-400'
                                                }`}>
                                                {item.rank}
                                            </span>
                                            <div className="flex flex-col">
                                                <span className="text-sm text-gray-300">{item.model}</span>
                                                <span className="text-xs text-gray-500">{item.author}</span>
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold text-primary-400">{item.score}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

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
                                {dictionary.computePower.value}
                            </span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            {dictionary.computePower.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                            {dictionary.computePower.description}
                        </p>
                        <div className="rounded-xl overflow-hidden mb-4">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/compute-power-chart.png"
                                alt="Exponential growth of computing power per dollar - Ray Kurzweil"
                                className="w-full h-auto"
                            />
                        </div>
                        <div className="p-3 bg-white/5 rounded-xl">
                            <p className="text-xs text-gray-400 leading-relaxed mb-3">
                                {dictionary.computePower.longDescription}
                            </p>
                            <a
                                href="https://singularityhub.com/2018/07/15/why-most-of-us-fail-to-grasp-coming-exponential-gains-in-ai/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300 transition-colors"
                            >
                                <ExternalLink className="w-3 h-3" />
                                {dictionary.computePower.articleLink}
                            </a>
                        </div>
                    </motion.div>

                    {/* AGI Date Card */}
                    <MetricCard
                        icon={Calendar}
                        title={dictionary.agiDate.title}
                        value={dictionary.agiDate.range}
                        description={dictionary.agiDate.description}
                        delay={0.2}
                        isInView={isInView}
                        extraContent={
                            <div className="mt-3 text-xs text-gray-500 grid grid-cols-2 gap-4 max-h-56 overflow-y-auto">
                                <div>
                                    <p className="font-semibold text-gray-400 mb-1">🏢 {dictionary.agiDate.industryLeadersTitle}</p>
                                    <ul className="space-y-0.5">
                                        {dictionary.agiDate.industryLeaders.map((leader, idx) => (
                                            <li key={idx}>• {leader}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-400 mb-1">🎓 {dictionary.agiDate.researchersTitle}</p>
                                    <ul className="space-y-0.5">
                                        {dictionary.agiDate.researchers.map((researcher, idx) => (
                                            <li key={idx}>• {researcher}</li>
                                        ))}
                                    </ul>
                                </div>
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
                            href="https://theagiclock.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-300 hover:text-primary-400 transition-colors p-3 rounded-xl bg-white/5 hover:bg-white/10"
                        >
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{dictionary.sources.agiClock}</span>
                        </a>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                        {dictionary.sources.updatedAt}: {new Date().toLocaleDateString()}
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
