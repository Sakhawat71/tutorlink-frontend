
export interface ITutor {
    id: string;
    name: string;
    email: string;
    profileImage: string;
    bio: string;
    subjectList: string[];
    hourlyRate: number;
    location: "ONLINE" | "ONSITE";
    availability: IAvailability[];
    experience?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IAvailability {
    day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    startTime: string; // e.g., "10:00"
    endTime: string;   // e.g., "12:00"
}