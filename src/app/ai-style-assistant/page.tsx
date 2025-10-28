'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getStyleSuggestions } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Image as ImageIcon, Lightbulb, Camera, Captions } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { type ImageStyleSuggestionsOutput } from '@/ai/flows/image-style-suggestions';

const formSchema = z.object({
    imageDescription: z.string().min(10, "Please provide a more detailed description."),
});

type FormValues = z.infer<typeof formSchema>;

export default function AiStyleAssistantPage() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageData, setImageData] = useState<string | null>(null);
    const [suggestions, setSuggestions] = useState<ImageStyleSuggestionsOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageDescription: '',
        },
    });

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 4 * 1024 * 1024) { // 4MB limit
                toast({
                    variant: 'destructive',
                    title: 'Image too large',
                    description: 'Please upload an image smaller than 4MB.',
                });
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setImageData(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (!imageData) {
            toast({
                variant: 'destructive',
                title: 'No image selected',
                description: 'Please upload an image to get suggestions.',
            });
            return;
        }

        setIsLoading(true);
        setSuggestions(null);

        try {
            const result = await getStyleSuggestions({
                imageDataUri: imageData,
                imageDescription: data.imageDescription,
            });
            setSuggestions(result);
        } catch (error) {
            console.error('Error getting suggestions:', error);
            toast({
                variant: 'destructive',
                title: 'An error occurred',
                description: 'Failed to get style suggestions. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="text-center mb-12">
                <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                    AI Style Assistant
                </h1>
                <p className="text-muted-foreground mt-3 max-w-2xl mx-auto font-body">
                    Upload a photo and get expert suggestions on style, angle, and caption for your Bengali wedding shots.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Upload Your Image</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <div className="relative flex justify-center items-center w-full h-64 border-2 border-dashed border-border rounded-lg bg-muted/50">
                                            {imagePreview ? (
                                                <Image src={imagePreview} alt="Image preview" fill className="object-contain rounded-lg p-2" />
                                            ) : (
                                                <div className="text-center text-muted-foreground">
                                                    <ImageIcon className="mx-auto h-12 w-12" />
                                                    <p>Click to upload or drag and drop</p>
                                                </div>
                                            )}
                                            <Input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required />
                                        </div>
                                    </FormControl>
                                </FormItem>

                                <FormField
                                    control={form.control}
                                    name="imageDescription"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Image Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="e.g., A candid shot of the bride during the 'Gaye Holud' ceremony." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" disabled={isLoading} className="w-full font-headline">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        'Get Suggestions'
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center h-full space-y-4 text-muted-foreground">
                           <Lightbulb className="w-16 h-16 animate-pulse text-primary"/>
                           <p className="font-headline text-lg">Generating brilliant ideas...</p>
                        </div>
                    )}
                    {suggestions && (
                        <>
                            <Card className="shadow-lg animate-in fade-in-0 zoom-in-95">
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <Lightbulb className="w-8 h-8 text-primary" />
                                    <CardTitle className="font-headline text-2xl">Style Suggestion</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-body text-foreground">{suggestions.styleSuggestion}</p>
                                </CardContent>
                            </Card>
                             <Card className="shadow-lg animate-in fade-in-0 zoom-in-95 delay-150">
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <Camera className="w-8 h-8 text-primary" />
                                    <CardTitle className="font-headline text-2xl">Angle Suggestion</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-body text-foreground">{suggestions.angleSuggestion}</p>
                                </CardContent>
                            </Card>
                            <Card className="shadow-lg animate-in fade-in-0 zoom-in-95 delay-300">
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <Captions className="w-8 h-8 text-primary" />
                                    <CardTitle className="font-headline text-2xl">Caption Suggestion</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-body text-foreground">{suggestions.captionSuggestion}</p>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
