import { Heart, ShoppingCart, Eye, Badge, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/Mockdata/Mockdatatypes";
import { Dispatch, SetStateAction, memo } from "react";
import { Options } from "nuqs";

interface props extends Product {
  addToQuery?: any,
  setCategory?: any
}

const ProductCard = memo(
  function ProductCard({
    name,
    price,
    originalPrice,
    image,
    creator,
    category,
    isPromotion,
    discount,
    tags,
    addToQuery,
    setCategory
  }: props) {
    return (
      <div className="group relative blueprint-card overflow-hidden transition-all duration-300 hover:border-primary/50">
        {/* Promotion Badge */}
        {isPromotion && discount && (
          <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-success text-success-foreground text-xs font-bold uppercase tracking-wider">
            -{discount}%
          </div>
        )}

        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary/50">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button size="icon" variant="ghost" className="text-primary hover:bg-primary/20">
              <Eye className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="ghost" className="text-primary hover:bg-primary/20">
              <Heart className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="ghost" className="text-primary hover:bg-primary/20">
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>

          {/* Technical Corner Marks */}
          <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-primary/30" />
          <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-primary/30" />
          <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-primary/30" />
          <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-primary/30" />
        </div>
        {/* Content */}
        <div className="p-4 space-y-2" >
          {/* Category */}
          <span className="blueprint-annotation">{category}</span>
          {/* Name */}
          <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors"> {name} </h3>
          {/* Creator */}
          <p className="text-xs text-muted-foreground">
            by <span className="text-primary/70">{creator}</span>
          </p>

          {/* Tags */}
          {(tags && addToQuery) && tags.map((tag: string) => {
            return (
              <div className="flex gap-2 pt-2 border-t border-dashed border-border">
                <Badge key={tag} variant="outline" className="gap-1"
                  onClick={() => addToQuery(tag, setCategory)}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  <X
                    className="w-3 h-3 cursor-pointer"
                  />
                </Badge>
              </div>
            )
          }
          )
          }
          {/* Price */}
          <div className="flex items-baseline gap-2 pt-2 border-t border-dashed border-border">
            <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  });

export { ProductCard };