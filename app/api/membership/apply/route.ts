import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import MembershipApplication from '@/models/MembershipApplication';
import { notifyNewApplication } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const formData = await request.json();

        // Extract key fields from form data
        const organizationName = formData.sectionA?.organizationName || '';
        const organizationType = formData.sectionA?.organizationType || 'NonGovernment';
        const respondentName = formData.sectionF?.name || '';
        const respondentEmail = formData.sectionF?.email || '';

        if (!organizationName) {
            return NextResponse.json(
                { success: false, error: 'Organization name is required' },
                { status: 400 }
            );
        }

        if (!respondentName) {
            return NextResponse.json(
                { success: false, error: 'Respondent name is required' },
                { status: 400 }
            );
        }

        // Create the application
        const application = await MembershipApplication.create({
            organizationName,
            abbreviation: formData.sectionA?.abbreviation,
            yearEstablished: formData.sectionA?.yearEstablished,
            organizationType,
            headOfficeAddress: formData.sectionA?.headOfficeAddress || {},
            headOfOrganization: formData.sectionA?.headOfOrganization || {},
            focalPersonECD: formData.sectionA?.focalPersonECD || {},
            majorActivities: formData.sectionA?.majorActivities || [],
            targetNeeds: formData.sectionA?.targetNeeds || [],
            registration: formData.sectionA?.registration || {},
            sectionB: formData.sectionB || {},
            program0to3: formData.program0to3 || {},
            program3to5: formData.program3to5 || {},
            program5to6: formData.program5to6 || {},
            program6to8: formData.program6to8 || {},
            sectionD: formData.sectionD || {},
            sectionE: formData.sectionE || {},
            sectionF: {
                name: respondentName,
                designation: formData.sectionF?.designation || '',
                organization: formData.sectionF?.organization || organizationName,
                contactNumber: formData.sectionF?.contactNumber,
                email: respondentEmail,
                skypeId: formData.sectionF?.skypeId,
                dateOfSubmission: formData.sectionF?.dateOfSubmission || new Date().toISOString().split('T')[0],
            },
            formData, // Store complete form data for flexibility
            status: 'pending',
            submittedAt: new Date(),
        });

        // Send email notification to admins
        await notifyNewApplication({
            organizationName,
            respondentName,
            respondentEmail,
            submittedAt: application.submittedAt,
            applicationId: application._id.toString(),
        });

        return NextResponse.json({
            success: true,
            message: 'Application submitted successfully',
            applicationId: application._id.toString(),
        });
    } catch (error: any) {
        console.error('Error submitting application:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to submit application' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const skip = (page - 1) * limit;

        const query: any = {};
        if (status && ['pending', 'approved', 'rejected'].includes(status)) {
            query.status = status;
        }

        const [applications, total] = await Promise.all([
            MembershipApplication.find(query)
                .sort({ submittedAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            MembershipApplication.countDocuments(query),
        ]);

        return NextResponse.json({
            success: true,
            applications,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error: any) {
        console.error('Error fetching applications:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch applications' },
            { status: 500 }
        );
    }
}
