import { DiscoverTheme } from "@/Mockdata/Mockdatatypes";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Scissors, Palette, Cog, Sparkles, Gamepad2 } from "lucide-react";
import React from "react";

const icons: { [key: string]: React.ReactNode } = {
  "Cpu": <Cpu className="w-8 h-8" />,
  "Scissors": <Scissors className="w-8 h-8" />,
  "Palette": <Palette className="w-8 h-8" />,
  "Cog": <Cog className="w-8 h-8" />,
  "Sparkles": <Sparkles className="w-8 h-8" />,
  "Gamepad2": <Gamepad2 className="w-8 h-8" />
};

function DiscoverItem({ theme, index }: { theme: DiscoverTheme, index: number }) {
  return (
    (
      <Link
        key={theme.id}
        to={`/search?cat=${theme.id}`}
        className={`block relative group overflow-hidden ${
          index % 2 === 0 ? "" : ""
        }`}
      >
        <div
          className={`bg-gradient-to-r ${theme.bgStyle} py-16 md:py-24 transition-all duration-500 group-hover:py-20 md:group-hover:py-28`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 blueprint-grid opacity-10" />
          
          {/* Floating Images */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex gap-4 pr-8 opacity-30 group-hover:opacity-60 transition-opacity duration-500">
            {theme.featured.map((img, i) => (
              <div
                key={i}
                className="w-24 h-24 rounded border border-white/20 overflow-hidden transform rotate-3"
                style={{
                  transform: `rotate(${(i - 1) * 5}deg) translateY(${(i - 1) * 10}px)`,
                }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <div className={`${theme.accentColor} mb-4`}>
                {icons[theme.icon] || null}
              </div>
              <h2 className={`font-technical text-3xl md:text-4xl ${theme.accentColor} uppercase tracking-wider mb-3`}>
                {theme.title}
              </h2>
              <p className="text-white/70 mb-6 max-w-lg">
                {theme.description}
              </p>
              <div className="flex items-center gap-6">
                <Button
                  variant="outline"
                  className={`border-white/30 text-white hover:bg-white/10 hover:border-white/50 group/btn`}
                >
                  Explore {theme.name}
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </Button>
                <span className="text-white/50 text-sm">
                  {theme.itemCount} products
                </span>
              </div>
            </div>
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/20" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/20" />
        </div>
      </Link>
    )
  )
}

export default React.memo(DiscoverItem);