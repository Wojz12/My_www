import { getAllPosts, getAllTags } from '@/lib/blog'
import BlogList from '@/components/blog/BlogList'
import { Metadata } from 'next'
import { Locale } from '@/i18n-config'
import { getDictionary } from '@/get-dictionary'

export const metadata: Metadata = {
  title: 'Blog | Portfolio',
  description: 'Artykuły o programowaniu, technologiach i development',
}

interface Props {
  params: { lang: Locale }
}

export default async function BlogPage({ params: { lang } }: Props) {
  const posts = getAllPosts(lang)
  const tags = getAllTags(lang)
  const dictionary = await getDictionary(lang)

  return (
    <div className="pt-24">
      <BlogList posts={posts} tags={tags} dictionary={dictionary.blog} lang={lang} />
    </div>
  )
}

