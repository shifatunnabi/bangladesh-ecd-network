import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import MembershipApplication from '@/models/MembershipApplication';
import Member from '@/models/Member';
import { notifyApplicationStatus } from '@/lib/email';

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = await params;
        const { status, notes } = await request.json();

        if (!status || !['approved', 'rejected'].includes(status)) {
            return NextResponse.json(
                { success: false, error: 'Invalid status. Must be "approved" or "rejected"' },
                { status: 400 }
            );
        }

        await dbConnect();

        const application = await MembershipApplication.findById(id);

        if (!application) {
            return NextResponse.json(
                { success: false, error: 'Application not found' },
                { status: 404 }
            );
        }

        // Update application status
        application.status = status;
        application.reviewedAt = new Date();
        application.reviewedBy = session.user.id;
        application.reviewNotes = notes || '';
        await application.save();

        // If approved, create a member from the application
        if (status === 'approved') {
            const memberData = {
                organization: application.organizationName,
                address: application.headOfficeAddress?.fullAddress || '',
                headName: application.headOfOrganization?.name || '',
                headDesignation: application.headOfOrganization?.designation || '',
                headEmail: application.headOfOrganization?.email || '',
                focalName: application.focalPersonECD?.name || '',
                focalDesignation: application.focalPersonECD?.designation || '',
                focalEmail: application.focalPersonECD?.email || '',
                division: application.headOfficeAddress?.division || '',
                applicationId: application._id,
                isActive: true,
            };

            await Member.create(memberData);
        }

        // Send notification email to applicant
        const applicantEmail = application.sectionF?.email || application.headOfOrganization?.email;
        if (applicantEmail) {
            await notifyApplicationStatus({
                email: applicantEmail,
                organizationName: application.organizationName,
                status,
                notes,
            });
        }

        return NextResponse.json({
            success: true,
            message: `Application ${status} successfully`,
            application: {
                id: application._id,
                status: application.status,
                reviewedAt: application.reviewedAt,
            },
        });
    } catch (error: any) {
        console.error('Error updating application status:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to update application status' },
            { status: 500 }
        );
    }
}
