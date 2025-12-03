import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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
}

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  image?: string
  author?: string
}

// Pobierz wszystkie posty
export function getAllPosts(): PostMeta[] {
  // Sprawdź czy folder istnieje
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '')
      const fullPath = path.join(postsDirectory, fileName)
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
      } as PostMeta
    })

  // Sortuj po dacie (najnowsze pierwsze)
  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

// Pobierz pojedynczy post
export function getPostBySlug(slug: string): BlogPost | null {
  const mdPath = path.join(postsDirectory, `${slug}.md`)
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`)
  
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
  }
}

// Pobierz wszystkie tagi
export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tagsSet = new Set<string>()
  
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag))
  })
  
  return Array.from(tagsSet).sort()
}

// Pobierz posty po tagu
export function getPostsByTag(tag: string): PostMeta[] {
  const posts = getAllPosts()
  return posts.filter((post) => post.tags.includes(tag))
}

// Pobierz slugi wszystkich postów (dla generateStaticParams)
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  
  return fs.readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx?$/, ''))
}

