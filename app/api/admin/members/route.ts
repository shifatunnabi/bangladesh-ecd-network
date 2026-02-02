import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Member from '@/lib/models/Member';
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
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '100');
        const hasPortalAccess = searchParams.get('hasPortalAccess');
        const division = searchParams.get('division');

        const query: Record<string, unknown> = {};

        if (hasPortalAccess === 'true') {
            query.hasPortalAccess = true;
        } else if (hasPortalAccess === 'false') {
            query.hasPortalAccess = false;
        }

        if (division && division !== 'all') {
            query.division = division;
        }

        const skip = (page - 1) * limit;

        const members = await Member.find(query)
            .select('organization abbreviation division focalName focalEmail hasPortalAccess isSeeded createdAt')
            .sort({ organization: 1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Member.countDocuments(query);

        return NextResponse.json({
            members,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error: unknown) {
        console.error('Members list error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch members';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
