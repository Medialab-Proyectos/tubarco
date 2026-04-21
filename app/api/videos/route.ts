import { NextResponse } from 'next/server'
import { MOCK_VIDEOS } from '@/lib/mock-data'

export async function GET() {
  return NextResponse.json({ videos: MOCK_VIDEOS })
}
