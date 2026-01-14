import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Member from '@/lib/models/Member'

// GET all members
export async function GET() {
    try {
        await connectDB()

        const members = await Member.find().sort({ organization: 1 }).lean()

        return NextResponse.json(members)
    } catch (error) {
        console.error('Error fetching members:', error)
        return NextResponse.json(
            { error: 'Failed to fetch members' },
            { status: 500 }
        )
    }
}

// POST create new member
export async function POST(request: NextRequest) {
    try {
        await connectDB()

        const data = await request.json()

        if (!data.organization) {
            return NextResponse.json(
                { error: 'Organization name is required' },
                { status: 400 }
            )
        }

        const member = new Member(data)
        await member.save()

        return NextResponse.json(
            { success: true, member },
            { status: 201 }
        )
    } catch (error) {
        console.error('Error creating member:', error)
        return NextResponse.json(
            { error: 'Failed to create member' },
            { status: 500 }
        )
    }
}
