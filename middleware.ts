import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('admin_token')?.value

  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginPage  = pathname === '/admin/login'

  if (isAdminRoute && !isLoginPage && token !== process.env.ADMIN_SECRET) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  // Already logged in, don't show login page again
  if (isLoginPage && token === process.env.ADMIN_SECRET) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}