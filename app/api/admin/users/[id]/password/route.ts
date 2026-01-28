import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

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
        const { currentPassword, newPassword } = await request.json();

        // Users can only change their own password, unless they're superadmin
        if (session.user.id !== id && session.user.role !== 'superadmin') {
            return NextResponse.json(
                { success: false, error: 'You can only change your own password' },
                { status: 403 }
            );
        }

        if (!newPassword || newPassword.length < 6) {
            return NextResponse.json(
                { success: false, error: 'New password must be at least 6 characters' },
                { status: 400 }
            );
        }

        await dbConnect();

        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        // If changing own password, verify current password
        if (session.user.id === id) {
            if (!currentPassword) {
                return NextResponse.json(
                    { success: false, error: 'Current password is required' },
                    { status: 400 }
                );
            }

            const isValidPassword = await bcrypt.compare(currentPassword, user.password);
            if (!isValidPassword) {
                return NextResponse.json(
                    { success: false, error: 'Current password is incorrect' },
                    { status: 400 }
                );
            }
        }

        // Hash and update password
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({
            success: true,
            message: 'Password updated successfully',
        });
    } catch (error: any) {
        console.error('Error updating password:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to update password' },
            { status: 500 }
        );
    }
}
