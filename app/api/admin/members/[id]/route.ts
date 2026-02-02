import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Member from '@/lib/models/Member';
import { isAdminAuthenticatedFromRequest } from '@/lib/admin-auth';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        if (!isAdminAuthenticatedFromRequest(request)) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        const { id } = await params;
        const member = await Member.findById(id).lean();

        if (!member) {
            return NextResponse.json(
                { error: 'Member not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ member });
    } catch (error: unknown) {
        console.error('Get member error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch member';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        if (!isAdminAuthenticatedFromRequest(request)) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        const { id } = await params;
        const body = await request.json();

        // Validate required fields
        if (!body.organization || !body.focalEmail) {
            return NextResponse.json(
                { error: 'Organization name and focal email are required' },
                { status: 400 }
            );
        }

        // Update member
        const member = await Member.findByIdAndUpdate(
            id,
            {
                organization: body.organization,
                abbreviation: body.abbreviation || '',
                address: body.address || '',
                division: body.division || '',
                headName: body.headName || '',
                headDesignation: body.headDesignation || '',
                headEmail: body.headEmail || '',
                focalName: body.focalName || '',
                focalDesignation: body.focalDesignation || '',
                focalEmail: body.focalEmail,
            },
            { new: true, runValidators: true }
        ).lean();

        if (!member) {
            return NextResponse.json(
                { error: 'Member not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Member updated successfully',
            member,
        });
    } catch (error: unknown) {
        console.error('Update member error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to update member';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        if (!isAdminAuthenticatedFromRequest(request)) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        const { id } = await params;
        const member = await Member.findByIdAndDelete(id).lean();

        if (!member) {
            return NextResponse.json(
                { error: 'Member not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Member deleted successfully',
        });
    } catch (error: unknown) {
        console.error('Delete member error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete member';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
