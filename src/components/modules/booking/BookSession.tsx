"use client";

import { useState } from "react";
import { ITutor, IAvailability } from "@/types/tutor.type";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Clock, MapPin, Calendar as CalendarIcon, AlertCircle, CheckCircle2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { createBookingSession } from "@/services/Booking";
import { toast } from "sonner";
import { HashLoader } from "react-spinners";
import { createPaymentIntent } from "@/services/Payment";
import { COLORS, FONT_SERIF, FONT_MONO, FONTS_IMPORT } from "@/components/shared/Designtokens";
import { initials } from "@/components/modules/browseTutors/Tutorcatalog.constants";

interface Props {
    tutor: ITutor;
}

export const BookSession = ({ tutor }: Props) => {
    const router = useRouter();
    const [selectedSlot, setSelectedSlot] = useState<IAvailability | null>(null);
    const [subject, setSubject] = useState("");
    const [duration, setDuration] = useState(60);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({
        subject: false,
        selectedDate: false,
        selectedSlot: false,
    });

    const session = useSession();
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

        try {
            setIsSubmitting(true);
            const toastid = toast.loading("Creating booking session...");
            const res = await createBookingSession(payload);

            if (res.success) {
                toast.success(res.message || "Booking created successfully", { id: toastid });
                const payment = await createPaymentIntent(res.data.id as string);
                if (payment.success) {
                    toast.success(payment.message || "Payment initialized successfully.", { id: toastid });
                    router.push(payment.data.paymentUrl);
                }
            } else {
                toast.error(res.message || "Booking failed", { id: toastid });
                console.error("Booking failed:", res);
            }
        } catch (error) {
            console.error("Error creating booking session:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedDayName = selectedDate
        ? new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(selectedDate)
        : "";

    if (session.status === "loading") {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
                <HashLoader color={COLORS.clay} />
            </div>
        );
    }

    if (session.status === "unauthenticated") {
        router.push("/login");
        return null;
    }

    return (
        <div style={{ minHeight: "100vh", background: "#FFFDF8" }}>
            <style>{`
                ${FONTS_IMPORT}

                .booking-calendar.react-calendar {
                    width: 100%;
                    border: none;
                    font-family: 'Inter', sans-serif;
                    background: transparent;
                }
                .booking-calendar .react-calendar__navigation button {
                    color: ${COLORS.ink};
                    font-family: 'Fraunces', serif;
                    font-weight: 600;
                    font-size: 14px;
                }
                .booking-calendar .react-calendar__navigation button:enabled:hover,
                .booking-calendar .react-calendar__navigation button:enabled:focus {
                    background-color: ${COLORS.parchmentDeep};
                    border-radius: 2px;
                }
                .booking-calendar .react-calendar__month-view__weekdays {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 10px;
                    text-transform: uppercase;
                    color: ${COLORS.warmGray};
                    letter-spacing: 0.04em;
                }
                .booking-calendar .react-calendar__month-view__weekdays abbr {
                    text-decoration: none;
                }
                .booking-calendar .react-calendar__tile {
                    border-radius: 2px;
                    padding: 10px 6px;
                    font-size: 13px;
                    color: #3A3528;
                }
                .booking-calendar .react-calendar__tile:enabled:hover {
                    background: ${COLORS.parchmentDeep};
                }
                .booking-calendar .react-calendar__tile--now {
                    background: transparent;
                    box-shadow: inset 0 0 0 1.5px ${COLORS.warmGray};
                }
                .booking-calendar .react-calendar__tile--active,
                .booking-calendar .react-calendar__tile--active:enabled:hover {
                    background: ${COLORS.ink} !important;
                    color: #FAF7F0 !important;
                }
                .booking-calendar .react-calendar__tile.available-date {
                    background-color: #EAF2EE;
                    border-radius: 2px;
                    font-weight: 600;
                    color: ${COLORS.forest};
                }
                .booking-calendar .react-calendar__tile.available-date:hover {
                    background-color: #D9E9E0;
                }
                .booking-calendar .react-calendar__tile:disabled {
                    background: transparent;
                    color: ${COLORS.border};
                }

                @media (max-width: 900px) {
                    .booking-grid { flex-direction: column !important; }
                    .booking-sidebar { width: 100% !important; position: static !important; }
                    .booking-split { grid-template-columns: 1fr !important; }
                }
            `}</style>

            {/* Header strip */}
            <div
                style={{
                    background: `linear-gradient(180deg, #FFFDF8 0%, ${COLORS.parchment} 100%)`,
                    borderBottom: `1px solid ${COLORS.border}`,
                    padding: "32px 28px",
                }}
            >
                <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                    <div
                        style={{
                            fontFamily: FONT_MONO,
                            fontSize: "11px",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: COLORS.clayDeep,
                            fontWeight: 700,
                            marginBottom: "10px",
                        }}
                    >
                        Booking Slip
                    </div>
                    <h1
                        style={{
                            fontFamily: FONT_SERIF,
                            fontSize: "clamp(26px, 3.4vw, 36px)",
                            fontWeight: 700,
                            color: COLORS.ink,
                            margin: 0,
                        }}
                    >
                        Reserve your session
                    </h1>
                </div>
            </div>

            <div
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto",
                    padding: "40px 28px 80px",
                    display: "flex",
                    gap: "32px",
                }}
                className="booking-grid"
            >
                {/* ---------- LEFT: tutor summary ---------- */}
                <aside style={{ width: "280px", flexShrink: 0 }} className="booking-sidebar">
                    <div
                        style={{
                            position: "sticky",
                            top: "24px",
                            background: "#FFFDF8",
                            border: `1px solid ${COLORS.border}`,
                            borderRadius: "2px",
                            padding: "24px",
                        }}
                    >
                        <div style={{ display: "flex", gap: "14px", marginBottom: "20px" }}>
                            <div
                                style={{
                                    position: "relative",
                                    width: "56px",
                                    height: "56px",
                                    borderRadius: "3px",
                                    overflow: "hidden",
                                    flexShrink: 0,
                                    background: `linear-gradient(135deg, ${COLORS.ink}, #34507e)`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {tutor.profileImage ? (
                                    <Image
                                        src={tutor.profileImage}
                                        alt={tutor.name}
                                        fill
                                        sizes="56px"
                                        style={{ objectFit: "cover" }}
                                    />
                                ) : (
                                    <span
                                        style={{
                                            fontFamily: FONT_SERIF,
                                            fontSize: "20px",
                                            fontWeight: 600,
                                            color: "#FAF7F0",
                                        }}
                                    >
                                        {initials(tutor.name)}
                                    </span>
                                )}
                            </div>
                            <div style={{ minWidth: 0 }}>
                                <h2
                                    style={{
                                        fontFamily: FONT_SERIF,
                                        fontSize: "17px",
                                        fontWeight: 600,
                                        color: COLORS.ink,
                                        margin: "0 0 3px 0",
                                    }}
                                >
                                    {tutor.name}
                                </h2>
                                <p style={{ fontSize: "12.5px", color: COLORS.warmGray, margin: "0 0 6px 0" }}>
                                    {tutor.subjectList.join(", ")}
                                </p>
                                <p
                                    style={{
                                        fontFamily: FONT_SERIF,
                                        fontSize: "15px",
                                        fontWeight: 700,
                                        color: COLORS.clayDeep,
                                        margin: 0,
                                    }}
                                >
                                    ${tutor.hourlyRate}/hr
                                </p>
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                                paddingTop: "16px",
                                borderTop: `1px solid ${COLORS.border}`,
                                fontSize: "13px",
                                color: "#4A4438",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <MapPin size={14} color={COLORS.clayDeep} />
                                {tutor.location === "ONLINE" ? "Online Session" : "In-Person"}
                            </div>
                            {tutor.experience !== undefined && (
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <Clock size={14} color={COLORS.clayDeep} />
                                    {tutor.experience}+ yrs experience
                                </div>
                            )}
                        </div>
                    </div>
                </aside>

                {/* ---------- RIGHT: booking form ---------- */}
                <section style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "24px" }}>
                    <FormCard title="Session Details">
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "18px",
                            }}
                            className="booking-split"
                        >
                            {/* Subject */}
                            <div>
                                <Label required>Subject</Label>
                                <select
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    style={selectStyle(errors.subject)}
                                >
                                    <option value="">Select subject</option>
                                    {tutor.subjectList.map((subj) => (
                                        <option key={subj} value={subj}>
                                            {subj}
                                        </option>
                                    ))}
                                </select>
                                {errors.subject && <FieldError>Subject is required</FieldError>}
                            </div>

                            {/* Duration */}
                            <div>
                                <Label>Duration</Label>
                                <select
                                    value={duration}
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                    style={selectStyle(false)}
                                >
                                    <option value={30}>30 minutes</option>
                                    <option value={60}>60 minutes</option>
                                    <option value={90}>90 minutes</option>
                                </select>
                            </div>
                        </div>
                    </FormCard>

                    <FormCard title="Pick a Date & Time">
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1.1fr 1fr",
                                gap: "28px",
                            }}
                            className="booking-split"
                        >
                            {/* Calendar */}
                            <div>
                                <Label required>Date</Label>
                                <div
                                    style={{
                                        border: `1px solid ${COLORS.border}`,
                                        borderRadius: "2px",
                                        padding: "8px",
                                        background: COLORS.parchment,
                                    }}
                                >
                                    <Calendar
                                        className="booking-calendar"
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
                                </div>
                                {errors.selectedDate && <FieldError>Date is required</FieldError>}
                            </div>

                            {/* Time slots */}
                            <div>
                                <Label required>Available Time Slots</Label>
                                {selectedDate ? (
                                    <>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "8px",
                                                marginTop: "2px",
                                            }}
                                        >
                                            {tutor.availability
                                                .filter((slot) => slot.day === selectedDayName)
                                                .map((slot, idx) => {
                                                    const active = selectedSlot === slot;
                                                    return (
                                                        <button
                                                            key={idx}
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedSlot(slot);
                                                                setErrors((prev) => ({ ...prev, selectedSlot: false }));
                                                            }}
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: "8px",
                                                                textAlign: "left",
                                                                border: `1.5px solid ${active ? COLORS.ink : COLORS.border}`,
                                                                background: active ? COLORS.ink : "#FFFDF8",
                                                                color: active ? COLORS.parchment : "#3A3528",
                                                                borderRadius: "2px",
                                                                padding: "10px 14px",
                                                                fontSize: "13.5px",
                                                                fontFamily: FONT_MONO,
                                                                cursor: "pointer",
                                                                transition: "all 120ms",
                                                            }}
                                                        >
                                                            <Clock size={13} />
                                                            {slot.startTime} – {slot.endTime}
                                                        </button>
                                                    );
                                                })}

                                            {tutor.availability.filter((slot) => slot.day === selectedDayName)
                                                .length === 0 && (
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "8px",
                                                            fontSize: "13px",
                                                            color: COLORS.warmGray,
                                                            padding: "10px 0",
                                                        }}
                                                    >
                                                        <AlertCircle size={14} />
                                                        No slots available for this day.
                                                    </div>
                                                )}
                                        </div>
                                        {errors.selectedSlot && <FieldError>Time slot is required</FieldError>}
                                    </>
                                ) : (
                                    <p style={{ fontSize: "13px", color: COLORS.warmGray, margin: "8px 0 0" }}>
                                        Select a date first.
                                    </p>
                                )}
                            </div>
                        </div>
                    </FormCard>

                    {/* Summary & Confirm */}
                    {selectedSlot && (
                        <div
                            style={{
                                background: COLORS.ink,
                                borderRadius: "2px",
                                padding: "28px 26px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    marginBottom: "18px",
                                }}
                            >
                                <CheckCircle2 size={16} color={COLORS.clay} />
                                <h3
                                    style={{
                                        fontFamily: FONT_SERIF,
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        color: "#FFFDF8",
                                        margin: 0,
                                    }}
                                >
                                    Booking Summary
                                </h3>
                            </div>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "12px 24px",
                                    marginBottom: "20px",
                                }}
                                className="booking-split"
                            >
                                <SummaryRow label="Subject" value={subject || "Not selected"} />
                                <SummaryRow
                                    label="Date"
                                    value={selectedDate?.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    }) || "—"}
                                />
                                <SummaryRow
                                    label="Time"
                                    value={`${selectedSlot.day}, ${selectedSlot.startTime}–${selectedSlot.endTime}`}
                                />
                                <SummaryRow label="Duration" value={`${duration} minutes`} />
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    paddingTop: "16px",
                                    borderTop: "1px solid rgba(255,255,255,0.15)",
                                    marginBottom: "20px",
                                }}
                            >
                                <span style={{ fontSize: "13px", color: "#AEB6C4" }}>Total</span>
                                <span
                                    style={{
                                        fontFamily: FONT_SERIF,
                                        fontSize: "26px",
                                        fontWeight: 700,
                                        color: "#FFFDF8",
                                    }}
                                >
                                    ${price}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={handleBooking}
                                disabled={isSubmitting}
                                style={{
                                    width: "100%",
                                    background: isSubmitting ? COLORS.warmGray : COLORS.clay,
                                    color: "#FFFDF8",
                                    border: "none",
                                    borderRadius: "2px",
                                    padding: "14px",
                                    fontSize: "14.5px",
                                    fontWeight: 700,
                                    cursor: isSubmitting ? "not-allowed" : "pointer",
                                    transition: "background 150ms",
                                }}
                            >
                                {isSubmitting ? "Processing…" : "Confirm & Pay"}
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

