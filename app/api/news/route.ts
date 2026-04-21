import { NextRequest, NextResponse } from 'next/server'
import { MOCK_ARTICLES } from '@/lib/mock-data'
import type { Category } from '@/lib/types'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category') as Category | null
  const page = parseInt(searchParams.get('page') ?? '1', 10)
  const perPage = parseInt(searchParams.get('perPage') ?? '10', 10)
  const search = searchParams.get('search') ?? ''

  let articles = [...MOCK_ARTICLES]

  if (category) {
    articles = articles.filter((a) => a.category === category)
  }

  if (search) {
    const q = search.toLowerCase()
    articles = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    )
  }

  // Sort by newest
  articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  const total = articles.length
  const start = (page - 1) * perPage
  const paginated = articles.slice(start, start + perPage)

  return NextResponse.json({ articles: paginated, total, page, perPage })
}
