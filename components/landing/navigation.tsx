"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { MinkWordmark } from "@/components/mink-logo";
import { useBetaAccess } from "./beta-access-provider";

const navLinks = [
  { name: "Agents", href: "/agents" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { open } = useBetaAccess();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled 
          ? "top-4 left-4 right-4" 
          : "top-0 left-0 right-0"
      }`}
    >
      <nav 
        className={`mx-auto transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "bg-background/90 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]"
            : "bg-transparent max-w-[1400px]"
        }`}
      >
        {/* Height + gutters are tuned to Stripe's nav proportions, measured at
            a 1198px viewport: 76px bar, 25px logo (~33% of bar height), 14px
            links, and the logo aligned to the page's content column.

            The gutter flips with scroll state so the logo stays at a constant
            48px from the viewport edge — matching the `lg:px-12` used by every
            body section — instead of drifting sideways mid-transition:
              unscrolled -> 0px header inset + 48px padding  = 48px
              scrolled   -> 16px header inset + 32px padding = 48px */}
        <div 
          className={`relative flex items-center justify-between transition-all duration-500 ${
            isScrolled ? "h-14 px-6 lg:px-8" : "h-19 px-6 lg:px-12"
          }`}
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group" aria-label="Mink home">
            <MinkWordmark
              priority
              className={`transition-all duration-500 ${isScrolled ? "h-5" : "h-6"}`}
            />
          </a>

          {/* Desktop Navigation - absolutely centered on the page */}
          <div className="hidden md:flex items-center gap-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300 relative group whitespace-nowrap"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#" className={`text-foreground/70 hover:text-foreground transition-all duration-500 ${isScrolled ? "text-xs" : "text-sm"}`}>
              Sign in
            </a>
            <Button
              size="sm"
              onClick={() => open()}
              className={`bg-cta hover:bg-cta/90 text-cta-foreground rounded-full font-medium transition-all duration-500 ${isScrolled ? "px-4 h-8 text-xs" : "px-6"}`}
            >
              Sign up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

      </nav>
      
      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${
          isMobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0 }}
      >
        <div className="flex flex-col h-full px-8 pt-28 pb-8">
          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-5xl font-display text-foreground hover:text-muted-foreground transition-all duration-500 ${
                  isMobileMenuOpen 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms" }}
              >
                {link.name}
              </a>
            ))}
          </div>
          
          {/* Bottom CTAs */}
          <div className={`flex gap-4 pt-8 border-t border-foreground/10 transition-all duration-500 ${
            isMobileMenuOpen 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
          >
            <Button 
              variant="outline" 
              className="flex-1 rounded-full h-14 text-base"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign in
            </Button>
            <Button 
              className="flex-1 bg-cta hover:bg-cta/90 text-cta-foreground rounded-full h-14 text-base font-medium"
              onClick={() => {
                setIsMobileMenuOpen(false);
                open();
              }}
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
