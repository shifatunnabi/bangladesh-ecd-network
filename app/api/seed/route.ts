import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Member from '@/lib/models/Member';
import { isAdminAuthenticatedFromRequest } from '@/lib/admin-auth';
import fs from 'fs';
import path from 'path';

// Simple CSV parser (copied from existing lib/members.ts)
function parseCSV(content: string): Record<string, string>[] {
    const lines = content.trim().split('\n');
    if (lines.length === 0) return [];

    const headers = parseCSVLine(lines[0]);
    const records: Record<string, string>[] = [];
    let currentLine = '';

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        currentLine += (currentLine ? '\n' : '') + line;

        let quoteCount = 0;
        for (let j = 0; j < currentLine.length; j++) {
            if (currentLine[j] === '"') quoteCount++;
        }

        if (quoteCount % 2 === 0) {
            const fields = parseCSVLine(currentLine);
            const record: Record<string, string> = {};

            headers.forEach((header, index) => {
                record[header] = fields[index] || '';
            });

            if (record['Name of organization']) {
                records.push(record);
            }

            currentLine = '';
        }
    }

    return records;
}

function parseCSVLine(line: string): string[] {
    const fields: string[] = [];
    let currentField = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                currentField += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            fields.push(currentField.trim());
            currentField = '';
        } else {
            currentField += char;
        }
    }

    fields.push(currentField.trim());
    return fields;
}

export async function POST(request: NextRequest) {
    try {
        // Check for admin authorization using cookie
        if (!isAdminAuthenticatedFromRequest(request)) {
            return NextResponse.json(
                { error: 'Unauthorized. Please log in to admin panel first.' },
                { status: 401 }
            );
        }

        await dbConnect();

        // Read CSV file
        const csvPath = path.join(process.cwd(), 'public', 'members.csv');
        const fileContent = fs.readFileSync(csvPath, 'utf-8');
        const records = parseCSV(fileContent);

        let seededCount = 0;
        let skippedCount = 0;
        const errors: string[] = [];

        for (const row of records) {
            try {
                const organization = row['Name of organization']?.trim();
                if (!organization) continue;

                // Check if member already exists
                const existingMember = await Member.findOne({ organization });
                if (existingMember) {
                    skippedCount++;
                    continue;
                }

                // Parse head name and designation
                const headFullText = row['Name and designation of the Head of the organization'] || '';
                const headParts = headFullText.split('\n').map((s: string) => s.trim()).filter(Boolean);
                const headName = headParts[0] || '';
                const headDesignation = headParts.slice(1).join(' ').trim() || '';

                // Parse focal name and designation
                const focalFullText = row['Name and designation of the ECD Focal Person'] || '';
                const focalParts = focalFullText.split('\n').map((s: string) => s.trim()).filter(Boolean);
                const focalName = focalParts[0] || '';
                const focalDesignation = focalParts.slice(1).join(' ').trim() || '';

                // Get division
                let division = row['Division']?.trim() || '';
                if (division && !division.includes('Division')) {
                    division = division + ' Division';
                }

                // Get focal email (required)
                const focalEmail = row['Email of the ECD Focal Person']?.trim();
                if (!focalEmail) {
                    errors.push(`Skipped "${organization}": No focal email found`);
                    continue;
                }

                // Create member
                await Member.create({
                    organization,
                    address: row['Full address of the organization (Head Office)']?.trim() || '',
                    headName: headName.trim(),
                    headDesignation: headDesignation.trim(),
                    headEmail: row['Email of the Head of the organization']?.trim() || '',
                    focalName: focalName.trim(),
                    focalDesignation: focalDesignation.trim(),
                    focalEmail,
                    division,
                    isSeeded: true,
                    hasPortalAccess: false,
                });

                seededCount++;
            } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                errors.push(`Error seeding "${row['Name of organization']}": ${errorMessage}`);
            }
        }

        return NextResponse.json({
            success: true,
            message: `Seeding completed. ${seededCount} members seeded, ${skippedCount} skipped (already exist).`,
            seeded: seededCount,
            skipped: skippedCount,
            errors: errors.length > 0 ? errors : undefined,
        });
    } catch (error: unknown) {
        console.error('Seed error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to seed members';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}

// GET endpoint to check current member count
export async function GET() {
    try {
        await dbConnect();

        const totalMembers = await Member.countDocuments();
        const seededMembers = await Member.countDocuments({ isSeeded: true });
        const approvedFromApplications = await Member.countDocuments({ isSeeded: false });
        const withPortalAccess = await Member.countDocuments({ hasPortalAccess: true });

        return NextResponse.json({
            totalMembers,
            seededMembers,
            approvedFromApplications,
            withPortalAccess,
        });
    } catch (error: unknown) {
        console.error('Seed check error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to check seed status';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
