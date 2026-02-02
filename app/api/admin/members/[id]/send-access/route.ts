import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Member from '@/lib/models/Member';
import { isAdminAuthenticatedFromRequest } from '@/lib/admin-auth';
import { sendPortalAccessEmail } from '@/lib/email';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

function generateUsername(organization: string): string {
    // Create a username from organization name
    const base = organization
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .trim()
        .split(/\s+/)
        .slice(0, 3)
        .join('.');

    // Add random suffix for uniqueness
    const suffix = crypto.randomBytes(2).toString('hex');
    return `${base}.${suffix}`;
}

function generatePassword(): string {
    // Generate a secure random password
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        if (!isAdminAuthenticatedFromRequest(request)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const { id } = await params;
        const member = await Member.findById(id);

        if (!member) {
            return NextResponse.json({ error: 'Member not found' }, { status: 404 });
        }

        // Generate credentials
        const username = member.username || generateUsername(member.organization);
        const password = generatePassword();
        const passwordHash = await bcrypt.hash(password, 10);

        // Update member with credentials
        member.username = username;
        member.passwordHash = passwordHash;
        member.hasPortalAccess = true;
        member.portalAccessSentAt = new Date();
        await member.save();

        // Send email
        const emailSent = await sendPortalAccessEmail(
            member.focalEmail,
            member.organization,
            username,
            password
        );

        if (!emailSent) {
            // Revert if email failed
            if (!member.username) {
                member.hasPortalAccess = false;
                member.portalAccessSentAt = undefined;
                await member.save();
            }

            return NextResponse.json(
                { error: 'Failed to send email. Please check SMTP configuration.' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: `Portal access sent to ${member.focalEmail}`,
        });
    } catch (error: unknown) {
        console.error('Send access error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to send access';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
