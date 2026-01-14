import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IMembershipApplication extends Document {
    // Section A: General Information
    sectionA: {
        organizationName: string
        abbreviation?: string
        yearEstablished?: string
        headOfficeAddress?: {
            fullAddress?: string
            upazila?: string
            district?: string
            division?: string
            contactNumber?: string
            email?: string
            website?: string
        }
        headOfOrganization?: {
            name?: string
            designation?: string
            contactNumber?: string
            email?: string
            skypeId?: string
        }
        focalPersonECD?: {
            name?: string
            designation?: string
            contactNumber?: string
            email?: string
            skypeId?: string
        }
        organizationType?: string
        majorActivities?: string[]
        targetNeeds?: string[]
        registration?: {
            authority?: string[]
            registrationNumber?: string
            yearOfRegistration?: string
        }
    }

    // Program sections (0-3, 3-5, 5-6, 6-8 years)
    program0to3?: Record<string, unknown>
    program3to5?: Record<string, unknown>
    program5to6?: Record<string, unknown>
    program6to8?: Record<string, unknown>

    // Section B: Summary Information
    sectionB?: Record<string, unknown>

    // Section D: Training, Monitoring & Supervision
    sectionD?: Record<string, unknown>

    // Section E: Motivation
    sectionE?: Record<string, unknown>

    // Section F: Submission Details
    sectionF?: {
        name?: string
        designation?: string
        organization?: string
        contactNumber?: string
        email?: string
        skypeId?: string
        dateOfSubmission?: string
    }

    // Application status
    status: 'pending' | 'approved' | 'rejected'
    adminNotes?: string
    createdAt: Date
    updatedAt: Date
}

const MembershipApplicationSchema = new Schema<IMembershipApplication>(
    {
        sectionA: {
            organizationName: { type: String, required: true },
            abbreviation: String,
            yearEstablished: String,
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
            organizationType: String,
            majorActivities: [String],
            targetNeeds: [String],
            registration: {
                authority: [String],
                registrationNumber: String,
                yearOfRegistration: String,
            },
        },
        program0to3: { type: Schema.Types.Mixed },
        program3to5: { type: Schema.Types.Mixed },
        program5to6: { type: Schema.Types.Mixed },
        program6to8: { type: Schema.Types.Mixed },
        sectionB: { type: Schema.Types.Mixed },
        sectionD: { type: Schema.Types.Mixed },
        sectionE: { type: Schema.Types.Mixed },
        sectionF: {
            name: String,
            designation: String,
            organization: String,
            contactNumber: String,
            email: String,
            skypeId: String,
            dateOfSubmission: String,
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
        adminNotes: String,
    },
    {
        timestamps: true,
    }
)

const MembershipApplication: Model<IMembershipApplication> =
    mongoose.models.MembershipApplication ||
    mongoose.model<IMembershipApplication>('MembershipApplication', MembershipApplicationSchema)

export default MembershipApplication
