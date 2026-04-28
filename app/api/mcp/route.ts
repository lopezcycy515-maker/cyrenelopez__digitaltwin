import { NextRequest, NextResponse } from 'next/server'
import { portfolioData } from '@/lib/portfolio-data'

export const dynamic = 'force-dynamic'

// ─── MCP Server: Cyrene Lopez Digital Twin ─────────────────────────────────────
// Model Context Protocol (MCP) over HTTP — JSON-RPC 2.0
// Connect via: POST https://cyrenelopez-boilerplate-digitaltwin.vercel.app/api/mcp
// ─────────────────────────────────────────────────────────────────────────────

const SERVER_INFO = {
  name: 'cyrene-portfolio-mcp',
  version: '1.0.0',
}

const PROTOCOL_VERSION = '2024-11-05'

// ─── Tool definitions ──────────────────────────────────────────────────────────
const TOOLS = [
  {
    name: 'get_profile',
    description: "Get Cyrene Lopez's full profile: name, title, bio, status, and contact links.",
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_skills',
    description: "Get the list of all technical skills Cyrene Lopez has.",
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_projects',
    description: "Get all projects Cyrene Lopez has built, with descriptions.",
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_education',
    description: "Get Cyrene Lopez's education history and degrees.",
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_goals',
    description: "Get Cyrene Lopez's professional goals and career aspirations.",
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_contact',
    description: "Get Cyrene Lopez's contact channels: LinkedIn, GitHub, Email.",
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'ask_cyrene',
    description: "Ask the Digital Twin AI of Cyrene Lopez a question in natural language. Returns a conversational response.",
    inputSchema: {
      type: 'object',
      properties: {
        question: {
          type: 'string',
          description: 'The question to ask Cyrene Lopez.',
        },
      },
      required: ['question'],
    },
  },
]

// ─── Tool handlers ─────────────────────────────────────────────────────────────
function handleTool(name: string, args: Record<string, unknown>): string {
  switch (name) {
    case 'get_profile':
      return JSON.stringify({
        name: portfolioData.name,
        title: portfolioData.title,
        status: portfolioData.status,
        bio: portfolioData.bio,
        description: portfolioData.description,
        socialLinks: portfolioData.socialLinks,
      }, null, 2)

    case 'get_skills':
      return JSON.stringify({ skills: portfolioData.skills }, null, 2)

    case 'get_projects':
      return JSON.stringify({ projects: portfolioData.projects }, null, 2)

    case 'get_education':
      return JSON.stringify({ education: portfolioData.education }, null, 2)

    case 'get_goals':
      return JSON.stringify({ goals: portfolioData.goals }, null, 2)

    case 'get_contact':
      return JSON.stringify({ socialLinks: portfolioData.socialLinks }, null, 2)

    case 'ask_cyrene': {
      const question = (args.question as string) ?? ''
      const answer = getDigitalTwinResponse(question)
      return answer
    }

    default:
      throw new Error(`Unknown tool: ${name}`)
  }
}

