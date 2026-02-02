import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMembershipApplication extends Document {
    status: 'pending' | 'approved' | 'rejected';
    submittedAt: Date;
    reviewedAt?: Date;
    reviewedBy?: string;
    rejectionReason?: string;
    formData: {
        sectionA: {
            organizationName: string;
            abbreviation?: string;
            yearEstablished?: string;
            headOfficeAddress?: {
                fullAddress?: string;
                upazila?: string;
                district?: string;
                division?: string;
                contactNumber?: string;
                email?: string;
                website?: string;
            };
            headOfOrganization?: {
                name?: string;
                designation?: string;
                contactNumber?: string;
                email?: string;
                skypeId?: string;
            };
            focalPersonECD?: {
                name?: string;
                designation?: string;
                contactNumber?: string;
                email?: string;
                skypeId?: string;
            };
            organizationType?: string;
            majorActivities?: string[];
            targetNeeds?: string[];
            registration?: {
                authority?: string[];
                registrationNumber?: string;
                yearOfRegistration?: string;
            };
        };
        program0to3?: Record<string, unknown>;
        program3to5?: Record<string, unknown>;
        program5to6?: Record<string, unknown>;
        program6to8?: Record<string, unknown>;
        sectionB?: Record<string, unknown>;
        sectionD?: Record<string, unknown>;
        sectionE?: Record<string, unknown>;
        sectionF?: {
            name?: string;
            designation?: string;
            organization?: string;
            contactNumber?: string;
            email?: string;
            skypeId?: string;
            dateOfSubmission?: string;
        };
    };
}

const membershipApplicationSchema = new Schema<IMembershipApplication>(
    {
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
        submittedAt: {
            type: Date,
            default: Date.now,
        },
        reviewedAt: Date,
        reviewedBy: String,
        rejectionReason: String,
        formData: {
            sectionA: { type: Schema.Types.Mixed, required: true },
            program0to3: { type: Schema.Types.Mixed },
            program3to5: { type: Schema.Types.Mixed },
            program5to6: { type: Schema.Types.Mixed },
            program6to8: { type: Schema.Types.Mixed },
            sectionB: { type: Schema.Types.Mixed },
            sectionD: { type: Schema.Types.Mixed },
            sectionE: { type: Schema.Types.Mixed },
            sectionF: { type: Schema.Types.Mixed },
        },
    },
    {
        timestamps: true,
    }
);

// Prevent model recompilation in development
const MembershipApplication: Model<IMembershipApplication> =
    mongoose.models.MembershipApplication ||
    mongoose.model<IMembershipApplication>('MembershipApplication', membershipApplicationSchema);

export default MembershipApplication;
