import AuthProvider from '@/components/providers/auth-provider';
import { ReactNode } from 'react';
import PortalLayoutContent from './layout-content';

interface PortalLayoutProps {
    children: ReactNode;
}

export default function PortalLayout({ children }: PortalLayoutProps) {
    return (
        <AuthProvider>
            <PortalLayoutContent>{children}</PortalLayoutContent>
        </AuthProvider>
    );
}
