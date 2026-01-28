import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import UpdateRequest from '@/models/UpdateRequest';
import { notifyUpdateRequest } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const data = await request.json();

        // Validate required fields
        const requiredFields = ['name', 'email', 'phone', 'organization', 'requestedChanges'];
        for (const field of requiredFields) {
            if (!data[field]) {
                return NextResponse.json(
                    { success: false, error: `${field} is required` },
                    { status: 400 }
                );
            }
        }

        // Create the update request
        const updateRequest = await UpdateRequest.create({
            name: data.name,
            email: data.email,
            phone: data.phone,
            organization: data.organization,
            requestedChanges: data.requestedChanges,
            status: 'pending',
        });

        // Notify admins
        await notifyUpdateRequest({
            name: data.name,
            email: data.email,
            phone: data.phone,
            organization: data.organization,
            requestedChanges: data.requestedChanges,
            requestId: updateRequest._id.toString(),
        });

        return NextResponse.json({
            success: true,
            message: 'Update request submitted successfully. An administrator will contact you soon.',
            requestId: updateRequest._id.toString(),
        });
    } catch (error: any) {
        console.error('Error submitting update request:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to submit update request' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const skip = (page - 1) * limit;

        const query: any = {};
        if (status && ['pending', 'in-progress', 'resolved'].includes(status)) {
            query.status = status;
        }

        const [requests, total] = await Promise.all([
            UpdateRequest.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            UpdateRequest.countDocuments(query),
        ]);

        return NextResponse.json({
            success: true,
            requests,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error: any) {
        console.error('Error fetching update requests:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch update requests' },
            { status: 500 }
        );
    }
}
