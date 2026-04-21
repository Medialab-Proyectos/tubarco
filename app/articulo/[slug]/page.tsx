import { notFound } from 'next/navigation'
import Image from 'next/image'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { MOCK_ARTICLES } from '@/lib/mock-data'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ArticleContent } from '@/components/article-content'
import { categoryName } from '@/lib/mock-data'
import type { Metadata } from 'next'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = MOCK_ARTICLES.find((a) => a.slug === slug)
  if (!article) return {}
  return {
    title: `${article.title} — TuBarco News`,
    description: article.excerpt,
  }
}

export async function generateStaticParams() {
  return MOCK_ARTICLES.map((a) => ({ slug: a.slug }))
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = MOCK_ARTICLES.find((a) => a.slug === slug)

  if (!article) notFound()

  const related = MOCK_ARTICLES.filter(
    (a) => a.category === article.category && a.id !== article.id
  ).slice(0, 3)

  const publishedDate = format(new Date(article.publishedAt), "d 'de' MMMM 'de' yyyy, HH:mm", {
    locale: es,
  })

  const contentParagraphs = article.content
    .split('</p>')
    .filter(Boolean)
    .map((p) => p + '</p>')

  return (
    <>
      <Navbar />
      <ArticleContent
        article={article}
        categoryLabel={categoryName(article.category)}
        publishedDate={publishedDate}
        contentParagraphs={contentParagraphs}
        related={related}
      />
      <Footer />
    </>
  )
}
