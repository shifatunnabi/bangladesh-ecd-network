import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import MembershipApplication from '@/models/MembershipApplication';
import Member from '@/models/Member';
import UpdateRequest from '@/models/UpdateRequest';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';
import Link from 'next/link';

async function getStats() {
    await dbConnect();

    const [
        pendingApplications,
        approvedApplications,
        rejectedApplications,
        totalMembers,
        pendingUpdateRequests,
    ] = await Promise.all([
        MembershipApplication.countDocuments({ status: 'pending' }),
        MembershipApplication.countDocuments({ status: 'approved' }),
        MembershipApplication.countDocuments({ status: 'rejected' }),
        Member.countDocuments({ isActive: true }),
        UpdateRequest.countDocuments({ status: 'pending' }),
    ]);

    return {
        pendingApplications,
        approvedApplications,
        rejectedApplications,
        totalApplications: pendingApplications + approvedApplications + rejectedApplications,
        totalMembers,
        pendingUpdateRequests,
    };
}

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/admin/login');
    }

    const stats = await getStats();

    const statCards = [
        {
            title: 'Pending Applications',
            value: stats.pendingApplications,
            icon: Clock,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
            href: '/admin/applications?status=pending',
        },
        {
            title: 'Total Members',
            value: stats.totalMembers,
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            href: '/admin/members',
        },
        {
            title: 'Approved Applications',
            value: stats.approvedApplications,
            icon: CheckCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            href: '/admin/applications?status=approved',
        },
        {
            title: 'Rejected Applications',
            value: stats.rejectedApplications,
            icon: XCircle,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
            href: '/admin/applications?status=rejected',
        },
        {
            title: 'Update Requests',
            value: stats.pendingUpdateRequests,
            icon: RefreshCw,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            href: '/admin/update-requests',
        },
        {
            title: 'Total Applications',
            value: stats.totalApplications,
            icon: FileText,
            color: 'text-gray-600',
            bgColor: 'bg-gray-50',
            href: '/admin/applications',
        },
    ];

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">
                    Welcome back, {session.user.name}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Link key={stat.title} href={stat.href}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        {stat.title}
                                    </CardTitle>
                                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                        <Icon className={`h-5 w-5 ${stat.color}`} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Link
                            href="/admin/applications?status=pending"
                            className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                        >
                            <Clock className="h-5 w-5 text-yellow-600" />
                            <span className="text-sm font-medium">Review Pending Applications</span>
                            {stats.pendingApplications > 0 && (
                                <span className="ml-auto bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">
                                    {stats.pendingApplications}
                                </span>
                            )}
                        </Link>
                        <Link
                            href="/admin/update-requests"
                            className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                        >
                            <RefreshCw className="h-5 w-5 text-purple-600" />
                            <span className="text-sm font-medium">Handle Update Requests</span>
                            {stats.pendingUpdateRequests > 0 && (
                                <span className="ml-auto bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                                    {stats.pendingUpdateRequests}
                                </span>
                            )}
                        </Link>
                        <Link
                            href="/admin/members"
                            className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                            <Users className="h-5 w-5 text-blue-600" />
                            <span className="text-sm font-medium">View All Members</span>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>System Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-sm text-gray-600">Logged in as</span>
                            <span className="text-sm font-medium">{session.user.email}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-sm text-gray-600">Role</span>
                            <span className="text-sm font-medium capitalize">{session.user.role}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-gray-600">Current Time</span>
                            <span className="text-sm font-medium">
                                {new Date().toLocaleString('en-US', {
                                    timeZone: 'Asia/Dhaka',
                                    dateStyle: 'medium',
                                    timeStyle: 'short'
                                })}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
