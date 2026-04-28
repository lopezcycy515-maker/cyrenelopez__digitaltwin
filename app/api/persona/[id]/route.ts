import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { name, role, department, email } = await request.json()

    if (!name || !role || !department || !email) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const result = await sql`
      UPDATE personas
      SET name = ${name}, role = ${role}, department = ${department}, email = ${email}
      WHERE id = ${id}
      RETURNING *
    `
    if (result.length === 0) {
      return NextResponse.json({ error: 'Persona not found' }, { status: 404 })
    }
    return NextResponse.json(result[0])
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to update persona' }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const result = await sql`
      DELETE FROM personas WHERE id = ${id} RETURNING *
    `
    if (result.length === 0) {
      return NextResponse.json({ error: 'Persona not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to delete persona' }, { status: 500 })
  }
}
