"use client";

import { useState } from "react";
import { ITutor, IAvailability } from "@/types/tutor.type";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { useSession } from "next-auth/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { createBookingSession } from "@/services/Booking";
import { toast } from "sonner";
import { HashLoader } from "react-spinners";
import { createPaymentIntent } from "@/services/Payment";


interface Props {
    tutor: ITutor;
}

export const BookSession = ({ tutor }: Props) => {
    const router = useRouter();
    const [selectedSlot, setSelectedSlot] = useState<IAvailability | null>(null);
    const [subject, setSubject] = useState("");
    const [duration, setDuration] = useState(60);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [errors, setErrors] = useState({
        subject: false,
        selectedDate: false,
        selectedSlot: false,
    });

    const session = useSession();
    // console.log(session);


    const studentId = session.data?.user?.id || "";
    const price = tutor.hourlyRate * (duration / 60);

    const handleBooking = async () => {
        const hasErrors = {
            subject: !subject,
            selectedDate: !selectedDate,
            selectedSlot: !selectedSlot,
        };

        setErrors(hasErrors);

        const anyError = Object.values(hasErrors).some((val) => val);
        if (anyError) return;

        if (!selectedSlot || !selectedSlot.id || !selectedDate) return;

        const payload = {
            tutorId: tutor.id,
            studentId,
            selectedSlotId: selectedSlot.id,
            date: selectedDate.toISOString(),
            duration,
            price,
            subject,
        };

        // console.log("Booking payload:", payload);

        try {
            const toastid = toast.loading("Creating booking session...")
            const res = await createBookingSession(payload);
            // console.log(res);

            if (res.success) {
                // console.log(res);
                toast.success(res.message || "Booking created successfully", { id: toastid });
                // console.log(res.data.id);
                const payment = await createPaymentIntent(res.data.id as string)
                // console.log(payment);
                if (payment.success) {
                    toast.success(payment.message || "Payment initialized successfully.", { id: toastid });
                    router.push(payment.data.paymentUrl);
                }
                // router.push("/payment");



            } else {
                toast.error(res.message || "Booking faield ", { id: toastid })
                console.error("Booking failed:", res);
            }
        } catch (error) {
            console.error("Error creating booking session:", error);
        }
    };

    const selectedDayName = selectedDate
        ? new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(selectedDate)
        : "";


    if (session.status === "loading") {
        return <div className="flex justify-center items-center h-screen">
            <HashLoader />
        </div>;
    }

    if (session.status === "unauthenticated") {
        router.push("/login");
        return null;
    }

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
                                <label className="block font-medium mb-1">Subject <span className="text-red-500">*</span></label>
                                <select
                                    className={`w-full border p-2 rounded ${errors.subject ? "border-red-500" : ""}`}
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
                                {errors.subject && <p className="text-sm text-red-500">Subject is required</p>}
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {/* Calendar Selector */}
                            <div>
                                <label className="block font-medium mb-2">Select a Date <span className="text-red-500">*</span></label>
                                <Calendar
                                    onChange={(date) => {
                                        setSelectedDate(date as Date);
                                        setSelectedSlot(null);
                                        setErrors((prev) => ({ ...prev, selectedDate: false }));
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
                                {errors.selectedDate && <p className="text-sm text-red-500">Date is required</p>}
                            </div>

                            {/* Time Slot Filter */}
                            <div>
                                {selectedDate && (
                                    <>
                                        <label className=" font-medium mb-2 mt-6">Available Time Slots <span className="text-red-500">*</span></label>
                                        <div className="flex gap-2 mt-2">
                                            {tutor.availability
                                                .filter((slot) => slot.day === selectedDayName)
                                                .map((slot, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => {
                                                            setSelectedSlot(slot);
                                                            setErrors((prev) => ({ ...prev, selectedSlot: false }));
                                                        }}
                                                        className={`border p-2 rounded text-sm ${selectedSlot === slot
                                                            ? "border-indigo-600 bg-indigo-50"
                                                            : "hover:border-indigo-300"
                                                            }`}
                                                    >
                                                        {slot.startTime} - {slot.endTime}
                                                    </button>
                                                ))}
                                            {tutor.availability.filter((slot) => slot.day === selectedDayName).length === 0 && (
                                                <p className="text-sm text-gray-500">No slots available for this day.</p>
                                            )}
                                        </div>
                                        {errors.selectedSlot && <p className="text-sm text-red-500 mt-2">Time slot is required</p>}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Summary & Confirm */}
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
