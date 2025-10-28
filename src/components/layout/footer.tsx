import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from '@/components/logo';

const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/bengaliweddingstudio' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/bengaliweddingstudio' },
];

const contactInfo = {
  phone: "+91 98765 43210",
  email: "info@bengaliweddingphotography.com",
  address: "Kolkata, West Bengal, India"
};

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-muted-foreground font-body">
              Capturing the soul of Bengali weddings with elegance and passion.
            </p>
          </div>
          <div className="md:col-span-1">
             <h3 className="font-headline font-semibold mb-4">Quick Links</h3>
             <ul className="space-y-2 font-body">
                <li><Link href="/our-photographers" className="hover:text-primary transition-colors">Our Team</Link></li>
                <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
                <li><Link href="/packages" className="hover:text-primary transition-colors">Packages</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
             </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="font-headline font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 font-body text-sm">
                <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>{contactInfo.phone}</span>
                </li>
                <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>{contactInfo.email}</span>
                </li>
                <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{contactInfo.address}</span>
                </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="font-headline font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <social.icon className="h-6 w-6" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground font-body">
          <p>&copy; {new Date().getFullYear()} Bengali Snaps. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
