import { getPostBySlug, getAllPostSlugs } from '@/lib/blog'
import BlogPost from '@/components/blog/BlogPost'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Locale } from '@/i18n-config'

interface Props {
  params: { slug: string; lang: Locale }
}

export async function generateStaticParams({ params: { lang } }: { params: { lang: Locale } }) {
  const slugs = getAllPostSlugs(lang)
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = params
  const post = getPostBySlug(slug, lang)

  if (!post) {
    return {
      title: 'Post nie znaleziony',
    }
  }

  return {
    title: `${post.title} | Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  }
}

import { getDictionary } from '@/get-dictionary'

// ... existing imports

// ... existing generateStaticParams and generateMetadata

export default async function BlogPostPage({ params }: Props) {
  const { slug, lang } = params
  const post = getPostBySlug(slug, lang)
  const dictionary = await getDictionary(lang)

  if (!post) {
    notFound()
  }

  return <BlogPost post={post} dictionary={dictionary.blog} lang={lang} />
}

