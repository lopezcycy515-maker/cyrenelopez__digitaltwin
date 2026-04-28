import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const apiKey = process.env.OPENROUTER_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'OPENROUTER_API_KEY is NOT set in env' }, { status: 500 })
  }

  const keyPreview = `${apiKey.slice(0, 8)}...${apiKey.slice(-4)}`

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'mistralai/mistral-7b-instruct:free',
      messages: [{ role: 'user', content: 'Say hello' }],
      max_tokens: 20,
    }),
  })

  const body = await response.text()

  return NextResponse.json({
    keyPreview,
    status: response.status,
    ok: response.ok,
    response: body,
  })
}
