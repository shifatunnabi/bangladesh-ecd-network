import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const ADMIN_SESSION_COOKIE = 'admin_session';
const ADMIN_SESSION_VALUE = 'authenticated';

export function verifyAdminCredentials(username: string, password: string): boolean {
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
        console.error('Admin credentials not configured in environment variables');
        return false;
    }

    return username === adminUsername && password === adminPassword;
}

export async function setAdminSession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 8, // 8 hours
        path: '/',
    });
}

export async function clearAdminSession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function isAdminAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_SESSION_COOKIE);
    return session?.value === ADMIN_SESSION_VALUE;
}

// For use in API routes
export function isAdminAuthenticatedFromRequest(request: NextRequest): boolean {
    const session = request.cookies.get(ADMIN_SESSION_COOKIE);
    return session?.value === ADMIN_SESSION_VALUE;
}
