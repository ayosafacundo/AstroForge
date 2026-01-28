import { Layout } from "@/components/layout/Layout";
import { PromotionCard } from "@/components/cards/PromotionCard";
import { ProductCard } from "@/pages/Search/Components/ProductCard";
import { Clock, Percent, Package, CircleDollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import promotionPacks from '@/Mockdata/data/PromotionPacks.json'; 
import individualPromotions from '@/Mockdata/data/individualPromotions.json'; 
import BlueprintCard from "./Components/BlueprintCard";

const Promotions = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 border border-dashed border-success/50 text-xs uppercase tracking-widest text-success mb-4">
            <Percent className="w-3 h-3 inline mr-1" />
            Limited Time Offers
          </div>
          <h1 className="font-technical text-4xl md:text-5xl text-primary uppercase tracking-wider mb-4 blueprint-glow">
            Promotions
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Save big with our curated bundles and pack deals. Perfect for starting new projects
            or expanding your collection.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <BlueprintCard icon={<Percent className="w-6 h-6 text-success mx-auto mb-2" />} title={"50%"} description={"Max Discount"} />
          <BlueprintCard icon={<Package className="w-6 h-6 text-primary mx-auto mb-2" />} title={"24"} description={"Active Packs"} />
          <BlueprintCard icon={<Clock className="w-6 h-6 text-warning mx-auto mb-2" />} title={"7"} description={"Days Left"} />
          <BlueprintCard icon={<CircleDollarSign className="w-6 h-6 text-success mx-auto mb-2" />} title={"$2,400"} description={"Total Savings"} />
        </div>

        {/* Bundle Packs */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-technical text-2xl text-primary uppercase tracking-wider">
                Bundle Packs
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Related items grouped with special discounts
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            {promotionPacks.map((pack, index) => (
              <div
                key={pack.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PromotionCard {...pack} />
              </div>
            ))}
          </div>
        </section>

        {/* Individual Deals */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-technical text-2xl text-primary uppercase tracking-wider">
                Flash Deals
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Individual products with special pricing
              </p>
            </div>
            <Button variant="outline" size="sm" className="group">
              View All
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {individualPromotions.map((product, index) => (
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

        {/* Newsletter */}
        <section className="mt-16 blueprint-card p-8 text-center">
          <h3 className="font-technical text-xl text-primary uppercase tracking-wider mb-2">
            Never Miss a Deal
          </h3>
          <p className="text-muted-foreground mb-6">
            Subscribe to get notified about new promotions and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 bg-input border border-border rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
            <Button variant="default">Subscribe</Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Promotions;
