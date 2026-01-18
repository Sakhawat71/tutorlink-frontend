"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Globe, MapPin } from "lucide-react";

interface TutorProfileViewProps {
    tutor: any;
}

const TutorProfileCard = ({ tutor }: TutorProfileViewProps) => {
    return (
        <Card className="max-w-4xl mx-auto p-6 shadow-xl">
            <CardHeader>
                <CardTitle className="text-center text-xl font-bold text-indigo-700">
                    Your Tutor Profile
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                    <img
                        src={tutor.profileImage || "/default-profile.png"}
                        alt={tutor.name}
                        className="w-24 h-24 rounded-full object-cover"
                    />
                    <div>
                        <h2 className="text-lg font-bold">{tutor.name}</h2>
                        <p className="text-gray-600">{tutor.email}</p>
                        <p className="mt-2 text-gray-700">{tutor.bio}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-gray-700">Hourly Rate</p>
                        <p>${tutor.hourlyRate}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Experience</p>
                        <p>{tutor.experience} years</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-sm font-medium text-gray-700">Subjects</p>
                        <p>{tutor.subjectList?.join(", ")}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-sm font-medium text-gray-700">Location / Format</p>
                        <p className="flex items-center gap-2">
                            {tutor.location === "ONLINE" ? (
                                <><Globe className="w-4 h-4 text-blue-500" /> Online Sessions</>
                            ) : (
                                <><MapPin className="w-4 h-4 text-green-500" /> In-Person Meetings</>
                            )}
                        </p>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Weekly Availability</p>
                    {tutor.availability?.length > 0 ? (
                        tutor.availability.map((slot: any, idx: number) => (
                            <div
                                key={idx}
                                className="flex justify-between px-4 py-2 bg-gray-50 rounded-lg"
                            >
                                <span>{slot.day}</span>
                                <span>
                                    {slot.startTime} - {slot.endTime}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No availability slots added.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default TutorProfileCard;