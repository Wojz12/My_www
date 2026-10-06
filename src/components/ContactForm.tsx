'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

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

    const fieldClass = (hasError?: string) =>
        `${hasError ? '!border-red-600 dark:!border-red-400' : ''} disabled:opacity-50`

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-oat flex flex-col items-center p-10 text-center"
            >
                <CheckCircle className="mb-4 h-8 w-8 text-clay" />
                <p className="font-serif text-xl text-ink">{dictionary.successMessage}</p>
            </motion.div>
        )
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="card-oat space-y-5 p-6 sm:p-8">
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

            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
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
                        className={fieldClass(errors.name)}
                    />
                    {errors.name && <p className="mt-1.5 text-sm text-red-700 dark:text-red-300">{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
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
                        className={fieldClass(errors.email)}
                    />
                    {errors.email && <p className="mt-1.5 text-sm text-red-700 dark:text-red-300">{errors.email}</p>}
                </div>
            </div>

            <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
                    {dictionary.messageLabel}
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder={dictionary.messagePlaceholder}
                    disabled={status === 'sending'}
                    className={`${fieldClass(errors.message)} resize-none`}
                />
                {errors.message && <p className="mt-1.5 text-sm text-red-700 dark:text-red-300">{errors.message}</p>}
            </div>

            {status === 'error' && (
                <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/40 p-4">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-700 dark:text-red-300" />
                    <p className="text-sm text-red-700 dark:text-red-300">{dictionary.errorMessage}</p>
                </div>
            )}

            <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full py-3 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
                {status === 'sending' ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {dictionary.sending}
                    </>
                ) : (
                    <>
                        {dictionary.sendButton}
                        <ArrowRight className="h-4 w-4" />
                    </>
                )}
            </button>
        </form>
    )
}
