"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqComponent() {
  return (
    <section className="w-full max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-semibold">
            How do I book a tutor on TutorLink?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            As a student, you can browse available tutors on the “Browse Tutors” page, filter by subject or availability, and select a tutor. Then, choose an available time slot and confirm your booking. You’ll see your scheduled sessions in the “My Bookings” section of your dashboard.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-semibold">
            What roles are available on TutorLink?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            TutorLink supports three roles: Students (who book tutors), Tutors (who offer sessions), and Admins (who manage tutors and oversee the platform). Your role is assigned during registration and determines your dashboard features.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-semibold">
            How do tutors set their availability?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            If you’re a tutor, log in and go to the “Availability” section in your dashboard. There, you can set your available days and time slots. Students will only see and book times you’ve marked as free.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg font-semibold">
            Can I cancel a booking?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            Yes, students can cancel bookings from the “My Bookings” page in their dashboard, provided it’s before the scheduled start time. Tutors will be notified, and their availability will update accordingly.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-lg font-semibold">
            How does TutorLink ensure security?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            We use secure authentication with email/password and social login options (e.g., Google) via NextAuth.js. All sensitive data is encrypted, and role-based access ensures users only see what’s relevant to them.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger className="text-lg font-semibold">
            What happens if a tutor isn’t available?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            If a tutor’s slots are booked or they haven’t set availability, they won’t appear as an option during booking. You can filter tutors by availability to find someone who fits your schedule.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}