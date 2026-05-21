import React from "react";

export default function WildJourneyHomepage() {
  return (
    <div className="bg-[#000000] text-[#F5F1E8] overflow-x-hidden font-[Poppins] scroll-smooth">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-wide text-[#D4AF37] font-[Playfair_Display]">
            WildJourney
          </h1>

          <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-[2px]">
            {['Home','Nature','Wildlife','Travel','Adventure','Gallery','Contact'].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-[#D4AF37] transition duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black"></div>

        <div className="absolute inset-0 opacity-40 animate-pulse bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_60%)]"></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-[#D4AF37]/30 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${4 + Math.random() * 6}s`,
              }}
            >
              🍃
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <p className="uppercase tracking-[6px] text-[#D4AF37] mb-6 text-sm">
            Luxury Nature Documentary Platform
          </p>

          <h1 className="text-5xl md:text-8xl font-bold leading-tight font-[Playfair_Display] mb-8">
            Where Nature Tells Its Stories
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-[#F5F1E8]/80 mb-12">
            Explore breathtaking wildlife, cinematic landscapes, and unforgettable adventures across the world.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="px-8 py-4 rounded-full bg-[#D4AF37] text-black font-semibold">
              Explore Adventures
            </button>

            <button className="px-8 py-4 rounded-full border border-[#F5F1E8]/30 bg-white/10">
              Watch Stories
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}