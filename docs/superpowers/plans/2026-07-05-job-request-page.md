# Job Request Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/request-a-job` page with a structured brief form that submits to Web3Forms via a Next.js Server Action, and repoint every existing "get in touch about a project" CTA at it.

**Architecture:** A shared zod schema (`lib/job-request-schema.ts`) is the single source of truth for field validation, consumed by both a client-side `react-hook-form` form and a Server Action that re-validates and forwards to Web3Forms. `WEB3FORMS_ACCESS_KEY` stays server-only. `/contact` is untouched and stays reachable via a text link.

**Tech Stack:** Next.js 16 (App Router, Server Actions), React 19, `react-hook-form` + `@hookform/resolvers/zod` + `zod` (already installed), existing shadcn/ui components (`form`, `input`, `textarea`, `select`, `button`), Tailwind v4, `lucide-react` icons.

## Global Constraints

- No new npm dependencies — `react-hook-form`, `@hookform/resolvers`, `zod`, and all needed shadcn/ui components are already in `package.json` / `components/ui`.
- `WEB3FORMS_ACCESS_KEY` must be read server-side only (`process.env.WEB3FORMS_ACCESS_KEY` inside a `"use server"` file) — never prefixed `NEXT_PUBLIC_`.
- The Service Interest field has exactly two options and **must not display any price**: "Single Listing Video" and "Listing Video + Image Staging".
- Package manager is `pnpm` (`pnpm-lock.yaml` present) — use `pnpm exec` / `pnpm dev` etc.
- `next.config.mjs` sets `typescript: { ignoreBuildErrors: true }`, so `next build` will NOT catch type errors. Use `pnpm exec tsc --noEmit` for type verification in every task.
- This repo has no automated test runner (no Jest/Vitest configured). Verification in this plan uses `tsc --noEmit` for type safety and live browser checks via the Preview dev-server tooling for behavior — matching this project's existing UI-verification convention (no new test framework is being introduced).
- `/contact` (`app/contact/page.tsx`) must remain functionally unchanged and reachable.
- There is currently no `.gitignore` in this repo — `node_modules`, `.next`, and env files are untracked by luck, not by config. This must be fixed before introducing a secret env var.

---

### Task 1: Environment safety — `.gitignore` and local env file

**Files:**
- Create: `.gitignore`
- Create: `.env.local` (must NOT be committed)

**Interfaces:**
- Produces: a `WEB3FORMS_ACCESS_KEY` environment variable available to server-side code via `process.env.WEB3FORMS_ACCESS_KEY` in later tasks.

- [ ] **Step 1: Create `.gitignore`**

```gitignore
# dependencies
/node_modules

# next.js build output
/.next/
/out/

# environment variables
.env
.env*.local

# misc
.DS_Store
```

- [ ] **Step 2: Create `.env.local` with the real access key**

```
# Get your key from https://web3forms.com — do NOT commit this file
WEB3FORMS_ACCESS_KEY=paste-your-existing-web3forms-access-key-here
```

Replace the placeholder with your actual Web3Forms access key (you confirmed you already have one).

- [ ] **Step 3: Verify `.env.local` is ignored**

Run: `git status --short`
Expected: `.gitignore` shows as untracked/new; `.env.local` does **not** appear at all (confirms the ignore rule works before any secret can be committed).

- [ ] **Step 4: Commit**

```bash
git add .gitignore
git commit -m "Add .gitignore to protect env files and build output"
```

---

### Task 2: Shared job request zod schema

**Files:**
- Create: `lib/job-request-schema.ts`

**Interfaces:**
- Produces:
  - `jobRequestSchema: z.ZodObject<...>` — validates `{ fullName, email, phone, agency, address, listingType, serviceInterest, timeline, assetLink, notes, botcheck }`, all as plain strings (select fields are validated as non-empty strings, not literal-union enums, so default values of `""` type-check cleanly in the form).
  - `type JobRequestValues` — `z.infer<typeof jobRequestSchema>`
  - `JOB_REQUEST_DEFAULT_VALUES: JobRequestValues` — all-empty-string defaults for `useForm`
  - `LISTING_TYPE_OPTIONS`, `SERVICE_INTEREST_OPTIONS`, `TIMELINE_OPTIONS` — each `{ value: string; label: string }[]`, consumed by the form (Task 4) for `<SelectItem>` rendering and by the Server Action (Task 3) for turning stored values into readable labels.

- [ ] **Step 1: Create `lib/job-request-schema.ts`**

```ts
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
```

- [ ] **Step 2: Verify it compiles**

