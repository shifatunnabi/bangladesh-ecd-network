import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IMember extends Document {
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
    createdAt: Date
    updatedAt: Date
}

const MemberSchema = new Schema<IMember>(
    {
        organization: { type: String, required: true },
        address: { type: String, default: '' },
        headName: { type: String, default: '' },
        headDesignation: { type: String, default: '' },
        headEmail: { type: String, default: '' },
        focalName: { type: String, default: '' },
        focalDesignation: { type: String, default: '' },
        focalEmail: { type: String, default: '' },
        division: { type: String, default: '' },
        website: { type: String, default: '' },
    },
    {
        timestamps: true,
    }
)

// Create index for search
MemberSchema.index({ organization: 'text', headName: 'text', focalName: 'text' })

// Prevent model recompilation in development
const Member: Model<IMember> = mongoose.models.Member || mongoose.model<IMember>('Member', MemberSchema)

export default Member
