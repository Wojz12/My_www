'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface MetricCardProps {
    icon: LucideIcon
    title: string
    value?: string
    subValue?: string
    description: string
    delay: number
    isInView: boolean
    isLarge?: boolean
    extraContent?: ReactNode
}

export default function MetricCard({
    icon: Icon,
    title,
    value,
    subValue,
    description,
    delay,
    isInView,
    extraContent,
}: MetricCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className="card-oat p-7 md:p-8"
        >
            <div className="mb-8 flex items-start justify-between gap-4">
                <Icon className="h-5 w-5 text-clay" />
                {value && (
                    <div className="text-right">
                        <span className="font-serif text-3xl text-ink">{value}</span>
                        {subValue && <span className="block text-sm text-ink-muted">{subValue}</span>}
                    </div>
                )}
            </div>
            <h3 className="mb-3 font-serif text-2xl text-ink">{title}</h3>
            <p className="whitespace-pre-line text-sm leading-relaxed text-ink-muted">{description}</p>
            {extraContent}
        </motion.div>
    )
}
