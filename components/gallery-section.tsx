"use client"

import Image from "next/image"
import { useState, useRef, useEffect, useCallback } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight } from "lucide-react"

const GALLERY_IMAGES = [
  "/images/gallery/01.jpg",
  "/images/gallery/02.jpg",
  "/images/gallery/03.jpg",
  "/images/gallery/04.jpg",
  "/images/gallery/05.jpg",
  "/images/gallery/06.jpg",
  "/images/gallery/07.jpg",
  "/images/gallery/08.jpg",
  "/images/gallery/09.jpg",
  "/images/gallery/10.jpg",
  "/images/gallery/11.jpg",
  "/images/gallery/12.jpg",
]

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % GALLERY_IMAGES.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  // Sync scroll position with activeSlide
  useEffect(() => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const cardWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth + 16
      : 300
    container.scrollTo({ left: activeSlide * cardWidth, behavior: "smooth" })
  }, [activeSlide])

  // Detect manual scroll
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const cardWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth + 16
      : 300
    const newIndex = Math.round(container.scrollLeft / cardWidth)
    if (newIndex !== activeSlide && newIndex >= 0 && newIndex < GALLERY_IMAGES.length) {
      setActiveSlide(newIndex)
    }
  }, [activeSlide])

  // Lightbox navigation
  const lightboxPrev = () => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex === 0 ? GALLERY_IMAGES.length - 1 : selectedIndex - 1)
  }
  const lightboxNext = () => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex === GALLERY_IMAGES.length - 1 ? 0 : selectedIndex + 1)
  }

  return (
    <section id="gallery" className="py-24 bg-card">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <div className="mx-auto mb-6 h-px w-16 bg-accent" />
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">
            Portfolio
          </p>
          <h2 className="mt-4 font-serif text-5xl font-bold text-card-foreground sm:text-6xl text-balance">
            Recent Work
          </h2>
        </div>

        {/* Slideshow */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {GALLERY_IMAGES.map((src, i) => (
            <button
              key={src}
              onClick={() => setSelectedIndex(i)}
              className={`group relative flex-shrink-0 w-72 sm:w-80 aspect-[4/3] overflow-hidden rounded-xl snap-start transition-all duration-300 focus:outline-none ${
                i === activeSlide
                  ? "ring-2 ring-[#D09945] ring-offset-2 ring-offset-card"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt={`Project ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/0 transition-all group-hover:bg-primary/20" />
            </button>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {GALLERY_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeSlide
                  ? "w-6 bg-[#D09945]"
                  : "w-1.5 bg-border hover:bg-muted-foreground"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent className="max-w-5xl border-0 bg-transparent p-0 shadow-none [&>button]:hidden">
          {selectedIndex !== null && (
            <div className="relative">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                <Image
                  src={GALLERY_IMAGES[selectedIndex]}
                  alt={`Project ${selectedIndex + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Lightbox nav */}
              <button
                onClick={lightboxPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={lightboxNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
                {selectedIndex + 1} / {GALLERY_IMAGES.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
