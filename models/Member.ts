import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMember extends Document {
    organization: string;
    address: string;
    headName: string;
    headDesignation: string;
    headEmail: string;
    focalName: string;
    focalDesignation: string;
    focalEmail: string;
    division: string;
    applicationId?: mongoose.Types.ObjectId;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const MemberSchema = new Schema<IMember>(
    {
        organization: {
            type: String,
            required: [true, 'Organization name is required'],
            trim: true,
        },
        address: {
            type: String,
            default: '',
        },
        headName: {
            type: String,
            default: '',
        },
        headDesignation: {
            type: String,
            default: '',
        },
        headEmail: {
            type: String,
            default: '',
            lowercase: true,
        },
        focalName: {
            type: String,
            default: '',
        },
        focalDesignation: {
            type: String,
            default: '',
        },
        focalEmail: {
            type: String,
            default: '',
            lowercase: true,
        },
        division: {
            type: String,
            default: '',
        },
        applicationId: {
            type: Schema.Types.ObjectId,
            ref: 'MembershipApplication',
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Index for search
MemberSchema.index({ organization: 'text', division: 'text', headName: 'text', focalName: 'text' });

const Member: Model<IMember> =
    mongoose.models.Member || mongoose.model<IMember>('Member', MemberSchema);

export default Member;
