import { SearchBar } from "@/components/search/SearchBar"
import { Zap, ArrowRight, Star, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";


const Dashscreen = () => {

  return (
  <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 py-20">
        {/* Floating decorative elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 border border-dashed border-primary/30 rounded-full animate-float opacity-50" />
        <div className="absolute bottom-1/4 right-10 w-16 h-16 border border-primary/20 rotate-45 animate-float" style={{ animationDelay: "1s" }} />

        {/* Main Content */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="font-technical text-4xl md:text-6xl lg:text-7xl text-primary blueprint-glow mb-4 uppercase tracking-wider">
            Search for your next project
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Powered by your imagination
          </p>
          
          {/* Technical annotation */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-success rounded-full animate-glow-pulse" />
              SYSTEM ONLINE
            </span>
            <span className="border-l border-border pl-4">
              1,247,892 models available
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-3xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <SearchBar />
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Link to="/discover">
            <Button variant="ghost" size="sm" className="group">
              <Zap className="w-4 h-4 mr-2 text-warning" />
              Trending Now
              <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Button>
          </Link>
          <Link to="/promotions">
            <Button variant="ghost" size="sm" className="group">
              <Star className="w-4 h-4 mr-2 text-success" />
              Hot Deals
              <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Button>
          </Link>
          <Link to="/categories">
            <Button variant="ghost" size="sm" className="group">
              <TrendingUp className="w-4 h-4 mr-2 text-primary" />
              Popular Categories
              <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Button>
          </Link>
        </div>
      </section>
    )
}

export default Dashscreen;