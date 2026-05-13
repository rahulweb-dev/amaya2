import type { LeadPayload } from '@/lib/leadPayload'

export async function sendWhatsApp(payload: LeadPayload) {
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID
  const token   = process.env.WHATSAPP_TOKEN
  const to      = process.env.WHATSAPP_SALES_NUMBER  // e.g. "919876543210" (no +)

  const res = await fetch(
    `https://graph.facebook.com/v20.0/${phoneId}/messages`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: {
          body:
`🏠 *New ${payload.leadType.toUpperCase()} lead*

👤 ${payload.name}
📞 ${payload.phone}${payload.email ? `\n📧 ${payload.email}` : ''}${payload.preferredDate ? `\n📅 ${payload.preferredDate} ${payload.preferredTime ?? ''}` : ''}${payload.message ? `\n💬 ${payload.message}` : ''}

📄 Source: ${payload.sourcePage}`,
        },
      }),
    }
  )

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`WhatsApp error: ${err}`)
  }
}