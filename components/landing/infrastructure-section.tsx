"use client";

import { useEffect, useState, useRef } from "react";

const locations = [
  { city: "Furniture", region: "Tables, seating & casegoods", latency: "2,400+" },
  { city: "Lighting", region: "Pendants, sconces & lamps", latency: "1,800+" },
  { city: "Textiles", region: "Fabrics, rugs & drapery", latency: "3,100+" },
  { city: "Decor", region: "Vases, art & accessories", latency: "2,600+" },
  { city: "Wallcoverings", region: "Wallpaper & finishes", latency: "950+" },
  { city: "Outdoor", region: "Patio & garden", latency: "1,200+" },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeLocation, setActiveLocation] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLocation((prev) => (prev + 1) % locations.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Every element,
              <br />
              one search.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              From statement furniture to the finishing touches, Ora sources
              across every category from 10,000+ vetted suppliers, so you never
              leave the platform to complete a room.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">10k+</div>
                <div className="text-sm text-muted-foreground">Vetted suppliers</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Trade vendors</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">96%</div>
                <div className="text-sm text-muted-foreground">Match accuracy</div>
              </div>
            </div>
          </div>

          {/* Right: Location list */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-foreground/10">
              {/* Header */}
              <div className="px-6 py-4 border-b border-foreground/10 flex items-center justify-between">
                <span className="text-sm font-mono text-muted-foreground">Supplier Network</span>
                <span className="flex items-center gap-2 text-xs font-mono text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  All searchable
                </span>
              </div>

              {/* Locations */}
              <div>
                {locations.map((location, index) => (
                  <div
                    key={location.city}
                    className={`px-6 py-5 border-b border-foreground/5 last:border-b-0 flex items-center justify-between transition-all duration-300 ${
                      activeLocation === index ? "bg-foreground/[0.02]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span 
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          activeLocation === index ? "bg-foreground" : "bg-foreground/20"
                        }`}
                      />
                      <div>
                        <div className="font-medium">{location.city}</div>
                        <div className="text-sm text-muted-foreground">{location.region}</div>
                      </div>
                    </div>
                    <span className="font-mono text-sm text-muted-foreground">{location.latency}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
