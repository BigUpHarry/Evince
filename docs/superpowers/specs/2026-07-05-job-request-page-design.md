# Job Request Page — Design Spec

**Date:** 2026-07-05
**Status:** Approved for planning
**Sub-project 1 of 2** in the broader Evince site upgrade (sub-project 2, a full visual/content redesign of Home/Pricing/Contact, will be brainstormed separately afterward).

## Purpose

Evince currently has no functional way for a prospective client to submit a project request — the `/contact` page only lists an email, phone number, and LinkedIn profiles. This adds a dedicated `/request-a-job` page with a structured form so a client can submit a full project brief in one step, and Evince receives it as a formatted email via Web3Forms (no custom backend/database required).

`/contact` is unchanged and stays live for people who just want to email or call directly.

## Architecture

- **Route:** `app/request-a-job/page.tsx` — Server Component page shell (metadata + `Header`/`Footer`, matching the pattern in `app/pricing/page.tsx`).
- **Form component:** `components/landing/job-request-form.tsx` — Client Component (`"use client"`). Uses the existing shadcn `Form` primitives (`components/ui/form.tsx`, `input.tsx`, `textarea.tsx`, `select.tsx`, `button.tsx`) with `react-hook-form` + `@hookform/resolvers/zod`, all already in `package.json` — no new dependencies.
- **Shared schema:** `lib/job-request-schema.ts` exports a single zod schema used by both the client resolver and the Server Action, so validation rules aren't duplicated/drifted.
- **Server Action:** `app/request-a-job/actions.ts` (`"use server"`) — re-validates against the shared schema, applies the honeypot check, then forwards the payload to `https://api.web3forms.com/submit`.
- **Env var:** `WEB3FORMS_ACCESS_KEY` in `.env.local` (server-only, **not** `NEXT_PUBLIC_`, so it never ships to the browser bundle). User already has an access key from an existing Web3Forms account.
- **Nav/CTA rewiring:** every existing CTA that currently points to `/contact` for a project inquiry is repointed to `/request-a-job`:
  - `components/landing/header.tsx` — "Get In Touch" (desktop + mobile)
  - `components/landing/footer.tsx` — CTA band "Get In Touch"
  - `components/landing/homepage-cta.tsx`, `single-listing-section.tsx`, `pricing.tsx`, `agent-plans-section.tsx` ("Customise Your Plan"), `agency-partnerships-section.tsx` ("Grow With Us")
  - `/contact` itself is left as-is and not linked from these CTAs anymore, but remains reachable: a small "Prefer to email us directly?" text link to `/contact` is added beneath the form on the request page, and the footer's email icon link is untouched.

## Page Content & Design

Visual language matches the existing site (uppercase eyebrow label, serif headline, `ScrollReveal`/`framer-motion` fade-ins, `rounded-3xl` cards, existing color tokens) — no new design system introduced here; that's sub-project 2's job.

- Hero: eyebrow "Request a Job", serif headline (e.g. "Tell Us About Your Listing"), short supporting line.
- Form section below, single column, max-width matching other content sections (`max-w-2xl`/`max-w-xl`).

## Form Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| Full Name | text | yes | |
| Email | email | yes | |
| Phone | text | yes | |
| Agency | text | no | Placeholder: "e.g. Ray White, Harcourts... (leave blank if independent/private seller)" |
| Property Address / Suburb | text | yes | |
| Listing Type | select | yes | Residential / Rural & Lifestyle / Hospitality & Boutique / Commercial / Other |
| Service Interest | select | yes | "Single Listing Video" / "Listing Video + Image Staging" — **no pricing shown** |
| Timeline | select | yes | ASAP / Rush / Within 1 week / Within 2–4 weeks / Flexible |
| Listing Photos / Floor Plan Link | url | no | Google Drive / Dropbox / WeTransfer link |
| Additional Notes | textarea | no | |
| `botcheck` | hidden checkbox/text | — | Honeypot — real users never see or fill it |

## Data Flow & Validation

1. `lib/job-request-schema.ts` defines the zod schema: `fullName` (min 2 chars), `email` (`.email()`), `phone` (min length, loose format check), `agency` (optional string), `address` (min 2 chars), `listingType` (enum), `serviceInterest` (enum: `single-listing` | `video-plus-staging`), `timeline` (enum), `assetLink` (optional, `.url()` or empty string), `notes` (optional, max length), `botcheck` (optional string).
2. Client: `react-hook-form` + `zodResolver` validates inline; submit button disabled while invalid/submitting.
3. On submit, the client calls the Server Action with the validated form values.
4. Server Action:
   - Re-validates with the same schema (defense in depth — protects against any direct/non-UI calls).
   - If `botcheck` is filled, returns `{ success: true }` immediately without contacting Web3Forms (silent spam drop).
   - Otherwise POSTs JSON to `https://api.web3forms.com/submit` with `access_key`, `subject: "New Job Request — Evince"`, `from_name`, and all form fields mapped to readable labels.
   - Returns `{ success: boolean, error?: string }`.
5. Client swaps the form for an inline success panel on `{ success: true }` ("Thanks — we'll respond within 24 hours", matching the Contact page's existing copy tone).

## Error Handling

- Network/API failure → `{ success: false, error: "generic message" }`; client shows a retryable inline alert above the form; entered values are preserved (form is not reset).
- Missing/misconfigured `WEB3FORMS_ACCESS_KEY` → Server Action catches and logs server-side, returns a generic error to the client; client's error state includes a `mailto:evince.help@gmail.com` fallback link.
- Client-side validation errors are field-level (shadcn `FormMessage`) and block submission before any network call.

## Verification Plan

- Submit with fully valid data → confirm the submission arrives (Web3Forms dashboard/email) with all fields correctly labeled, and the inline success state renders.
- Submit with missing required fields → inline validation errors appear per field, no network request fires.
- Temporarily use an invalid access key → confirm the graceful error state renders with the mailto fallback, and no unhandled exception/500 occurs.
- Submit with the honeypot field programmatically filled (e.g. via devtools) → confirm no email is sent but the UI still shows success (spam drop is silent).
- Check responsive layout at mobile/tablet/desktop widths.
- Click through Header, Footer, Home, and Pricing CTAs to confirm they all land on `/request-a-job`, and that `/contact` is still reachable and unchanged.

## Out of Scope (deferred to sub-project 2 — full redesign)

- Visual/content redesign of Home, Pricing, Contact.
- Any changes to displayed pricing on the `/pricing` page (noted for later: pricing is being hidden from the public site for now).
- Dedicated thank-you page / redirect flow (using inline success instead, per decision above).
