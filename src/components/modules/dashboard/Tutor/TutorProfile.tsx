"use client"
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Globe, MapPin } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const tutorSchema = z.object({
  profileImage: z.instanceof(File),
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

type FormData = z.infer<typeof tutorSchema>;

const CreateTutorProfile = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<FormData>(
    {
      resolver: zodResolver(tutorSchema),
      defaultValues: {
        bio: "",
        subjectList: [""],
        hourlyRate: "",
        location: "Online",
        experience: "",
        availability: [
          {
            day: "Monday",
            startTime: "09:00",
            endTime: "10:00",
          },
        ],
      },
    }
  );

  const {
    fields: subjectFields,
    append: appendSubject,
    remove: removeSubject,
  } = useFieldArray({
    control: form.control,
    name: "subjectList",
  });

  const {
    fields: availabilityFields,
    append: appendAvailability,
    remove: removeAvailability,
  } = useFieldArray({
    control: form.control,
    name: "availability",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      form.setValue("profileImage", file);
    }
  };

  const onSubmit = (data: FormData) => {

    const numericData = {
      ...data,
      hourlyRate: Number(data.hourlyRate),
      experience: data.experience ? Number(data.experience) : undefined,
    };

    // console.log('clicked');
    console.log("Submitted Data:", numericData);
  };

  return (
    <Card className="max-w-4xl mx-auto p-6 shadow-xl">
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold text-indigo-700">
          Create Tutor Profile
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <div className="flex items-center justify-center mb-4">
              <FormItem className="flex flex-col items-center">
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-2 w-24 h-24 rounded-full object-cover"
                  />
                )}
                <FormLabel>Profile Image</FormLabel>
                <Input
                  className="bg-white border-black"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </FormItem>
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-white border-black"
                      placeholder="Tell us about your experience..."
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="hourlyRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hourly Rate ($)</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white border-black"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience (in years)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 3"
                        {...field}
                        className="bg-white border-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Subjects Offered
                  </FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendSubject("")}
                    className="gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    Add Subject
                  </Button>
                </div>

                <div className="space-y-2">
                  {subjectFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                    >
                      <FormField
                        control={form.control}
                        name={`subjectList.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder="e.g. Advanced Calculus"
                                {...field}
                                className="bg-white border-black"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSubject(index)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="sr-only">Remove subject</span>
                      </Button>
                    </div>
                  ))}
                </div>

                {subjectFields.length === 0 && (
                  <div className="text-center py-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">No subjects added yet</p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Teaching Format
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select teaching format" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem
                            value="Online"
                            className="hover:bg-gray-100"
                          >
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4 text-blue-500" />
                              Online Sessions
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="In-Person"
                            className="hover:bg-gray-100"
                          >
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-green-500" />
                              In-Person Meetings
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel className="text-sm font-medium text-gray-700">
                  Weekly Availability
                </FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    appendAvailability({
                      day: "Monday",
                      startTime: "09:00",
                      endTime: "17:00",
                    })
                  }
                  className="gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Add Time Slot
                </Button>
              </div>

              <div className="space-y-3">
                {availabilityFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-12 gap-3 items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="col-span-4">
                      <FormField
                        control={form.control}
                        name={`availability.${index}.day`}
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select day" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {daysOfWeek.map((day) => (
                                  <SelectItem
                                    key={day}
                                    value={day}
                                    className="hover:bg-gray-100"
                                  >
                                    {day}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-3">
                      <FormField
                        control={form.control}
                        name={`availability.${index}.startTime`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type="time"
                                  {...field}
                                  className="pr-0"
                                />
                                <span className="absolute right-3 top-2.5 text-gray-400 text-sm">
                                  Start
                                </span>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-3">
                      <FormField
                        control={form.control}
                        name={`availability.${index}.endTime`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type="time"
                                  {...field}
                                  className="pr-0"
                                />
                                <span className="absolute right-3 top-2.5 text-gray-400 text-sm">
                                  End
                                </span>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-2 flex justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAvailability(index)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="sr-only">Remove slot</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {availabilityFields.length === 0 && (
                <div className="text-center py-6 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">
                    No availability slots added yet
                  </p>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 text-white hover:bg-indigo-400"
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateTutorProfile;