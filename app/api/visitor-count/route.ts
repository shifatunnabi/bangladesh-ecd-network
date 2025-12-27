import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const DATA_FILE = path.join(process.cwd(), "data", "visitor-count.json")

interface VisitorData {
  count: number
  lastUpdated: string
}

async function ensureDataFile() {
  try {
    const dir = path.dirname(DATA_FILE)
    await fs.mkdir(dir, { recursive: true })
    
    try {
      await fs.access(DATA_FILE)
    } catch {
      // File doesn't exist, create it with initial data
      const initialData: VisitorData = {
        count: 0,
        lastUpdated: new Date().toISOString(),
      }
      await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2))
    }
  } catch (error) {
    console.error("Error ensuring data file:", error)
  }
}

async function readVisitorCount(): Promise<VisitorData> {
  await ensureDataFile()
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading visitor count:", error)
    return { count: 0, lastUpdated: new Date().toISOString() }
  }
}

async function writeVisitorCount(data: VisitorData): Promise<void> {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error("Error writing visitor count:", error)
  }
}

export async function GET() {
  try {
    const data = await readVisitorCount()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await readVisitorCount()
    
    // Increment the count
    const newData: VisitorData = {
      count: data.count + 1,
      lastUpdated: new Date().toISOString(),
    }
    
    await writeVisitorCount(newData)
    
    return NextResponse.json(newData)
  } catch (error) {
    console.error("Error incrementing visitor count:", error)
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}
