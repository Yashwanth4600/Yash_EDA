import sgMail from '@sendgrid/mail';
import twilio from 'twilio';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
	? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
	: null;

export async function sendOrderEmail(to: string, subject: string, html: string) {
	if (!process.env.SENDGRID_API_KEY || !to) return;
	await sgMail.send({ to, from: process.env.EMAIL_FROM || 'no-reply@example.com', subject, html });
}

export async function sendOrderSMS(to: string, body: string) {
	if (!twilioClient || !to) return;
	await twilioClient.messages.create({ from: process.env.TWILIO_FROM_NUMBER!, to, body });
}