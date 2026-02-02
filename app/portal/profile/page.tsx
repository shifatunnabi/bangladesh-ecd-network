'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Building,
    User,
    MapPin,
    Save,
    RefreshCw,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

interface ProfileData {
    organization: string;
    abbreviation?: string;
    address?: string;
    division?: string;
    headName?: string;
    headDesignation?: string;
    headEmail?: string;
    focalName?: string;
    focalDesignation?: string;
    focalEmail: string;
}

export default function PortalProfilePage() {
    const { data: session } = useSession();
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

    const fetchProfile = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/portal/profile');
            const data = await response.json();
            if (response.ok) {
                setProfile(data.profile);
            }
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile) return;

        try {
            setIsSaving(true);
            setResult(null);

            const response = await fetch('/api/portal/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile),
            });

            const data = await response.json();

            if (response.ok) {
                setResult({ success: true, message: 'Profile updated successfully!' });
            } else {
                setResult({ success: false, message: data.error || 'Failed to update profile' });
            }
        } catch (error) {
            setResult({ success: false, message: 'An error occurred while saving' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleChange = (field: keyof ProfileData, value: string) => {
        if (!profile) return;
        setProfile({ ...profile, [field]: value });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900">Failed to load profile</h2>
                <Button onClick={fetchProfile} className="mt-4">Try Again</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
                <p className="text-gray-600">Manage your organization information</p>
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

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Organization Info */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building className="w-5 h-5" />
                            Organization Information
                        </CardTitle>
                        <CardDescription>
                            Basic information about your organization
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-700">Organization Name *</label>
                                <Input
                                    value={profile.organization}
                                    onChange={(e) => handleChange('organization', e.target.value)}
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Abbreviation</label>
                                <Input
                                    value={profile.abbreviation || ''}
                                    onChange={(e) => handleChange('abbreviation', e.target.value)}
                                    placeholder="e.g., BEN"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Division</label>
                                <Input
                                    value={profile.division || ''}
                                    onChange={(e) => handleChange('division', e.target.value)}
                                    placeholder="e.g., Dhaka Division"
                                    className="mt-1"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Address */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            Address
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <label className="text-sm font-medium text-gray-700">Head Office Address</label>
                        <Textarea
                            value={profile.address || ''}
                            onChange={(e) => handleChange('address', e.target.value)}
                            placeholder="Enter full address"
                            rows={3}
                            className="mt-1"
                        />
                    </CardContent>
                </Card>

                {/* Head of Organization */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Head of Organization
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Name</label>
                                <Input
                                    value={profile.headName || ''}
                                    onChange={(e) => handleChange('headName', e.target.value)}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Designation</label>
                                <Input
                                    value={profile.headDesignation || ''}
                                    onChange={(e) => handleChange('headDesignation', e.target.value)}
                                    className="mt-1"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <Input
                                    type="email"
                                    value={profile.headEmail || ''}
                                    onChange={(e) => handleChange('headEmail', e.target.value)}
                                    className="mt-1"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Focal Person */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            ECD Focal Person
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Name</label>
                                <Input
                                    value={profile.focalName || ''}
                                    onChange={(e) => handleChange('focalName', e.target.value)}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Designation</label>
                                <Input
                                    value={profile.focalDesignation || ''}
                                    onChange={(e) => handleChange('focalDesignation', e.target.value)}
                                    className="mt-1"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-700">Email *</label>
                                <Input
                                    type="email"
                                    value={profile.focalEmail}
                                    onChange={(e) => handleChange('focalEmail', e.target.value)}
                                    required
                                    className="mt-1"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Submit */}
                <div className="flex justify-end">
                    <Button type="submit" disabled={isSaving} size="lg">
                        {isSaving ? (
                            <>
                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