/* ---------------- small subcomponents ---------------- */

function FormCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div
            style={{
                background: "#FFFDF8",
                border: `1px solid ${COLORS.border}`,
                borderRadius: "2px",
                padding: "26px 26px",
            }}
        >
            <h3
                style={{
                    fontFamily: FONT_SERIF,
                    fontSize: "17px",
                    fontWeight: 700,
                    color: COLORS.ink,
                    margin: "0 0 20px 0",
                }}
            >
                {title}
            </h3>
            {children}
        </div>
    );
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
    return (
        <label
            style={{
                display: "block",
                fontSize: "12.5px",
                fontWeight: 600,
                color: COLORS.ink,
                marginBottom: "8px",
            }}
        >
            {children} {required && <span style={{ color: COLORS.clayDeep }}>*</span>}
        </label>
    );
}

function FieldError({ children }: { children: React.ReactNode }) {
    return (
        <p
            style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                color: COLORS.clayDeep,
                margin: "6px 0 0",
            }}
        >
            <AlertCircle size={12} />
            {children}
        </p>
    );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <div
                style={{
                    fontFamily: FONT_MONO,
                    fontSize: "10.5px",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "#8893A6",
                    marginBottom: "3px",
                }}
            >
                {label}
            </div>
            <div style={{ fontSize: "13.5px", color: "#FFFDF8", fontWeight: 500 }}>{value}</div>
        </div>
    );
}

function selectStyle(hasError: boolean): React.CSSProperties {
    return {
        width: "100%",
        padding: "10px 12px",
        fontSize: "13.5px",
        border: `1.5px solid ${hasError ? COLORS.clayDeep : COLORS.border}`,
        borderRadius: "2px",
        background: "#FFFDF8",
        color: COLORS.ink,
        outline: "none",
        cursor: "pointer",
    };
}