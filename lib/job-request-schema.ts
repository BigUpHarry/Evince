import { z } from "zod"

export const LISTING_TYPE_OPTIONS = [
  { value: "residential", label: "Residential" },
  { value: "rural-lifestyle", label: "Rural & Lifestyle" },
  { value: "hospitality-boutique", label: "Hospitality & Boutique" },
  { value: "commercial", label: "Commercial" },
  { value: "other", label: "Other" },
]

export const SERVICE_INTEREST_OPTIONS = [
  { value: "single-listing", label: "Single Listing Video" },
  { value: "video-plus-staging", label: "Listing Video + Image Staging" },
]

export const TIMELINE_OPTIONS = [
  { value: "asap", label: "ASAP / Rush" },
  { value: "one-week", label: "Within 1 week" },
  { value: "two-to-four-weeks", label: "Within 2–4 weeks" },
  { value: "flexible", label: "Flexible" },
]

const URL_PATTERN = /^https?:\/\/.+/i

export const jobRequestSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  agency: z.string().trim(),
  address: z.string().trim().min(2, "Enter the property address or suburb"),
  listingType: z.string().min(1, "Select a listing type"),
  serviceInterest: z.string().min(1, "Select a service"),
  timeline: z.string().min(1, "Select a timeline"),
  assetLink: z
    .string()
    .trim()
    .refine((val) => val === "" || URL_PATTERN.test(val), {
      message: "Enter a valid link starting with http:// or https://",
    }),
  notes: z.string().trim().max(2000, "Keep notes under 2000 characters"),
  botcheck: z.string(),
})

export type JobRequestValues = z.infer<typeof jobRequestSchema>

export const JOB_REQUEST_DEFAULT_VALUES: JobRequestValues = {
  fullName: "",
  email: "",
  phone: "",
  agency: "",
  address: "",
  listingType: "",
  serviceInterest: "",
  timeline: "",
  assetLink: "",
  notes: "",
  botcheck: "",
}
