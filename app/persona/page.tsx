'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'

interface Persona {
  id: number
  name: string
  role: string
  department: string
  email: string
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const FALLBACK_PERSONAS: Persona[] = [
  { id: 1, name: 'Taylor Swift', role: 'Singer-Songwriter', department: 'Music', email: 'taylor.swift@personas.io' },
  { id: 2, name: 'Ariana Grande', role: 'Pop Artist', department: 'Entertainment', email: 'ariana.grande@personas.io' },
  { id: 3, name: 'Sarah Geronimo', role: 'OPM Icon', department: 'Showbiz', email: 'sarah.geronimo@personas.io' },
  { id: 4, name: 'Nicki Minaj', role: 'Rapper', department: 'Hip-Hop', email: 'nicki.minaj@personas.io' },
  { id: 5, name: 'Max Verstappen', role: 'F1 World Champion', department: 'Motorsport', email: 'max.verstappen@personas.io' },
]

const emptyForm = { name: '', role: '', department: '', email: '' }

export default function PersonaPage() {
  const [personas, setPersonas] = useState<Persona[]>(FALLBACK_PERSONAS)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState<Persona | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  const fetchPersonas = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/persona')
      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      const list: Persona[] = Array.isArray(data) ? data : []
      if (list.length === 0) {
        const seed = await fetch('/api/persona/seed', { method: 'POST' })
        if (seed.ok) {
          const res2 = await fetch('/api/persona')
          const data2 = await res2.json()
          const seeded: Persona[] = Array.isArray(data2) ? data2 : []
          setPersonas(seeded.length > 0 ? seeded : FALLBACK_PERSONAS)
        } else {
          setPersonas(FALLBACK_PERSONAS)
        }
      } else {
        setPersonas(list)
      }
    } catch {
      // DB not available locally — keep fallback data
      setPersonas((prev) => (prev.length > 0 ? prev : FALLBACK_PERSONAS))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPersonas()
  }, [fetchPersonas])

  function openAdd() {
    setEditTarget(null)
    setForm(emptyForm)
    setError('')
    setShowModal(true)
  }

  function openEdit(p: Persona) {
    setEditTarget(p)
    setForm({ name: p.name, role: p.role, department: p.department, email: p.email })
    setError('')
    setShowModal(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const url = editTarget ? `/api/persona/${editTarget.id}` : '/api/persona'
      const method = editTarget ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const d = await res.json()
        setError(d.error ?? 'Something went wrong')
      } else {
        setShowModal(false)
        fetchPersonas()
      }
    } catch {
      setError('Network error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: number) {
    setDeleteId(id)
    const res = await fetch(`/api/persona/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setPersonas((prev) => prev.filter((p) => p.id !== id))
    }
    setDeleteId(null)
  }

  const filtered = personas.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.role.toLowerCase().includes(search.toLowerCase()) ||
      p.department.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-white text-pink-700">
      {/* Top nav bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-pink-700/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-pink-700 transition flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </Link>
          <span className="text-pink-700/20">|</span>
          <h1 className="text-sm font-semibold text-pink-700">Persona Directory</h1>
          <span className="ml-auto text-xs text-gray-400">{personas.length} {personas.length === 1 ? 'person' : 'people'}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">People</h2>
            <p className="text-gray-500 text-sm mt-1">Manage and view all personas in the database.</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-pink-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-pink-700/80 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Person
          </button>
        </div>

        <div className="relative mb-6">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, role, department, or email..."
            className="w-full border border-pink-700/10 rounded-lg pl-11 pr-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-700/10 transition bg-gray-50"
          />
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <div className="text-5xl mb-4">??</div>
            <p className="text-sm">No personas found.</p>
          </div>
        ) : (
          <div className="divide-y divide-black/[0.06] border border-pink-700/[0.08] rounded-xl overflow-hidden">
            {filtered.map((p, i) => (
              <div
                key={p.id}
                className="flex items-center gap-4 bg-white hover:bg-gray-50 px-5 py-4 transition-colors"
              >
                <span className="text-gray-300 text-xs font-mono w-5 text-right shrink-0 select-none">{i + 1}</span>
                <div className="w-10 h-10 rounded-full bg-pink-700 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {getInitials(p.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-pink-700 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400 truncate">{p.role}</p>
                </div>
                <span className="hidden sm:inline-flex text-xs px-3 py-1 rounded-full border border-pink-700/10 text-gray-600 bg-gray-50 font-medium shrink-0">
                  {p.department}
                </span>
                <span className="hidden md:block text-xs text-gray-400 truncate max-w-[200px]">{p.email}</span>
                <div className="flex gap-1 shrink-0 ml-2">
                  <button
                    onClick={() => openEdit(p)}
                    title="Edit"
                    className="p-2 rounded-lg border border-pink-700/10 hover:bg-pink-700 hover:text-white hover:border-pink-700 text-gray-400 transition"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    disabled={deleteId === p.id}
                    title="Delete"
                    className="p-2 rounded-lg border border-pink-700/10 hover:bg-red-50 hover:text-red-500 hover:border-red-200 text-gray-400 transition disabled:opacity-40"
                  >
                    {deleteId === p.id ? (
                      <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-pink-700/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-white border border-pink-700/10 rounded-2xl shadow-2xl p-7">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg text-pink-700">{editTarget ? 'Edit Person' : 'Add Person'}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-pink-700 transition p-1 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
              )}
              {[
                { key: 'name', label: 'Full Name', placeholder: 'e.g. Taylor Swift' },
                { key: 'role', label: 'Role', placeholder: 'e.g. Singer-Songwriter' },
                { key: 'department', label: 'Department', placeholder: 'e.g. Music' },
                { key: 'email', label: 'Email', placeholder: 'e.g. taylor@personas.io', type: 'email' },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label className="block text-xs text-gray-500 mb-1.5 font-medium">{label}</label>
                  <input
                    type={type ?? 'text'}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    required
                    className="w-full border border-pink-700/10 rounded-lg px-4 py-2.5 text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-700/10 transition bg-gray-50"
                  />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-lg border border-pink-700/10 text-sm text-gray-600 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-lg bg-pink-700 text-white text-sm font-medium hover:bg-pink-700/80 transition disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editTarget ? 'Save Changes' : 'Add Person'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
