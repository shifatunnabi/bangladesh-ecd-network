import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import MembershipApplication from '@/lib/models/MembershipApplication';
import Member from '@/lib/models/Member';
import { isAdminAuthenticatedFromRequest } from '@/lib/admin-auth';
import { sendApplicationApprovedEmail } from '@/lib/email';

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        if (!isAdminAuthenticatedFromRequest(request)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const { id } = await params;
        const application = await MembershipApplication.findById(id);

        if (!application) {
            return NextResponse.json({ error: 'Application not found' }, { status: 404 });
        }

        if (application.status !== 'pending') {
            return NextResponse.json(
                { error: `Application has already been ${application.status}` },
                { status: 400 }
            );
        }

        const { formData } = application;
        const { sectionA } = formData;

        // Check if member already exists
        const existingMember = await Member.findOne({
            organization: sectionA.organizationName
        });

        if (existingMember) {
            return NextResponse.json(
                { error: 'A member with this organization name already exists' },
                { status: 400 }
            );
        }

        // Get focal email (required)
        const focalEmail = sectionA.focalPersonECD?.email || sectionA.headOfOrganization?.email;
        if (!focalEmail) {
            return NextResponse.json(
                { error: 'Application is missing a focal person email' },
                { status: 400 }
            );
        }

        // Create member from application
        const member = await Member.create({
            applicationId: application._id,
            organization: sectionA.organizationName,
            abbreviation: sectionA.abbreviation,
            address: sectionA.headOfficeAddress?.fullAddress || '',
            division: sectionA.headOfficeAddress?.division || '',
            headName: sectionA.headOfOrganization?.name || '',
            headDesignation: sectionA.headOfOrganization?.designation || '',
            headEmail: sectionA.headOfOrganization?.email || '',
            focalName: sectionA.focalPersonECD?.name || '',
            focalDesignation: sectionA.focalPersonECD?.designation || '',
            focalEmail,
            fullFormData: formData,
            isSeeded: false,
            hasPortalAccess: false,
        });

        // Update application status
        application.status = 'approved';
        application.reviewedAt = new Date();
        application.reviewedBy = 'admin';
        await application.save();

        // Send approval email
        await sendApplicationApprovedEmail(focalEmail, sectionA.organizationName);

        return NextResponse.json({
            success: true,
            message: `Application approved. Member created and notification sent to ${focalEmail}`,
            memberId: member._id,
        });
    } catch (error: unknown) {
        console.error('Approve application error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to approve application';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
