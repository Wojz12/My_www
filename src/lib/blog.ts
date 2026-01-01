import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Locale } from '@/i18n-config'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  image?: string
  author?: string
  content: string
  lang: Locale
}

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  image?: string
  author?: string
  lang: Locale
}

// Pobierz wszystkie posty dla danego języka
export function getAllPosts(lang: Locale = 'pl'): PostMeta[] {
  const langDirectory = path.join(postsDirectory, lang)

  // Sprawdź czy folder istnieje
  if (!fs.existsSync(langDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(langDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '')
      const fullPath = path.join(langDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || 'Bez tytułu',
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        tags: data.tags || [],
        image: data.image || null,
        author: data.author || 'Autor',
        lang,
      } as PostMeta
    })

  // Sortuj po dacie (najnowsze pierwsze)
  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

// Pobierz pojedynczy post
export function getPostBySlug(slug: string, lang: Locale = 'pl'): BlogPost | null {
  const langDirectory = path.join(postsDirectory, lang)
  const mdPath = path.join(langDirectory, `${slug}.md`)
  const mdxPath = path.join(langDirectory, `${slug}.mdx`)

  let fullPath = ''
  if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath
  } else {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || 'Bez tytułu',
    description: data.description || '',
    date: data.date || new Date().toISOString(),
    tags: data.tags || [],
    image: data.image || null,
    author: data.author || 'Autor',
    content,
    lang,
  }
}

// Pobierz wszystkie tagi (agreguj z obu języków albo tylko z aktualnego? Zróbmy z aktualnego)
export function getAllTags(lang: Locale = 'pl'): string[] {
  const posts = getAllPosts(lang)
  const tagsSet = new Set<string>()

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag))
  })

  return Array.from(tagsSet).sort()
}

// Pobierz posty po tagu
export function getPostsByTag(tag: string, lang: Locale = 'pl'): PostMeta[] {
  const posts = getAllPosts(lang)
  return posts.filter((post) => post.tags.includes(tag))
}

// Pobierz slugi wszystkich postów (dla generateStaticParams)
// Dla generateStaticParams zazwyczaj chcemy wszystkie możliwe slugi dla wszystkich języków, 
// albo generujemy per [lang]. App Router structure is [lang]/blog/[slug], so generateStaticParams in [slug]/page.tsx
// will receive `params: { lang: Locale }`.
export function getAllPostSlugs(lang: Locale = 'pl'): string[] {
  const langDirectory = path.join(postsDirectory, lang)
  if (!fs.existsSync(langDirectory)) {
    return []
  }

  return fs.readdirSync(langDirectory)
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx?$/, ''))
}

