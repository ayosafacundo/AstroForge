import { Link, useLocation } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import icon from "@/assets/astroforge-high-resolution-icon-transparent.svg";

const navLinks = [
  { name: "Categories", href: "/categories" },
  { name: "Promotions", href: "/promotions" },
  { name: "Community", href: "/community" },
  { name: "Discover", href: "/discover" },
];

export const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Nav Links */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <img className="w-8 h-8" src={icon} alt="AstroForge icon" />
              <span className="font-technical text-primary text-lg tracking-wider hidden sm:block">
                ASTROFORGE
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-2 text-sm uppercase tracking-wider transition-all duration-300 relative group ${
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  <div
                    className={`absolute inset-0 bg-primary/5 border border-transparent transition-all duration-300 ${
                      location.pathname === link.href
                        ? "border-primary/30"
                        : "group-hover:border-primary/20"
                    }`}
                  />
                  {location.pathname === link.href && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden sm:block">
              <Button variant="blueprint" size="sm">
                <User className="w-4 h-4 mr-2" />
                Login / Register
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-primary p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 text-sm uppercase tracking-wider border-l-2 transition-all ${
                    location.pathname === link.href
                      ? "text-primary border-primary bg-primary/5"
                      : "text-muted-foreground border-transparent hover:text-primary hover:border-primary/50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 mx-4"
              >
                <Button variant="blueprint" size="sm" className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  Login / Register
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
