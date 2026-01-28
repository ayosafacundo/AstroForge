import { ProductCard } from "@/pages/Search/Components/ProductCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Products } from "@/Mockdata/Mockdatatypes";




export default function Product({featuredProducts}: {featuredProducts: Products[]}) {
    return (
        <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-technical text-2xl text-primary uppercase tracking-wider">
              Featured Products
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Handpicked by our community
            </p>
          </div>
          <Link to="/categories">
            <Button variant="outline" size="sm" className="group">
              Browse All
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </section>
    )
}