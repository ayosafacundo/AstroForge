import { Layout } from "@/components/layout/Layout";
import { CategoryCard, CategoryCardProps } from "@/components/cards/CategoryCard";
import {
  Gamepad2,
  Home,
  Gem,
  Wrench,
  Palette,
  Drama,
  Cog,
  Flower2,
  Bot,
  Gift,
  Heart,
  Briefcase,
} from "lucide-react";
import { category } from "@/Mockdata/Mockdatatypes";
import MainCategories from "./UI/MainCategories.tsx";
import React from "react";

const icons = {
  "Gamepad2": Gamepad2,
  "Home": Home,
  "Gem": Gem,
  "Wrench": Wrench,
  "Palette": Palette,
  "Drama": Drama,
  "Cog": Cog,
  "Flower2": Flower2,
  "Bot": Bot,
  "Gift": Gift,
  "Heart": Heart,
  "Briefcase": Briefcase,
}

const Categories = ({categories}: {categories: category[]}) => {

  categories.map((category) => {
    category.icon = icons[category.icon];
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 border border-dashed border-primary/50 text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Browse Collection
          </div>
          <h1 className="font-technical text-4xl md:text-5xl text-primary uppercase tracking-wider mb-4 blueprint-glow">
            Categories
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our curated categories designed around how 3D prints enhance your life.
            From functional tools to artistic expressions.
          </p>
        </div>

        {/* How It Helps Section */}
        <MainCategories />

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(categories as unknown as CategoryCardProps[]).map((category, index) => (
            <div
              key={category.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CategoryCard {...category} />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 py-8 border-t border-b border-dashed border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-technical text-3xl text-primary">12</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div>
              <div className="font-technical text-3xl text-primary">14,700+</div>
              <div className="text-sm text-muted-foreground">Products</div>
            </div>
            <div>
              <div className="font-technical text-3xl text-primary">2,500+</div>
              <div className="text-sm text-muted-foreground">Creators</div>
            </div>
            <div>
              <div className="font-technical text-3xl text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default React.memo(Categories);
