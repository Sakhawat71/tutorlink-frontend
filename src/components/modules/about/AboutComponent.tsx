"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About TutorLink
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-xl sm:max-w-2xl mx-auto">
            Connecting students with expert tutors to unlock their full potential.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Our Mission
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-md sm:max-w-2xl md:max-w-3xl mx-auto">
            At TutorLink, our goal is to bridge the gap between students seeking knowledge and qualified tutors ready to inspire. We aim to provide a seamless, accessible platform where learning thrives, empowering students to achieve academic success and tutors to share their expertise effectively.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-10 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Team Member 1 */}
            <Card className="text-center">
              <CardHeader>
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4">
                  <AvatarImage src="https://i.ibb.co.com/4K27t1f/user.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg sm:text-xl">Jane Doe</CardTitle>
                <p className="text-xs sm:text-sm text-gray-500">Founder & CEO</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-gray-600">
                  Jane is passionate about education and technology, driving TutorLink’s vision to revolutionize tutoring.
                </p>
              </CardContent>
            </Card>
            {/* Team Member 2 */}
            <Card className="text-center">
              <CardHeader>
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4">
                  <AvatarImage src="https://i.ibb.co.com/4K27t1f/user.png" />
                  <AvatarFallback>JM</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg sm:text-xl">John Miles</CardTitle>
                <p className="text-xs sm:text-sm text-gray-500">Lead Developer</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-gray-600">
                  John builds the tech that powers TutorLink, ensuring a smooth experience for all users.
                </p>
              </CardContent>
            </Card>
            {/* Team Member 3 */}
            <Card className="text-center">
              <CardHeader>
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4">
                  <AvatarImage src="https://i.ibb.co.com/4K27t1f/user.png" />
                  <AvatarFallback>ES</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg sm:text-xl">Emily Stone</CardTitle>
                <p className="text-xs sm:text-sm text-gray-500">Education Specialist</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-gray-600">
                  Emily ensures our tutors meet high standards and students get the best learning support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-10 sm:py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Story 1 */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <p className="text-sm sm:text-base text-gray-700 italic mb-4">
                “TutorLink helped me find a math tutor who turned my grades around. I went from struggling to acing my exams in just two months!”
              </p>
              <p className="text-xs sm:text-sm font-semibold text-gray-900">
                - Sarah K., Student
              </p>
            </div>
            {/* Story 2 */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <p className="text-sm sm:text-base text-gray-700 italic mb-4">
                “As a tutor, I love how easy it is to manage my schedule and connect with students who need my help. TutorLink has been a game-changer.”
              </p>
              <p className="text-xs sm:text-sm font-semibold text-gray-900">
                - Michael T., Tutor
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-10 sm:py-12 md:py-16 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Our Vision
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-md sm:max-w-2xl md:max-w-3xl mx-auto mb-6">
            We’re committed to expanding TutorLink’s reach by adding more subjects, integrating advanced learning tools, and connecting students and tutors globally. Our future includes a world where quality education is just a click away for everyone.
          </p>
          <Link href="/register">
            <Button className="rounded-full px-4 sm:px-6 text-sm sm:text-base">
              Join Us Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}