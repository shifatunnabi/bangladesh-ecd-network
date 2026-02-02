import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import crypto from 'crypto';

export interface IPasswordResetToken extends Document {
    memberId: Types.ObjectId;
    token: string;
    expiresAt: Date;
    usedAt?: Date;
}

const passwordResetTokenSchema = new Schema<IPasswordResetToken>(
    {
        memberId: {
            type: Schema.Types.ObjectId,
            ref: 'Member',
            required: true,
        },
        token: {
            type: String,
            required: true,
            unique: true,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
        usedAt: Date,
    },
    {
        timestamps: true,
    }
);

// Index for automatic cleanup - TTL index
passwordResetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Static method to generate a new reset token
passwordResetTokenSchema.statics.createToken = async function (memberId: Types.ObjectId) {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry

    const resetToken = await this.create({
        memberId,
        token,
        expiresAt,
    });

    return resetToken;
};

// Prevent model recompilation in development
const PasswordResetToken: Model<IPasswordResetToken> =
    mongoose.models.PasswordResetToken ||
    mongoose.model<IPasswordResetToken>('PasswordResetToken', passwordResetTokenSchema);

export default PasswordResetToken;
