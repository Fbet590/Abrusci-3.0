"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQS = [
  {
    question: "What is the typical project timeline?",
    answer:
      "Most patio cover installations are completed within one to two weeks, ensuring minimal disruption to your schedule. We provide a detailed timeline during your initial consultation.",
  },
  {
    question: "Are financing options available?",
    answer:
      "Yes. We offer flexible financing arrangements to accommodate your investment preferences and make your project more accessible.",
  },
  {
    question: "Is a permit required for installation?",
    answer:
      "Permit requirements vary by project scope and jurisdiction. Where necessary, our team manages the entire permitting process on your behalf at no additional charge.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="py-24 bg-secondary">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 h-px w-16 bg-accent" />
          <p className="text-lg font-black uppercase tracking-[0.3em] text-accent">
            Common Inquiries
          </p>
          <h2 className="mt-4 font-serif text-5xl font-black text-secondary-foreground sm:text-6xl">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="divide-y divide-border">
          {FAQS.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-0"
            >
              <AccordionTrigger className="text-left text-base font-medium text-secondary-foreground hover:text-accent py-3.5 tracking-wide [&[data-state=open]]:text-accent">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-3.5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
