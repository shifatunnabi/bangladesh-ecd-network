import nodemailer from 'nodemailer'

// SMTP configuration from environment variables
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

// Admin email recipients
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'sudiptadevelopermain@gmail.com,sudipta.42396@gmail.com').split(',')

interface ApplicationEmailData {
    organizationName: string
    submitterName?: string
    submitterEmail?: string
    submittedAt: Date
    applicationId: string
}

export async function sendNewApplicationNotification(data: ApplicationEmailData) {
    const { organizationName, submitterName, submitterEmail, submittedAt, applicationId } = data

    const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: ADMIN_EMAILS.join(','),
        subject: `New BEN Membership Application: ${organizationName}`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a365d;">New Membership Application Received</h2>
        <p>A new membership application has been submitted to the Bangladesh ECD Network.</p>
        
        <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2d3748;">Application Details</h3>
          <p><strong>Organization:</strong> ${organizationName}</p>
          ${submitterName ? `<p><strong>Submitted By:</strong> ${submitterName}</p>` : ''}
          ${submitterEmail ? `<p><strong>Contact Email:</strong> ${submitterEmail}</p>` : ''}
          <p><strong>Submitted At:</strong> ${submittedAt.toLocaleString()}</p>
          <p><strong>Application ID:</strong> ${applicationId}</p>
        </div>
        
        <p>Please log in to the admin panel to review this application:</p>
        <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/admin/applications" 
           style="display: inline-block; background-color: #3182ce; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 6px; margin-top: 10px;">
          Review Application
        </a>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;" />
        <p style="color: #718096; font-size: 12px;">
          This is an automated notification from the Bangladesh ECD Network website.
        </p>
      </div>
    `,
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log('Email sent:', info.messageId)
        return { success: true, messageId: info.messageId }
    } catch (error) {
        console.error('Error sending email:', error)
        return { success: false, error }
    }
}

export async function verifyEmailConnection() {
    try {
        await transporter.verify()
        console.log('Email server connection verified')
        return true
    } catch (error) {
        console.error('Email server connection failed:', error)
        return false
    }
}
