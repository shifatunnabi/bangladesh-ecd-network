import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Member from '@/lib/models/Member';

export async function GET() {
    try {
        await dbConnect();

        const members = await Member.find({})
            .select('organization abbreviation address division headName headDesignation focalName focalDesignation focalEmail isSeeded')
            .sort({ organization: 1 })
            .lean();

        // Transform to match the expected format for the public members page
        const formattedMembers = members.map((member: any, index: number) => ({
            id: member._id.toString(),
            organization: member.organization,
            abbreviation: member.abbreviation || '',
            address: member.address || '',
            division: member.division || '',
            headName: member.headName || '',
            headDesignation: member.headDesignation || '',
            focalName: member.focalName || '',
            focalDesignation: member.focalDesignation || '',
            focalEmail: member.focalEmail || '',
        }));

        return NextResponse.json({ members: formattedMembers });
    } catch (error: unknown) {
        console.error('Public members API error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch members';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
