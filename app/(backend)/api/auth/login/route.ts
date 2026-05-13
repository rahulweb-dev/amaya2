import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {



  const { email,password } = await req.json()
   if (email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ ok: false, message: 'Invalid email.' }, { status: 401 })
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, message: 'Invalid password.' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin_token', process.env.ADMIN_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
  })
  return res
}