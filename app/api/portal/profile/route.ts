import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Member from '@/lib/models/Member';

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const member = await Member.findById(session.user.id)
            .select('organization abbreviation address division headName headDesignation headEmail focalName focalDesignation focalEmail')
            .lean();

        if (!member) {
            return NextResponse.json({ error: 'Member not found' }, { status: 404 });
        }

        return NextResponse.json({ profile: member });
    } catch (error: unknown) {
        console.error('Profile fetch error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch profile';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const body = await request.json();
        const {
            organization,
            abbreviation,
            address,
            division,
            headName,
            headDesignation,
            headEmail,
            focalName,
            focalDesignation,
            focalEmail,
        } = body;

        // Validate required fields
        if (!organization || !focalEmail) {
            return NextResponse.json(
                { error: 'Organization name and focal email are required' },
                { status: 400 }
            );
        }

        const member = await Member.findById(session.user.id);

        if (!member) {
            return NextResponse.json({ error: 'Member not found' }, { status: 404 });
        }

        // Update fields
        member.organization = organization;
        member.abbreviation = abbreviation;
        member.address = address;
        member.division = division;
        member.headName = headName;
        member.headDesignation = headDesignation;
        member.headEmail = headEmail;
        member.focalName = focalName;
        member.focalDesignation = focalDesignation;
        member.focalEmail = focalEmail;

        await member.save();

        return NextResponse.json({ success: true, message: 'Profile updated successfully' });
    } catch (error: unknown) {
        console.error('Profile update error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
