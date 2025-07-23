"use client";

import { useState } from "react";
import { ITutor, IAvailability } from "@/types/tutor.type";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { useSession } from "next-auth/react";

interface Props {
  tutor: ITutor;
}

//   date

export const BookSession = ({ tutor }: Props) => {
  const router = useRouter();
  // const [selectedSlot, setSelectedSlot] = useState<IAvailability | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<IAvailability | null>(null);
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState(60);
  const session = useSession();
  const studentId = session.data?.user?.id || "";

  const price = tutor.hourlyRate * (duration / 60);

  const handleBooking = async () => {
    if (!selectedSlot || !subject) return;

    const payload = {
      tutorId: tutor.id,
      studentId,
      date: new Date(),
      duration,
      price,
      subject,
      selectedSlotId : selectedSlot.id
    };
    console.log("Booking payload:", payload);
    // console.log(session.data?.user);

    // TODO: Replace with real API call
    // router.push("/checkout");
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Tutor Summary */}
        <aside className="bg-white shadow rounded-lg p-6 md:col-span-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden">
              <Image
                src={tutor.profileImage || "/default-avatar.jpg"}
                alt={tutor.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{tutor.name}</h2>
              <p className="text-sm text-gray-600">{tutor.subjectList.join(", ")}</p>
              <p className="text-indigo-600 font-semibold mt-1">${tutor.hourlyRate}/hr</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-500" />
              {tutor.location === "ONLINE" ? "Online Session" : "In-Person"}
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-500" />
              {tutor.experience}+ yrs experience
            </div>
          </div>
        </aside>

        {/* Booking Form */}
        <section className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Book Your Session</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Subject */}
              <div>
                <label className="block font-medium mb-1">Subject</label>
                <select
                  className="w-full border p-2 rounded"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="">Select subject</option>
                  {tutor.subjectList.map((subj) => (
                    <option key={subj} value={subj}>
                      {subj}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block font-medium mb-1">Duration (mins)</label>
                <select
                  className="w-full border p-2 rounded"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                >
                  <option value={30}>30</option>
                  <option value={60}>60</option>
                  <option value={90}>90</option>
                </select>
              </div>
            </div>

            {/* Availability Slots */}
            <div className="mt-6">
              <label className="block font-medium mb-2">Select Time Slot</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {tutor.availability.map((slot, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSlot(slot)}
                    className={`border p-3 rounded text-sm ${selectedSlot === slot
                      ? "border-indigo-600 bg-indigo-50"
                      : "hover:border-indigo-300"
                      }`}
                  >
                    {slot.day.slice(0, 3)} — {slot.startTime} to {slot.endTime}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Card */}
          {selectedSlot && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Summary</h3>
              <p>
                <strong>Subject:</strong> {subject || "Not selected"}
              </p>
              <p>
                <strong>Time:</strong> {selectedSlot.day}, {selectedSlot.startTime} -{" "}
                {selectedSlot.endTime}
              </p>
              <p>
                <strong>Duration:</strong> {duration} mins
              </p>
              <p className="text-indigo-600 font-bold text-lg mt-2">
                Total: ${price}
              </p>

              <button
                onClick={handleBooking}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
              >
                Confirm & Pay
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
