import { categoryPromotion } from "@/Mockdata/Mockdatatypes";
import { Link } from "react-router-dom";


export default function Category({categoryPromotions}: {categoryPromotions: categoryPromotion[]}) {
    return (
    <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-technical text-2xl text-primary uppercase tracking-wider mb-2">
            Promotions by Category
          </h2>
          <p className="text-muted-foreground text-sm">
            Find deals in your favorite categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryPromotions.map((cat, index) => (
            <Link
              key={cat.name}
              to={`/categories/${cat.name.toLowerCase()}`}
              className="group blueprint-card p-4 text-center transition-all hover:border-primary/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {cat.count} items
              </p>
              <p className="text-xs text-success font-medium mt-2">
                {cat.discount}
              </p>
            </Link>
          ))}
        </div>
    </section>
    )
}