"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Footer({ onGetQuote }: { onGetQuote: () => void }) {
  return (
    <footer className="bg-primary py-24">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <div className="mx-auto mb-8 h-px w-16 bg-accent" />
        <h2 className="font-serif text-2xl font-black text-primary-foreground sm:text-3xl text-balance">
          Ready to Elevate Your Outdoor Living?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground leading-relaxed">
          Schedule a complimentary consultation to discuss how we can bring
          your vision to life with precision and care.
        </p>
        <Button
          onClick={onGetQuote}
          variant="outline"
          className="mt-10 bg-transparent border-2 border-accent text-accent hover:bg-accent/10 rounded-lg text-sm uppercase tracking-widest px-10 py-7 gap-2"
        >
          Begin Your Consultation
          <ArrowRight className="h-5 w-5" />
        </Button>
        <div className="mt-16 border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/30 uppercase tracking-wider">
            {`\u00A9 ${new Date().getFullYear()} Deco Abrusci International`}
          </p>
          <p className="text-xs text-primary-foreground/30 uppercase tracking-wider">
            All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
