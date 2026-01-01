'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

interface AdditionalInfoProps {
  dictionary: {
    achievementTitle: string
    achievementDesc: string
    facebookLink: string
    photoAlt: string
    photoCaption: string
    booksTitle: string
    books: {
      title: string
      author: string
      emoji: string
    }[]
  }
}

export default function AdditionalInfo({ dictionary }: AdditionalInfoProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="additional-info" className="relative py-20" ref={ref}>
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Achievement section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-6 rounded-2xl border-l-4 border-yellow-500"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">🏆</span>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {dictionary.achievementTitle}
                  </h4>
                  <p
                    className="text-gray-400 text-sm mb-3"
                    dangerouslySetInnerHTML={{ __html: dictionary.achievementDesc }}
                  />
                  <a
                    href="https://www.facebook.com/photo/?fbid=1169531118294064&set=a.193826049197914"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:text-primary-300 text-sm font-medium"
                  >
                    {dictionary.facebookLink}
                  </a>
                </div>
              </div>

              {/* Switzerland photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-4 rounded-xl overflow-hidden"
              >
                <Image
                  src="/images/szwajcaria.jpg"
                  alt={dictionary.photoAlt}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                />
                <p className="text-xs text-gray-500 mt-2 text-center">{dictionary.photoCaption}</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Books section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-6 rounded-2xl"
          >
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              {dictionary.booksTitle}
            </h4>
            <div className="space-y-3">
              {dictionary.books.map((book, index) => (
                <motion.div
                  key={book.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <span className="text-2xl">{book.emoji}</span>
                  <div>
                    <p className="text-white font-medium text-sm">{book.title}</p>
                    <p className="text-gray-500 text-xs">{book.author}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
