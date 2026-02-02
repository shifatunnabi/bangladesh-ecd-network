import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import MembershipApplication from '@/lib/models/MembershipApplication';
import { isAdminAuthenticatedFromRequest } from '@/lib/admin-auth';
import { sendApplicationRejectedEmail } from '@/lib/email';

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
        const { reason } = await request.json();

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

        // Update application status
        application.status = 'rejected';
        application.reviewedAt = new Date();
        application.reviewedBy = 'admin';
        application.rejectionReason = reason || '';
        await application.save();

        // Send rejection email
        const focalEmail = sectionA.focalPersonECD?.email || sectionA.headOfOrganization?.email;
        if (focalEmail) {
            await sendApplicationRejectedEmail(focalEmail, sectionA.organizationName, reason);
        }

        return NextResponse.json({
            success: true,
            message: 'Application rejected' + (focalEmail ? ` and notification sent to ${focalEmail}` : ''),
        });
    } catch (error: unknown) {
        console.error('Reject application error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to reject application';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
