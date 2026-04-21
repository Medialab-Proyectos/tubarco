import { NextRequest, NextResponse } from 'next/server'
import { MOCK_ARTICLES } from '@/lib/mock-data'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const article = MOCK_ARTICLES.find((a) => a.slug === slug)

  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }

  // Related articles: same category, different id
  const related = MOCK_ARTICLES.filter(
    (a) => a.category === article.category && a.id !== article.id
  ).slice(0, 3)

  return NextResponse.json({ article, related })
}
