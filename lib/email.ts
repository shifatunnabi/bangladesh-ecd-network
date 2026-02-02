import nodemailer from 'nodemailer';

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    text?: string;
}

// Create reusable transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });
};

export async function sendEmail(options: EmailOptions): Promise<boolean> {
    try {
        const transporter = createTransporter();

        await transporter.sendMail({
            from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
            to: options.to,
            subject: options.subject,
            html: options.html,
            text: options.text,
        });

        return true;
    } catch (error) {
        console.error('Email sending failed:', error);
        return false;
    }
}

export async function sendPortalAccessEmail(
    email: string,
    organizationName: string,
    username: string,
    password: string
): Promise<boolean> {
    const appUrl = process.env.APP_URL || 'http://localhost:3000';
    const loginUrl = `${appUrl}/portal`;

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Member Portal Access</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Bangladesh ECD Network</h1>
        <p style="color: #bfdbfe; margin: 10px 0 0;">Member Portal Access</p>
      </div>
      
      <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
        <h2 style="color: #1e40af; margin-top: 0;">Welcome to the Member Portal!</h2>
        
        <p>Dear <strong>${organizationName}</strong>,</p>
        
        <p>You have been granted access to the Bangladesh ECD Network Member Portal. Below are your login credentials:</p>
        
        <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <p style="margin: 0 0 10px;"><strong>Username:</strong> <code style="background: #f1f5f9; padding: 2px 8px; border-radius: 4px;">${username}</code></p>
          <p style="margin: 0;"><strong>Password:</strong> <code style="background: #f1f5f9; padding: 2px 8px; border-radius: 4px;">${password}</code></p>
        </div>
        
        <p style="color: #dc2626; font-weight: 500;">⚠️ For security reasons, please change your password after your first login.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${loginUrl}" style="background: #1e40af; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">Login to Portal</a>
        </div>
        
        <p>With the member portal, you can:</p>
        <ul style="color: #4b5563;">
          <li>View and edit your organization information</li>
          <li>Update your contact details</li>
          <li>Change your password</li>
        </ul>
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          If you have any questions, please contact us at <a href="mailto:info@ecd-bangladesh.net" style="color: #1e40af;">info@ecd-bangladesh.net</a>
        </p>
      </div>
    </body>
    </html>
  `;

    const text = `
Welcome to the Bangladesh ECD Network Member Portal!

Dear ${organizationName},

You have been granted access to the Member Portal.

Your login credentials:
- Username: ${username}
- Password: ${password}

Login here: ${loginUrl}

IMPORTANT: Please change your password after your first login.

If you have any questions, please contact us at info@ecd-bangladesh.net
  `;

    return sendEmail({
        to: email,
        subject: 'Your BEN Member Portal Access Credentials',
        html,
        text,
    });
}

export async function sendPasswordResetEmail(
    email: string,
    organizationName: string,
    resetToken: string
): Promise<boolean> {
    const appUrl = process.env.APP_URL || 'http://localhost:3000';
    const resetUrl = `${appUrl}/portal/reset-password?token=${resetToken}`;

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Bangladesh ECD Network</h1>
        <p style="color: #bfdbfe; margin: 10px 0 0;">Password Reset Request</p>
      </div>
      
      <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
        <h2 style="color: #1e40af; margin-top: 0;">Reset Your Password</h2>
        
        <p>Dear <strong>${organizationName}</strong>,</p>
        
        <p>We received a request to reset your password for the BEN Member Portal. Click the button below to set a new password:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background: #1e40af; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">Reset Password</a>
        </div>
        
        <p style="color: #6b7280; font-size: 14px;">This link will expire in 1 hour for security reasons.</p>
        
        <p style="color: #6b7280; font-size: 14px;">If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          If you have any questions, please contact us at <a href="mailto:info@ecd-bangladesh.net" style="color: #1e40af;">info@ecd-bangladesh.net</a>
        </p>
      </div>
    </body>
    </html>
  `;

    const text = `
Password Reset Request

Dear ${organizationName},

We received a request to reset your password for the BEN Member Portal.

Reset your password here: ${resetUrl}

This link will expire in 1 hour.

If you didn't request a password reset, you can safely ignore this email.

If you have any questions, please contact us at info@ecd-bangladesh.net
  `;

    return sendEmail({
        to: email,
        subject: 'Reset Your BEN Member Portal Password',
        html,
        text,
    });
}

