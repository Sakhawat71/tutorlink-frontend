export interface IAvailability {
    day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    startTime: string; // e.g., "10:00"
    endTime: string;   // e.g., "12:00"
}

export interface ISubject {
    tutor: string;
    description: string;
    subject: string;
    hourlyRate: number;
    location: "Online" | "In-Person";
    availability: IAvailability[];
};