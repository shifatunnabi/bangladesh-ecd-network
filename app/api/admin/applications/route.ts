import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import MembershipApplication from '@/lib/models/MembershipApplication';
import { isAdminAuthenticatedFromRequest } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
    try {
        // Check admin authentication
        if (!isAdminAuthenticatedFromRequest(request)) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '50');

        const query: Record<string, unknown> = {};
        if (status && status !== 'all') {
            query.status = status;
        }

        const skip = (page - 1) * limit;

        const applications = await MembershipApplication.find(query)
            .sort({ submittedAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await MembershipApplication.countDocuments(query);

        return NextResponse.json({
            applications,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error: unknown) {
        console.error('Applications list error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch applications';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
