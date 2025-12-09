import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    // In a real app you'd validate and send an email or persist this.
    // For now we just log it to server console and return success.
    // eslint-disable-next-line no-console
    console.log("Contact submission:", data)

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
