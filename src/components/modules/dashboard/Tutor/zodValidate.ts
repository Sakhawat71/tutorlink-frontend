import { z } from "zod";

// export const tutorSchema = z.object({
//     description: z.string().min(10).max(500),
//     subject: z.string().min(1, "Subject cannot be empty"),
//     hourlyRate: z.number().min(5).max(100),
//     location: z.enum(["Online", "In-Person"]),
//     availability: z.array(
//         z.object({
//             day: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]),
//             startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
//             endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
//         }).refine(
//             (data) => data.startTime < data.endTime,
//             { message: "End time must be after start time", path: ["endTime"] }
//         )
//     ).min(1, "At least one availability slot is required"),
// });

export const add30Minutes = (time : any) => {
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + 30;
    const newHours = Math.floor(totalMinutes / 60).toString().padStart(2, "0");
    const newMinutes = (totalMinutes % 60).toString().padStart(2, "0");
    return `${newHours}:${newMinutes}`;
};



export const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
] as const;

export const tutorSchema = z.object({
    profileImage: z.string().url("Invalid URL"),
    bio: z.string().min(10),
    subjectList: z.array(z.string().min(1)),
    hourlyRate: z.string().min(1).regex(/^\d+$/, "Must be a number"),
    experience: z.string().min(0).regex(/^\d*$/, "Must be a number"),
    location: z.enum(["Online", "In-Person"]),
    availability: z
        .array(
            z.object({
                day: z.enum(daysOfWeek),
                startTime: z.string(),
                endTime: z.string(),
            })
        )
        .min(1),
});