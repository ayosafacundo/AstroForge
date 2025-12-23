import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Scissors, Palette, Cog, Sparkles, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DiscoverTheme {
  id: string;
  name: string;
  title: string;
  description: string;
  bgStyle: string;
  accentColor: string;
  icon: React.ReactNode;
  itemCount: number;
  featured: string[];
}

const discoverThemes: DiscoverTheme[] = [
  {
    id: "robotics",
    name: "Robotics",
    title: "Discover Robotics",
    description: "Explore the world of mechanical marvels, from articulated limbs to fully autonomous builds",
    bgStyle: "from-cyan-950 via-slate-900 to-blue-950",
    accentColor: "text-cyan-400",
    icon: <Cpu className="w-8 h-8" />,
    itemCount: 923,
    featured: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=300&h=300&fit=crop",
    ],
  },
  {
    id: "embroidery",
    name: "Embroidery",
    title: "Discover Embroidery",
    description: "Where traditional craft meets modern technology. Hoops, frames, and tools for the fiber arts",
    bgStyle: "from-rose-950 via-pink-950 to-purple-950",
    accentColor: "text-rose-400",
    icon: <Scissors className="w-8 h-8" />,
    itemCount: 456,
    featured: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=300&h=300&fit=crop",
    ],
  },
  {
    id: "art",
    name: "Art & Design",
    title: "Discover Art",
    description: "Push creative boundaries with sculptural masterpieces and avant-garde designs",
    bgStyle: "from-violet-950 via-indigo-950 to-purple-950",
    accentColor: "text-violet-400",
    icon: <Palette className="w-8 h-8" />,
    itemCount: 1234,
    featured: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1549887534-1541e9326642?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=300&fit=crop",
    ],
  },
  {
    id: "mechanical",
    name: "Mechanical",
    title: "Discover Mechanical",
    description: "Gears, clockwork, and kinetic wonders. Engineering excellence in every layer",
    bgStyle: "from-amber-950 via-orange-950 to-yellow-950",
    accentColor: "text-amber-400",
    icon: <Cog className="w-8 h-8" />,
    itemCount: 567,
    featured: [
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1504222490345-c075b6008014?w=300&h=300&fit=crop",
    ],
  },
  {
    id: "fantasy",
    name: "Fantasy",
    title: "Discover Fantasy",
    description: "Dragons, castles, and magical realms brought to life through the power of 3D printing",
    bgStyle: "from-emerald-950 via-teal-950 to-cyan-950",
    accentColor: "text-emerald-400",
    icon: <Sparkles className="w-8 h-8" />,
    itemCount: 892,
    featured: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=300&fit=crop",
    ],
  },
  {
    id: "gaming",
    name: "Gaming",
    title: "Discover Gaming",
    description: "Level up your tabletop experience with custom dice, miniatures, and accessories",
    bgStyle: "from-red-950 via-orange-950 to-amber-950",
    accentColor: "text-red-400",
    icon: <Gamepad2 className="w-8 h-8" />,
    itemCount: 1567,
    featured: [
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1606115757624-6b9bfe9fa5e4?w=300&h=300&fit=crop",
    ],
  },
];

const Discover = () => {
  return (
    <Layout showGrid={false}>
      <div className="min-h-screen">
        {/* Header */}
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="inline-block px-4 py-1 border border-dashed border-primary/50 text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Thematic Exploration
          </div>
          <h1 className="font-technical text-4xl md:text-5xl text-primary uppercase tracking-wider mb-4 blueprint-glow">
            Discover
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Immerse yourself in curated thematic spaces. Each world offers a unique experience
            tailored to its craft and community.
          </p>
        </div>

        {/* Theme Cards */}
        <div className="space-y-0">
          {discoverThemes.map((theme, index) => (
            <Link
              key={theme.id}
              to={`/discover/${theme.id}`}
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
                      {theme.icon}
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
          ))}
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="blueprint-card p-8 text-center">
            <h3 className="font-technical text-xl text-primary uppercase tracking-wider mb-2">
              Suggest a Theme
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Have an idea for a new thematic space? Let us know and help shape the future of discovery.
            </p>
            <Button variant="blueprint">
              Submit Idea
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Discover;
