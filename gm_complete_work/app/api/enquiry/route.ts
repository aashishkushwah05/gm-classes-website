import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      { ok: false, error: "Google Sheets webhook is not configured." },
      { status: 503 },
    );
  }

  try {
    const payload = await request.json();
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    if (!response.ok) {
      return NextResponse.json({ ok: false, error: "Google Sheets endpoint rejected the enquiry." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to save the enquiry." }, { status: 500 });
  }
}
