import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Clock, Star } from "lucide-react";
import TherapistCard from "./TherapistCard";

const TherapistDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");

  // Mock data - in real app this would come from API
  const therapists = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialties: ["Anxiety", "Depression", "Cognitive Behavioral Therapy"],
      experience: "8 years experience",
      rating: 4.9,
      reviewCount: 127,
      hourlyRate: 120,
      image: "/placeholder.svg",
      availableToday: true,
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialties: ["Trauma", "PTSD", "EMDR Therapy"],
      experience: "12 years experience",
      rating: 4.8,
      reviewCount: 203,
      hourlyRate: 140,
      image: "/placeholder.svg",
      availableToday: false,
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialties: ["Couples Therapy", "Relationship Issues", "Communication"],
      experience: "6 years experience",
      rating: 4.9,
      reviewCount: 89,
      hourlyRate: 110,
      image: "/placeholder.svg",
      availableToday: true,
    },
    {
      id: "4",
      name: "Dr. David Kim",
      specialties: ["Addiction", "Substance Abuse", "Group Therapy"],
      experience: "15 years experience",
      rating: 4.7,
      reviewCount: 156,
      hourlyRate: 130,
      image: "/placeholder.svg",
      availableToday: true,
    },
  ];

  const specialties = [
    "Anxiety", "Depression", "Trauma", "PTSD", "Couples Therapy", 
    "Addiction", "ADHD", "Eating Disorders", "Grief Counseling", "Stress Management"
  ];

  const filteredTherapists = therapists.filter(therapist => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSpecialty = !selectedSpecialty || selectedSpecialty === "all" || therapist.specialties.includes(selectedSpecialty);
    const matchesAvailability = !selectedAvailability || selectedAvailability === "any" || 
      (selectedAvailability === "today" && therapist.availableToday);
    
    return matchesSearch && matchesSpecialty && matchesAvailability;
  });

  return (
    <section className="py-16 bg-muted/20" id="therapists">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Find Your Perfect <span className="text-gradient">Therapist</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our network of qualified mental health professionals and find someone who understands your needs.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.map(specialty => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                <SelectTrigger>
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any time</SelectItem>
                  <SelectItem value="today">Available today</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSpecialty("");
                  setSelectedAvailability("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="outline" className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {filteredTherapists.filter(t => t.availableToday).length} available today
          </Badge>
          <Badge variant="outline" className="flex items-center">
            <Star className="mr-1 h-3 w-3" />
            Average rating: 4.8/5
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTherapists.map(therapist => (
            <TherapistCard key={therapist.id} therapist={therapist} />
          ))}
        </div>

        {filteredTherapists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No therapists found matching your criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TherapistDirectory;
