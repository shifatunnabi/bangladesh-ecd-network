import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUpdateRequest extends Document {
    name: string;
    email: string;
    phone: string;
    organization: string;
    requestedChanges: string;
    status: 'pending' | 'in-progress' | 'resolved';
    adminNotes?: string;
    resolvedBy?: mongoose.Types.ObjectId;
    resolvedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const UpdateRequestSchema = new Schema<IUpdateRequest>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
        },
        organization: {
            type: String,
            required: [true, 'Organization name is required'],
            trim: true,
        },
        requestedChanges: {
            type: String,
            required: [true, 'Requested changes description is required'],
        },
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'resolved'],
            default: 'pending',
        },
        adminNotes: String,
        resolvedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        resolvedAt: Date,
    },
    {
        timestamps: true,
    }
);

const UpdateRequest: Model<IUpdateRequest> =
    mongoose.models.UpdateRequest || mongoose.model<IUpdateRequest>('UpdateRequest', UpdateRequestSchema);

export default UpdateRequest;
