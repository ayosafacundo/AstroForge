import { ArrowRight, Package, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Promotion } from "@/Mockdata/Mockdatatypes";

export const PromotionCard = ({
  id,
  title,
  description,
  discount,
  itemCount,
  image,
  endsAt,
  category,
}: Promotion) => {
  return (
    <div className="group relative blueprint-card overflow-hidden transition-all duration-300 hover:border-primary/50 hover:blueprint-box-glow">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative w-full md:w-1/3 aspect-video md:aspect-auto overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Discount Badge */}
          <div className="absolute top-3 left-3 px-3 py-1 bg-success text-success-foreground font-bold text-lg">
            -{discount}%
          </div>

          {/* Grid overlay */}
          {/* <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" /> */}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <span className="blueprint-annotation">{category}</span>
            <h3 className="text-xl font-technical text-primary mt-2 uppercase tracking-wider">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
              {description}
            </p>
          </div>

          <div className="mt-4 space-y-3">
            {/* Meta Info */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Package className="w-3 h-3" />
                {itemCount} items
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Ends: {endsAt}
              </span>
            </div>

            {/* CTA */}
            <Link to={`/search?cat=${category.toLowerCase()}&prom=true`}>
              <Button variant="blueprint" className="w-full sm:w-auto group/btn">
                View Pack
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Technical decorations */}
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary/20" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary/20" />
    </div>
  );
};
