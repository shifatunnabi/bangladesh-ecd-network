import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import MembershipApplication from '@/lib/models/MembershipApplication'
import Member from '@/lib/models/Member'

// GET all applications
export async function GET() {
    try {
        await connectDB()

        const applications = await MembershipApplication.find()
            .sort({ createdAt: -1 })
            .lean()

        return NextResponse.json(applications)
    } catch (error) {
        console.error('Error fetching applications:', error)
        return NextResponse.json(
            { error: 'Failed to fetch applications' },
            { status: 500 }
        )
    }
}
