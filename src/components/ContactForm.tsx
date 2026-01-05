'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface ContactFormDictionary {
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    sendButton: string
    sending: string
    successMessage: string
    errorMessage: string
    validationRequired: string
    validationEmail: string
    validationMessageLength: string
}

interface ContactFormProps {
    dictionary: ContactFormDictionary
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

interface FormErrors {
    name?: string
    email?: string
    message?: string
}

export default function ContactForm({ dictionary }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        company: '', // honeypot field
    })
    const [status, setStatus] = useState<FormStatus>('idle')
    const [errors, setErrors] = useState<FormErrors>({})

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = dictionary.validationRequired
        }

        if (!formData.email.trim()) {
            newErrors.email = dictionary.validationRequired
        } else if (!validateEmail(formData.email)) {
            newErrors.email = dictionary.validationEmail
        }

        if (!formData.message.trim()) {
            newErrors.message = dictionary.validationRequired
        } else if (formData.message.trim().length < 10) {
            newErrors.message = dictionary.validationMessageLength
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setStatus('sending')
        setErrors({})

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim().toLowerCase(),
                    message: formData.message.trim(),
                    company: formData.company, // honeypot
                }),
            })

            if (response.ok) {
                setStatus('success')
                setFormData({ name: '', email: '', message: '', company: '' })
            } else {
                setStatus('error')
            }
        } catch {
            setStatus('error')
        }
    }

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Clear error when user starts typing
        if (errors[field as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 rounded-2xl text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center"
                >
                    <CheckCircle className="w-8 h-8 text-green-400" />
                </motion.div>
                <p className="text-lg text-white font-medium">{dictionary.successMessage}</p>
            </motion.div>
        )
    }

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="glass-card p-8 rounded-2xl space-y-6"
        >
            {/* Honeypot field - hidden from users */}
            <input
                type="text"
                name="company"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
            />

            {/* Name field */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    {dictionary.nameLabel}
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder={dictionary.namePlaceholder}
                    disabled={status === 'sending'}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'
                        } text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all disabled:opacity-50`}
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
            </div>

            {/* Email field */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    {dictionary.emailLabel}
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder={dictionary.emailPlaceholder}
                    disabled={status === 'sending'}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'
                        } text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all disabled:opacity-50`}
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
            </div>

            {/* Message field */}
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    {dictionary.messageLabel}
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder={dictionary.messagePlaceholder}
                    disabled={status === 'sending'}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'
                        } text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all disabled:opacity-50 resize-none`}
                />
                {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                )}
            </div>

            {/* Error message */}
            {status === 'error' && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20"
                >
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-400">{dictionary.errorMessage}</p>
                </motion.div>
            )}

            {/* Submit button */}
            <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 text-white font-medium hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
            >
                {status === 'sending' ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {dictionary.sending}
                    </>
                ) : (
                    <>
                        <Send className="w-5 h-5" />
                        {dictionary.sendButton}
                    </>
                )}
            </button>
        </motion.form>
    )
}
