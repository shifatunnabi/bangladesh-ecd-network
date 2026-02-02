import fs from 'fs'
import path from 'path'

export interface Member {
  id: string
  organization: string
  address: string
  headName: string
  headDesignation: string
  headEmail: string
  focalName: string
  focalDesignation: string
  focalEmail: string
  division: string
}

// Simple CSV parser without external dependencies
function parseCSV(content: string): Record<string, string>[] {
  const lines = content.trim().split('\n')
  if (lines.length === 0) return []

  // Parse header
  const headers = parseCSVLine(lines[0])

  // Parse data rows
  const records: Record<string, string>[] = []
  let currentLine = ''
  let inQuotes = false

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]

    // Handle multi-line quoted fields
    currentLine += (currentLine ? '\n' : '') + line

    // Count quotes to determine if we're still in a quoted field
    let quoteCount = 0
    for (let j = 0; j < currentLine.length; j++) {
      if (currentLine[j] === '"') quoteCount++
    }

    // If even number of quotes, we have a complete row
    if (quoteCount % 2 === 0) {
      const fields = parseCSVLine(currentLine)
      const record: Record<string, string> = {}

      headers.forEach((header, index) => {
        record[header] = fields[index] || ''
      })

      if (record['Name of organization']) {
        records.push(record)
      }

      currentLine = ''
    }
  }

  return records
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = []
  let currentField = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        currentField += '"'
        i++ // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      fields.push(currentField.trim())
      currentField = ''
    } else {
      currentField += char
    }
  }

  // Add last field
  fields.push(currentField.trim())
  return fields
}

export async function getMembers(): Promise<Member[]> {
  // First, try to get members from the database API
  try {
    const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/members`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      const data = await response.json();
      if (data.members && data.members.length > 0) {
        return data.members;
      }
    }
  } catch (error) {
    console.log('Could not fetch from database, falling back to CSV');
  }

  // Fall back to CSV file
  try {
    const csvPath = path.join(process.cwd(), 'public', 'members.csv')
    const fileContent = fs.readFileSync(csvPath, 'utf-8')

    const records = parseCSV(fileContent)

    const members: Member[] = records.map((row: any, index: number) => {
      // Parse head name and designation from the "Name and designation" field
      const headFullText = row['Name and designation of the Head of the organization'] || ''
      const headParts = headFullText.split('\n').map((s: string) => s.trim()).filter(Boolean)
      const headName = headParts[0] || ''
      const headDesignation = headParts.slice(1).join(' ').trim() || ''

      // Parse focal name and designation from the "Name and designation of ECD Focal Person" field
      const focalFullText = row['Name and designation of the ECD Focal Person'] || ''
      const focalParts = focalFullText.split('\n').map((s: string) => s.trim()).filter(Boolean)
      const focalName = focalParts[0] || ''
      const focalDesignation = focalParts.slice(1).join(' ').trim() || ''

      let division = row['Division']?.trim() || ''
      if (division && !division.includes('Division')) {
        division = division + ' Division'
      }

      return {
        id: (index + 1).toString(),
        organization: row['Name of organization']?.trim() || '',
        address: row['Full address of the organization (Head Office)']?.trim() || '',
        headName: headName.trim(),
        headDesignation: headDesignation.trim(),
        headEmail: row['Email of the Head of the organization']?.trim() || '',
        focalName: focalName.trim(),
        focalDesignation: focalDesignation.trim(),
        focalEmail: row['Email of the ECD Focal Person']?.trim() || '',
        division: division,
      }
    }).filter((member: Member) => member.organization) // Filter out empty rows

    return members
  } catch (error) {
    console.error('Error reading members CSV:', error)
    return []
  }
}

