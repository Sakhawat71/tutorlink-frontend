import { ITutor } from "@/types/tutor.type";
import { Calendar, Clock, MapPin, Star, User } from "lucide-react";
import Image from "next/image";

interface TutorCardProps {
    tutor: ITutor;
}

export const TutorCard = ({ tutor }: TutorCardProps) => {
    const rating = 4.8; // Placeholder
    const reviews = 12; // Placeholder

    // Format availability
    const availabilitySummary = tutor.availability
        .map(slot => `${slot.day.slice(0, 3)} ${slot.startTime}-${slot.endTime}`)
        .join(", ");

    return (
        <div className="flex flex-col h-full max-w-md rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            {/* Header with profile image and basic info */}
            <div className="flex p-6 bg-white">
                <div className="relative h-24 w-24 flex-shrink-0 rounded-full overflow-hidden border-2 border-indigo-100">
                    {tutor.profileImage ? (
                        <Image
                            src={tutor.profileImage}
                            alt={tutor.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                        />
                    ) : (
                        <div className="bg-gray-100 h-full w-full flex items-center justify-center">
                            <User className="text-gray-400 h-12 w-12" />
                        </div>
                    )}
                </div>

                <div className="ml-5 flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <div className="min-w-0">
                            <h3 className="text-xl font-bold text-gray-900 truncate">{tutor.name}</h3>
                            <p className="text-gray-600 text-sm mt-1 truncate">
                                {tutor.subjectList.join(", ")}
                            </p>
                        </div>
                        <div className="flex items-center bg-indigo-50 px-2 py-1 rounded flex-shrink-0">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1 text-sm font-medium">
                                {rating} <span className="text-gray-500">({reviews})</span>
                            </span>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center text-sm text-gray-500 flex-wrap gap-2">
                        <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {tutor.location === "ONLINE" ? "Online" : "In-Person"}
                        </span>
                        {tutor.location === "ONSITE" && tutor.experience && (
                            <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {tutor.experience}+ years
                            </span>
                        )}
                    </div>

                    <div className="mt-4">
                        <span className="text-2xl font-bold text-indigo-600">
                            ${tutor.hourlyRate}
                        </span>
                        <span className="text-gray-500 text-sm ml-1">/ hour</span>
                    </div>
                </div>
            </div>

            {/* Bio section - with fixed height */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex-1">
                <p className="text-gray-700 line-clamp-3 h-[72px] overflow-hidden">
                    {tutor.bio}
                </p>
            </div>

            {/* Availability & CTA - fixed at bottom */}
            <div className="px-6 py-4 bg-white border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="font-medium">Availability: </span>
                    <span className="ml-1 truncate">
                        {availabilitySummary || "Not specified"}
                    </span>
                </div>

                <div className="flex space-x-3">
                    <button className="flex-1 bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-2 px-4 rounded-lg font-medium transition-colors">
                        Book Session
                    </button>
                </div>
            </div>
        </div>
    );
};