"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Step = {
  title: string
  type: "select" | "text"
  options?: { label: string }[]
  placeholder?: string
  field?: string
}

const CONTACT_STEPS: Step[] = [
  { title: "Your name", type: "text", placeholder: "Full name", field: "name" },
  { title: "Your email address", type: "text", placeholder: "email@example.com", field: "email" },
  { title: "Best number to reach you", type: "text", placeholder: "(555) 123-4567", field: "phone" },
]

const STEPS: Step[] = [
  {
    title: "What type of project do you have in mind?",
    type: "select",
    options: [
      { label: "Pergola" },
      { label: "Fencing" },
      { label: "Concrete Patio (Driveway / Slab)" },
    ],
  },
  {
    title: "What is your approximate budget?",
    type: "select",
    options: [
      { label: "$6,000 - $9,000" },
      { label: "$10,000 - $15,000" },
      { label: "$25,000+ (Custom)" },
    ],
  },
  {
    title: "Where will the structure be positioned?",
    type: "select",
    options: [
      { label: "Attached to residence" },
      { label: "Free-standing" },
    ],
  },
  ...CONTACT_STEPS,
]

export function QuoteForm({ id }: { id?: string }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [slideDirection, setSlideDirection] = useState<"up" | "down">("up")
  const sectionRef = useRef<HTMLElement>(null)

  const totalSteps = STEPS.length
  const step = STEPS[currentStep]
  const progress = ((currentStep + 1) / totalSteps) * 100

  const advanceStep = (direction: "up" | "down", nextStep: number) => {
    setSlideDirection(direction)
    setAnimating(true)
    setTimeout(() => {
      setCurrentStep(nextStep)
      setAnimating(false)
    }, 300)
  }

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentStep]: value }))
    if (currentStep < totalSteps - 1) {
      setTimeout(() => {
        advanceStep("up", currentStep + 1)
        setTimeout(() => {
          sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
        }, 350)
      }, 500)
    }
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) advanceStep("up", currentStep + 1)
  }

  const handlePrev = () => {
    if (currentStep > 0) advanceStep("down", currentStep - 1)
  }

  const buildPayload = useCallback(() => ({
    project_type: "Patio Cover",
    structure_type: answers[0] || "",
    budget: answers[1] || "",
    location: answers[2] || "",
    name: answers[3] || "",
    email: answers[4] || "",
    phone: answers[5] || "",
  }), [answers])

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      await fetch("/api/submit-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      })
    } catch {
      // Still show thank you even if webhook fails
    } finally {
      setSubmitting(false)
      setSubmitted(true)
      if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
        ;(window as any).fbq("track", "Lead", { content_name: "Patio Cover" })
      }
    }
  }

  const canProceed = answers[currentStep] !== undefined && answers[currentStep] !== ""

  if (submitted) {
    return (
      <section id={id} className="pt-8 pb-16 bg-primary">
        <div className="mx-auto max-w-lg px-6 text-center">
          <div className="border border-primary-foreground/15 bg-primary rounded-xl p-10">
            <div className="mx-auto mb-6 h-px w-16 bg-accent" />
            <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center border border-accent rounded-full">
              <Check className="h-6 w-6 text-accent" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-primary-foreground">Thank You</h2>
            <p className="mt-4 text-primary-foreground/70 leading-relaxed">
              {"We have received your inquiry. A member of our team will be in contact shortly to discuss your project in detail."}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id={id} className="pt-8 pb-16 bg-primary">
      <div className="mx-auto max-w-lg px-6">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-px w-12 bg-accent" />
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">
            Begin Your Consultation
          </p>
          <h2 className="mt-3 font-serif text-4xl font-bold text-primary-foreground sm:text-5xl text-balance">
            Tell Us About Your Project
          </h2>
        </div>

        <div className="border-2 border-[#D09945] bg-card rounded-xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
          <div className="mb-6">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-2 uppercase tracking-wider">
              <span>Step {currentStep + 1} of {totalSteps}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-px w-full bg-border">
              <div
                className="h-px bg-accent transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              className={cn(
                "transition-all duration-300 ease-out",
                animating
                  ? slideDirection === "up"
                    ? "opacity-0 -translate-y-4"
                    : "opacity-0 translate-y-4"
                  : "opacity-100 translate-y-0"
              )}
            >
              <h3 className="mb-6 text-sm font-medium text-card-foreground tracking-wide">
                {step.title}
              </h3>

              {step.type === "select" && (
                <div className="flex flex-col gap-2">
                  {step.options?.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => handleSelect(option.label)}
                      className={cn(
                        "flex items-center gap-3 border rounded-lg px-3 py-2.5 text-left text-sm transition-all",
                        answers[currentStep] === option.label
                          ? "border-accent bg-accent/5 text-card-foreground"
                          : "border-border bg-card text-muted-foreground hover:border-accent/40 hover:text-card-foreground"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-3.5 w-3.5 shrink-0 items-center justify-center border rounded transition-all",
                          answers[currentStep] === option.label
                            ? "border-accent bg-accent"
                            : "border-muted-foreground/30"
                        )}
                      >
                        {answers[currentStep] === option.label && (
                          <Check className="h-2 w-2 text-accent-foreground" />
                        )}
                      </div>
                      <span className="tracking-wide">{option.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {step.type === "text" && (
                <Input
                  type={step.field === "email" ? "email" : step.field === "phone" ? "tel" : "text"}
                  placeholder={step.placeholder}
                  value={answers[currentStep] || ""}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, [currentStep]: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.nativeEvent.isComposing && canProceed) {
                      currentStep < totalSteps - 1 ? handleNext() : handleSubmit()
                    }
                  }}
                  className="h-10 text-sm border border-border bg-card rounded-lg focus:border-accent focus:ring-accent tracking-wide"
                />
              )}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
              size="sm"
              className="gap-1.5 rounded-lg border-border text-muted-foreground hover:border-accent hover:text-card-foreground text-[11px] uppercase tracking-widest"
            >
              <ChevronLeft className="h-3 w-3" />
              Previous
            </Button>
            {currentStep < totalSteps - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                size="sm"
                className="gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-[11px] uppercase tracking-widest px-5"
              >
                Next
                <ChevronRight className="h-3 w-3" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed || submitting}
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-[11px] uppercase tracking-widest px-6"
              >
                {submitting ? "Submitting..." : "Submit Inquiry"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
