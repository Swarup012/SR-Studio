import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderImages } from '@/lib/placeholder-images';

const featuredServices = [
  {
    title: 'Pre-Wedding Shoots',
    description: 'Romantic, cinematic, and uniquely Bengali pre-wedding photography.',
    image: placeholderImages.find(img => img.id === 'prewedding_shoot.jpg'),
  },
  {
    title: 'Wedding Photography',
    description: 'Candid, traditional, and cinematic coverage of your special day.',
    image: placeholderImages.find(img => img.id === 'wedding_photography.jpg'),
  },
  {
    title: 'Cinematic Videography',
    description: 'Beautifully crafted wedding films with a touch of emotion.',
    image: placeholderImages.find(img => img.id === 'wedding_videography.jpg'),
  },
];

const heroImage = placeholderImages.find(img => img.id === 'bengali_wedding_hero.jpg');

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
            <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                priority
                data-ai-hint={heroImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center gap-4 px-4">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-shadow-lg">
            Capture Every Emotion of Your Bengali Wedding
          </h1>
          <p className="max-w-3xl text-lg md:text-xl text-white/90 font-body">
            From &apos;Aiburo Bhaat&apos; to &apos;Bashi Biye&apos;, we tell your story through our lens.
          </p>
          <Button asChild size="lg" className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-headline">
            <Link href="/contact">
              Book Your Photographer <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Our Services</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              We offer a range of services to capture your special moments beautifully.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <Card key={service.title} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="p-0">
                  {service.image && (
                    <div className="aspect-w-3 aspect-h-2">
                        <Image
                            src={service.image.imageUrl}
                            alt={service.image.description}
                            width={600}
                            height={400}
                            className="object-cover w-full h-full"
                            data-ai-hint={service.image.imageHint}
                        />
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="font-headline text-2xl mb-2">{service.title}</CardTitle>
                  <p className="text-muted-foreground font-body">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
