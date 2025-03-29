"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, DollarSign, MapPin } from "lucide-react";
import { ISubject } from "@/types"; 
import { toast } from "sonner";

interface SubjectCardProps {
    subjectId?: string; // Optional prop to fetch a specific subject
}

const ShowSubjectCard: React.FC<SubjectCardProps> = ({ subjectId }) => {




    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (!subject) {
        return <div className="text-center">No subject available</div>;
    }

    return (
        <Card className="max-w-md mx-auto shadow-lg border border-gray-100">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-indigo-600">
                    {subject.subject}
                </CardTitle>
                <CardDescription className="text-gray-600">
                    {subject.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-indigo-500" />
                    <span className="font-semibold">${subject.hourlyRate}/hr</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-indigo-500" />
                    <span>{subject.location}</span>
                </div>
                <div className="space-y-2">
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-indigo-500" />
                        Availability
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {subject.availability.map((slot, index) => (
                            <Badge key={index} variant="outline" className="text-sm">
                                {slot.day}: {slot.startTime} - {slot.endTime}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Badge variant={subject.isActive ? "default" : "secondary"}>
                    {subject.isActive ? "Active" : "Inactive"}
                </Badge>
                <Button variant="outline" className="text-indigo-600 border-indigo-600 hover:bg-indigo-50">
                    Book Now
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ShowSubjectCard;