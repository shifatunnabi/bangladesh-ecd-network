import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import Member from '@/lib/models/Member';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }

                await dbConnect();

                const member = await Member.findOne({
                    username: (credentials.username as string).toLowerCase(),
                    hasPortalAccess: true,
                });

                if (!member || !member.passwordHash) {
                    return null;
                }

                const isValidPassword = await bcrypt.compare(
                    credentials.password as string,
                    member.passwordHash
                );

                if (!isValidPassword) {
                    return null;
                }

                // Update last login
                await Member.findByIdAndUpdate(member._id, {
                    lastLogin: new Date(),
                });

                return {
                    id: member._id.toString(),
                    name: member.organization,
                    email: member.focalEmail,
                };
            },
        }),
    ],
    pages: {
        signIn: '/portal',
        error: '/portal',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // 24 hours
    },
});
