"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Get a Quote", href: "#quote-form" },
  { label: "Why Choose Us", href: "#trust" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
]

export function Header() {
  const [open, setOpen] = useState(false)

  function handleNav(href: string) {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/98 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-2.5">
        <div className="flex items-center gap-3">
          <div className="h-8 w-px bg-accent" />
          <div className="bg-white rounded-lg px-2.5 py-1">
            <Image
              src="/images/abrusci-logo.png"
              alt="Abrusci - Interior & Exterior Solutions"
              width={128}
              height={35}
              className="h-7 w-auto"
              priority
            />
          </div>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center h-10 w-10 text-primary-foreground/80 hover:text-accent transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <div className="h-px bg-primary-foreground/10" />

      {open && (
        <nav className="bg-primary/98 backdrop-blur-sm border-t border-primary-foreground/10">
          <ul className="mx-auto max-w-7xl flex flex-col px-6 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className="w-full text-left py-3 text-sm uppercase tracking-widest text-primary-foreground/70 hover:text-accent transition-colors border-b border-primary-foreground/5 last:border-0"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
