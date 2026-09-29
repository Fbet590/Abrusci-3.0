import { NextResponse } from "next/server"

// LeadConnector webhook that receives all quote form submissions
const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/Xm0mELqHDpnfrX9C0Ih2/webhook-trigger/290faf26-98e3-457a-90f0-ebeac1c4a23b"

export async function POST(request: Request) {
  let body: Record<string, string>

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    )
  }

  // Validate required fields
  if (!body.project_type || !body.name || !body.email || !body.phone) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    )
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000) // 10s timeout

    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!res.ok) {
      console.error(`Webhook failed with status ${res.status}`)
      return NextResponse.json(
        { error: "Webhook delivery failed" },
        { status: res.status }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    console.error("Webhook error:", message)
    return NextResponse.json(
      { error: "Failed to deliver webhook" },
      { status: 502 }
    )
  }
}
