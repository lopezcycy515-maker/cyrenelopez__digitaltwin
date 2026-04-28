import { NextResponse } from 'next/server'
import { getSql, initDB } from '@/lib/db'

export const dynamic = 'force-dynamic'

const seedData = [
  { name: 'Taylor Swift', role: 'Singer-Songwriter', department: 'Music', email: 'taylor.swift@personas.io' },
  { name: 'Ariana Grande', role: 'Pop Artist', department: 'Entertainment', email: 'ariana.grande@personas.io' },
  { name: 'Sarah Geronimo', role: 'OPM Icon', department: 'Showbiz', email: 'sarah.geronimo@personas.io' },
  { name: 'Nicki Minaj', role: 'Rapper', department: 'Hip-Hop', email: 'nicki.minaj@personas.io' },
  { name: 'Max Verstappen', role: 'F1 World Champion', department: 'Motorsport', email: 'max.verstappen@personas.io' },
]

export async function POST() {
  try {
    await initDB()
    const sql = getSql()

    for (const person of seedData) {
      await sql`
        INSERT INTO personas (name, role, department, email)
        VALUES (${person.name}, ${person.role}, ${person.department}, ${person.email})
        ON CONFLICT (email) DO NOTHING
      `
    }

    return NextResponse.json({ success: true, message: 'Seeded 5 personas' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to seed data' }, { status: 500 })
  }
}
