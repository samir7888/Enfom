"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


import { BusinessRegistrationFormValues, businessRegistrationSchema } from "./business-registration-form-schema";
import { useForm } from "react-hook-form";
import { COUNTRIES } from "@/CONSTANTS";
import { useRouter } from "next/navigation";

const BUSINESS_TYPES = [
  { value: "retail", label: "Retail" },
  { value: "restaurant", label: "Restaurant & Food Service" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "saas", label: "SaaS / Software" },
  { value: "consulting", label: "Consulting" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "healthcare", label: "Healthcare" },
  { value: "real-estate", label: "Real Estate" },
  { value: "education", label: "Education" },
  { value: "finance", label: "Financial Services" },
  { value: "other", label: "Other" },
];



const BUSINESS_SIZES = [
  {
    value: "1-10" as const,
    label: "1-10 employees",
    description: "Small business / Startup",
    price: "Free",
  },
  {
    value: "11-50" as const,
    label: "11-50 employees",
    description: "Growing business",
    price: "$299/mo",
  },
  {
    value: "51+" as const,
    label: "51+ employees",
    description: "Enterprise business",
    price: "$699/mo",
  },
];


export function BusinessRegistrationForm() {
  const router = useRouter();
  const form = useForm<BusinessRegistrationFormValues>({
    resolver: zodResolver(businessRegistrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      businessName: "",
      businessType: "",
      industry: "",
      yearEstablished: "",
      website: "",
      description: "",
      streetAddress: "",
      aptSuite: "",
      country: "",
      city: "",
      region: "",
      postalCode: "",
      businessSize: "1-10",
      services: [],
    },
    mode: "onTouched",
  });


  function onSubmit(data: BusinessRegistrationFormValues) {
    console.log("Form submitted:", data);
    router.push("/business-registration/waiting");
  }

  return (

    <div className="flex-1 min-h-screen bg-white">
      {/* Left Panel - Form */}
      <div className=" px-12 py-12 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span>›</span>
          <span>Business Registration</span>
        </nav>

        <h1 className="text-2xl font-semibold text-gray-900 mb-10">
          Business Information
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            {/* ── Owner Information ── */}
            <section className="pb-8 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Owner Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        First name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Last name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
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
                      <FormLabel>
                        Email <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@example.com"
                          {...field}
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
                      <FormLabel>
                        Phone number <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            {/* ── Business Details ── */}
            <section className="pb-8 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Business Details
              </h2>

              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Business name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your business name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Type of business <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {BUSINESS_TYPES.map((t) => (
                            <SelectItem key={t.value} value={t.value}>
                              {t.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Industry <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Technology, Fashion"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="yearEstablished"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year established</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder={String(new Date().getFullYear())}
                            min={1900}
                            max={new Date().getFullYear()}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://yourbusiness.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your business..."
                          className="min-h-[100px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            {/* ── Business Address ── */}
            <section className="pb-8 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Business Address
              </h2>

              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="streetAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Street address <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your street address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="aptSuite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apartment/Suite</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Apt, suite, building (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Country <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select your country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {COUNTRIES.map((c) => (
                              <SelectItem key={c.value} value={c.value}>
                                {c.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          City <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Region <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="State/Province" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Postal code <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your postal code"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </section>

            {/* ── Business Size & Service Plan ── */}
            <section className="pb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Business Size & Service Plan
              </h2>

              <div className="space-y-6">
                {/* Business Size Radio */}
                <FormField
                  control={form.control}
                  name="businessSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of employees</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col gap-3"
                        >
                          {BUSINESS_SIZES.map((size) => (
                            <label
                              key={size.value}
                              htmlFor={`size-${size.value}`}
                              className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${field.value === size.value
                                ? "border-slate-800 bg-slate-50"
                                : "border-gray-200"
                                }`}
                            >
                              <div className="flex items-center gap-3">
                                <RadioGroupItem
                                  value={size.value}
                                  id={`size-${size.value}`}
                                />
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {size.label}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {size.description}
                                  </p>
                                </div>
                              </div>
                              <span className="font-semibold text-gray-900">
                                {size.price}
                              </span>
                            </label>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


              </div>
            </section>

            {/* Submit */}
            <div className="flex justify-between  space-y-4">


              <Link
                href="/"
                className="flex items-center gap-2 text-gray-800 hover:text-slate-600 text-sm font-medium transition-colors"
              >
                <ArrowLeft size={16} />
                Return to home
              </Link>

              <Button
                type="submit"
                className=" h-12 text-base font-semibold bg-slate-800 hover:bg-slate-900"
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>


    </div>
  );
}