import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import MembershipApplication from '@/lib/models/MembershipApplication';
import { isAdminAuthenticatedFromRequest } from '@/lib/admin-auth';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        if (!isAdminAuthenticatedFromRequest(request)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const { id } = await params;
        const application = await MembershipApplication.findById(id).lean();

        if (!application) {
            return NextResponse.json({ error: 'Application not found' }, { status: 404 });
        }

        return NextResponse.json({ application });
    } catch (error: unknown) {
        console.error('Application detail error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch application';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
