"use client"

import { Button } from "@/components/ui/button"
import {
  DollarSign,
  Award,
  MessageCircle,
  Wrench,
} from "lucide-react"
import { ArrowRight } from "lucide-react"

const TRUST_ITEMS = [
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "No hidden fees. Every line item accounted for.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "Decades of documented excellence in outdoor construction.",
  },
  {
    icon: MessageCircle,
    title: "Responsive Communication",
    description: "Direct access to your project lead at every stage.",
  },
  {
    icon: Wrench,
    title: "Material Expertise",
    description: "Premium-grade materials selected for longevity and performance.",
  },
]

export function TrustSection({ onGetQuote }: { onGetQuote: () => void }) {
  return (
    <section id="trust" className="pt-14 pb-24 bg-card">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex items-center justify-center gap-5">
          <div className="h-px w-16 bg-accent" />
          <span className="text-2xl font-bold uppercase tracking-[0.25em] text-card-foreground text-center">10+ Years of Excellence</span>
          <div className="h-px w-16 bg-accent" />
        </div>
        <div className="text-center">
          <div className="mx-auto mb-6 h-px w-16 bg-accent" />
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Our Commitment
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold text-card-foreground sm:text-5xl text-balance">
            No hidden costs. No surprise delays.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed">
            {"Selecting a contractor is a significant decision. Here is why discerning homeowners entrust us with their projects."}
          </p>
        </div>

        <div className="mt-16 grid gap-3 sm:grid-cols-2">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 bg-secondary rounded-xl border border-border px-5 py-4"
            >
              <item.icon className="h-7 w-7 shrink-0 text-accent mt-0.5" strokeWidth={1.5} />
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold text-card-foreground uppercase tracking-wider">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            onClick={onGetQuote}
            variant="outline"
            className="border-2 border-primary bg-transparent text-card-foreground hover:bg-primary/5 rounded-lg text-sm uppercase tracking-widest px-8 py-6 gap-2"
          >
            Request a Consultation
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
