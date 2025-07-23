"use client";

import { useState } from "react";
import { ITutor, IAvailability } from "@/types/tutor.type";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { useSession } from "next-auth/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Props {
  tutor: ITutor;
}

export const BookSession = ({ tutor }: Props) => {
  const router = useRouter();
  const [selectedSlot, setSelectedSlot] = useState<IAvailability | null>(null);
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState(60);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const session = useSession();
  const studentId = session.data?.user?.id || "";

  const price = tutor.hourlyRate * (duration / 60);

  const handleBooking = async () => {
    if (!selectedSlot || !subject || !selectedDate) return;

    const payload = {
      tutorId: tutor.id,
      studentId,
      date: selectedDate,
      duration,
      price,
      subject,
      selectedSlotId: selectedSlot.id,
    };

    console.log("Booking payload:", payload);

    // TODO: call your booking API or go to checkout
  };

  // Convert selectedDate to day string (e.g. "Monday")
  const selectedDayName = selectedDate
    ? new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(selectedDate)
    : "";

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


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Calendar Selector */}
              <div className="mt-6">
                <label className="block font-medium mb-2">Select a Date</label>
                <Calendar
                  onChange={(date) => {
                    setSelectedDate(date as Date);
                    setSelectedSlot(null);
                  }}
                  value={selectedDate}
                  minDate={new Date()}
                  tileDisabled={({ date }) => {
                    const dayName = new Intl.DateTimeFormat("en-US", {
                      weekday: "long",
                    }).format(date);
                    return !tutor.availability.some((slot) => slot.day === dayName);
                  }}
                  tileClassName={({ date }) => {
                    const dayName = new Intl.DateTimeFormat("en-US", {
                      weekday: "long",
                    }).format(date);
                    const isAvailable = tutor.availability.some((slot) => slot.day === dayName);
                    return isAvailable ? "available-date" : null;
                  }}
                />
              </div>

              {/* Time Slot Filter */}
              <div>
                {selectedDate && (
                  <>
                    <label className="block font-medium mb-2 mt-6">Available Time Slots</label>
                    <div className="">
                      {tutor.availability
                        .filter((slot) => slot.day === selectedDayName)
                        .map((slot, idx) => (
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
                      {tutor.availability.filter((slot) => slot.day === selectedDayName).length === 0 && (
                        <p className="text-sm text-gray-500 col-span-full">No slots available for this day.</p>
                      )}
                    </div>
                  </>
                )}
              </div>

            </div>

          </div>

          {/* Summary Card */}
          {selectedSlot && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Summary</h3>
              <p><strong>Subject:</strong> {subject || "Not selected"}</p>
              <p><strong>Date:</strong> {selectedDate?.toDateString()}</p>
              <p>
                <strong>Time:</strong> {selectedSlot.day}, {selectedSlot.startTime} - {selectedSlot.endTime}
              </p>
              <p><strong>Duration:</strong> {duration} mins</p>
              <p className="text-indigo-600 font-bold text-lg mt-2">Total: ${price}</p>

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
};








// "use client";

// import { useState } from "react";
// import { ITutor, IAvailability } from "@/types/tutor.type";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { Clock, MapPin } from "lucide-react";
// import { useSession } from "next-auth/react";

// interface Props {
//   tutor: ITutor;
// }

// //   date

// export const BookSession = ({ tutor }: Props) => {
//   const router = useRouter();
//   // const [selectedSlot, setSelectedSlot] = useState<IAvailability | null>(null);
//   const [selectedSlot, setSelectedSlot] = useState<IAvailability | null>(null);
//   const [subject, setSubject] = useState("");
//   const [duration, setDuration] = useState(60);
//   const session = useSession();
//   const studentId = session.data?.user?.id || "";

//   const price = tutor.hourlyRate * (duration / 60);

//   const handleBooking = async () => {
//     if (!selectedSlot || !subject) return;

//     const payload = {
//       tutorId: tutor.id,
//       studentId,
//       date: new Date(),
//       duration,
//       price,
//       subject,
//       selectedSlotId : selectedSlot.id
//     };
//     console.log("Booking payload:", payload);
//     // console.log(session.data?.user);

//     // TODO: Replace with real API call
//     // router.push("/checkout");
//   };

//   return (
//     <div className="max-w-6xl mx-auto py-8 px-4">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

//         {/* Tutor Summary */}
//         <aside className="bg-white shadow rounded-lg p-6 md:col-span-1">
//           <div className="flex items-center gap-4 mb-4">
//             <div className="relative h-16 w-16 rounded-full overflow-hidden">
//               <Image
//                 src={tutor.profileImage || "/default-avatar.jpg"}
//                 alt={tutor.name}
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <div>
//               <h2 className="text-xl font-bold text-gray-900">{tutor.name}</h2>
//               <p className="text-sm text-gray-600">{tutor.subjectList.join(", ")}</p>
//               <p className="text-indigo-600 font-semibold mt-1">${tutor.hourlyRate}/hr</p>
//             </div>
//           </div>

//           <div className="space-y-4 text-sm text-gray-700">
//             <div className="flex items-center gap-2">
//               <MapPin className="w-4 h-4 text-indigo-500" />
//               {tutor.location === "ONLINE" ? "Online Session" : "In-Person"}
//             </div>

//             <div className="flex items-center gap-2">
//               <Clock className="w-4 h-4 text-indigo-500" />
//               {tutor.experience}+ yrs experience
//             </div>
//           </div>
//         </aside>

//         {/* Booking Form */}
//         <section className="md:col-span-2 space-y-6">
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h2 className="text-xl font-bold mb-4">Book Your Session</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Subject */}
//               <div>
//                 <label className="block font-medium mb-1">Subject</label>
//                 <select
//                   className="w-full border p-2 rounded"
//                   value={subject}
//                   onChange={(e) => setSubject(e.target.value)}
//                 >
//                   <option value="">Select subject</option>
//                   {tutor.subjectList.map((subj) => (
//                     <option key={subj} value={subj}>
//                       {subj}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Duration */}
//               <div>
//                 <label className="block font-medium mb-1">Duration (mins)</label>
//                 <select
//                   className="w-full border p-2 rounded"
//                   value={duration}
//                   onChange={(e) => setDuration(Number(e.target.value))}
//                 >
//                   <option value={30}>30</option>
//                   <option value={60}>60</option>
//                   <option value={90}>90</option>
//                 </select>
//               </div>
//             </div>

//             {/* Availability Slots */}
//             <div className="mt-6">
//               <label className="block font-medium mb-2">Select Time Slot</label>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                 {tutor.availability.map((slot, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setSelectedSlot(slot)}
//                     className={`border p-3 rounded text-sm ${selectedSlot === slot
//                       ? "border-indigo-600 bg-indigo-50"
//                       : "hover:border-indigo-300"
//                       }`}
//                   >
//                     {slot.day.slice(0, 3)} — {slot.startTime} to {slot.endTime}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Summary Card */}
//           {selectedSlot && (
//             <div className="bg-white p-6 rounded-lg shadow">
//               <h3 className="font-semibold mb-2">Summary</h3>
//               <p>
//                 <strong>Subject:</strong> {subject || "Not selected"}
//               </p>
//               <p>
//                 <strong>Time:</strong> {selectedSlot.day}, {selectedSlot.startTime} -{" "}
//                 {selectedSlot.endTime}
//               </p>
//               <p>
//                 <strong>Duration:</strong> {duration} mins
//               </p>
//               <p className="text-indigo-600 font-bold text-lg mt-2">
//                 Total: ${price}
//               </p>

//               <button
//                 onClick={handleBooking}
//                 className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
//               >
//                 Confirm & Pay
//               </button>
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// }
