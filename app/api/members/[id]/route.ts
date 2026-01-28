import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await dbConnect();

        const member = await Member.findById(id).lean();

        if (!member) {
            return NextResponse.json(
                { success: false, error: 'Member not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            member,
        });
    } catch (error: any) {
        console.error('Error fetching member:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch member' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const data = await request.json();

        await dbConnect();

        const member = await Member.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true, runValidators: true }
        );

        if (!member) {
            return NextResponse.json(
                { success: false, error: 'Member not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Member updated successfully',
            member,
        });
    } catch (error: any) {
        console.error('Error updating member:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to update member' },
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

        // Soft delete by setting isActive to false
        const member = await Member.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );

        if (!member) {
            return NextResponse.json(
                { success: false, error: 'Member not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Member deleted successfully',
        });
    } catch (error: any) {
        console.error('Error deleting member:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to delete member' },
            { status: 500 }
        );
    }
}
