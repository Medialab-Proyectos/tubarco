import { NextResponse } from 'next/server'
import { MOCK_ADS } from '@/lib/mock-data'

export async function GET() {
  const ad = MOCK_ADS[Math.floor(Math.random() * MOCK_ADS.length)]
  return NextResponse.json({ ad })
}
