'use server';

import { z } from 'zod';

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
    const to = 'swarupbasu839@gmail.com';
    const subject = `New Contact Form Submission from ${name}`;
    const body = `
        You have a new message from the contact form on your website.

        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Event Date: ${eventDate.toDateString()}
        Message:
        ${message}
    `;

    console.log('--- Sending Email ---');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: \n${body}`);
    console.log('--- Email Sent (Simulated) ---');

    // Here you would integrate an email sending service like Resend, SendGrid, or Nodemailer.
    // For now, we are just logging it to the console.

    return { success: true, message: 'Your message has been sent successfully!' };
}
