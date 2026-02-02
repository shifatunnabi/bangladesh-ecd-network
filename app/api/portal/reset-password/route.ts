import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Member from '@/lib/models/Member';
import PasswordResetToken from '@/lib/models/PasswordResetToken';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const { token, newPassword } = await request.json();

        if (!token || !newPassword) {
            return NextResponse.json(
                { error: 'Token and new password are required' },
                { status: 400 }
            );
        }

        if (newPassword.length < 8) {
            return NextResponse.json(
                { error: 'Password must be at least 8 characters' },
                { status: 400 }
            );
        }

        await dbConnect();

        // Find valid reset token
        const resetToken = await PasswordResetToken.findOne({
            token,
            expiresAt: { $gt: new Date() },
            usedAt: { $exists: false },
        });

        if (!resetToken) {
            return NextResponse.json(
                { error: 'Invalid or expired reset token' },
                { status: 400 }
            );
        }

        // Find member
        const member = await Member.findById(resetToken.memberId);

        if (!member) {
            return NextResponse.json(
                { error: 'Member not found' },
                { status: 404 }
            );
        }

        // Update password
        member.passwordHash = await bcrypt.hash(newPassword, 10);
        await member.save();

        // Mark token as used
        resetToken.usedAt = new Date();
        await resetToken.save();

        return NextResponse.json({
            success: true,
            message: 'Password reset successfully'
        });
    } catch (error: unknown) {
        console.error('Reset password error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to reset password';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
