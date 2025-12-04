'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag, User, Clock } from 'lucide-react'
import type { BlogPost as BlogPostType } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'

interface BlogPostProps {
  post: BlogPostType
}

export default function BlogPost({ post }: BlogPostProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Szacowany czas czytania
  const readingTime = Math.ceil(post.content.split(/\s+/).length / 200)

  return (
    <article className="pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Wróć do bloga
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-primary-500/10 text-primary-300 rounded-full border border-primary-500/20"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-400 mb-6">
            {post.description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            {post.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {readingTime} min czytania
            </div>
          </div>
        </motion.header>

        {/* Featured Image */}
        {post.image && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-12 bg-gradient-to-br from-primary-500/20 to-primary-700/20"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-contain"
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 md:p-12 rounded-2xl"
        >
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-4xl font-bold gradient-text mb-6 mt-8">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-3xl font-semibold text-white mb-4 mt-8">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl font-semibold text-white mb-3 mt-6">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 text-gray-300 leading-relaxed">{children}</p>
                ),
                a: ({ href, children }) => (
                  <a 
                    href={href} 
                    className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                code: ({ children, className }) => {
                  const isInline = !className
                  if (isInline) {
                    return (
                      <code className="bg-primary-900/30 text-primary-300 px-2 py-1 rounded text-sm">
                        {children}
                      </code>
                    )
                  }
                  return (
                    <code className={className}>{children}</code>
                  )
                },
                pre: ({ children }) => (
                  <pre className="bg-gray-900/50 border border-primary-500/20 rounded-xl p-4 overflow-x-auto mb-4">
                    {children}
                  </pre>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300">{children}</ol>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-400 my-4">
                    {children}
                  </blockquote>
                ),
                img: ({ src, alt }) => (
                  <span className="block my-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src || ''}
                      alt={alt || ''}
                      className="rounded-xl shadow-glass max-w-full h-auto"
                    />
                  </span>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link
              href="/blog"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Wróć do bloga
            </Link>
            
            <div className="text-gray-400 text-sm">
              Dziękuję za przeczytanie! 🙏
            </div>
          </div>
        </motion.div>
      </div>
    </article>
  )
}

