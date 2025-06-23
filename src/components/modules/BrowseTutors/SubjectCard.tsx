"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, MapPin, User } from "lucide-react";
import { ISubject } from "@/types";
import Link from "next/link";

interface ShowSubjectCardProps {
    subject: ISubject | null;
};

const ShowSubjectCard: React.FC<ShowSubjectCardProps> = ({ subject }) => {
    if (!subject) {
        return <div className="text-center text-gray-500">No subject available</div>;
    }

    return (
        <Card className="w-full border border-gray-200 shadow-2xl hover:shadow-md transition-shadow duration-200 rounded-lg overflow-hidden py-4 flex flex-col my-2">

            {/* Card Header (Title and Tutor) */}
            <CardHeader className="p-1 bg-white text-center ">
                <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {subject.subject}
                </CardTitle>
                <div className="cursor-pointer flex items-center justify-center gap-1 text-sm text-gray-600">
                    <User className="h-4 w-4 text-gray-500" />
                    {/* <span className="font-medium">{subject?.tutor?.name || "Unknown Tutor"}</span> */}
                </div>
            </CardHeader>

            {/* Card Content (Details) */}
            <CardContent className="px-4 py-1 space-y-3 flex-grow">
                {/* Description (shortened, Udemy-like) */}
                <p className="text-sm text-gray-600 line-clamp-2">
                    {subject.description.slice(0, 100)}
                </p>

                <div className="flex items-center justify-between">
                    {/* Price */}
                    <div className="flex items-center gap-1 text-gray-800">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span className="text-lg font-bold">${subject.hourlyRate}</span>
                        <span className="text-sm text-gray-500">/hr</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{subject.location}</span>
                    </div>
                </div>

                {/* Availability (Compact) */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between gap-1 text-sm text-gray-600 py-2">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="font-medium text-black">Availability</span>
                        </div>
                        <h2>{subject.availability.length}</h2>
                    </div>
                    <div className="flex flex-col gap-1">
                        {subject.availability.slice(0, 2).map((slot, index) => ( // Limit to 2 for compactness
                            <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                                {slot.day}: {slot.startTime}-{slot.endTime}
                            </Badge>
                        ))}
                        {subject.availability.length > 2 && (
                            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                                +{subject.availability.length - 2} more
                            </Badge>
                        )}
                    </div>
                </div>
            </CardContent>

            {/* Card Footer (Button) */}
            <CardFooter className="px-4 bg-gray-50">
                <Link href={`/tutors/${subject?._id}`} className="w-full">
                    <Button
                        variant="default"
                        className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition"
                    >
                        Book Now
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default ShowSubjectCard;