
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Star, Video } from "lucide-react";

interface TherapistCardProps {
  therapist: {
    id: string;
    name: string;
    specialties: string[];
    experience: string;
    rating: number;
    reviewCount: number;
    hourlyRate: number;
    image: string;
    availableToday: boolean;
  };
}

const TherapistCard = ({ therapist }: TherapistCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img
              src={therapist.image}
              alt={therapist.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            {therapist.availableToday && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full border-2 border-background"></div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{therapist.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{therapist.experience}</p>
            
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium ml-1">{therapist.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({therapist.reviewCount} reviews)
              </span>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {therapist.specialties.slice(0, 3).map((specialty) => (
                <Badge key={specialty} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
              {therapist.specialties.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{therapist.specialties.length - 3} more
                </Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span>${therapist.hourlyRate}/session</span>
              </div>
              <div className="flex items-center text-accent">
                <Video className="h-4 w-4 mr-1" />
                <span>Video sessions</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-4 bg-muted/20">
        <div className="flex w-full space-x-2">
          <Button variant="outline" className="flex-1">
            View Profile
          </Button>
          <Button className="flex-1">
            <Calendar className="mr-2 h-4 w-4" />
            Book Session
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TherapistCard;
