"use client"

import { useCallback } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { QuoteForm } from "@/components/quote-form"
import { TrustSection } from "@/components/trust-section"
import { ServicesSection } from "@/components/services-section"
import { GallerySection } from "@/components/gallery-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"

export default function Home() {
  const scrollToQuote = useCallback(() => {
    const el = document.getElementById("quote-form")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <main>
      <Header />
      <HeroSection onGetQuote={scrollToQuote} />
      <div className="-mt-6 relative z-10">
        <QuoteForm id="quote-form" />
      </div>
      <TrustSection onGetQuote={scrollToQuote} />
      <ServicesSection onGetQuote={scrollToQuote} />
      <GallerySection />
      <FaqSection />
      <Footer onGetQuote={scrollToQuote} />
    </main>
  )
}
