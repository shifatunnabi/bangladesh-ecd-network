import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Member from '@/lib/models/Member'
import mongoose from 'mongoose'

type RouteParams = { params: Promise<{ id: string }> }

// GET single member
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        await connectDB()
        const { id } = await params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Invalid member ID' }, { status: 400 })
        }

        const member = await Member.findById(id).lean()

        if (!member) {
            return NextResponse.json({ error: 'Member not found' }, { status: 404 })
        }

        return NextResponse.json(member)
    } catch (error) {
        console.error('Error fetching member:', error)
        return NextResponse.json(
            { error: 'Failed to fetch member' },
            { status: 500 }
        )
    }
}

// PUT update member
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        await connectDB()
        const { id } = await params
        const data = await request.json()

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Invalid member ID' }, { status: 400 })
        }

        const member = await Member.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true, runValidators: true }
        ).lean()

        if (!member) {
            return NextResponse.json({ error: 'Member not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, member })
    } catch (error) {
        console.error('Error updating member:', error)
        return NextResponse.json(
            { error: 'Failed to update member' },
            { status: 500 }
        )
    }
}

// DELETE member
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        await connectDB()
        const { id } = await params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Invalid member ID' }, { status: 400 })
        }

        const member = await Member.findByIdAndDelete(id)

        if (!member) {
            return NextResponse.json({ error: 'Member not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, message: 'Member deleted' })
    } catch (error) {
        console.error('Error deleting member:', error)
        return NextResponse.json(
            { error: 'Failed to delete member' },
            { status: 500 }
        )
    }
}
