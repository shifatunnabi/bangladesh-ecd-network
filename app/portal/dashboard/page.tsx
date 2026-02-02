'use client';

import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, User, Lock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function PortalDashboardPage() {
    const { data: session } = useSession();

    const quickLinks = [
        {
            title: 'Edit Profile',
            description: 'Update your organization information',
            icon: User,
            href: '/portal/profile',
            color: 'bg-blue-500',
        },
        {
            title: 'Change Password',
            description: 'Update your login password',
            icon: Lock,
            href: '/portal/change-password',
            color: 'bg-green-500',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-6 text-white">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-full">
                        <Building className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Welcome back!</h1>
                        <p className="text-blue-100">{session?.user?.name || 'Member'}</p>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quickLinks.map((link) => (
                        <Link key={link.href} href={link.href}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                                <CardContent className="flex items-center gap-4 p-6">
                                    <div className={`p-3 rounded-lg ${link.color}`}>
                                        <link.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{link.title}</h3>
                                        <p className="text-sm text-gray-500">{link.description}</p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Member Info Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Your Membership</CardTitle>
                    <CardDescription>
                        You are a registered member of the Bangladesh ECD Network
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-green-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium">Active Member</span>
                        </div>
                        <p className="text-sm text-gray-600">
                            Your organization is listed in the BEN members directory.
                            You can update your organization information through the profile page.
                        </p>
                        <Link href="/members" target="_blank">
                            <Button variant="outline" size="sm">
                                View Members Directory
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>

            {/* Help Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                        If you have any questions or need assistance, please contact us at{' '}
                        <a href="mailto:info@ecd-bangladesh.net" className="text-primary hover:underline">
                            info@ecd-bangladesh.net
                        </a>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