Run: `pnpm exec tsc --noEmit`
Expected: exits with no errors related to `lib/job-request-schema.ts`.

- [ ] **Step 3: Commit**

```bash
git add lib/job-request-schema.ts
git commit -m "Add shared zod schema for job request form"
```

---

### Task 3: Server Action for Web3Forms submission

**Files:**
- Create: `app/request-a-job/actions.ts`

**Interfaces:**
- Consumes: `jobRequestSchema`, `JobRequestValues`, `LISTING_TYPE_OPTIONS`, `SERVICE_INTEREST_OPTIONS`, `TIMELINE_OPTIONS` from `@/lib/job-request-schema` (Task 2).
- Produces: `submitJobRequest(values: JobRequestValues): Promise<SubmitJobRequestResult>` where `SubmitJobRequestResult = { success: true } | { success: false; error: string }` — called directly by the client form component (Task 4).

- [ ] **Step 1: Create `app/request-a-job/actions.ts`**

```ts
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
```

- [ ] **Step 2: Verify it compiles**

Run: `pnpm exec tsc --noEmit`
Expected: no errors related to `app/request-a-job/actions.ts`.

- [ ] **Step 3: Commit**

```bash
git add app/request-a-job/actions.ts
git commit -m "Add Server Action to submit job requests to Web3Forms"
```

---

### Task 4: Job request form component

**Files:**
- Create: `components/landing/job-request-form.tsx`

**Interfaces:**
- Consumes: `jobRequestSchema`, `JOB_REQUEST_DEFAULT_VALUES`, `JobRequestValues`, `LISTING_TYPE_OPTIONS`, `SERVICE_INTEREST_OPTIONS`, `TIMELINE_OPTIONS` (Task 2); `submitJobRequest` (Task 3); shadcn `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` from `@/components/ui/form`; `Input` from `@/components/ui/input`; `Textarea` from `@/components/ui/textarea`; `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue` from `@/components/ui/select`; `Button` from `@/components/ui/button`.
- Produces: `export function JobRequestForm()` — a self-contained client component, no props, rendered by the page in Task 5.

- [ ] **Step 1: Create `components/landing/job-request-form.tsx`**

```tsx
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  JOB_REQUEST_DEFAULT_VALUES,
  jobRequestSchema,
  LISTING_TYPE_OPTIONS,
  SERVICE_INTEREST_OPTIONS,
  TIMELINE_OPTIONS,
  type JobRequestValues,
} from "@/lib/job-request-schema"
import { submitJobRequest } from "@/app/request-a-job/actions"

type SubmitStatus = "idle" | "submitting" | "success" | "error"

export function JobRequestForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const form = useForm<JobRequestValues>({
    resolver: zodResolver(jobRequestSchema),
    defaultValues: JOB_REQUEST_DEFAULT_VALUES,
  })

  async function onSubmit(values: JobRequestValues) {
    setStatus("submitting")
    setErrorMessage(null)

    const result = await submitJobRequest(values)

    if (result.success) {
      setStatus("success")
    } else {
      setStatus("error")
      setErrorMessage(result.error)
    }
  }

  if (status === "success") {
    return (
      <div className="bg-card border border-border rounded-3xl p-10 md:p-12 text-center">
        <CheckCircle2 size={40} className="text-primary mx-auto" />
        <h3 className="mt-6 text-2xl font-serif text-foreground">Request received</h3>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Thanks for reaching out — we&apos;ll respond within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-3xl p-8 md:p-12 space-y-6"
        noValidate
      >
        {status === "error" && errorMessage && (
          <div className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
            <p>
              {errorMessage} You can also email us directly at{" "}
              <a href="mailto:evince.help@gmail.com" className="font-semibold underline">
                evince.help@gmail.com
              </a>
              .
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Smith" {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="jane@agency.co.nz" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+64 21 234 5678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agency</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Ray White, Harcourts... (leave blank if independent)"
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Address / Suburb</FormLabel>
              <FormControl>
                <Input placeholder="12 Marine Parade, Mount Maunganui" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="listingType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Listing Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {LISTING_TYPE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
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
            name="serviceInterest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Interest</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SERVICE_INTEREST_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
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
            name="timeline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timeline</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TIMELINE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="assetLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Listing Photos / Floor Plan Link (optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://drive.google.com/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Anything else we should know about this listing?"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="hidden" aria-hidden="true">
          <label htmlFor="botcheck">Leave this field blank</label>
          <input
            id="botcheck"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...form.register("botcheck")}
          />
        </div>

        <Button
          type="submit"
          disabled={status === "submitting"}
          className="w-full h-auto py-4 rounded-xl text-lg font-semibold"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Sending...
            </>
          ) : (
            "Submit Job Request"
          )}
        </Button>
      </form>
    </Form>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `pnpm exec tsc --noEmit`
Expected: no errors related to `components/landing/job-request-form.tsx`. (Full runtime/behavioral verification happens in Task 5 once this is mounted on a real page.)

- [ ] **Step 3: Commit**

```bash
git add components/landing/job-request-form.tsx
git commit -m "Add job request form component"
```

---

### Task 5: Request-a-Job page + end-to-end browser verification

**Files:**
- Create: `app/request-a-job/page.tsx`
- Create: `.claude/launch.json` (repo-root-relative to the outer working directory, only if it doesn't already exist)

**Interfaces:**
- Consumes: `Header` from `@/components/landing/header`, `Footer` from `@/components/landing/footer`, `JobRequestForm` from `@/components/landing/job-request-form` (Task 4).
- Produces: the `/request-a-job` route.

- [ ] **Step 1: Create `app/request-a-job/page.tsx`**

```tsx
import { Metadata } from "next"
import Link from "next/link"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { JobRequestForm } from "@/components/landing/job-request-form"

