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

    const to = "swarupbasu@gmail.com";
    const subject = `New Inquiry from ${name} via Bengali Snaps Website`;
    const body = `
        You have received a new inquiry from your website contact form.

        Here are the details:

        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Event Date: ${eventDate.toDateString()}
        Message:
        ${message}

        You can reply to this inquiry by responding to ${email}.
    `;

    try {
        await transporter.sendMail({
            from: `"Bengali Snaps Contact Form" <${process.env.EMAIL_FROM}>`,
            to: to,
            replyTo: email,
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
