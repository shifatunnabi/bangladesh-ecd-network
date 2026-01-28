import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFailedLoginAttempt extends Document {
    ip: string;
    email: string;
    attemptAt: Date;
    isBlacklisted: boolean;
}

const FailedLoginAttemptSchema = new Schema<IFailedLoginAttempt>(
    {
        ip: {
            type: String,
            required: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
        },
        attemptAt: {
            type: Date,
            default: Date.now,
        },
        isBlacklisted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Index for efficient lookup
FailedLoginAttemptSchema.index({ ip: 1, attemptAt: -1 });

// Static method to check if IP is blacklisted
FailedLoginAttemptSchema.statics.isIPBlacklisted = async function (ip: string): Promise<boolean> {
    const blacklisted = await this.findOne({ ip, isBlacklisted: true });
    return !!blacklisted;
};

// Static method to get recent failed attempts for an IP
FailedLoginAttemptSchema.statics.getRecentAttempts = async function (
    ip: string,
    minutes: number = 30
): Promise<number> {
    const since = new Date(Date.now() - minutes * 60 * 1000);
    return await this.countDocuments({
        ip,
        attemptAt: { $gte: since },
        isBlacklisted: false,
    });
};

// Static method to record a failed attempt and blacklist if threshold reached
FailedLoginAttemptSchema.statics.recordAttempt = async function (
    ip: string,
    email: string
): Promise<{ shouldBlacklist: boolean; attempts: number }> {
    // Record the attempt
    await this.create({ ip, email });

    // Count recent attempts
    const attempts = await (this as any).getRecentAttempts(ip, 30);

    // Blacklist if 3 or more attempts
    if (attempts >= 3) {
        await this.updateMany({ ip }, { isBlacklisted: true });
        return { shouldBlacklist: true, attempts };
    }

    return { shouldBlacklist: false, attempts };
};

const FailedLoginAttempt: Model<IFailedLoginAttempt> =
    mongoose.models.FailedLoginAttempt ||
    mongoose.model<IFailedLoginAttempt>('FailedLoginAttempt', FailedLoginAttemptSchema);

export default FailedLoginAttempt;
