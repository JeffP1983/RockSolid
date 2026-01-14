import { z } from "zod";

// Phone number validation (US format)
const phoneRegex = /^(\+1|1)?[-.\s]?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

// Step 1: Address Schema
export const addressSchema = z.object({
  address: z.string().min(5, "Please enter a valid street address"),
  city: z.string().min(2, "Please enter a city"),
  state: z.string().length(2, "Please enter a valid state code (e.g., TX)"),
  zipCode: z.string().regex(/^\d{5}$/, "Please enter a valid 5-digit ZIP code"),
});

// Step 2: Property Details Schema
export const propertyDetailsSchema = z.object({
  propertyType: z.enum([
    "single-family",
    "multi-family",
    "condo",
    "townhouse",
    "mobile-home",
    "land",
    "commercial",
    "other",
  ]),
  yearBuilt: z.number().min(1800).max(new Date().getFullYear()).optional(),
  squareFeet: z.number().min(100).max(50000).optional(),
  bedrooms: z.number().min(0).max(20).optional(),
  bathrooms: z.number().min(0).max(20).optional(),
  condition: z.enum([
    "excellent",
    "good",
    "fair",
    "poor",
    "needs-major-repairs",
  ]),
});

// Step 3: Additional Details Schema
export const additionalDetailsSchema = z.object({
  hasRepairs: z.boolean(),
  repairDescription: z.string().optional(),
  owesOnProperty: z.boolean(),
  mortgageBalance: z.number().min(0).optional(),
  timeline: z.enum(["asap", "1-month", "3-months", "6-months", "flexible"]),
});

// Step 4: Contact Information Schema
export const contactInfoSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(phoneRegex, "Please enter a valid phone number"),
});

// Step 5: Consent Schema
export const consentSchema = z.object({
  smsConsent: z.boolean().refine((val) => val === true, {
    message: "You must consent to receive text messages to continue",
  }),
  emailConsent: z.boolean().refine((val) => val === true, {
    message: "You must consent to receive emails to continue",
  }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the Terms & Conditions",
  }),
  privacyAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the Privacy Policy",
  }),
});

// Complete form schema
export const propertyFormSchema = addressSchema
  .merge(propertyDetailsSchema)
  .merge(additionalDetailsSchema)
  .merge(contactInfoSchema)
  .merge(consentSchema);

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;
