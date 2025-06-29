
import { Clock, MapPin, Star, User, Mail, BookOpen, Check, GraduationCap } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ITutor } from "@/types/tutor.type";

interface TutorDetailsProps {
    tutor: ITutor;
}

export const TutorDetailsComponent = ({ tutor }: TutorDetailsProps) => {
    // Mock data for additional details
    const rating = 4.9;
    const reviews = 24;
    const responseTime = "2 hours";
    const backgroundChecked = true;
    const subjectsTaught = tutor.subjectList.length;

    // Group availability by day
    const availabilityByDay = tutor.availability.reduce((acc, slot) => {
        if (!acc[slot.day]) acc[slot.day] = [];
        acc[slot.day].push(`${slot.startTime} - ${slot.endTime}`);
        return acc;
    }, {} as Record<string, string[]>);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column - Profile Card */}
                <div className="w-full md:w-1/3 lg:w-1/4">
                    <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                        <div className="flex flex-col items-center">
                            <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                                {tutor.profileImage ? (
                                    <Image
                                        src={tutor.profileImage}
                                        alt={tutor.name}
                                        fill
                                        className="object-cover"
                                        sizes="128px"
                                    />
                                ) : (
                                    <div className="bg-gray-100 h-full w-full flex items-center justify-center">
                                        <User className="text-gray-400 h-16 w-16" />
                                    </div>
                                )}
                            </div>

                            <h1 className="text-2xl font-bold text-center">{tutor.name}</h1>

                            <div className="flex items-center mt-2 bg-blue-50 px-3 py-1 rounded-full">
                                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                <span className="ml-1 font-medium">
                                    {rating.toFixed(1)} <span className="text-gray-500">({reviews})</span>
                                </span>
                            </div>

                            <div className="mt-4 text-center">
                                <div className="text-3xl font-bold text-blue-600">${tutor.hourlyRate}</div>
                                <div className="text-gray-500">per hour</div>
                            </div>

                            <div className="w-full mt-6 space-y-3">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12">
                                    Book a Lesson
                                </Button>
                                <Button variant="outline" className="w-full h-12">
                                    <Mail className="h-4 w-4 mr-2" /> Message
                                </Button>
                            </div>

                            <div className="w-full mt-6 space-y-3">
                                <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    {tutor.location === "ONLINE" ? "Online Lessons" : "In-Person Lessons"}
                                </div>
                                {tutor.experience && (
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Clock className="h-4 w-4 mr-2" />
                                        {tutor.experience}+ years of experience
                                    </div>
                                )}
                                {backgroundChecked && (
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Check className="h-4 w-4 mr-2 text-green-500" />
                                        Background checked
                                    </div>
                                )}
                                <div className="flex items-center text-sm text-gray-600">
                                    <GraduationCap className="h-4 w-4 mr-2" />
                                    Teaches {subjectsTaught} subjects
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Clock className="h-4 w-4 mr-2" />
                                    Response time: {responseTime}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Details */}
                <div className="w-full md:w-2/3 lg:w-3/4 space-y-8">
                    {/* About Section */}
                    <section className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">About {tutor.name.split(' ')[0]}</h2>
                        <p className="text-gray-700 whitespace-pre-line">{tutor.bio}</p>
                    </section>

                    {/* Subjects Section */}
                    <section className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">Subjects Taught</h2>
                        <div className="flex flex-wrap gap-3">
                            {tutor.subjectList.map((subject) => (
                                <span
                                    key={subject}
                                    className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                                >
                                    {subject}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* Availability Section */}
                    <section className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">Availability</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.entries(availabilityByDay).map(([day, times]) => (
                                <div key={day} className="border rounded-lg p-4">
                                    <h3 className="font-medium text-lg mb-2">{day}</h3>
                                    <ul className="space-y-2">
                                        {times.map((time, i) => (
                                            <li key={i} className="flex items-center">
                                                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                                <span>{time}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Reviews Section (Placeholder) */}
                    <section className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">Reviews</h2>
                        <div className="text-center py-8 text-gray-500">
                            <BookOpen className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                            <p>No reviews yet</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};