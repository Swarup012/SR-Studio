import { ContactForm } from '@/components/contact-form';
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';

const contactInfo = {
    phone: "+91 98765 43210",
    email: "info@bengaliweddingphotography.com",
    address: "Kolkata, West Bengal, India"
};

const socialLinks = {
    facebook: "https://facebook.com/bengaliweddingstudio",
    instagram: "https://instagram.com/bengaliweddingstudio"
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
          Book Your Bengali Wedding Photographer
        </h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto font-body">
          We&apos;d love to hear from you! Reach out to us to discuss your special day.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div className="bg-card p-8 rounded-lg shadow-lg">
          <h2 className="font-headline text-2xl font-semibold mb-6">Send us a message</h2>
          <ContactForm />
        </div>
        <div className="space-y-8">
            <div className="bg-card p-8 rounded-lg shadow-lg">
                <h2 className="font-headline text-2xl font-semibold mb-6">Contact Information</h2>
                <ul className="space-y-4 font-body text-foreground">
                    <li className="flex items-center gap-4">
                        <Phone className="w-6 h-6 text-primary" />
                        <span>{contactInfo.phone}</span>
                    </li>
                    <li className="flex items-center gap-4">
                        <Mail className="w-6 h-6 text-primary" />
                        <span>{contactInfo.email}</span>
                    </li>
                    <li className="flex items-center gap-4">
                        <MapPin className="w-6 h-6 text-primary" />
                        <span>{contactInfo.address}</span>
                    </li>
                </ul>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-lg">
                <h2 className="font-headline text-2xl font-semibold mb-6">Follow Us</h2>
                <div className="flex space-x-6">
                    <Link href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                        <Facebook className="h-7 w-7" />
                        <span className="font-body">Facebook</span>
                    </Link>
                    <Link href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                        <Instagram className="h-7 w-7" />
                        <span className="font-body">Instagram</span>
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
