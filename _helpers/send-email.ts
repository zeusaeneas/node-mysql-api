import { Resend } from 'resend';

// Initialize Resend with API key from environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export default async function sendEmail({ to, subject, html, from = 'jeusaeneas@gmail.com' }: EmailOptions) {
  try {
    console.log(`Attempting to send email to: ${to}`);
    
    const { data, error } = await resend.emails.send({
      from: from,
      to: to,
      subject: subject,
      html: html,
    });

    if (error) {
      console.error('Resend API error:', error);
      throw new Error(error.message);
    }

    console.log('Email sent successfully! ID:', data?.id);
    return { success: true, id: data?.id };
    
  } catch (error) {
    console.error('Email error details:', error);
    throw error;
  }
}