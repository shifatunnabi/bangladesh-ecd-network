'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, RefreshCw, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function ChangePasswordPage() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswords, setShowPasswords] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setResult(null);

        if (newPassword !== confirmPassword) {
            setResult({ success: false, message: 'New passwords do not match' });
            return;
        }

        if (newPassword.length < 8) {
            setResult({ success: false, message: 'Password must be at least 8 characters long' });
            return;
        }

        try {
            setIsLoading(true);

            const response = await fetch('/api/portal/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setResult({ success: true, message: 'Password changed successfully!' });
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setResult({ success: false, message: data.error || 'Failed to change password' });
            }
        } catch (error) {
            setResult({ success: false, message: 'An error occurred' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-md mx-auto">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Change Password</h1>
                <p className="text-gray-600">Update your login password</p>
            </div>

            {result && (
                <div className={`p-4 rounded-lg flex items-center gap-2 ${result.success
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                    }`}>
                    {result.success ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    {result.message}
                </div>
            )}

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lock className="w-5 h-5" />
                        Update Password
                    </CardTitle>
                    <CardDescription>
                        Enter your current password and choose a new one
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Current Password</label>
                            <div className="relative mt-1">
                                <Input
                                    type={showPasswords ? 'text' : 'password'}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">New Password</label>
                            <div className="relative mt-1">
                                <Input
                                    type={showPasswords ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    minLength={8}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                            <div className="relative mt-1">
                                <Input
                                    type={showPasswords ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setShowPasswords(!showPasswords)}
                                className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                            >
                                {showPasswords ? (
                                    <>
                                        <EyeOff className="w-4 h-4" />
                                        Hide passwords
                                    </>
                                ) : (
                                    <>
                                        <Eye className="w-4 h-4" />
                                        Show passwords
                                    </>
                                )}
                            </button>
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                    Changing Password...
                                </>
                            ) : (
                                'Change Password'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

