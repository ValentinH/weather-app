import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req
  const country = geo?.country || 'FR'
  const city = geo?.city || 'Antibes'
  const region = geo?.region || 'PAC'

  url.searchParams.set('country', country)
  url.searchParams.set('city', city)
  url.searchParams.set('region', region)

  return NextResponse.rewrite(url)
}
