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
