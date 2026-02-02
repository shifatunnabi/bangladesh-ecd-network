import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IMember extends Document {
    _id: Types.ObjectId;
    applicationId?: Types.ObjectId;

    // Credentials (optional - only set when portal access is granted)
    username?: string;
    passwordHash?: string;
    hasPortalAccess: boolean;
    portalAccessSentAt?: Date;

    // Core display info (shown on public members page)
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

    // Full form data for editing (optional for seeded members)
    fullFormData?: Record<string, unknown>;

    // Metadata
    lastLogin?: Date;
    isSeeded: boolean;

    createdAt: Date;
    updatedAt: Date;
}

const memberSchema = new Schema<IMember>(
    {
        applicationId: {
            type: Schema.Types.ObjectId,
            ref: 'MembershipApplication'
        },

        // Credentials
        username: {
            type: String,
            unique: true,
            sparse: true,
            lowercase: true,
            trim: true,
        },
        passwordHash: String,
        hasPortalAccess: {
            type: Boolean,
            default: false
        },
        portalAccessSentAt: Date,

        // Core display info
        organization: {
            type: String,
            required: true
        },
        abbreviation: String,
        address: String,
        division: String,
        headName: String,
        headDesignation: String,
        headEmail: String,
        focalName: String,
        focalDesignation: String,
        focalEmail: {
            type: String,
            required: true
        },

        // Full form data
        fullFormData: {
            type: Schema.Types.Mixed
        },

        // Metadata
        lastLogin: Date,
        isSeeded: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
memberSchema.index({ organization: 'text' });
memberSchema.index({ division: 1 });
memberSchema.index({ hasPortalAccess: 1 });

// Prevent model recompilation in development
const Member: Model<IMember> =
    mongoose.models.Member || mongoose.model<IMember>('Member', memberSchema);

export default Member;
