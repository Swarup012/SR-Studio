'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  eventDate: z.date({ required_error: 'An event date is required.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export async function submitContactForm(values: z.infer<typeof formSchema>) {
    const parseResult = formSchema.safeParse(values);

    if (!parseResult.success) {
        console.error('Invalid form data:', parseResult.error);
        throw new Error('Invalid form data.');
    }

    const { name, email, phone, eventDate, message } = parseResult.data;
    
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        secure: Number(process.env.EMAIL_SERVER_PORT) === 465, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASS,
        },
    });

    const to = email; // Send the email to the user who filled the form
    const subject = `Thank you for contacting Bengali Snaps!`;
    const body = `
        Hi ${name},

        Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.

        Here are the details you submitted:

        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Event Date: ${eventDate.toDateString()}
        Message:
        ${message}

        Best regards,
        The Bengali Snaps Team
    `;

    try {
        await transporter.sendMail({
            from: `"Bengali Snaps" <${process.env.EMAIL_FROM}>`,
            to: to,
            subject: subject,
            text: body,
            html: `<p>${body.replace(/\n/g, '<br>')}</p>`,
        });

        return { success: true, message: 'Your message has been sent successfully!' };
    } catch (error) {
        console.error('Failed to send email:', error);
        throw new Error('Failed to send email. Please try again later.');
    }
}
