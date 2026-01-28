import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMembershipApplication extends Document {
    // Section A: General Information
    organizationName: string;
    abbreviation?: string;
    yearEstablished?: string;
    organizationType: 'Government' | 'NonGovernment' | 'CorporationCompany' | 'UN';
    headOfficeAddress: {
        fullAddress?: string;
        upazila?: string;
        district?: string;
        division?: string;
        contactNumber?: string;
        email?: string;
        website?: string;
    };
    headOfOrganization: {
        name?: string;
        designation?: string;
        contactNumber?: string;
        email?: string;
        skypeId?: string;
    };
    focalPersonECD: {
        name?: string;
        designation?: string;
        contactNumber?: string;
        email?: string;
        skypeId?: string;
    };
    majorActivities?: string[];
    targetNeeds?: string[];
    registration?: {
        authority?: string[];
        registrationNumber?: string;
        yearOfRegistration?: string;
    };

    // Section B: Summary Information
    sectionB?: {
        briefDescription?: string;
        keyActivities?: string;
        scopeOfWork?: string;
        keyTargetPopulation?: string;
        keyAchievements?: string;
        academicProgram?: {
            hasProgram?: boolean;
            description?: string;
        };
        researchActivities?: {
            hasProgram?: boolean;
            description?: string;
        };
        corporateSocialResponsibility?: string;
        productsForChildren?: string;
        keyPartners?: string;
    };

    // Program sections (0-3, 3-5, 5-6, 6-8)
    program0to3?: object;
    program3to5?: object;
    program5to6?: object;
    program6to8?: object;

    // Section D: Training, Monitoring & Supervision
    sectionD?: object;

    // Section E: Reasons for Applying
    sectionE?: {
        motivation?: string;
        jointActivities?: string;
        contribution?: string;
    };

    // Section F: Respondent's Information
    sectionF: {
        name: string;
        designation: string;
        organization: string;
        contactNumber?: string;
        email?: string;
        skypeId?: string;
        dateOfSubmission?: string;
    };

    // Complete form data as JSON for flexibility
    formData: object;

    // Application status
    status: 'pending' | 'approved' | 'rejected';
    submittedAt: Date;
    reviewedAt?: Date;
    reviewedBy?: mongoose.Types.ObjectId;
    reviewNotes?: string;
}

const MembershipApplicationSchema = new Schema<IMembershipApplication>(
    {
        organizationName: {
            type: String,
            required: [true, 'Organization name is required'],
            trim: true,
        },
        abbreviation: String,
        yearEstablished: String,
        organizationType: {
            type: String,
            enum: ['Government', 'NonGovernment', 'CorporationCompany', 'UN'],
            required: true,
        },
        headOfficeAddress: {
            fullAddress: String,
            upazila: String,
            district: String,
            division: String,
            contactNumber: String,
            email: String,
            website: String,
        },
        headOfOrganization: {
            name: String,
            designation: String,
            contactNumber: String,
            email: String,
            skypeId: String,
        },
        focalPersonECD: {
            name: String,
            designation: String,
            contactNumber: String,
            email: String,
            skypeId: String,
        },
        majorActivities: [String],
        targetNeeds: [String],
        registration: {
            authority: [String],
            registrationNumber: String,
            yearOfRegistration: String,
        },
        sectionB: Schema.Types.Mixed,
        program0to3: Schema.Types.Mixed,
        program3to5: Schema.Types.Mixed,
        program5to6: Schema.Types.Mixed,
        program6to8: Schema.Types.Mixed,
        sectionD: Schema.Types.Mixed,
        sectionE: {
            motivation: String,
            jointActivities: String,
            contribution: String,
        },
        sectionF: {
            name: { type: String, required: true },
            designation: { type: String, required: true },
            organization: { type: String, required: true },
            contactNumber: String,
            email: String,
            skypeId: String,
            dateOfSubmission: String,
        },
        formData: {
            type: Schema.Types.Mixed,
            required: true,
        },
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
        reviewedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        reviewNotes: String,
    },
    {
        timestamps: true,
    }
);

const MembershipApplication: Model<IMembershipApplication> =
    mongoose.models.MembershipApplication ||
    mongoose.model<IMembershipApplication>('MembershipApplication', MembershipApplicationSchema);

export default MembershipApplication;
