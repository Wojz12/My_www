'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Cpu, Calendar, HelpCircle, ExternalLink } from 'lucide-react'
import MetricCard from './MetricCard'
import { EASE } from '@/components/ui'

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

    const sources = [
        { href: 'https://arcprize.org/leaderboard', label: dictionary.sources.arcAgi },
        { href: 'https://situational-awareness.ai/', label: dictionary.sources.situational },
        { href: 'https://theagiclock.com/', label: dictionary.sources.agiClock },
    ]

    const fade = (delay: number) => ({
        initial: { opacity: 0, y: 16 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.6, delay, ease: EASE },
    })

    return (
        <section className="page pt-12 pb-20 md:pt-20" ref={ref}>
            {/* Hero */}
            <motion.div {...fade(0)} className="grid gap-6 md:grid-cols-12">
                <h1 className="display text-5xl leading-[1.04] md:col-span-7 md:text-7xl">{dictionary.title}</h1>
                <div className="md:col-span-5 md:self-end">
                    <p className="section-subtitle">{dictionary.subtitle}</p>
                    <p className="mt-4 text-sm leading-relaxed text-ink-muted">{dictionary.heroDescription}</p>
                </div>
            </motion.div>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
                {/* ARC-AGI Leaderboard */}
                <motion.div {...fade(0.05)} className="card-oat p-7 md:p-8">
                    <Brain className="mb-8 h-5 w-5 text-clay" />
                    <h3 className="mb-3 font-serif text-2xl text-ink">{dictionary.bestModel.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-muted">{dictionary.bestModel.description}</p>

                    <p className="eyebrow mb-3 mt-8">{dictionary.bestModel.leaderboardTitle}</p>
                    <ol className="divide-y divide-line border-y border-line">
                        {dictionary.bestModel.leaderboard.map((item) => (
                            <li key={item.rank} className="flex items-center justify-between gap-4 py-3">
                                <div className="flex items-center gap-4">
                                    <span className={`w-5 font-mono text-xs ${item.rank === 1 ? 'text-clay-dark' : 'text-ink-faint'}`}>
                                        {String(item.rank).padStart(2, '0')}
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium text-ink">{item.model}</p>
                                        <p className="text-xs text-ink-muted">{item.author}</p>
                                    </div>
                                </div>
                                <span className="font-mono text-sm text-ink">{item.score}</span>
                            </li>
                        ))}
                    </ol>
                </motion.div>

                {/* Compute Power */}
                <motion.div {...fade(0.1)} className="card-oat p-7 md:p-8">
                    <div className="mb-8 flex items-start justify-between gap-4">
                        <Cpu className="h-5 w-5 text-clay" />
                        <span className="font-serif text-3xl text-ink">{dictionary.computePower.value}</span>
                    </div>
                    <h3 className="mb-3 font-serif text-2xl text-ink">{dictionary.computePower.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-muted">{dictionary.computePower.description}</p>
                    <div className="mt-6 overflow-hidden rounded-xl bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/compute-power-chart.png"
                            alt="Exponential growth of computing power per dollar - Ray Kurzweil"
                            className="h-auto w-full"
                        />
                    </div>
                    <p className="mt-6 text-sm leading-relaxed text-ink-muted">{dictionary.computePower.longDescription}</p>
                    <a
                        href="https://singularityhub.com/2018/07/15/why-most-of-us-fail-to-grasp-coming-exponential-gains-in-ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-ink"
                    >
                        <span className="underline decoration-line underline-offset-4 group-hover:decoration-clay">
                            {dictionary.computePower.articleLink}
                        </span>
                        <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                </motion.div>

                {/* AGI Date */}
                <MetricCard
                    icon={Calendar}
                    title={dictionary.agiDate.title}
                    value={dictionary.agiDate.range}
                    description={dictionary.agiDate.description}
                    delay={0.15}
                    isInView={isInView}
                    extraContent={
                        <div className="mt-8 grid gap-6 text-sm sm:grid-cols-2">
                            <div>
                                <p className="eyebrow mb-3">{dictionary.agiDate.industryLeadersTitle}</p>
                                <ul className="space-y-1.5 text-ink-soft">
                                    {dictionary.agiDate.industryLeaders.map((leader, idx) => (
                                        <li key={idx}>{leader}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p className="eyebrow mb-3">{dictionary.agiDate.researchersTitle}</p>
                                <ul className="space-y-1.5 text-ink-soft">
                                    {dictionary.agiDate.researchers.map((researcher, idx) => (
                                        <li key={idx}>{researcher}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    }
                />

                {/* How to Understand */}
                <MetricCard
                    icon={HelpCircle}
                    title={dictionary.howToUnderstand.title}
                    description={dictionary.howToUnderstand.content}
                    delay={0.2}
                    isInView={isInView}
                />
            </div>

            {/* Sources */}
            <div className="mt-16 border-t border-line pt-8">
                <h3 className="eyebrow mb-4">{dictionary.sources.title}</h3>
                <ul className="flex flex-wrap gap-3">
                    {sources.map((s) => (
                        <li key={s.href}>
                            <a href={s.href} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                                {s.label}
                                <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                        </li>
                    ))}
                </ul>
                <p className="mt-6 font-mono text-xs text-ink-faint">
                    {dictionary.sources.updatedAt}: {new Date().toLocaleDateString()}
                </p>
            </div>
        </section>
    )
}
