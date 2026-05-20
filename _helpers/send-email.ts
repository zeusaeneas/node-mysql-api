import nodemailer from 'nodemailer';
import config from '../config.json';

export default async function sendEmail({ to, subject, html, from = config.emailFrom }: any) {
    try {
        const transporter = nodemailer.createTransport(config.smtpOptions as any);
        await transporter.verify(); // ← add this to test connection
        const info = await transporter.sendMail({ from, to, subject, html });
        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Email error:', error); // ← this will show in Render logs
        throw error;
    }
}