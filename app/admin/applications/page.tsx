"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Check, X, Eye, Trash2 } from "lucide-react"

interface Application {
    _id: string
    sectionA: {
        organizationName: string
        headOfficeAddress?: {
            division?: string
            fullAddress?: string
        }
        headOfOrganization?: {
            name?: string
            email?: string
        }
        focalPersonECD?: {
            name?: string
            email?: string
        }
    }
    sectionF?: {
        name?: string
        email?: string
    }
    status: "pending" | "approved" | "rejected"
    adminNotes?: string
    createdAt: string
}

export default function AdminApplicationsPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [applications, setApplications] = useState<Application[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedApp, setSelectedApp] = useState<Application | null>(null)
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
    const [isActionDialogOpen, setIsActionDialogOpen] = useState(false)
    const [actionType, setActionType] = useState<"approve" | "reject">("approve")
    const [adminNotes, setAdminNotes] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(() => {
        fetchApplications()
    }, [])

    // Handle URL params for approve/reject actions from detail page
    useEffect(() => {
        const action = searchParams.get('action')
        const id = searchParams.get('id')
        if (action && id && applications.length > 0) {
            const app = applications.find(a => a._id === id)
            if (app) {
                openActionDialog(app, action as "approve" | "reject")
                // Clear URL params
                router.replace('/admin/applications')
            }
        }
    }, [searchParams, applications])

    const fetchApplications = async () => {
        try {
            const res = await fetch("/api/admin/applications")
            const data = await res.json()
            setApplications(data)
        } catch (error) {
            console.error("Error fetching applications:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleView = (app: Application) => {
        router.push(`/admin/applications/${app._id}`)
    }

    const openActionDialog = (app: Application, type: "approve" | "reject") => {
        setSelectedApp(app)
        setActionType(type)
        setAdminNotes(app.adminNotes || "")
        setIsActionDialogOpen(true)
    }

    const handleAction = async () => {
        if (!selectedApp) return

        setIsProcessing(true)
        try {
            const res = await fetch(`/api/admin/applications/${selectedApp._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    status: actionType === "approve" ? "approved" : "rejected",
                    adminNotes,
                }),
            })

            if (res.ok) {
                const result = await res.json()
                alert(result.message)
                await fetchApplications()
                setIsActionDialogOpen(false)
            } else {
                const error = await res.json()
                alert(error.error || "Failed to update application")
            }
        } catch (error) {
            console.error("Error updating application:", error)
            alert("Failed to update application")
        } finally {
            setIsProcessing(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this application?")) return

        try {
            const res = await fetch(`/api/admin/applications/${id}`, { method: "DELETE" })
            if (res.ok) {
                await fetchApplications()
            } else {
                alert("Failed to delete application")
            }
        } catch (error) {
            console.error("Error deleting application:", error)
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Pending</Badge>
            case "approved":
                return <Badge variant="outline" className="bg-green-50 text-green-700">Approved</Badge>
            case "rejected":
                return <Badge variant="outline" className="bg-red-50 text-red-700">Rejected</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Membership Applications</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="text-center py-8">Loading...</div>
                    ) : applications.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">No applications yet</div>
                    ) : (
                        <>
                            <div className="text-sm text-gray-600 mb-4">
                                Total: {applications.length} applications |
                                Pending: {applications.filter(a => a.status === "pending").length}
                            </div>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Organization</TableHead>
                                            <TableHead>Submitted By</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {applications.map((app) => (
                                            <TableRow key={app._id}>
                                                <TableCell className="font-medium max-w-xs truncate">
                                                    {app.sectionA?.organizationName}
                                                </TableCell>
                                                <TableCell>
                                                    <div>{app.sectionF?.name || app.sectionA?.headOfOrganization?.name || "N/A"}</div>
                                                    <div className="text-xs text-gray-500">
                                                        {app.sectionF?.email || app.sectionA?.headOfOrganization?.email}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(app.createdAt).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>{getStatusBadge(app.status)}</TableCell>
                                                <TableCell>
                                                    <div className="flex justify-end gap-1">
                                                        <Button variant="ghost" size="sm" onClick={() => handleView(app)}>
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        {app.status === "pending" && (
                                                            <>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => openActionDialog(app, "approve")}
                                                                    className="text-green-600"
                                                                >
                                                                    <Check className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => openActionDialog(app, "reject")}
                                                                    className="text-red-600"
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </Button>
                                                            </>
                                                        )}
                                                        <Button variant="ghost" size="sm" onClick={() => handleDelete(app._id)}>
                                                            <Trash2 className="h-4 w-4 text-red-500" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* View Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Application Details</DialogTitle>
                    </DialogHeader>
                    {selectedApp && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Status:</span>
                                {getStatusBadge(selectedApp.status)}
                            </div>

                            <div className="border rounded-lg p-4 space-y-3">
                                <h4 className="font-semibold">Organization Information</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div><span className="text-gray-500">Name:</span> {selectedApp.sectionA?.organizationName}</div>
                                    <div><span className="text-gray-500">Division:</span> {selectedApp.sectionA?.headOfficeAddress?.division || "N/A"}</div>
                                    <div className="col-span-2"><span className="text-gray-500">Address:</span> {selectedApp.sectionA?.headOfficeAddress?.fullAddress || "N/A"}</div>
                                </div>
                            </div>

                            <div className="border rounded-lg p-4 space-y-3">
                                <h4 className="font-semibold">Head of Organization</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div><span className="text-gray-500">Name:</span> {selectedApp.sectionA?.headOfOrganization?.name || "N/A"}</div>
                                    <div><span className="text-gray-500">Email:</span> {selectedApp.sectionA?.headOfOrganization?.email || "N/A"}</div>
                                </div>
                            </div>

                            <div className="border rounded-lg p-4 space-y-3">
                                <h4 className="font-semibold">ECD Focal Person</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div><span className="text-gray-500">Name:</span> {selectedApp.sectionA?.focalPersonECD?.name || "N/A"}</div>
                                    <div><span className="text-gray-500">Email:</span> {selectedApp.sectionA?.focalPersonECD?.email || "N/A"}</div>
                                </div>
                            </div>

                            <div className="border rounded-lg p-4 space-y-3">
                                <h4 className="font-semibold">Submitted By</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div><span className="text-gray-500">Name:</span> {selectedApp.sectionF?.name || "N/A"}</div>
                                    <div><span className="text-gray-500">Email:</span> {selectedApp.sectionF?.email || "N/A"}</div>
                                    <div><span className="text-gray-500">Date:</span> {new Date(selectedApp.createdAt).toLocaleString()}</div>
                                </div>
                            </div>

                            {selectedApp.adminNotes && (
                                <div className="border rounded-lg p-4">
                                    <h4 className="font-semibold">Admin Notes</h4>
                                    <p className="text-sm mt-2">{selectedApp.adminNotes}</p>
                                </div>
                            )}
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Action Dialog */}
            <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {actionType === "approve" ? "Approve Application" : "Reject Application"}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                            {actionType === "approve"
                                ? "Approving this application will create a new member entry that will be visible on the members page."
                                : "Are you sure you want to reject this application?"}
                        </p>
                        <div className="space-y-2">
                            <Label>Admin Notes (optional)</Label>
                            <Textarea
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                                placeholder="Add any notes about this decision..."
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsActionDialogOpen(false)}>Cancel</Button>
                        <Button
                            onClick={handleAction}
                            disabled={isProcessing}
                            className={actionType === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
                        >
                            {isProcessing ? "Processing..." : actionType === "approve" ? "Approve" : "Reject"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
