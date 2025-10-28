import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const teamMembers = [
  {
    name: "Arindam Dutta",
    role: "Lead Photographer",
    bio: "Specialist in candid and traditional Bengali wedding photography.",
    image: placeholderImages.find(img => img.id === 'arindam_dutta.jpg'),
    initials: "AD",
  },
  {
    name: "Moumita Roy",
    role: "Cinematographer",
    bio: "Expert in storytelling through cinematic visuals.",
    image: placeholderImages.find(img => img.id === 'moumita_roy.jpg'),
    initials: "MR",
  },
  {
    name: "Soham Ghosh",
    role: "Assistant Photographer",
    bio: "Captures moments that often go unnoticed but mean everything.",
    image: placeholderImages.find(img => img.id === 'soham_ghosh.jpg'),
    initials: "SG",
  }
];

export default function OurPhotographersPage() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Meet Our Talented Team
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto font-body">
            The creative minds behind the lens, dedicated to preserving your precious memories.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl">
              <CardHeader className="flex flex-col items-center">
                {member.image && (
                    <Avatar className="w-32 h-32 border-4 border-primary">
                        <AvatarImage src={member.image.imageUrl} alt={member.image.description} data-ai-hint={member.image.imageHint} />
                        <AvatarFallback className="text-4xl bg-muted">{member.initials}</AvatarFallback>
                    </Avatar>
                )}
                <CardTitle className="font-headline text-2xl mt-4">{member.name}</CardTitle>
                <p className="text-primary font-semibold font-headline">{member.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-body">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
