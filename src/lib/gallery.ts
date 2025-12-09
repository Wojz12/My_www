import fs from 'fs'
import path from 'path'

const galleryDirectory = path.join(process.cwd(), 'public/images/gallery')

export interface GalleryImage {
  src: string
  alt: string
  category?: string
  width?: number
  height?: number
}

export interface GalleryData {
  images: GalleryImage[]
  categories: string[]
}

// Pobierz wszystkie zdjęcia z galerii
export function getGalleryImages(): GalleryData {
  // Sprawdź czy folder istnieje
  if (!fs.existsSync(galleryDirectory)) {
    return { images: [], categories: [] }
  }

  // Sprawdź czy istnieje plik gallery.json z metadanymi
  const metadataPath = path.join(galleryDirectory, 'gallery.json')
  
  if (fs.existsSync(metadataPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(metadataPath, 'utf8'))
      const categories = Array.from(new Set(data.images.map((img: GalleryImage) => img.category).filter(Boolean))) as string[]
      return {
        images: data.images,
        categories,
      }
    } catch (error) {
      console.error('Error reading gallery.json:', error)
    }
  }

  // Fallback: skanuj folder i twórz listę zdjęć
  const supportedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
  
  const files = fs.readdirSync(galleryDirectory)
    .filter((file) => {
      const ext = path.extname(file).toLowerCase()
      return supportedExtensions.includes(ext)
    })

  const images: GalleryImage[] = files.map((file) => ({
    src: `/images/gallery/${file}`,
    alt: file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
  }))

  return { images, categories: [] }
}

// Pobierz zdjęcia z określonej kategorii
export function getImagesByCategory(category: string): GalleryImage[] {
  const { images } = getGalleryImages()
  return images.filter((img) => img.category === category)
}

