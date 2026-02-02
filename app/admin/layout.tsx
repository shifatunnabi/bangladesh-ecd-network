'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard,
    FileText,
    Users,
    LogOut,
    Menu,
    X,
    ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/applications', label: 'Applications', icon: FileText },
    { href: '/admin/members', label: 'Members', icon: Users },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    // Skip auth check for login page
    const isLoginPage = pathname === '/admin';

    useEffect(() => {
        if (isLoginPage) {
            setIsAuthenticated(true);
            return;
        }

        // Check authentication
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/admin/check-auth');
                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    router.push('/admin');
                }
            } catch {
                router.push('/admin');
            }
        };

        checkAuth();
    }, [pathname, router, isLoginPage]);

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/logout', { method: 'POST' });
            router.push('/admin');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Show loading state while checking auth
    if (isAuthenticated === null && !isLoginPage) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    // For login page, just render children
    if (isLoginPage) {
        return <>{children}</>;
    }

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
                        <h1 className="text-lg font-bold">BEN Admin</h1>
                        <p className="text-xs text-blue-200">Administration Panel</p>
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
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
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
                                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-400">
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
                                target="_blank"
                            >
                                View Website →
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
