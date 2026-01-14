import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import MembershipApplication from '@/lib/models/MembershipApplication'
import { sendNewApplicationNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
    try {
        await connectDB()

        const data = await request.json()

        // Validate required fields
        if (!data.sectionA?.organizationName) {
            return NextResponse.json(
                { error: 'Organization name is required' },
                { status: 400 }
            )
        }

        // Create new application
        const application = new MembershipApplication({
            ...data,
            status: 'pending',
        })

        await application.save()

        // Send email notification to admin
        try {
            await sendNewApplicationNotification({
                organizationName: data.sectionA.organizationName,
                submitterName: data.sectionF?.name,
                submitterEmail: data.sectionF?.email,
                submittedAt: new Date(),
                applicationId: application._id.toString(),
            })
        } catch (emailError) {
            console.error('Failed to send email notification:', emailError)
            // Don't fail the request if email fails
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Application submitted successfully',
                applicationId: application._id,
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Error submitting application:', error)
        return NextResponse.json(
            { error: 'Failed to submit application' },
            { status: 500 }
        )
    }
}

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
