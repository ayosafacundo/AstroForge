import { ArrowRight} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PromotionCard } from "@/components/cards/PromotionCard";
import { Link } from "react-router-dom";
import { Promotion } from "@/Mockdata/Mockdatatypes";


export default function Featured({promotions}: {promotions: Promotion[]}) {
    return (
        <section className="container mx-auto px-4 py-16">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="font-technical text-2xl text-primary uppercase tracking-wider">
                      Featured Promotions
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Limited time offers on curated bundles
                    </p>
                  </div>
                  <Link to="/promotions">
                    <Button variant="outline" size="sm" className="group">
                      View All
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
        
                <div className="grid gap-6">
                  {promotions.map((promo, index) => (
                    <div
                      key={promo.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <PromotionCard {...promo} />
                    </div>
                  ))}
                </div>
              </section>
    )
}