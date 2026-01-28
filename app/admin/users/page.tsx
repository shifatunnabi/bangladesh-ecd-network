'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    UserPlus,
    Loader2,
    Shield,
    User,
    Mail,
    Key,
    Trash2,
    AlertCircle
} from 'lucide-react';

interface AdminUser {
    _id: string;
    email: string;
    name: string;
    role: 'admin' | 'superadmin';
    createdAt: string;
}

export default function AdminUsersPage() {
    const { data: session } = useSession();
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState<string | null>(null);
    const [formLoading, setFormLoading] = useState(false);
    const [error, setError] = useState('');

    // New user form
    const [newEmail, setNewEmail] = useState('');
    const [newName, setNewName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newRole, setNewRole] = useState<'admin' | 'superadmin'>('admin');

    // Password change form
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPasswordChange, setNewPasswordChange] = useState('');

    const isSuperadmin = session?.user?.role === 'superadmin';

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users');
            const data = await res.json();
            if (data.success) {
                setUsers(data.users);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: newEmail,
                    name: newName,
                    password: newPassword,
                    role: newRole,
                }),
            });

            const data = await res.json();
            if (data.success) {
                fetchUsers();
                setShowAddForm(false);
                setNewEmail('');
                setNewName('');
                setNewPassword('');
                setNewRole('admin');
            } else {
                setError(data.error || 'Failed to create user');
            }
        } catch (error) {
            setError('Failed to create user');
        } finally {
            setFormLoading(false);
        }
    };

    const handleChangePassword = async (userId: string) => {
        setFormLoading(true);
        setError('');

        try {
            const body: any = { newPassword: newPasswordChange };
            if (session?.user?.id === userId) {
                body.currentPassword = currentPassword;
            }

            const res = await fetch(`/api/admin/users/${userId}/password`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await res.json();
            if (data.success) {
                setShowPasswordForm(null);
                setCurrentPassword('');
                setNewPasswordChange('');
                alert('Password updated successfully');
            } else {
                setError(data.error || 'Failed to change password');
            }
        } catch (error) {
            setError('Failed to change password');
        } finally {
            setFormLoading(false);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return;

        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: 'DELETE',
            });

            const data = await res.json();
            if (data.success) {
                fetchUsers();
            } else {
                alert(data.error || 'Failed to delete user');
            }
        } catch (error) {
            alert('Failed to delete user');
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Admin Users</h1>
                    <p className="text-gray-600 mt-1">Manage administrator accounts</p>
                </div>
                {isSuperadmin && (
                    <Button onClick={() => setShowAddForm(true)}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Admin
                    </Button>
                )}
            </div>

            {/* Add User Form */}
            {showAddForm && (
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Add New Admin</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddUser} className="space-y-4">
                            {error && (
                                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                                    <AlertCircle className="h-4 w-4" />
                                    {error}
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Name</label>
                                    <Input
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        placeholder="Full name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input
                                        type="email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        placeholder="Email address"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Password</label>
                                    <Input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Min 6 characters"
                                        minLength={6}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Role</label>
                                    <select
                                        value={newRole}
                                        onChange={(e) => setNewRole(e.target.value as 'admin' | 'superadmin')}
                                        className="w-full px-3 py-2 border rounded-md"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="superadmin">Super Admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={formLoading}>
                                    {formLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                    Create User
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Users list */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="space-y-4">
                    {users.map((user) => (
                        <Card key={user._id}>
                            <CardContent className="py-4">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-full ${user.role === 'superadmin' ? 'bg-purple-100' : 'bg-blue-100'}`}>
                                            {user.role === 'superadmin' ? (
                                                <Shield className="h-5 w-5 text-purple-600" />
                                            ) : (
                                                <User className="h-5 w-5 text-blue-600" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{user.name}</h3>
                                            <p className="text-sm text-gray-600 flex items-center gap-1">
                                                <Mail className="h-3 w-3" />
                                                {user.email}
                                            </p>
                                            <p className="text-xs text-gray-500 capitalize mt-1">
                                                {user.role} • Joined {new Date(user.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        {showPasswordForm === user._id ? (
                                            <div className="flex flex-col gap-2">
                                                {error && (
                                                    <p className="text-xs text-red-600">{error}</p>
                                                )}
                                                {session?.user?.id === user._id && (
                                                    <Input
                                                        type="password"
                                                        placeholder="Current password"
                                                        value={currentPassword}
                                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                                        className="w-48"
                                                    />
                                                )}
                                                <Input
                                                    type="password"
                                                    placeholder="New password"
                                                    value={newPasswordChange}
                                                    onChange={(e) => setNewPasswordChange(e.target.value)}
                                                    className="w-48"
                                                />
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => {
                                                            setShowPasswordForm(null);
                                                            setError('');
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleChangePassword(user._id)}
                                                        disabled={formLoading}
                                                    >
                                                        {formLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Update'}
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                {(isSuperadmin || session?.user?.id === user._id) && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => setShowPasswordForm(user._id)}
                                                    >
                                                        <Key className="h-4 w-4 mr-1" />
                                                        Change Password
                                                    </Button>
                                                )}
                                                {isSuperadmin && session?.user?.id !== user._id && (
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => handleDeleteUser(user._id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
