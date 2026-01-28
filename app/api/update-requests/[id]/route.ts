import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import UpdateRequest from '@/models/UpdateRequest';

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
        const { status, adminNotes } = await request.json();

        if (!status || !['pending', 'in-progress', 'resolved'].includes(status)) {
            return NextResponse.json(
                { success: false, error: 'Invalid status' },
                { status: 400 }
            );
        }

        await dbConnect();

        const updateData: any = {
            status,
            adminNotes,
        };

        if (status === 'resolved') {
            updateData.resolvedAt = new Date();
            updateData.resolvedBy = session.user.id;
        }

        const updateRequest = await UpdateRequest.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );

        if (!updateRequest) {
            return NextResponse.json(
                { success: false, error: 'Update request not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Update request updated successfully',
            request: updateRequest,
        });
    } catch (error: any) {
        console.error('Error updating request:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to update request' },
            { status: 500 }
        );
    }
}

export async function DELETE(
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
        await dbConnect();

        const updateRequest = await UpdateRequest.findByIdAndDelete(id);

        if (!updateRequest) {
            return NextResponse.json(
                { success: false, error: 'Update request not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Update request deleted successfully',
        });
    } catch (error: any) {
        console.error('Error deleting request:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to delete request' },
            { status: 500 }
        );
    }
}
