import { ArrowRight, LucideIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  productCount: number;
  image: string;
}

export const CategoryCard = React.memo(({
  id,
  name,
  description,
  icon: Icon,
  productCount,
  image,
}: CategoryCardProps) => {
  return (
    <Link
      to={`/search?tag=${id.toLowerCase()}`}
      className="group relative blueprint-card overflow-hidden transition-all duration-300 hover:border-primary/50"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover opacity-20 transition-all duration-500 group-hover:opacity-30 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative p-6 h-full flex flex-col justify-between min-h-[200px]">
        <div>
          {/* Icon */}
          <div className="w-12 h-12 border border-primary/50 rounded flex items-center justify-center mb-4 group-hover:border-primary group-hover:bg-primary/10 transition-all">
            <Icon className="w-6 h-6 text-primary" />
          </div>

          {/* Title */}
          <h3 className="font-technical text-lg text-primary uppercase tracking-wider mb-2">
            {name}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-dashed border-border">
          <span className="text-xs text-muted-foreground">
            {productCount} products
          </span>
          <span className="flex items-center text-primary text-sm group-hover:translate-x-1 transition-transform">
            Explore
            <ArrowRight className="w-4 h-4 ml-1" />
          </span>
        </div>
      </div>

      {/* Corner marks */}
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-primary/30 group-hover:border-primary transition-colors" />
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-primary/30 group-hover:border-primary transition-colors" />
    </Link>
  );
});
