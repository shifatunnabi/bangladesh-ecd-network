import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

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

        // Only superadmin can delete users
        if (session.user.role !== 'superadmin') {
            return NextResponse.json(
                { success: false, error: 'Only superadmin can delete users' },
                { status: 403 }
            );
        }

        const { id } = await params;

        // Cannot delete yourself
        if (session.user.id === id) {
            return NextResponse.json(
                { success: false, error: 'You cannot delete your own account' },
                { status: 400 }
            );
        }

        await dbConnect();

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error: any) {
        console.error('Error deleting user:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to delete user' },
            { status: 500 }
        );
    }
}