// ─── Digital Twin response engine (mirrors the chat route) ────────────────────
function getDigitalTwinResponse(message: string): string {
  const m = message.toLowerCase()

  if (/yourself|who are you|introduce|tell me about|about you/.test(m)) {
    return "Hi! I'm Cyrene Lopez — a Creative Full-Stack Developer passionate about building beautiful, functional web apps. I specialize in React, Next.js, TypeScript, and Node.js. I'm currently open to new opportunities and love collaborating on impactful projects!"
  }
  if (/skill|tech|stack|language|framework|tool|know|use/.test(m)) {
    return "My core stack is React, Next.js, TypeScript, and Tailwind CSS on the frontend — and Node.js with PostgreSQL on the backend. I'm also comfortable with REST APIs, Git, UI/UX design, MCP Server Development, and cloud deployment."
  }
  if (/project|built|work|portfolio|app|website|made/.test(m)) {
    return "I've built an E-Commerce Platform with React and Node.js, a Task Management App in Next.js, an MCP Server for this portfolio (so AI tools can query my data!), and this portfolio website itself. Each project pushed me to grow as a developer."
  }
  if (/education|study|degree|school|university|bootcamp|learn/.test(m)) {
    return "I have a BS in Information Technology from Tech University (2024) and completed a Full-Stack Development Bootcamp in 2023. I'm a continuous learner — courses, open-source, and real projects are how I keep growing."
  }
  if (/goal|future|plan|aspire|dream|next/.test(m)) {
    return "My goals are to master advanced React patterns, build scalable backend systems, develop production-grade MCP servers, contribute to meaningful open-source projects, and eventually mentor junior developers."
  }
  if (/contact|hire|collab|email|reach|available|opportunit/.test(m)) {
    return "I'm currently open to opportunities! You can reach me through the Contact section of this portfolio. Whether it's a full-time role, freelance project, or just a chat about tech — I'd love to connect!"
  }
  if (/mcp|model context protocol/.test(m)) {
    return "Yes, this portfolio has a live MCP server at /api/mcp! You can connect AI tools like Claude Desktop or any MCP-compatible client to query my profile, skills, projects, education, and goals — all through structured tools. It's one of my favorite features!"
  }
  if (/hello|hi |hey|greet|good morning|good afternoon|good evening/.test(m)) {
    return "Hey there! Great to meet you. I'm Cyrene's digital twin — ask me anything about her skills, projects, background, or how to get in touch. What would you like to know?"
  }
  if (/thank|thanks|appreciate/.test(m)) {
    return "You're welcome! Feel free to ask anything else, or head to the Contact section to connect with Cyrene directly."
  }
  return "That's an interesting question! I'm best at talking about Cyrene's skills, projects, education, and professional background. Is there something specific you'd like to know?"
}

// ─── JSON-RPC 2.0 helpers ──────────────────────────────────────────────────────
function jsonRpcSuccess(id: unknown, result: unknown) {
  return NextResponse.json({ jsonrpc: '2.0', id, result })
}

function jsonRpcError(id: unknown, code: number, message: string) {
  return NextResponse.json({ jsonrpc: '2.0', id, error: { code, message } })
}

// ─── MCP Route Handler ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: { jsonrpc: string; id: unknown; method: string; params?: Record<string, unknown> }

  try {
    body = await req.json()
  } catch {
    return jsonRpcError(null, -32700, 'Parse error')
  }

  const { id, method, params } = body

  // initialize
  if (method === 'initialize') {
    return jsonRpcSuccess(id, {
      protocolVersion: PROTOCOL_VERSION,
      capabilities: { tools: {} },
      serverInfo: SERVER_INFO,
    })
  }

  // notifications/initialized — no response needed
  if (method === 'notifications/initialized') {
    return new NextResponse(null, { status: 204 })
  }

  // tools/list
  if (method === 'tools/list') {
    return jsonRpcSuccess(id, { tools: TOOLS })
  }

  // tools/call
  if (method === 'tools/call') {
    const toolName = (params?.name as string) ?? ''
    const toolArgs = (params?.arguments as Record<string, unknown>) ?? {}

    try {
      const result = handleTool(toolName, toolArgs)
      return jsonRpcSuccess(id, {
        content: [{ type: 'text', text: result }],
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Tool error'
      return jsonRpcError(id, -32602, message)
    }
  }

  // ping
  if (method === 'ping') {
    return jsonRpcSuccess(id, {})
  }

  return jsonRpcError(id, -32601, `Method not found: ${method}`)
}

// GET: MCP discovery metadata
export async function GET() {
  return NextResponse.json({
    name: SERVER_INFO.name,
    version: SERVER_INFO.version,
    protocolVersion: PROTOCOL_VERSION,
    description: "MCP Server for Cyrene Lopez's portfolio — query profile, skills, projects, education, goals, and chat with the Digital Twin AI.",
    endpoint: '/api/mcp',
    transport: 'http',
    tools: TOOLS.map((t) => ({ name: t.name, description: t.description })),
  })
}
