'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    User,
    Lock,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface PortalLayoutContentProps {
    children: ReactNode;
}

const navItems = [
    { href: '/portal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/portal/profile', label: 'Profile', icon: User },
    { href: '/portal/change-password', label: 'Change Password', icon: Lock },
];

export default function PortalLayoutContent({ children }: PortalLayoutContentProps) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Pages that don't require authentication
    const publicPages = ['/portal', '/portal/forgot-password', '/portal/reset-password'];
    const isPublicPage = publicPages.some(page => pathname === page || pathname.startsWith(page + '?'));

    useEffect(() => {
        if (status === 'loading') return;

        if (!session && !isPublicPage) {
            router.push('/portal');
        }
    }, [session, status, router, isPublicPage, pathname]);

    // For public pages, just render children
    if (isPublicPage) {
        return <>{children}</>;
    }

    // Show loading state
    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    // If not authenticated
    if (!session) {
        return null;
    }

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push('/portal');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-primary text-white transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="flex items-center justify-between p-4 border-b border-blue-400">
                    <div>
                        <h1 className="text-lg font-bold">BEN Portal</h1>
                        <p className="text-xs text-blue-200">Member Portal</p>
                    </div>
                    <button
                        className="lg:hidden text-white"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive
                                        ? 'bg-white/20 text-white'
                                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                                    }
                `}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-400">
                    <div className="mb-4 px-4">
                        <p className="text-sm text-blue-100 truncate">{session.user?.name}</p>
                        <p className="text-xs text-blue-200 truncate">{session.user?.email}</p>
                    </div>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-blue-100 hover:text-white hover:bg-white/10"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:ml-64">
                {/* Top bar */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                    <div className="flex items-center justify-between px-4 py-3">
                        <button
                            className="lg:hidden text-gray-600"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <div className="flex items-center gap-4 ml-auto">
                            <Link
                                href="/"
                                className="text-sm text-gray-600 hover:text-primary"
                            >
                                ← Back to Website
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
