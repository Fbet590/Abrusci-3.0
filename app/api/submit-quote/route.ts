import { NextResponse } from "next/server"

const WEBHOOK_URLS: Record<string, string> = {
  "Patio Cover":
    "https://services.leadconnectorhq.com/hooks/Xm0mELqHDpnfrX9C0Ih2/webhook-trigger/d56a7ab6-de7f-4648-adda-1ff6449847e2",
  "Interior Shades":
    "https://services.leadconnectorhq.com/hooks/Xm0mELqHDpnfrX9C0Ih2/webhook-trigger/923095d8-6981-4a54-8950-7c9348c2ab22",
  "Zipper Screen":
    "https://services.leadconnectorhq.com/hooks/Xm0mELqHDpnfrX9C0Ih2/webhook-trigger/9dfcff9e-9a8e-46bb-9e58-09c41b4b485c",
  "Retractable Awning":
    "https://services.leadconnectorhq.com/hooks/Xm0mELqHDpnfrX9C0Ih2/webhook-trigger/48bc2857-130a-4a4e-b06c-335adf949b04",
}

// Fallback webhook for project types without a dedicated URL
const FALLBACK_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/Xm0mELqHDpnfrX9C0Ih2/webhook-trigger/d56a7ab6-de7f-4648-adda-1ff6449847e2"

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

  const webhookUrl = WEBHOOK_URLS[body.project_type] || FALLBACK_WEBHOOK_URL

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000) // 10s timeout

    const res = await fetch(webhookUrl, {
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
