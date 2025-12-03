import { getAllPosts, getAllTags } from '@/lib/blog'
import BlogList from '@/components/blog/BlogList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Portfolio',
  description: 'Artykuły o programowaniu, technologiach i development',
}

export default function BlogPage() {
  const posts = getAllPosts()
  const tags = getAllTags()

  return (
    <div className="pt-24">
      <BlogList posts={posts} tags={tags} />
    </div>
  )
}

