'use client'

import { useEffect, useState, useCallback } from 'react'

interface Persona {
  id: number
  name: string
  role: string
  department: string
  email: string
}

const DEPT_COLORS: Record<string, string> = {
  Music: 'from-pink-500 to-rose-400',
  Entertainment: 'from-purple-500 to-fuchsia-400',
  Showbiz: 'from-yellow-500 to-orange-400',
  'Hip-Hop': 'from-emerald-500 to-teal-400',
  Motorsport: 'from-blue-500 to-cyan-400',
}

const DEFAULT_GRADIENT = 'from-violet-500 to-indigo-400'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function getGradient(dept: string) {
  return DEPT_COLORS[dept] ?? DEFAULT_GRADIENT
}

const emptyForm = { name: '', role: '', department: '', email: '' }

export default function PersonaPage() {
  const [personas, setPersonas] = useState<Persona[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState<Persona | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState('')

  const fetchPersonas = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/persona')
      const data = await res.json()
      setPersonas(Array.isArray(data) ? data : [])
    } catch {
      setError('Failed to load personas')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPersonas()
  }, [fetchPersonas])

  async function handleSeed() {
    const res = await fetch('/api/persona/seed', { method: 'POST' })
    if (res.ok) {
      setSeeded(true)
      fetchPersonas()
    }
  }

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
    <div className="min-h-screen bg-[#0f0f13] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0f0f13]/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Persona Directory</h1>
            <p className="text-xs text-white/40 mt-0.5">{personas.length} record{personas.length !== 1 ? 's' : ''} in database</p>
          </div>
          <div className="flex gap-2">
            {!seeded && personas.length === 0 && (
              <button
                onClick={handleSeed}
                className="text-xs px-3 py-2 rounded-lg border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition"
              >
                Seed Data
              </button>
            )}
            <button
              onClick={openAdd}
              className="text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 font-medium transition shadow-lg shadow-violet-500/20"
            >
              + Add Persona
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="relative mb-6">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, role, department or email…"
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/40 transition"
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-white/30">
            <div className="text-5xl mb-4">👤</div>
            <p className="text-sm">No personas found.</p>
            {personas.length === 0 && (
              <button onClick={handleSeed} className="mt-4 text-violet-400 underline text-sm hover:text-violet-300">
                Seed sample data
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((p, i) => {
              const gradient = getGradient(p.department)
              return (
                <div
                  key={p.id}
                  className="group flex items-center gap-4 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] hover:border-white/20 rounded-xl px-5 py-4 transition-all"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {/* Rank + Avatar */}
                  <span className="text-white/20 text-xs font-mono w-5 text-center shrink-0">{i + 1}</span>
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-sm font-bold shrink-0 shadow-lg`}>
                    {getInitials(p.name)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{p.name}</p>
                    <p className="text-xs text-white/40 truncate">{p.role}</p>
                  </div>

                  {/* Department badge */}
                  <span className={`hidden sm:inline-flex items-center text-xs px-2.5 py-1 rounded-full bg-gradient-to-r ${gradient} bg-opacity-10 text-white font-medium shrink-0`}>
                    {p.department}
                  </span>

                  {/* Email */}
                  <span className="hidden md:block text-xs text-white/30 truncate max-w-[180px]">{p.email}</span>

                  {/* Actions */}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition shrink-0">
                    <button
                      onClick={() => openEdit(p)}
                      className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      disabled={deleteId === p.id}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-white/50 hover:text-red-400 transition"
                      title="Delete"
                    >
                      {deleteId === p.id ? (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-[#1a1a24] border border-white/10 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-lg">{editTarget ? 'Edit Persona' : 'New Persona'}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/40 hover:text-white transition p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
              )}
              {[
                { key: 'name', label: 'Full Name', placeholder: 'e.g. Taylor Swift' },
                { key: 'role', label: 'Role', placeholder: 'e.g. Singer-Songwriter' },
                { key: 'department', label: 'Department', placeholder: 'e.g. Music' },
                { key: 'email', label: 'Email', placeholder: 'e.g. taylor@personas.io', type: 'email' },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label className="block text-xs text-white/50 mb-1.5 font-medium">{label}</label>
                  <input
                    type={type ?? 'text'}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm placeholder:text-white/20 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/40 transition"
                  />
                </div>
              ))}

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-white/60 hover:text-white hover:border-white/30 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 text-sm font-medium transition disabled:opacity-50"
                >
                  {saving ? 'Saving…' : editTarget ? 'Save Changes' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
