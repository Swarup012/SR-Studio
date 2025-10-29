'use server';
import 'dotenv/config';

import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  eventDate: z.date({ required_error: 'An event date is required.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export async function submitContactForm(values: z.infer<typeof formSchema>) {
    // This server action is no longer sending emails directly.
    // The client-side form will construct a mailto link.
    // This function can be used for other server-side logic in the future, like saving to a database.
    const parseResult = formSchema.safeParse(values);

    if (!parseResult.success) {
        console.error('Invalid form data:', parseResult.error);
        throw new Error('Invalid form data.');
    }

    console.log('Form data received:', parseResult.data);

    // In a real application, you might save this to a database.
    // For now, we just validate and log it.

    return { success: true, message: 'Form data is valid.' };
}
