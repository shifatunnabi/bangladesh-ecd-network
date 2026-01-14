import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Member from '@/lib/models/Member'

// Simple CSV parser
function parseCSV(content: string): Record<string, string>[] {
    const lines = content.trim().split('\n')
    if (lines.length === 0) return []

    // Parse header
    const headers = parseCSVLine(lines[0])

    // Parse data rows
    const records: Record<string, string>[] = []
    let currentLine = ''

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
                currentField += '"'
                i++
            } else {
                inQuotes = !inQuotes
            }
        } else if (char === ',' && !inQuotes) {
            fields.push(currentField.trim())
            currentField = ''
        } else {
            currentField += char
        }
    }

    fields.push(currentField.trim())
    return fields
}

export async function POST(request: NextRequest) {
    try {
        await connectDB()

        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        const content = await file.text()
        const records = parseCSV(content)

        if (records.length === 0) {
            return NextResponse.json({ error: 'No valid records found in CSV' }, { status: 400 })
        }

        const members = records.map((row) => {
            // Parse head name and designation
            const headFullText = row['Name and designation of the Head of the organization'] || ''
            const headParts = headFullText.split('\n').map((s: string) => s.trim()).filter(Boolean)
            const headName = headParts[0] || ''
            const headDesignation = headParts.slice(1).join(' ').trim() || ''

            // Parse focal name and designation
            const focalFullText = row['Name and designation of the ECD Focal Person'] || ''
            const focalParts = focalFullText.split('\n').map((s: string) => s.trim()).filter(Boolean)
            const focalName = focalParts[0] || ''
            const focalDesignation = focalParts.slice(1).join(' ').trim() || ''

            let division = row['Division']?.trim() || ''
            if (division && !division.includes('Division')) {
                division = division + ' Division'
            }

            return {
                organization: row['Name of organization']?.trim() || '',
                address: row['Full address of the organization (Head Office)']?.trim() || '',
                headName: headName.trim(),
                headDesignation: headDesignation.trim(),
                headEmail: row['Email of the Head of the organization']?.trim() || '',
                focalName: focalName.trim(),
                focalDesignation: focalDesignation.trim(),
                focalEmail: row['Email of the ECD Focal Person']?.trim() || '',
                division: division,
                website: row['Website']?.trim() || '',
            }
        }).filter((m) => m.organization)

        // Insert all members (you might want to handle duplicates differently)
        const result = await Member.insertMany(members, { ordered: false })

        return NextResponse.json({
            success: true,
            message: `Imported ${result.length} members`,
            count: result.length,
        })
    } catch (error: any) {
        console.error('Error importing members:', error)

        // Handle duplicate key errors
        if (error.code === 11000) {
            return NextResponse.json(
                { error: 'Some members already exist in the database' },
                { status: 409 }
            )
        }

        return NextResponse.json(
            { error: 'Failed to import members' },
            { status: 500 }
        )
    }
}
