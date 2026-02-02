import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import MembershipApplication from '@/lib/models/MembershipApplication';

export async function GET() {
    try {
        await dbConnect();

        const pending = await MembershipApplication.countDocuments({ status: 'pending' });
        const approved = await MembershipApplication.countDocuments({ status: 'approved' });
        const rejected = await MembershipApplication.countDocuments({ status: 'rejected' });
        const total = await MembershipApplication.countDocuments();

        return NextResponse.json({
            pending,
            approved,
            rejected,
            total,
        });
    } catch (error: unknown) {
        console.error('Applications stats error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch stats';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
