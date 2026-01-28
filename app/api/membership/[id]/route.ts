import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import MembershipApplication from '@/models/MembershipApplication';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await dbConnect();

        const application = await MembershipApplication.findById(id).lean();

        if (!application) {
            return NextResponse.json(
                { success: false, error: 'Application not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            application,
        });
    } catch (error: any) {
        console.error('Error fetching application:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch application' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await dbConnect();

        const application = await MembershipApplication.findByIdAndDelete(id);

        if (!application) {
            return NextResponse.json(
                { success: false, error: 'Application not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Application deleted successfully',
        });
    } catch (error: any) {
        console.error('Error deleting application:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to delete application' },
            { status: 500 }
        );
    }
}
