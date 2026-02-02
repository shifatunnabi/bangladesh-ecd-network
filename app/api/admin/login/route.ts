import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials, setAdminSession } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            );
        }

        const isValid = verifyAdminCredentials(username, password);

        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        await setAdminSession();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Admin login error:', error);
        return NextResponse.json(
            { error: 'An error occurred during login' },
            { status: 500 }
        );
    }
}
