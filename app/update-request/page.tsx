'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    CheckCircle,
    Loader2,
    AlertCircle,
    User,
    Mail,
    Phone,
    Building,
    FileText
} from 'lucide-react';
import Link from 'next/link';

export default function UpdateRequestPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        organization: '',
        requestedChanges: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/update-requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success) {
                setSuccess(true);
            } else {
                setError(data.error || 'Failed to submit request');
            }
        } catch (err) {
            setError('Failed to submit request. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <Card className="max-w-md w-full">
                    <CardContent className="py-12 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
                        <p className="text-gray-600 mb-6">
                            Thank you for submitting your update request. An administrator will review your request and contact you soon.
                        </p>
                        <Link href="/">
                            <Button>Return to Homepage</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Member Information Update Request</h1>
                    <p className="text-gray-600 mt-2">
                        Request changes to your organization's information in the BEN member directory
                    </p>
                </div>

                {/* Info card */}
                <Card className="mb-6 bg-blue-50 border-blue-200">
                    <CardContent className="py-4">
                        <div className="flex items-start gap-3">
                            <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                                <p className="text-sm text-blue-900 font-medium">How it works:</p>
                                <ol className="text-sm text-blue-800 mt-1 list-decimal list-inside space-y-1">
                                    <li>Submit this form with your contact information and requested changes</li>
                                    <li>A BEN administrator will review your request</li>
                                    <li>The administrator will contact you to verify the changes</li>
                                    <li>Once verified, your information will be updated</li>
                                </ol>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Update Request Form</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center gap-1">
                                        <User className="h-4 w-4" />
                                        Your Name *
                                    </label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center gap-1">
                                        <Building className="h-4 w-4" />
                                        Organization Name *
                                    </label>
                                    <Input
                                        value={formData.organization}
                                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                        placeholder="Your organization name"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center gap-1">
                                        <Mail className="h-4 w-4" />
                                        Email Address *
                                    </label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center gap-1">
                                        <Phone className="h-4 w-4" />
                                        Phone Number *
                                    </label>
                                    <Input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+880 1XXX-XXXXXX"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-1">
                                    <FileText className="h-4 w-4" />
                                    Describe the changes you want to make *
                                </label>
                                <Textarea
                                    value={formData.requestedChanges}
                                    onChange={(e) => setFormData({ ...formData, requestedChanges: e.target.value })}
                                    placeholder={`Please describe what information needs to be updated, for example:\n\n- Change Head of Organization name from "Mr. X" to "Mr. Y"\n- Update email address to new-email@example.com\n- Update office address to new location`}
                                    rows={6}
                                    required
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button type="submit" className="flex-1" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        'Submit Update Request'
                                    )}
                                </Button>
                                <Link href="/members">
                                    <Button type="button" variant="outline" className="w-full sm:w-auto">
                                        View Member Directory
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Back link */}
                <div className="text-center mt-6">
                    <Link href="/" className="text-sm text-primary hover:underline">
                        ← Back to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}
