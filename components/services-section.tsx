"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const SERVICES = [
  {
    title: "Insulated",
    description:
      "Complete shade and rain protection. Engineered for enduring comfort.",
    image: "/images/insulated-top.jpg",
  },
  {
    title: "Lattice",
    description:
      "Refined partial shade that balances sunlight with elegant architectural form.",
    image: "/images/lattice-v2.jpg",
  },
  {
    title: "Louvered",
    description:
      "Precision-adjustable panels for controlled sunlight, shade, and ventilation.",
    image: "/images/louvered-new.jpg",
  },
  {
    title: "Retractable Awning",
    description:
      "Professionally installed retractable shade for flexible outdoor living.",
    image: "/images/awning.jpg",
  },
  {
    title: "Zipper Screens",
    description:
      "Seamless enclosure providing privacy, insect protection, and refined aesthetics.",
    image: "/images/zipper-screen-new.jpg",
  },
]

export function ServicesSection({ onGetQuote }: { onGetQuote: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % SERVICES.length
        if (scrollRef.current) {
          const card = scrollRef.current.children[next] as HTMLElement
          if (card) {
            scrollRef.current.scrollTo({
              left: card.offsetLeft - scrollRef.current.offsetLeft - 24,
              behavior: "smooth",
            })
          }
        }
        return next
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => {
      const children = Array.from(container.children) as HTMLElement[]
      const containerLeft = container.scrollLeft + container.offsetLeft
      let closestIndex = 0
      let closestDist = Infinity
      children.forEach((child, i) => {
        const dist = Math.abs(child.offsetLeft - containerLeft - 24)
        if (dist < closestDist) {
          closestDist = dist
          closestIndex = i
        }
      })
      setActiveIndex(closestIndex)
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="services" className="py-24 bg-secondary">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">
              Our Capabilities
            </p>
            <h2 className="mt-4 font-serif text-5xl font-bold text-secondary-foreground sm:text-6xl text-balance">
              Expert Contractor Services
            </h2>
          </div>
          <Button
            onClick={onGetQuote}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-sm uppercase tracking-widest px-10 py-7 gap-2 self-start lg:self-auto"
          >
            Start Your Project
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              className={`group flex-shrink-0 w-[280px] sm:w-[320px] bg-card rounded-xl overflow-hidden border transition-all duration-500 snap-start ${
                i === activeIndex ? "border-[#D09945] shadow-lg" : "border-border"
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/20 transition-opacity group-hover:bg-primary/10" />
              </div>
              <div className="p-5">
                <h3 className="text-sm font-semibold text-card-foreground uppercase tracking-wider">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {SERVICES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                setActiveIndex(i)
                if (scrollRef.current) {
                  const card = scrollRef.current.children[i] as HTMLElement
                  if (card) {
                    scrollRef.current.scrollTo({
                      left: card.offsetLeft - scrollRef.current.offsetLeft - 24,
                      behavior: "smooth",
                    })
                  }
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-[#D09945]" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
