import { GalleryGrid } from './gallery-grid';
import { placeholderImages, type ImagePlaceholder } from '@/lib/placeholder-images';

type GalleryCategory = {
    title: string;
    images: (ImagePlaceholder | undefined)[];
}

const categories: GalleryCategory[] = [
    {
        title: "Pre-Wedding",
        images: ["pre1.jpg", "pre2.jpg", "pre3.jpg"].map(id => placeholderImages.find(img => img.id === id)),
    },
    {
        title: "Wedding Ceremony",
        images: ["wed1.jpg", "wed2.jpg", "wed3.jpg"].map(id => placeholderImages.find(img => img.id === id)),
    },
    {
        title: "Reception",
        images: ["rec1.jpg", "rec2.jpg", "rec3.jpg"].map(id => placeholderImages.find(img => img.id === id)),
    },
];

export default function GalleryPage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="text-center mb-12">
                <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                    Our Work
                </h1>
                <p className="text-muted-foreground mt-3 max-w-2xl mx-auto font-body">
                    A glimpse into the beautiful stories we&apos;ve had the honor to capture.
                </p>
            </div>
            <GalleryGrid categories={categories.map(c => ({...c, images: c.images.filter((i): i is ImagePlaceholder => !!i)}))} />
        </div>
    );
}
