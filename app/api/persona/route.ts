import { NextResponse } from 'next/server'
import { sql, initDB } from '@/lib/db'

export async function GET() {
  try {
    await initDB()
    const personas = await sql`SELECT * FROM personas ORDER BY created_at DESC`
    return NextResponse.json(personas)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch personas' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await initDB()
    const { name, role, department, email } = await request.json()

    if (!name || !role || !department || !email) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO personas (name, role, department, email)
      VALUES (${name}, ${role}, ${department}, ${email})
      RETURNING *
    `
    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create persona' }, { status: 500 })
  }
}
