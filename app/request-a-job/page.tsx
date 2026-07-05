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
