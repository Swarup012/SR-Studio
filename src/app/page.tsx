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


<section className="relative flex flex-col md:flex-row w-full h-[90vh] overflow-hidden">
  {/* Left Gradient Panel */}
  <div className="relative z-20 flex flex-col justify-center w-full md:w-[55%] h-full px-6 md:px-16 lg:px-24 py-16 
    bg-gradient-to-br from-amber-200 via-rose-100 to-amber-100 
    rounded-tr-[160px] md:rounded-tr-[220px] shadow-lg overflow-hidden">

    {/* Pattern Overlay */}
    <div className="absolute inset-0 bg-[url('/patterns/bengali_motif.svg')] opacity-[0.07] mix-blend-overlay pointer-events-none rounded-tr-[160px] md:rounded-tr-[220px]"></div>

    {/* Left Content */}
    <div className="relative z-10 space-y-5">
      <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-rose-900 drop-shadow-sm">
        Capture <span className="text-amber-700">Every Memory</span> of Your Precious Wedding
      </h1>

      <p className="text-base md:text-lg text-rose-800/90 max-w-lg font-body leading-relaxed">
        From <span className="italic">&apos;Aiburo Bhaat&apos;</span> to <span className="italic">&apos;Bashi Biye&apos;</span>,
        we weave your emotions into timeless frames that tell your story for generations.
      </p>

      <Button
        asChild
        size="lg"
        className="mt-4 bg-gradient-to-r from-rose-600 via-amber-600 to-yellow-500 text-white 
        hover:from-rose-700 hover:to-amber-700 font-headline text-lg shadow-lg hover:shadow-xl 
        transition-all duration-300 rounded-full px-8 py-6 w-fit"
      >
        <Link href="/contact">
          Book Your Day <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>
    </div>
  </div>

  {/* Right Cinematic Image */}
  <div className="relative w-full md:w-[50%] h-[40vh] md:h-full z-10">
    {heroImage && (
      <Image
        src={heroImage.imageUrl}
        alt={heroImage.description}
        fill
        className="object-cover object-center transition-transform duration-4000 ease-out hover:scale-105 
        rounded-tl-[160px] md:rounded-tl-[220px]"
        priority
      />
    )}
    {/* Cinematic fade overlay */}
    <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-black/10 to-transparent rounded-tl-[160px] md:rounded-tl-[220px]"></div>
  </div>

  {/* Bottom Wave Divider */}
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-30">
    <svg
      className="relative block w-[calc(150%+1.3px)] h-[90px] md:h-[120px] text-background"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M985.66,83.29c-55.9-11.6-112.56-23.36-170-26.45-59.2-3.2-117.92,5.52-176.47,16.37-58.55,10.85-116.87,23.74-176,22.75C403.09,95,344,79.93,284.79,64.76,226.29,49.83,168.15,34.9,109.67,27.57,73.35,23.05,36.67,22.22,0,22.28V120H1200V95.8C1130.8,91.86,1059.56,94.89,985.66,83.29Z"
        fill="currentColor"
      ></path>
    </svg>
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
