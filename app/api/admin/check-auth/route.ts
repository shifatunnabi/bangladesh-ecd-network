import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export async function GET() {
    const authenticated = await isAdminAuthenticated();

    if (authenticated) {
        return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
    );
}
