'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { type ImagePlaceholder } from '@/lib/placeholder-images';

type GalleryGridProps = {
    categories: {
        title: string;
        images: ImagePlaceholder[];
    }[];
};

export function GalleryGrid({ categories }: GalleryGridProps) {
    const [selectedImage, setSelectedImage] = useState<ImagePlaceholder | null>(null);

    return (
        <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
            <Tabs defaultValue={categories[0]?.title} className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:w-auto md:mx-auto">
                    {categories.map((category) => (
                        <TabsTrigger key={category.title} value={category.title} className="font-headline">
                            {category.title}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {categories.map((category) => (
                    <TabsContent key={category.title} value={category.title}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                            {category.images.map((image) => (
                                <DialogTrigger asChild key={image.id}>
                                    <div
                                        className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                                        onClick={() => setSelectedImage(image)}
                                    >
                                        <Image
                                            src={image.imageUrl}
                                            alt={image.description}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                                            data-ai-hint={image.imageHint}
                                        />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </DialogTrigger>
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
            {selectedImage && (
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle className="font-headline">{selectedImage.description}</DialogTitle>
                    </DialogHeader>
                    <div className="relative aspect-video mt-4">
                        <Image
                            src={selectedImage.imageUrl.replace(/600\/400$/, '1280/720')}
                            alt={selectedImage.description}
                            fill
                            className="object-contain"
                            data-ai-hint={selectedImage.imageHint}
                        />
                    </div>
                </DialogContent>
            )}
        </Dialog>
    );
}
