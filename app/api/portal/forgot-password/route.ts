import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Member from '@/lib/models/Member';
import PasswordResetToken from '@/lib/models/PasswordResetToken';
import { sendPasswordResetEmail } from '@/lib/email';
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        await dbConnect();

        // Find member by focal email
        const member = await Member.findOne({
            focalEmail: email.toLowerCase().trim(),
            hasPortalAccess: true,
        });

        // Always return success to prevent email enumeration
        if (!member) {
            return NextResponse.json({
                success: true,
                message: 'If an account exists, a reset email will be sent'
            });
        }

        // Generate reset token
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        // Delete any existing tokens for this member
        await PasswordResetToken.deleteMany({ memberId: member._id });

        // Create new token
        await PasswordResetToken.create({
            memberId: member._id,
            token,
            expiresAt,
        });

        // Send reset email
        await sendPasswordResetEmail(member.focalEmail, member.organization, token);

        return NextResponse.json({
            success: true,
            message: 'Password reset email sent'
        });
    } catch (error: unknown) {
        console.error('Forgot password error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to process request';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
