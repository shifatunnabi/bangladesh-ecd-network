import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import PasswordResetToken from '@/lib/models/PasswordResetToken';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json({ error: 'Token is required' }, { status: 400 });
        }

        await dbConnect();

        const resetToken = await PasswordResetToken.findOne({
            token,
            expiresAt: { $gt: new Date() },
            usedAt: { $exists: false },
        });

        if (!resetToken) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
        }

        return NextResponse.json({ valid: true });
    } catch (error: unknown) {
        console.error('Validate token error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to validate token';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
