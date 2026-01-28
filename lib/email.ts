import nodemailer from 'nodemailer';

interface EmailOptions {
    to: string | string[];
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
            pass: process.env.SMTP_PASS,
        },
    });
};

// Get admin emails from environment
const getAdminEmails = (): string[] => {
    const emails = process.env.ADMIN_EMAILS || '';
    return emails.split(',').map((e) => e.trim()).filter(Boolean);
};

// Send email
export async function sendEmail(options: EmailOptions): Promise<boolean> {
    try {
        const transporter = createTransporter();

        const recipients = Array.isArray(options.to) ? options.to.join(', ') : options.to;

        await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: recipients,
            subject: options.subject,
            html: options.html,
            text: options.text,
        });

        console.log(`Email sent to: ${recipients}`);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

// Notify admins of new membership application
export async function notifyNewApplication(applicationData: {
    organizationName: string;
    respondentName: string;
    respondentEmail: string;
    submittedAt: Date;
    applicationId: string;
}): Promise<boolean> {
    const adminEmails = getAdminEmails();

    if (adminEmails.length === 0) {
        console.warn('No admin emails configured');
        return false;
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const viewUrl = `${baseUrl}/admin/applications/${applicationData.applicationId}`;

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e40af;">New Membership Application</h2>
      <p>A new membership application has been submitted to Bangladesh ECD Network (BEN).</p>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Organization:</strong> ${applicationData.organizationName}</p>
        <p><strong>Submitted By:</strong> ${applicationData.respondentName}</p>
        <p><strong>Email:</strong> ${applicationData.respondentEmail}</p>
        <p><strong>Submitted At:</strong> ${new Date(applicationData.submittedAt).toLocaleString()}</p>
      </div>
      
      <p>
        <a href="${viewUrl}" 
           style="display: inline-block; background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
          Review Application
        </a>
      </p>
      
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
      <p style="color: #6b7280; font-size: 12px;">
        This is an automated notification from Bangladesh ECD Network (BEN) Membership System.
      </p>
    </div>
  `;

    return sendEmail({
        to: adminEmails,
        subject: `[BEN] New Membership Application: ${applicationData.organizationName}`,
        html,
    });
}

// Notify admins of new update request
export async function notifyUpdateRequest(requestData: {
    name: string;
    email: string;
    phone: string;
    organization: string;
    requestedChanges: string;
    requestId: string;
}): Promise<boolean> {
    const adminEmails = getAdminEmails();

    if (adminEmails.length === 0) {
        console.warn('No admin emails configured');
        return false;
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const viewUrl = `${baseUrl}/admin/update-requests`;

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e40af;">Member Update Request</h2>
      <p>A member has requested updates to their information.</p>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Name:</strong> ${requestData.name}</p>
        <p><strong>Organization:</strong> ${requestData.organization}</p>
        <p><strong>Email:</strong> ${requestData.email}</p>
        <p><strong>Phone:</strong> ${requestData.phone}</p>
        <h4>Requested Changes:</h4>
        <p style="white-space: pre-wrap;">${requestData.requestedChanges}</p>
      </div>
      
      <p>
        <a href="${viewUrl}" 
           style="display: inline-block; background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
          View Update Requests
        </a>
      </p>
      
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
      <p style="color: #6b7280; font-size: 12px;">
        This is an automated notification from Bangladesh ECD Network (BEN) Membership System.
      </p>
    </div>
  `;

    return sendEmail({
        to: adminEmails,
        subject: `[BEN] Member Update Request: ${requestData.organization}`,
        html,
    });
}

// Send application status notification to applicant
export async function notifyApplicationStatus(data: {
    email: string;
    organizationName: string;
    status: 'approved' | 'rejected';
    notes?: string;
}): Promise<boolean> {
    const isApproved = data.status === 'approved';

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: ${isApproved ? '#16a34a' : '#dc2626'};">
        Membership Application ${isApproved ? 'Approved' : 'Not Approved'}
      </h2>
      
      <p>Dear representative of ${data.organizationName},</p>
      
      ${isApproved ? `
        <p>We are pleased to inform you that your organization's membership application to 
        Bangladesh ECD Network (BEN) has been <strong>approved</strong>.</p>
        <p>Welcome to the network! You are now part of Bangladesh's leading early childhood development community.</p>
      ` : `
        <p>Thank you for your interest in joining Bangladesh ECD Network (BEN). 
        After careful review, we regret to inform you that your membership application 
        has not been approved at this time.</p>
        ${data.notes ? `<p><strong>Reviewer Notes:</strong> ${data.notes}</p>` : ''}
        <p>You are welcome to reapply in the future.</p>
      `}
      
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
      <p style="color: #6b7280; font-size: 12px;">
        Bangladesh ECD Network (BEN)<br/>
        Secretariat: BRAC Institute of Educational Development (BRAC IED)<br/>
        House # 113, Road # 2, Block # A, Niketan, Gulshan 1, Dhaka 1212
      </p>
    </div>
  `;

    return sendEmail({
        to: data.email,
        subject: `[BEN] Membership Application ${isApproved ? 'Approved' : 'Update'}`,
        html,
    });
}
