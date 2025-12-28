import { NextRequest, NextResponse } from "next/server"

// CounterAPI configuration
// Using CounterAPI's simple REST API - no authentication needed
const COUNTER_NAMESPACE = "bangladeshecd"
const COUNTER_KEY = "visitors"
const COUNTER_API_URL = `https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/${COUNTER_KEY}`

interface VisitorData {
  count: number
  lastUpdated?: string
}

async function getVisitorCount(): Promise<VisitorData> {
  try {
    const response = await fetch(COUNTER_API_URL, {
      method: "GET",
      cache: "no-store",
    })

    if (!response.ok) {
      return { count: 0 }
    }

    const data = await response.json()
    return { count: data.count || 0 }
  } catch (error) {
    console.error("Error getting visitor count:", error)
    return { count: 0 }
  }
}

async function incrementVisitorCount(): Promise<VisitorData> {
  try {
    // CounterAPI.dev uses /up or /hit endpoint to increment
    const response = await fetch(`${COUNTER_API_URL}/up`, {
      method: "GET",
      cache: "no-store",
    })

    if (!response.ok) {
      console.error(`CounterAPI error: ${response.status}`)
      throw new Error(`CounterAPI error: ${response.status}`)
    }

    const data = await response.json()
    return { 
      count: data.count || 0,
      lastUpdated: new Date().toISOString()
    }
  } catch (error) {
    console.error("Error incrementing visitor count:", error)
    throw error
  }
}

export async function GET() {
  try {
    const data = await getVisitorCount()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await incrementVisitorCount()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error incrementing visitor count:", error)
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}
