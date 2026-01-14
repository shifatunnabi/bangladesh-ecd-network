import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import MembershipApplication from '@/lib/models/MembershipApplication'
import Member from '@/lib/models/Member'
import mongoose from 'mongoose'

type RouteParams = { params: Promise<{ id: string }> }

// GET single application
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        await connectDB()
        const { id } = await params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Invalid application ID' }, { status: 400 })
        }

        const application = await MembershipApplication.findById(id).lean()

        if (!application) {
            return NextResponse.json({ error: 'Application not found' }, { status: 404 })
        }

        return NextResponse.json(application)
    } catch (error) {
        console.error('Error fetching application:', error)
        return NextResponse.json(
            { error: 'Failed to fetch application' },
            { status: 500 }
        )
    }
}

// PUT update application status (approve/reject)
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        await connectDB()
        const { id } = await params
        const data = await request.json()

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Invalid application ID' }, { status: 400 })
        }

        const application = await MembershipApplication.findById(id)

        if (!application) {
            return NextResponse.json({ error: 'Application not found' }, { status: 404 })
        }

        // Update status and notes
        application.status = data.status || application.status
        application.adminNotes = data.adminNotes || application.adminNotes
        await application.save()

        // If approved, create a member entry
        if (data.status === 'approved') {
            const sectionA = application.sectionA

            const member = new Member({
                organization: sectionA.organizationName,
                address: sectionA.headOfficeAddress?.fullAddress || '',
                headName: sectionA.headOfOrganization?.name || '',
                headDesignation: sectionA.headOfOrganization?.designation || '',
                headEmail: sectionA.headOfOrganization?.email || '',
                focalName: sectionA.focalPersonECD?.name || '',
                focalDesignation: sectionA.focalPersonECD?.designation || '',
                focalEmail: sectionA.focalPersonECD?.email || '',
                division: sectionA.headOfficeAddress?.division || '',
                website: sectionA.headOfficeAddress?.website || '',
            })

            await member.save()

            return NextResponse.json({
                success: true,
                message: 'Application approved and member created',
                application,
                member,
            })
        }

        return NextResponse.json({
            success: true,
            message: `Application ${data.status}`,
            application,
        })
    } catch (error) {
        console.error('Error updating application:', error)
        return NextResponse.json(
            { error: 'Failed to update application' },
            { status: 500 }
        )
    }
}

// DELETE application
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        await connectDB()
        const { id } = await params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Invalid application ID' }, { status: 400 })
        }

        const application = await MembershipApplication.findByIdAndDelete(id)

        if (!application) {
            return NextResponse.json({ error: 'Application not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, message: 'Application deleted' })
    } catch (error) {
        console.error('Error deleting application:', error)
        return NextResponse.json(
            { error: 'Failed to delete application' },
            { status: 500 }
        )
    }
}
