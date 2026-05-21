import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail({ to, subject, html }: any) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: to,
            subject: subject,
            html: html
        });

        if (error) {
            console.error('Resend error:', error);
            throw error;
        }

        console.log('Email sent:', data?.id);
        return data;
    } catch (error) {
        console.error('Email error:', error);
        throw error;
    }
}

export async function sendAdminVerificationEmail(account: any, origin: any) {
    const backendUrl = process.env.BACKEND_URL;
    const verifyUrl = `${backendUrl}/accounts/verify-student?token=${account.verificationToken}&email=${account.email}`;
    
    const message = `
        <h2>New Student Registration Requires Verification</h2>
        <p><strong>Student Name:</strong> ${account.firstName} ${account.lastName}</p>
        <p><strong>Student Email:</strong> ${account.email}</p>
        <p><strong>Title:</strong> ${account.title || 'N/A'}</p>
        <p>Click the link below to verify this student:</p>
        <p><a href="${verifyUrl}">${verifyUrl}</a></p>
        <p>⚠️ This student cannot login until you verify their account.</p>
        <hr>
        <p>This link will expire in 24 hours.</p>
    `;

    await sendEmail({
        to: 'jeusaeneas@gmail.com',
        subject: `VERIFY NEW STUDENT: ${account.email}`,
        html: message
    });
}

export async function sendAdminResetEmail(account: any, origin: any) {
    const backendUrl = process.env.BACKEND_URL;
    const resetUrl = `${backendUrl}/accounts/admin-reset-password?token=${account.resetToken}&email=${account.email}`;
    
    const message = `
        <h2>Password Reset Request - Requires Admin Action</h2>
        <p><strong>Student Name:</strong> ${account.firstName} ${account.lastName}</p>
        <p><strong>Student Email:</strong> ${account.email}</p>
        <p><strong>Title:</strong> ${account.title || 'N/A'}</p>
        <p>This student has requested a password reset.</p>
        <p>Click the link below to reset their password:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>⚠️ The student cannot reset their password until you take action.</p>
        <hr>
        <p>This link will expire in 1 hour.</p>
    `;

    await sendEmail({
        to: 'jeusaeneas@gmail.com',
        subject: `PASSWORD RESET REQUEST: ${account.email}`,
        html: message
    });
}