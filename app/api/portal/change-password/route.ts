import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Member from '@/lib/models/Member';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const { currentPassword, newPassword } = await request.json();

        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { error: 'Current password and new password are required' },
                { status: 400 }
            );
        }

        if (newPassword.length < 8) {
            return NextResponse.json(
                { error: 'New password must be at least 8 characters' },
                { status: 400 }
            );
        }

        const member = await Member.findById(session.user.id);

        if (!member || !member.passwordHash) {
            return NextResponse.json({ error: 'Member not found' }, { status: 404 });
        }

        // Verify current password
        const isValidPassword = await bcrypt.compare(currentPassword, member.passwordHash);

        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'Current password is incorrect' },
                { status: 400 }
            );
        }

        // Hash and save new password
        member.passwordHash = await bcrypt.hash(newPassword, 10);
        await member.save();

        return NextResponse.json({ success: true, message: 'Password changed successfully' });
    } catch (error: unknown) {
        console.error('Change password error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to change password';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
