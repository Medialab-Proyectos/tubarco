export type Category =
  | 'lo-ultimo'
  | 'virales'
  | 'turismo'
  | 'judicial'
  | 'especiales'
  | 'tubarco-cali'
  | 'tubarco-colombia'
  | 'tubarco-internacional'
  | 'tubarco-valle'
  | 'tubarco-bogota'
  | 'tubarco-narino'
  | 'tubarco-pasto'
  | 'tubarco-occidente'
  | 'cop16'

export interface CategoryInfo {
  slug: Category
  name: string
}

export interface City {
  slug: string
  name: string
}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  category: Category
  secondaryCategories?: Category[]
  author: string
  isAI?: boolean
  publishedAt: string // ISO string
  readTime: number // minutes
  tags: string[]
  likes: number
  dislikes: number
  city?: string
  featured?: boolean
  breaking?: boolean
  views?: number
}

export interface Video {
  id: string
  title: string
  thumbnail: string
  duration: string
  views: string
  publishedAt: string
  youtubeId: string
}

export interface Reel {
  id: string
  title: string
  thumbnail: string
  duration: string
  youtubeId?: string
}

export interface Ad {
  id: string
  title: string
  sponsor: string
  description: string
  cta: string
  url: string
  image?: string
}

export interface NewsResponse {
  articles: Article[]
  total: number
  page: number
  perPage: number
}
