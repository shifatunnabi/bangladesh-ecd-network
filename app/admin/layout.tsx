'use client';

import { SessionProvider } from 'next-auth/react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    FileText,
    UserCog,
    LogOut,
    Menu,
    X,
    ClipboardList,
    RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/applications', label: 'Applications', icon: FileText },
    { href: '/admin/members', label: 'Members', icon: Users },
    { href: '/admin/update-requests', label: 'Update Requests', icon: RefreshCw },
    { href: '/admin/users', label: 'Admin Users', icon: UserCog },
];

function AdminSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (href: string) => {
        if (href === '/admin') {
            return pathname === '/admin';
        }
        return pathname.startsWith(href);
    };

    const handleSignOut = () => {
        signOut({ callbackUrl: '/admin/login' });
    };

    return (
        <>
            {/* Mobile menu button */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b px-4 py-3 flex items-center justify-between">
                <span className="font-semibold text-gray-800">BEN Admin</span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
            </div>

            {/* Mobile menu overlay */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black/50"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed top-0 left-0 z-40 h-screen w-64 bg-gray-900 text-white transition-transform
        lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-gray-800">
                        <Link href="/admin" className="text-xl font-bold">
                            BEN Admin
                        </Link>
                        <p className="text-xs text-gray-400 mt-1">Membership Management</p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive(item.href)
                                            ? 'bg-primary text-white'
                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                        }
                  `}
                                >
                                    <Icon className="h-5 w-5" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User info and logout */}
                    <div className="p-4 border-t border-gray-800">
                        {session?.user && (
                            <div className="mb-3 px-4">
                                <p className="text-sm font-medium">{session.user.name}</p>
                                <p className="text-xs text-gray-400">{session.user.email}</p>
                                <p className="text-xs text-gray-500 capitalize">{session.user.role}</p>
                            </div>
                        )}
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                            onClick={handleSignOut}
                        >
                            <LogOut className="h-5 w-5 mr-3" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    // Don't show sidebar on login page
    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminSidebar />
            <main className="lg:ml-64 min-h-screen">
                <div className="pt-16 lg:pt-0">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </SessionProvider>
    );
}
