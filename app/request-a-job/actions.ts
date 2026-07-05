"use server"

import {
  jobRequestSchema,
  LISTING_TYPE_OPTIONS,
  SERVICE_INTEREST_OPTIONS,
  TIMELINE_OPTIONS,
  type JobRequestValues,
} from "@/lib/job-request-schema"

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit"
const GENERIC_ERROR =
  "We couldn't send your request right now. Please email us directly instead."

function labelFor(options: { value: string; label: string }[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value
}

export type SubmitJobRequestResult =
  | { success: true }
  | { success: false; error: string }

export async function submitJobRequest(
  values: JobRequestValues,
): Promise<SubmitJobRequestResult> {
  const parsed = jobRequestSchema.safeParse(values)

  if (!parsed.success) {
    return {
      success: false,
      error: "Some details are missing or invalid. Please check the form and try again.",
    }
  }

  const data = parsed.data

  if (data.botcheck) {
    console.log("Job request submission blocked by honeypot")
    return { success: true }
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY

  if (!accessKey) {
    console.error("WEB3FORMS_ACCESS_KEY is not configured")
    return { success: false, error: GENERIC_ERROR }
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: "New Job Request — Evince",
        from_name: data.fullName,
        "Full Name": data.fullName,
        Email: data.email,
        Phone: data.phone,
        Agency: data.agency || "Independent / not specified",
        "Property Address": data.address,
        "Listing Type": labelFor(LISTING_TYPE_OPTIONS, data.listingType),
        "Service Interest": labelFor(SERVICE_INTEREST_OPTIONS, data.serviceInterest),
        Timeline: labelFor(TIMELINE_OPTIONS, data.timeline),
        "Listing Photos / Floor Plan Link": data.assetLink || "Not provided",
        "Additional Notes": data.notes || "None",
      }),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      console.error("Web3Forms submission failed", result)
      return { success: false, error: GENERIC_ERROR }
    }

    return { success: true }
  } catch (error) {
    console.error("Web3Forms submission error", error)
    return { success: false, error: GENERIC_ERROR }
  }
}
