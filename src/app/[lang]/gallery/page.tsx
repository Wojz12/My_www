import { getGalleryImages } from '@/lib/gallery'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Galeria | Portfolio',
  description: 'Galeria zdjęć i projektów wizualnych',
}

export default function GalleryPage() {
  const { images, categories } = getGalleryImages()

  return (
    <div className="pt-24">
      <GalleryGrid images={images} categories={categories} />
    </div>
  )
}

