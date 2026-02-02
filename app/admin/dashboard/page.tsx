'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Users, UserCheck, Clock, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
    totalMembers: number;
    seededMembers: number;
    approvedFromApplications: number;
    withPortalAccess: number;
    pendingApplications: number;
}

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSeeding, setIsSeeding] = useState(false);
    const [seedMessage, setSeedMessage] = useState('');

    const fetchStats = async () => {
        try {
            setIsLoading(true);

            // Fetch member stats
            const memberResponse = await fetch('/api/seed');
            const memberData = await memberResponse.json();

            // Fetch application stats
            const appResponse = await fetch('/api/admin/applications/stats');
            const appData = await appResponse.json();

            setStats({
                totalMembers: memberData.totalMembers || 0,
                seededMembers: memberData.seededMembers || 0,
                approvedFromApplications: memberData.approvedFromApplications || 0,
                withPortalAccess: memberData.withPortalAccess || 0,
                pendingApplications: appData.pending || 0,
            });
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleSeedMembers = async () => {
        try {
            setIsSeeding(true);
            setSeedMessage('');

            const response = await fetch('/api/seed', {
                method: 'POST',
            });

            const data = await response.json();

            if (response.ok) {
                setSeedMessage(`✅ ${data.message}`);
                fetchStats(); // Refresh stats
            } else {
                setSeedMessage(`❌ ${data.error}`);
            }
        } catch (error) {
            setSeedMessage('❌ Failed to seed members');
        } finally {
            setIsSeeding(false);
        }
    };

    const statCards = [
        {
            title: 'Total Members',
            value: stats?.totalMembers || 0,
            description: 'All registered members',
            icon: Users,
            color: 'bg-blue-500',
            href: '/admin/members',
        },
        {
            title: 'Pending Applications',
            value: stats?.pendingApplications || 0,
            description: 'Awaiting review',
            icon: Clock,
            color: 'bg-yellow-500',
            href: '/admin/applications',
        },
        {
            title: 'With Portal Access',
            value: stats?.withPortalAccess || 0,
            description: 'Can login to portal',
            icon: UserCheck,
            color: 'bg-green-500',
            href: '/admin/members?filter=portal',
        },
        {
            title: 'From Applications',
            value: stats?.approvedFromApplications || 0,
            description: 'Approved via form',
            icon: FileText,
            color: 'bg-purple-500',
            href: '/admin/applications?status=approved',
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600">Welcome to the BEN Admin Panel</p>
                </div>
                <Button
                    variant="outline"
                    onClick={fetchStats}
                    disabled={isLoading}
                >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card) => (
                    <Link key={card.title} href={card.href}>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">
                                    {card.title}
                                </CardTitle>
                                <div className={`p-2 rounded-lg ${card.color}`}>
                                    <card.icon className="w-4 h-4 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">
                                    {isLoading ? '...' : card.value}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{card.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                        <Link href="/admin/applications">
                            <Button>
                                <FileText className="w-4 h-4 mr-2" />
                                Review Applications
                            </Button>
                        </Link>
                        <Link href="/admin/members">
                            <Button variant="outline">
                                <Users className="w-4 h-4 mr-2" />
                                Manage Members
                            </Button>
                        </Link>
                    </div>

                    {/* Seed Members Section */}
                    <div className="border-t pt-4 mt-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Database Seeding</h3>
                        <p className="text-sm text-gray-500 mb-3">
                            Import existing members from the CSV file into the database. This is a one-time operation.
                        </p>
                        <div className="flex items-center gap-4">
                            <Button
                                variant="secondary"
                                onClick={handleSeedMembers}
                                disabled={isSeeding}
                            >
                                {isSeeding ? (
                                    <>
                                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                        Seeding...
                                    </>
                                ) : (
                                    <>
                                        <Users className="w-4 h-4 mr-2" />
                                        Seed Members from CSV
                                    </>
                                )}
                            </Button>
                            {seedMessage && (
                                <span className="text-sm">{seedMessage}</span>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Recent Activity placeholder */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest updates and actions</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-500 text-sm">
                        Activity tracking will be available in a future update.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
