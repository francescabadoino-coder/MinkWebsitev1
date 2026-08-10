"use client";

import { ArrowUpRight } from "lucide-react";
import { MinkWordmark } from "@/components/mink-logo";
import { AnimatedWave } from "./animated-wave";

const footerLinks = {
  Product: [
    { name: "Agents", href: "/agents" },
    { name: "Ora", href: "/#features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Privacy by design", href: "/#privacy" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "mailto:hello@mink.design" },
  ],
  Resources: [
    { name: "FAQ", href: "#" },
    { name: "Help Center", href: "#" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Use", href: "/terms" },
    { name: "Billing Policy", href: "/billing-policy" },
    { name: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  { name: "Twitter", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "LinkedIn", href: "#" },
];

export function FooterSection() {
  return (
    <footer className="relative border-t border-foreground/10 overflow-hidden">
      {/* Animated ASCII wave, tinted with the brand accent */}
      <div className="absolute inset-0 h-64 opacity-40 pointer-events-none overflow-hidden [mask-image:linear-gradient(to_bottom,black,transparent)]">
        <AnimatedWave rgb="200, 218, 111" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              {/* isolate + relative lifts the wordmark clear of the animated
                  chartreuse wave behind it, which was washing out the mark. */}
              <a
                href="/"
                className="relative isolate mb-6 inline-flex"
                aria-label="Mink home"
              >
                <MinkWordmark className="h-7" />
              </a>

              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs text-pretty">
                The AI platform for interior designers. Source, spec, and ship
                beautiful spaces faster.
              </p>

              {/* Social Links */}
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="group relative inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                        <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Mink. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
