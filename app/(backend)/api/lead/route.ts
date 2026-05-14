import { NextRequest, NextResponse } from 'next/server'
import { serverValidate } from '@/lib/leads/validate'
import { connectDB, } from '@/lib/leads/db'
import Lead from '@/model/Lead'
import { sendEmail } from '@/lib/leads/email'
import { sendWhatsApp } from '@/lib/leads/whatsapp'
import type { LeadPayload } from '@/lib/leadPayload'


export const dynamic = 'force-dynamic'
export async function POST(req: NextRequest) {
  let body: LeadPayload

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid JSON.' }, { status: 400 })
  }

  const errors = serverValidate(body)
  if (errors) {
    return NextResponse.json({ ok: false, errors }, { status: 400 })
  }

  // 1. Save to MongoDB (critical — must succeed)
  try {
    await connectDB()
    await Lead.create(body)
  } catch (err) {
    console.error('[lead] MongoDB save failed', err)
    return NextResponse.json({ ok: false, message: 'Failed to save lead.' }, { status: 500 })
  }

  // 2. Email + WhatsApp in parallel (best-effort — don't block response)
  const [emailResult, waResult] = await Promise.allSettled([
    sendEmail(body),
    sendWhatsApp(body),
  ])

  if (emailResult.status === 'rejected')
    console.error('[lead] email failed', emailResult.reason)
  if (waResult.status === 'rejected')
    console.error('[lead] whatsapp failed', waResult.reason)

  return NextResponse.json({ ok: true })
}






export async function GET(req: NextRequest) {
  try {
    const token =
      req.cookies.get('admin_token')
        ?.value

    if (
      token !==
      process.env.ADMIN_SECRET
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Unauthorized',
        },
        { status: 401 },
      )
    }

    await connectDB()

    // =====================================================
    // QUERY PARAMS
    // =====================================================

    const { searchParams } =
      new URL(req.url)

    const page =
      Number(
        searchParams.get('page'),
      ) || 1

    const limit = 10

    const leadType =
      searchParams.get(
        'leadType',
      )

    // =====================================================
    // FILTER QUERY
    // =====================================================

    const query: any = {}

    if (
      leadType &&
      leadType !== 'all'
    ) {
      query.leadType =
        leadType
    }

    // =====================================================
    // TOTAL
    // =====================================================

    const total =
      await Lead.countDocuments(
        query,
      )

    // =====================================================
    // LEADS
    // =====================================================

    const leads =
      await Lead.find(query)
        .sort({
          createdAt: -1,
        })
        .skip(
          (page - 1) * limit,
        )
        .limit(limit)
        .lean()

    // =====================================================
    // RESPONSE
    // =====================================================

    return NextResponse.json({
      ok: true,

      leads,

      pagination: {
        page,

        pages: Math.ceil(
          total / limit,
        ),

        total,

        limit,
      },
    })
  } catch (error: any) {
    console.error(
      'API ERROR:',
      error,
    )

    return NextResponse.json(
      {
        ok: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}