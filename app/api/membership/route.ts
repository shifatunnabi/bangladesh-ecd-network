import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import MembershipApplication from '@/lib/models/MembershipApplication';

export async function POST(request: Request) {
    try {
        const formData = await request.json();

        // Validate required fields
        if (!formData.sectionA?.organizationName) {
            return NextResponse.json(
                { error: 'Organization name is required' },
                { status: 400 }
            );
        }

        await dbConnect();

        // Check for existing pending/approved application
        const existingApplication = await MembershipApplication.findOne({
            'formData.sectionA.organizationName': formData.sectionA.organizationName,
            status: { $in: ['pending', 'approved'] },
        });

        if (existingApplication) {
            return NextResponse.json(
                { error: 'An application for this organization already exists' },
                { status: 400 }
            );
        }

        // Create the application
        const application = await MembershipApplication.create({
            status: 'pending',
            submittedAt: new Date(),
            formData,
        });

        return NextResponse.json({
            success: true,
            message: 'Application submitted successfully. You will receive an email once it has been reviewed.',
            applicationId: application._id,
        });
    } catch (error: unknown) {
        console.error('Membership application error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to submit application';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
