import type { LeadPayload } from '@/lib/leadPayload'

export async function sendEmail(payload: LeadPayload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: `Amaya Leads <leads@${process.env.EMAIL_DOMAIN}>`,
      to:   process.env.SALES_EMAIL,
      subject: `New ${payload.leadType} lead — ${payload.name}`,
      html: `
        <h2>New lead: ${payload.leadType}</h2>
        <table cellpadding="6">
          <tr><td><b>Name</b></td>  <td>${payload.name}</td></tr>
          <tr><td><b>Phone</b></td> <td>${payload.phone}</td></tr>
          <tr><td><b>Email</b></td> <td>${payload.email ?? '—'}</td></tr>
          <tr><td><b>Page</b></td>  <td>${payload.sourcePage}</td></tr>
          <tr><td><b>Date</b></td>  <td>${payload.preferredDate ?? '—'}</td></tr>
          <tr><td><b>Time</b></td>  <td>${payload.preferredTime ?? '—'}</td></tr>
          <tr><td><b>Message</b></td><td>${payload.message ?? '—'}</td></tr>
        </table>
      `,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Resend error: ${err}`)
  }
}