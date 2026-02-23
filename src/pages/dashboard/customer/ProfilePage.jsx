"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Upload, X } from "lucide-react";

/* =========================
   ZOD SCHEMA
========================= */
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),

  address: z.string().min(5, "Address must be at least 5 characters"),
  googleMapLink: z
    .string()
    .url("Enter a valid Google Map URL")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  alternatePhone: z.string().optional().or(z.literal("")),
  preferredService: z.string().min(2, "Please specify a preferred service"),
  preferredTimeSlot: z.string().min(2, "Please specify a time slot"),
  specialInstructions: z.string().optional().or(z.literal("")),
  dob: z
    .string()
    .min(1, "Date of birth is required")
    .refine((date) => {
      const today = new Date();
      const selectedDate = new Date(date);

      // Must not be today or future
      if (selectedDate >= today) return false;

      // Check 18+ age
      const age = today.getFullYear() - selectedDate.getFullYear();
      const monthDiff = today.getMonth() - selectedDate.getMonth();
      const dayDiff = today.getDate() - selectedDate.getDate();

      if (
        age < 18 ||
        (age === 18 && monthDiff < 0) ||
        (age === 18 && monthDiff === 0 && dayDiff < 0)
      ) {
        return false;
      }

      return true;
    }, "You must be at least 18 years old and cannot select today or future date"),
  // We'll handle image separately
});

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // This acts as our "Database" or persistent state
  const [savedData, setSavedData] = useState({
    name: "John Doe",
    email: "john@example.com",
    dob: "1998-01-01",
    address: "Delhi, India",
    googleMapLink: "https://maps.google.com",
    phone: "9876543210",
    alternatePhone: "",
    preferredService: "Home Cleaning",
    preferredTimeSlot: "Morning (9 AM - 12 PM)",
    specialInstructions: "Please call before arriving.",
  });

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: savedData,
    mode: "onChange", // Validate on change for better UX
  });

  // Reset form when savedData changes
  useEffect(() => {
    form.reset(savedData);
  }, [savedData, form]);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (saveSuccess) {
      const timer = setTimeout(() => setSaveSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [saveSuccess]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image file (JPEG, PNG, GIF, or WebP)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("File size must be less than 5MB");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    // Reset file input
    const fileInput = document.getElementById("image-upload");
    if (fileInput) fileInput.value = "";
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Saving Customer Data:", {
        ...data,
        image: imageFile
          ? {
              name: imageFile.name,
              type: imageFile.type,
              size: imageFile.size,
              preview: imagePreview, // In real app, you'd upload to server and store URL
            }
          : null,
      });

      // Update saved data
      setSavedData(data);

      // Here you would typically upload the image to your server
      // and update the user's profile with the new image URL

      setSaveSuccess(true);
      setIsEditing(false);

      // Clear image preview after successful save
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    form.reset(savedData);
    setImageFile(null);
    setImagePreview(null);
    setIsEditing(false);
  };

  // Get the first letter of name for avatar fallback
  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4 md:p-6">
      <Card className="w-full max-w-3xl shadow-xl rounded-2xl">
        <CardHeader className="border-b bg-card">
          <CardTitle className="text-2xl font-semibold">
            Customer Profile
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Success Alert */}
          {saveSuccess && (
            <Alert className="bg-green-50 border-green-200 text-green-800">
              <AlertDescription>Profile updated successfully!</AlertDescription>
            </Alert>
          )}

          {/* Avatar & Header Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg bg-muted/30">
            <div className="relative">
              <Avatar className="h-24 w-24 border-2 border-primary/10 shadow-sm">
                {imagePreview ? (
                  <AvatarImage src={imagePreview} alt="Profile preview" />
                ) : (
                  <AvatarImage src="" />
                )}
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  {getInitials(savedData.name)}
                </AvatarFallback>
              </Avatar>

              {/* Edit overlay for image */}
              {isEditing && (
                <div className="absolute -bottom-2 -right-2 flex gap-1">
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer bg-primary text-primary-foreground rounded-full p-1.5 hover:bg-primary/90 transition-colors shadow-md"
                    title="Upload image"
                  >
                    <Upload size={16} />
                  </label>
                  {(imagePreview || imageFile) && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="bg-destructive text-destructive-foreground rounded-full p-1.5 hover:bg-destructive/90 transition-colors shadow-md"
                      title="Remove image"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Hidden file input */}
            <input
              id="image-upload"
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleImageChange}
              className="hidden"
              disabled={!isEditing}
            />

            {!isEditing && (
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-foreground">
                  {savedData.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {savedData.email}
                </p>
                <div className="mt-2 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Frequent Service: {savedData.preferredService}
                </div>
                {savedData.phone && (
                  <p className="text-sm text-muted-foreground mt-1">
                    📞 {savedData.phone}
                  </p>
                )}
              </div>
            )}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* --- PERSONAL DETAILS SECTION --- */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-primary border-l-4 border-primary pl-2">
                  Personal Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!isEditing}
                            className={
                              !isEditing ? "bg-muted/50" : "bg-background"
                            }
                            placeholder="Enter your full name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            disabled={!isEditing}
                            className={
                              !isEditing ? "bg-muted/50" : "bg-background"
                            }
                            placeholder="your@email.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!isEditing}
                            className={
                              !isEditing ? "bg-muted/50" : "bg-background"
                            }
                            placeholder="9876543210"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="alternatePhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alternate Phone</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!isEditing}
                            className={
                              !isEditing ? "bg-muted/50" : "bg-background"
                            }
                            placeholder="Optional"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => {
                      const today = new Date();
                      const maxDate = new Date(
                        today.getFullYear() - 18,
                        today.getMonth(),
                        today.getDate(),
                      )
                        .toISOString()
                        .split("T")[0];

                      return (
                        <FormItem>
                          <FormLabel>Date of Birth *</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              max={maxDate} // Prevent selecting under 18 or future
                              disabled={!isEditing}
                              className={
                                !isEditing ? "bg-muted/50" : "bg-background"
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="googleMapLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Google Map Location URL</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!isEditing}
                            className={
                              !isEditing ? "bg-muted/50" : "bg-background"
                            }
                            placeholder="https://maps.google.com/..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Residential Address *</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={!isEditing}
                          className={`min-h-[80px] ${!isEditing ? "bg-muted/50" : "bg-background"}`}
                          placeholder="Enter your full street address"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* --- SERVICE BOOKING PREFERENCES SECTION --- */}
              <div className="space-y-4 pt-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-primary border-l-4 border-primary pl-2">
                  Service Preferences
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="preferredService"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Service *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Home Cleaning"
                            {...field}
                            disabled={!isEditing}
                            className={
                              !isEditing ? "bg-muted/50" : "bg-background"
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredTimeSlot"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Time Slot *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 9 AM - 12 PM"
                            {...field}
                            disabled={!isEditing}
                            className={
                              !isEditing ? "bg-muted/50" : "bg-background"
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="specialInstructions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Permanent Special Instructions</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any specific instructions for service providers..."
                          {...field}
                          disabled={!isEditing}
                          className={
                            !isEditing ? "bg-muted/50" : "bg-background"
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Form validation summary */}
              {isEditing && Object.keys(form.formState.errors).length > 0 && (
                <Alert variant="destructive" className="mt-4">
                  <AlertDescription>
                    Please fix the errors above before saving.
                  </AlertDescription>
                </Alert>
              )}

              {/* --- ACTION BUTTONS --- */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                {!isEditing ? (
                  <div
                    onClick={handleEditClick}
                    className="w-full sm:w-1/2 bg-gray-950 text-white text-center py-2 cursor-pointer rounded-lg"
                    size="lg"
                  >
                    Update Profile
                  </div>
                ) : (
                  <>
                    <Button
                      type="submit"
                      className="w-full sm:w-1/2 bg-green-600 hover:bg-green-700"
                      size="lg"
                      disabled={
                        isLoading ||
                        Object.keys(form.formState.errors).length > 0
                      }
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      className="w-full sm:w-1/2"
                      size="lg"
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