export const metadata: Metadata = {
  title: "Request a Job | Evince",
  description:
    "Submit your listing details and request a cinematic property video from Evince.",
}

export default function RequestAJobPage() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="pt-32 pb-24 md:pt-44 md:pb-32 px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-6">
            Request a Job
          </p>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground text-balance">
            Tell Us About Your Listing
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Share the details below and we&apos;ll respond within 24 hours with next steps.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <JobRequestForm />

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Prefer to email us directly?{" "}
            <Link href="/contact" className="text-primary font-semibold hover:underline">
              Contact us here
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `pnpm exec tsc --noEmit`
Expected: no errors related to `app/request-a-job/page.tsx`.

- [ ] **Step 3: Set up the dev server preview config (skip if `.claude/launch.json` already exists)**

Create `.claude/launch.json` in the outer project root (the directory containing the `Evince` folder):

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "evince-dev",
      "runtimeExecutable": "pnpm",
      "runtimeArgs": ["-C", "Evince", "dev"],
      "port": 3000
    }
  ]
}
```

- [ ] **Step 4: Start the dev server**

Use the preview tool to start server config `evince-dev`.
Expected: server starts and reports the local URL (e.g. `http://localhost:3000`).

- [ ] **Step 5: Load the page and confirm structure**

Navigate the preview browser to `/request-a-job` (e.g. `window.location.href = "/request-a-job"` via the preview eval tool), then take an accessibility snapshot.
Expected: snapshot shows the heading "Tell Us About Your Listing" and form fields for Full Name, Email, Phone, Agency, Property Address / Suburb, Listing Type, Service Interest, Timeline, the asset link field, Additional Notes, and a "Submit Job Request" button.

- [ ] **Step 6: Confirm client-side validation blocks an empty submit**

Click the "Submit Job Request" button without filling any fields, then take a snapshot.
Expected: inline validation messages appear (e.g. "Enter your full name", "Select a listing type", "Select a service", "Select a timeline") and no network request to the Server Action's Web3Forms call occurs (page does not navigate or show a success/error state).

- [ ] **Step 7: Submit a fully valid request**

Fill in: Full Name = "Jane Smith", Email = "jane@example.com", Phone = "+64 21 234 5678", Agency = "Ray White", Property Address / Suburb = "12 Marine Parade, Mount Maunganui". Select Listing Type = "Residential", Service Interest = "Single Listing Video", Timeline = "Flexible" (click each `SelectTrigger`, then click the matching `SelectItem` text). Leave the asset link and notes blank. Click "Submit Job Request".

