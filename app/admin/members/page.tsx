"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2, Plus, Upload, ExternalLink } from "lucide-react"

interface Member {
    _id: string
    organization: string
    address: string
    headName: string
    headDesignation: string
    headEmail: string
    focalName: string
    focalDesignation: string
    focalEmail: string
    division: string
    website?: string
}

const emptyMember = {
    organization: "",
    address: "",
    headName: "",
    headDesignation: "",
    headEmail: "",
    focalName: "",
    focalDesignation: "",
    focalEmail: "",
    division: "",
    website: "",
}

export default function AdminMembersPage() {
    const [members, setMembers] = useState<Member[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
    const [editingMember, setEditingMember] = useState<Member | null>(null)
    const [formData, setFormData] = useState(emptyMember)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        fetchMembers()
    }, [])

    const fetchMembers = async () => {
        try {
            const res = await fetch("/api/admin/members")
            const data = await res.json()
            setMembers(data)
        } catch (error) {
            console.error("Error fetching members:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleEdit = (member: Member) => {
        setEditingMember(member)
        setFormData({
            organization: member.organization,
            address: member.address,
            headName: member.headName,
            headDesignation: member.headDesignation,
            headEmail: member.headEmail,
            focalName: member.focalName,
            focalDesignation: member.focalDesignation,
            focalEmail: member.focalEmail,
            division: member.division,
            website: member.website || "",
        })
        setIsDialogOpen(true)
    }

    const handleAdd = () => {
        setEditingMember(null)
        setFormData(emptyMember)
        setIsDialogOpen(true)
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            const url = editingMember
                ? `/api/admin/members/${editingMember._id}`
                : "/api/admin/members"
            const method = editingMember ? "PUT" : "POST"

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                await fetchMembers()
                setIsDialogOpen(false)
            } else {
                const error = await res.json()
                alert(error.error || "Failed to save member")
            }
        } catch (error) {
            console.error("Error saving member:", error)
            alert("Failed to save member")
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this member?")) return

        try {
            const res = await fetch(`/api/admin/members/${id}`, { method: "DELETE" })
            if (res.ok) {
                await fetchMembers()
            } else {
                alert("Failed to delete member")
            }
        } catch (error) {
            console.error("Error deleting member:", error)
        }
    }

    const handleImport = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement
        const file = fileInput?.files?.[0]

        if (!file) {
            alert("Please select a CSV file")
            return
        }

        setIsSaving(true)
        try {
            const formData = new FormData()
            formData.append("file", file)

            const res = await fetch("/api/admin/members/import", {
                method: "POST",
                body: formData,
            })

            const result = await res.json()

            if (res.ok) {
                alert(`Successfully imported ${result.count} members`)
                await fetchMembers()
                setIsImportDialogOpen(false)
            } else {
                alert(result.error || "Failed to import members")
            }
        } catch (error) {
            console.error("Error importing:", error)
            alert("Failed to import members")
        } finally {
            setIsSaving(false)
        }
    }

    const filteredMembers = members.filter(m =>
        m.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.headName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.division.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="container mx-auto py-8 px-4">
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <CardTitle className="text-2xl">Member Management</CardTitle>
                        <div className="flex gap-2">
                            <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        <Upload className="h-4 w-4 mr-2" />
                                        Import CSV
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Import Members from CSV</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={handleImport} className="space-y-4">
                                        <div>
                                            <Label>CSV File</Label>
                                            <Input type="file" accept=".csv" className="mt-2" />
                                            <p className="text-sm text-gray-500 mt-2">
                                                Use the same format as the existing members.csv file
                                            </p>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" disabled={isSaving}>
                                                {isSaving ? "Importing..." : "Import"}
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>

                            <Button onClick={handleAdd}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Member
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <Input
                            placeholder="Search by organization, name, or division..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-md"
                        />
                    </div>

                    {isLoading ? (
                        <div className="text-center py-8">Loading...</div>
                    ) : (
                        <>
                            <div className="text-sm text-gray-600 mb-4">
                                Showing {filteredMembers.length} of {members.length} members
                            </div>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Organization</TableHead>
                                            <TableHead>Head</TableHead>
                                            <TableHead>Division</TableHead>
                                            <TableHead>Website</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredMembers.map((member) => (
                                            <TableRow key={member._id}>
                                                <TableCell className="font-medium max-w-xs truncate">
                                                    {member.organization}
                                                </TableCell>
                                                <TableCell>
                                                    <div>{member.headName}</div>
                                                    <div className="text-xs text-gray-500">{member.headEmail}</div>
                                                </TableCell>
                                                <TableCell>{member.division}</TableCell>
                                                <TableCell>
                                                    {member.website && (
                                                        <a
                                                            href={member.website.startsWith("http") ? member.website : `https://${member.website}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:underline flex items-center gap-1"
                                                        >
                                                            <ExternalLink className="h-3 w-3" />
                                                            Link
                                                        </a>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm" onClick={() => handleEdit(member)}>
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" onClick={() => handleDelete(member._id)}>
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

            {/* Edit/Add Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingMember ? "Edit Member" : "Add New Member"}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Organization Name *</Label>
                                <Input
                                    value={formData.organization}
                                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Division</Label>
                                <Input
                                    value={formData.division}
                                    onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Address</Label>
                            <Input
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Website</Label>
                            <Input
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                placeholder="https://example.com"
                            />
                        </div>

                        <div className="border-t pt-4">
                            <h4 className="font-medium mb-3">Head of Organization</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Name</Label>
                                    <Input
                                        value={formData.headName}
                                        onChange={(e) => setFormData({ ...formData, headName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Designation</Label>
                                    <Input
                                        value={formData.headDesignation}
                                        onChange={(e) => setFormData({ ...formData, headDesignation: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        value={formData.headEmail}
                                        onChange={(e) => setFormData({ ...formData, headEmail: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <h4 className="font-medium mb-3">ECD Focal Person</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Name</Label>
                                    <Input
                                        value={formData.focalName}
                                        onChange={(e) => setFormData({ ...formData, focalName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Designation</Label>
                                    <Input
                                        value={formData.focalDesignation}
                                        onChange={(e) => setFormData({ ...formData, focalDesignation: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        value={formData.focalEmail}
                                        onChange={(e) => setFormData({ ...formData, focalEmail: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave} disabled={isSaving || !formData.organization}>
                            {isSaving ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
