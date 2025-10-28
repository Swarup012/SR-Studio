import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const packages = [
  {
    name: "Silver Package",
    price: "₹25,000",
    features: [
      "One-day coverage",
      "200 edited photos",
      "Online gallery delivery"
    ],
    isPopular: false,
  },
  {
    name: "Gold Package",
    price: "₹45,000",
    features: [
      "Two-day coverage",
      "300 edited photos",
      "Highlight video"
    ],
    isPopular: true,
  },
  {
    name: "Platinum Package",
    price: "₹70,000",
    features: [
      "Full event coverage",
      "Pre-wedding + Wedding",
      "Cinematic video + Album"
    ],
    isPopular: false,
  }
];

export default function PackagesPage() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Our Packages
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto font-body">
            Choose the perfect package that fits your needs for an unforgettable wedding experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
          {packages.map((pkg) => (
            <Card key={pkg.name} className={cn("flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300", pkg.isPopular ? "border-primary border-2 -translate-y-4" : "border-border")}>
                {pkg.isPopular && <div className="bg-primary text-primary-foreground text-center py-1 font-headline text-sm rounded-t-lg">Most Popular</div>}
                <CardHeader className="text-center">
                    <CardTitle className="font-headline text-3xl">{pkg.name}</CardTitle>
                    <CardDescription className="text-lg font-body">{pkg.price}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                    <ul className="space-y-4 font-body">
                        {pkg.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-primary" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full font-headline" variant={pkg.isPopular ? 'default' : 'secondary'}>
                        <Link href="/contact">Book Now</Link>
                    </Button>
                </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