Expected one of two outcomes depending on whether `.env.local`'s `WEB3FORMS_ACCESS_KEY` is a real key yet:
- **If a real key is present:** the form area is replaced with the "Request received" success panel, and the submission appears in your Web3Forms dashboard/inbox with all fields correctly labeled.
- **If the key is still a placeholder:** an inline error banner appears with the "couldn't send your request right now" message and a mailto fallback link — confirming the graceful-failure path works. Check server logs (preview tool's server log output) for the `"WEB3FORMS_ACCESS_KEY is not configured"` line to confirm this is the expected cause, not a bug.

- [ ] **Step 8: Confirm the honeypot silently blocks spam**

With the dev server still running, use the preview eval tool to set the hidden `#botcheck` input's value to a non-empty string (simulating a bot filling every field) and submit the form again with otherwise-valid data.
Expected: the "Request received" success panel still appears (spam is dropped silently, not shown to the "bot"), and the server log output contains `"Job request submission blocked by honeypot"` — confirming no message was actually sent to Web3Forms for this submission.

- [ ] **Step 9: Check responsive layout**

Resize the preview viewport to mobile, tablet, and desktop presets and take a screenshot at each.
Expected: the form remains readable and usable at all three sizes (fields stack to a single column on mobile per the `md:grid-cols-*` classes).

- [ ] **Step 10: Commit**

```bash
git add app/request-a-job/page.tsx .claude/launch.json
git commit -m "Add /request-a-job page"
```

(If `.claude/launch.json` already existed before this task, only stage `app/request-a-job/page.tsx`.)

---

### Task 6: Rewire site CTAs to the new page

**Files:**
- Modify: `components/landing/header.tsx`
- Modify: `components/landing/footer.tsx`
- Modify: `components/landing/agent-plans-section.tsx`
- Modify: `components/landing/agency-partnerships-section.tsx`

**Interfaces:**
- None — this task only changes `href`/`Link` targets in existing components; no new exports.

- [ ] **Step 1: Update `components/landing/header.tsx`**

Both the desktop and mobile "Get In Touch" links currently point to `/contact`. Replace every occurrence of:

```tsx
href="/contact"
```

with:

```tsx
href="/request-a-job"
```

(There are exactly two matches in this file — the desktop nav `Link` and the mobile nav `Link` — both should change; there are no other `/contact` references in this file.)

- [ ] **Step 2: Update `components/landing/footer.tsx`**

In the CTA band, change:

```tsx
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all px-8 py-4 rounded-2xl text-lg font-semibold"
          >
            <Mail size={20} />
            Get In Touch
          </Link>
```

to:

```tsx
          <Link
            href="/request-a-job"
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all px-8 py-4 rounded-2xl text-lg font-semibold"
          >
            <Mail size={20} />
            Get In Touch
          </Link>
```

- [ ] **Step 3: Update `components/landing/agent-plans-section.tsx`**

Change:

```tsx
                <Link
                  href="/contact"
                  className="inline-block px-10 py-4 rounded-xl font-semibold transition-all bg-primary text-primary-foreground hover:opacity-90"
                >
                  Customise Your Plan
                </Link>
```

to:

```tsx
                <Link
                  href="/request-a-job"
                  className="inline-block px-10 py-4 rounded-xl font-semibold transition-all bg-primary text-primary-foreground hover:opacity-90"
                >
                  Customise Your Plan
                </Link>
```

- [ ] **Step 4: Update `components/landing/agency-partnerships-section.tsx`**

Change:

```tsx
            <Link
              href="/contact"
              className="inline-block px-12 py-5 rounded-xl font-semibold text-lg transition-all bg-secondary text-secondary-foreground hover:opacity-90"
            >
              Grow With Us
            </Link>
```

to:

```tsx
            <Link
              href="/request-a-job"
              className="inline-block px-12 py-5 rounded-xl font-semibold text-lg transition-all bg-secondary text-secondary-foreground hover:opacity-90"
            >
              Grow With Us
            </Link>
```

- [ ] **Step 5: Verify it compiles**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Verify CTAs in the browser**

With the dev server still running (from Task 5), navigate to `/`, take a snapshot, and click the header "Get In Touch" button.
Expected: the URL becomes `/request-a-job` (check via the preview eval tool, e.g. `window.location.pathname`).

Repeat for the footer "Get In Touch" CTA band on the home page.

Navigate to `/pricing`, take a snapshot, and click "Customise Your Plan" and separately "Grow With Us" (reload back to `/pricing` between checks).
Expected: both land on `/request-a-job`.

- [ ] **Step 7: Confirm `/contact` is still reachable and unchanged**

Navigate directly to `/contact` (e.g. `window.location.href = "/contact"`).
Expected: the existing static contact page (email, phone, LinkedIn cards, "Back to Home" link) renders exactly as before — unaffected by this task.

- [ ] **Step 8: Commit**

```bash
git add components/landing/header.tsx components/landing/footer.tsx components/landing/agent-plans-section.tsx components/landing/agency-partnerships-section.tsx
git commit -m "Point site CTAs at the new job request page"
```

---

## Out of Scope (per spec)

- `components/landing/pricing.tsx` and `components/landing/single-listing-section.tsx` are not imported by any page (confirmed via search — both are orphaned/dead code) and are left untouched.
- No visual/content redesign — that's sub-project 2, to be brainstormed separately.
- No dedicated thank-you page/redirect — inline success state only, per the approved spec.
