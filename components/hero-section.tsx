"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, CalendarCheck, ShieldCheck, Lock, FileCheck } from "lucide-react"

export function HeroSection({ onGetQuote }: { onGetQuote: () => void }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/images/hero-patio.jpg"
        alt="Beautiful luxury patio cover"
        fill
        className="object-cover"
        priority
        loading="eager"
      />
      <div className="absolute inset-0 bg-primary/75" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className="mx-auto mb-8 h-px w-24 bg-accent" />
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent mb-6">
          Established Craftsmanship
        </p>
        <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance">
          Transform Your Outdoors with Custom Patio Covers Designed to Impress
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-base text-white/85 leading-relaxed sm:text-lg">
          Handcrafted patio covers that turn ordinary backyards into luxury retreats.
          Precision engineering. Uncompromising quality.
        </p>
        <div className="mt-12 flex items-center justify-center gap-6">
          <Button
            onClick={onGetQuote}
            className="bg-[#D09945] text-black hover:bg-[#B8832E] font-bold text-sm uppercase tracking-widest px-10 py-7 rounded-lg gap-2.5 border-2 border-[#E8B866] shadow-[0_0_10px_rgba(208,153,69,0.15)] hover:shadow-[0_0_16px_rgba(208,153,69,0.25)] transition-all duration-300"
          >
            Request a Consultation
            <ArrowRight className="h-4.5 w-4.5" />
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2.5 text-white rounded-full border border-[#D09945] bg-transparent px-5 py-2.5">
            <MapPin className="h-5 w-5 text-[#D09945]" />
            <span className="text-sm font-medium uppercase tracking-widest">Miami & Broward</span>
          </div>
          <div className="flex items-center gap-2.5 text-white rounded-full border border-[#D09945] bg-transparent px-5 py-2.5">
            <CalendarCheck className="h-5 w-5 text-[#D09945]" />
            <span className="text-sm font-medium uppercase tracking-widest">Established Since 1999</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2 text-white rounded-full border border-[#D09945] bg-transparent px-4 py-2">
            <ShieldCheck className="h-4 w-4 text-[#D09945]" />
            <span className="text-xs font-medium uppercase tracking-widest">Licensed</span>
          </div>
          <div className="flex items-center gap-2 text-white rounded-full border border-[#D09945] bg-transparent px-4 py-2">
            <Lock className="h-4 w-4 text-[#D09945]" />
            <span className="text-xs font-medium uppercase tracking-widest">Bonded</span>
          </div>
          <div className="flex items-center gap-2 text-white rounded-full border border-[#D09945] bg-transparent px-4 py-2">
            <FileCheck className="h-4 w-4 text-[#D09945]" />
            <span className="text-xs font-medium uppercase tracking-widest">Insured</span>
          </div>
        </div>

        <div className="mx-auto mt-16 h-px w-24 bg-accent/30" />
      </div>
    </section>
  )
}
