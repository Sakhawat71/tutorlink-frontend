"use client";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { add30Minutes, tutorSchema } from "./zodValidate";

const SubjectManagement = () => {
    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(tutorSchema),
    });


    const { fields: availabilityFields, append: appendAvailability, remove: removeAvailability } = useFieldArray({
        control: form.control,
        name: "availability",
    });

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            // Simulate API call
        
            console.log("Submitting:", data);


            // await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="max-w-3xl mx-auto shadow-lg border border-gray-100 bg-slate-100">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-indigo-600">Manage Your Tutor Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Bio */}
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell students about yourself..."
                                            className="resize-none bg-white"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Subject */}
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject You Teach</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g., Mathematics"
                                            {...field}
                                            className="w-full bg-white"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Hourly Rate */}
                        <FormField
                            control={form.control}
                            name="hourlyRate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hourly Rate ($)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="e.g., 25"
                                            {...field}
                                            className="bg-white"
                                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Location */}
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-white">
                                                <SelectValue className="bg-white" placeholder="Select location type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Online">Online</SelectItem>
                                            <SelectItem value="In-Person">In-Person</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Availability */}
                        <div className="space-y-4">
                            <FormLabel>Availability</FormLabel>
                            {availabilityFields.map((field, index) => (
                                <div key={field.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-4 items-end">
                                    {/* Day Selection */}
                                    <FormField
                                        control={form.control}
                                        name={`availability.${index}.day`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className={cn(index !== 0 && "sr-only")}>Day</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl className="bg-white">
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select day" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                                                            <SelectItem key={day} value={day}>{day}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Start Time */}
                                    <FormField
                                        control={form.control}
                                        name={`availability.${index}.startTime`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className={cn(index !== 0 && "sr-only")}>Start Time</FormLabel>
                                                <FormControl className="bg-white">
                                                    <Input
                                                        type="time"
                                                        step="1800" // 30-minute intervals
                                                        min="08:00" // Restrict to reasonable tutoring hours
                                                        max="21:00"
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            // Auto-adjust endTime if startTime changes to be after it
                                                            const endTime = form.getValues(`availability.${index}.endTime`);
                                                            if (endTime && e.target.value >= endTime) {
                                                                const newEndTime = add30Minutes(e.target.value);
                                                                form.setValue(`availability.${index}.endTime`, newEndTime);
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* End Time */}
                                    <FormField
                                        control={form.control}
                                        name={`availability.${index}.endTime`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className={cn(index !== 0 && "sr-only")}>End Time</FormLabel>
                                                <FormControl className="bg-white">
                                                    <Input
                                                        type="time"
                                                        step="1800" // 30-minute intervals
                                                        min={add30Minutes(form.watch(`availability.${index}.startTime`) || "08:00")} // Min is 30 min after start
                                                        max="22:00" // Reasonable end limit
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Remove Button */}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="text-red-600 hover:text-red-700"
                                        onClick={() => removeAvailability(index)}
                                        disabled={availabilityFields.length === 1}
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full text-indigo-600 border-indigo-600 hover:bg-indigo-50"
                                onClick={() => {
                                    const lastSlot = availabilityFields[availabilityFields.length - 1];
                                    const nextStart = lastSlot ? add30Minutes(lastSlot.endTime) : "09:00";
                                    const nextEnd = add30Minutes(nextStart);
                                    appendAvailability({ day: "Monday", startTime: nextStart, endTime: nextEnd });
                                }}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Time Slot
                            </Button>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default SubjectManagement;