export async function sendApplicationApprovedEmail(
    email: string,
    organizationName: string
): Promise<boolean> {
    const appUrl = process.env.APP_URL || 'http://localhost:3000';
    const membersUrl = `${appUrl}/members`;

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Application Approved</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">🎉 Congratulations!</h1>
        <p style="color: #d1fae5; margin: 10px 0 0;">Your membership has been approved</p>
      </div>
      
      <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
        <h2 style="color: #059669; margin-top: 0;">Welcome to the Bangladesh ECD Network!</h2>
        
        <p>Dear <strong>${organizationName}</strong>,</p>
        
        <p>We are pleased to inform you that your membership application has been <strong>approved</strong>!</p>
        
        <p>You are now officially a member of the Bangladesh ECD Network. Your organization will be listed on our members page.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${membersUrl}" style="background: #059669; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">View Members Directory</a>
        </div>
        
        <p>You will receive your Member Portal login credentials in a separate email. The portal will allow you to update your organization information.</p>
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          If you have any questions, please contact us at <a href="mailto:info@ecd-bangladesh.net" style="color: #059669;">info@ecd-bangladesh.net</a>
        </p>
      </div>
    </body>
    </html>
  `;

    const text = `
Congratulations! Your membership has been approved!

Dear ${organizationName},

We are pleased to inform you that your membership application has been approved!

You are now officially a member of the Bangladesh ECD Network. Your organization will be listed on our members page: ${membersUrl}

You will receive your Member Portal login credentials in a separate email.

If you have any questions, please contact us at info@ecd-bangladesh.net
  `;

    return sendEmail({
        to: email,
        subject: '🎉 Your BEN Membership Application Has Been Approved!',
        html,
        text,
    });
}

export async function sendApplicationRejectedEmail(
    email: string,
    organizationName: string,
    reason?: string
): Promise<boolean> {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Application Status Update</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Bangladesh ECD Network</h1>
        <p style="color: #bfdbfe; margin: 10px 0 0;">Membership Application Update</p>
      </div>
      
      <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
        <h2 style="color: #1e40af; margin-top: 0;">Application Status Update</h2>
        
        <p>Dear <strong>${organizationName}</strong>,</p>
        
        <p>Thank you for your interest in joining the Bangladesh ECD Network.</p>
        
        <p>After careful review, we regret to inform you that your membership application could not be approved at this time.</p>
        
        ${reason ? `
        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <p style="margin: 0; color: #991b1b;"><strong>Reason:</strong></p>
          <p style="margin: 10px 0 0; color: #7f1d1d;">${reason}</p>
        </div>
        ` : ''}
        
        <p>If you believe this decision was made in error or if you have additional information to provide, please don't hesitate to contact us.</p>
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          If you have any questions, please contact us at <a href="mailto:info@ecd-bangladesh.net" style="color: #1e40af;">info@ecd-bangladesh.net</a>
        </p>
      </div>
    </body>
    </html>
  `;

    const text = `
Membership Application Update

Dear ${organizationName},

Thank you for your interest in joining the Bangladesh ECD Network.

After careful review, we regret to inform you that your membership application could not be approved at this time.

${reason ? `Reason: ${reason}` : ''}

If you believe this decision was made in error or if you have additional information to provide, please don't hesitate to contact us at info@ecd-bangladesh.net
  `;

    return sendEmail({
        to: email,
        subject: 'Your BEN Membership Application Status',
        html,
        text,
    });
}
