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
    isLarge = false,
    extraContent,
}: MetricCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay }}
            className={`glass-card p-6 rounded-2xl group hover:border-primary-500/30 transition-all duration-300 ${isLarge ? 'md:col-span-1' : ''
                }`}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-primary-400" />
                </div>
                {value && (
                    <div className="text-right">
                        <span className="text-2xl font-bold text-primary-400">{value}</span>
                        {subValue && (
                            <span className="block text-sm text-gray-400">{subValue}</span>
                        )}
                    </div>
                )}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                {title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            {extraContent}
        </motion.div>
    )
}
