import * as z from "zod";

const currentYear = new Date().getFullYear();

export const businessRegistrationSchema = z.object({
  // Owner Information
  ownerName: z
    .string()
    .min(2, "Owner name must be at least 2 characters")
    .max(50, "Owner name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .regex(/^[+\d\s\-().]+$/, "Please enter a valid phone number"),

  // Business Details
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name must be less than 100 characters"),
  businessType: z.string().min(1, "Please select a business type"),
  industry: z
    .string()
    .min(2, "Industry must be at least 2 characters")
    .max(100, "Industry must be less than 100 characters"),
  yearEstablished: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        (Number(val) >= 1900 && Number(val) <= currentYear),
      `Year must be between 1900 and ${currentYear}`
    ),
  website: z
    .string()
    .optional()
    .refine(
      (val) => !val || z.string().url().safeParse(val).success,
      "Please enter a valid URL (e.g. https://example.com)"
    ),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),

  // Business Address
  streetAddress: z
    .string()
    .min(5, "Please enter a valid street address"),
  aptSuite: z.string().optional(),
  country: z.string().min(1, "Please select a country"),
  city: z.string().min(2, "Please enter a city"),
  region: z.string().min(2, "Please enter a state/province"),
  postalCode: z
    .string()
    .min(3, "Please enter a valid postal code")
    .max(10, "Postal code is too long"),

  // Business Size & Plan
  businessSize: z.string(),
  services: z.array(z.enum(["analytics", "support", "training"])),
});

export type BusinessRegistrationFormValues = z.infer<typeof businessRegistrationSchema>;

// Pricing config
export const PLAN_PRICES: Record<string, number> = {
  "1-10": 0,
  "11-50": 299,
  "51+": 699,
};

export const SERVICE_PRICES: Record<string, number> = {
  analytics: 99,
  support: 149,
  training: 199,
};
