import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const division = searchParams.get('division');
        const search = searchParams.get('search');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '50');
        const skip = (page - 1) * limit;

        const query: any = { isActive: true };

        if (division) {
            query.division = { $regex: division, $options: 'i' };
        }

        if (search) {
            query.$or = [
                { organization: { $regex: search, $options: 'i' } },
                { headName: { $regex: search, $options: 'i' } },
                { focalName: { $regex: search, $options: 'i' } },
            ];
        }

        const [members, total] = await Promise.all([
            Member.find(query)
                .sort({ organization: 1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Member.countDocuments(query),
        ]);

        return NextResponse.json({
            success: true,
            members,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error: any) {
        console.error('Error fetching members:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch members' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const data = await request.json();

        if (!data.organization) {
            return NextResponse.json(
                { success: false, error: 'Organization name is required' },
                { status: 400 }
            );
        }

        const member = await Member.create({
            ...data,
            isActive: true,
        });

        return NextResponse.json({
            success: true,
            message: 'Member created successfully',
            member,
        });
    } catch (error: any) {
        console.error('Error creating member:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create member' },
            { status: 500 }
        );
    }
}
