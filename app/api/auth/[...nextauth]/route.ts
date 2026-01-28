import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import UserModel from '@/models/User';
import FailedLoginAttempt from '@/models/FailedLoginAttempt';
import { headers } from 'next/headers';

// Extend the built-in session types
declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
        };
    }

    interface User {
        id: string;
        email: string;
        name: string;
        role: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        role: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required');
                }

                await dbConnect();

                // Get IP address from headers
                const headersList = await headers();
                const forwarded = headersList.get('x-forwarded-for');
                const ip = forwarded ? forwarded.split(',')[0].trim() : headersList.get('x-real-ip') || 'unknown';

                // Check if IP is blacklisted
                const isBlacklisted = await FailedLoginAttempt.findOne({ ip, isBlacklisted: true });
                if (isBlacklisted) {
                    throw new Error('Your IP has been blocked due to multiple failed login attempts. Please contact the administrator.');
                }

                // Find user
                const user = await UserModel.findOne({ email: credentials.email.toLowerCase() });

                if (!user) {
                    // Record failed attempt
                    await recordFailedAttempt(ip, credentials.email);
                    throw new Error('Invalid email or password');
                }

                // Verify password
                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordValid) {
                    // Record failed attempt
                    const result = await recordFailedAttempt(ip, credentials.email);
                    if (result.shouldBlacklist) {
                        throw new Error('Your IP has been blocked due to multiple failed login attempts. Please contact the administrator.');
                    }
                    throw new Error('Invalid email or password');
                }

                // Successful login - clear any non-blacklisted attempts for this IP
                await FailedLoginAttempt.deleteMany({ ip, isBlacklisted: false });

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // 24 hours
    },
    pages: {
        signIn: '/admin/login',
        error: '/admin/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
};

async function recordFailedAttempt(ip: string, email: string) {
    await FailedLoginAttempt.create({ ip, email });

    // Count recent attempts (within 30 minutes)
    const since = new Date(Date.now() - 30 * 60 * 1000);
    const attempts = await FailedLoginAttempt.countDocuments({
        ip,
        attemptAt: { $gte: since },
        isBlacklisted: false,
    });

    // Blacklist if 3 or more attempts
    if (attempts >= 3) {
        await FailedLoginAttempt.updateMany({ ip }, { isBlacklisted: true });
        return { shouldBlacklist: true, attempts };
    }

    return { shouldBlacklist: false, attempts };
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
