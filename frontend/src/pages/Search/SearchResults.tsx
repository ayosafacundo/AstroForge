import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/cards/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, Link, useLocation } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  X,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { SearchedProducts } from '@/Mockdata';

// Mock search results
const categories = [
  "All Categories",
  "Figurines",
  "Mechanical",
  "Functional",
  "Cosplay",
  "Decor",
  "Robotics",
  "Tools",
  "Jewelry",
];

const popularTags = ["Dragon", "Articulated", "Mechanical", "Robot", "Cosplay", "Decor", "Functional"];

const SearchResults = () => {
  const pathname = useLocation().pathname.toLowerCase().slice(1).split("/");
  const category = pathname[0] == "discover" ? pathname[1].charAt(0).toUpperCase() + pathname[1].slice(1) : ""; // make first character of pathname (/discover/robotics) uppercase
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const tag = searchParams.get("tag") || "";
  const promotion = searchParams.get("promotion") || "";
  const theme = searchParams.get("theme") || "";

  const [searchQuery, setSearchQuery] = useState(query || tag);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([categories[categories.indexOf(category)]]); // Get the category from /discover/<category>
  const [onlyPromotions, setOnlyPromotions] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 100]);
    setOnlyPromotions(false);
  };

  const activeFiltersCount =
    selectedCategories.length + (onlyPromotions ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < 100 ? 1 : 0);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="blueprint-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for 3D models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-background border-border"
              />
            </div>
            <Button variant="blueprint" size="lg">
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>

          {/* Quick Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-sm text-muted-foreground mr-2">Popular:</span>
            {popularTags.map((t) => (
              <Link key={t} to={`/search?tag=${t.toLowerCase()}`}>
                <Badge
                  variant="secondary"
                  className={`cursor-pointer hover:bg-primary/20 ${
                    t.toLowerCase() === tag.toLowerCase() ? "bg-primary/20 border-primary" : ""
                  }`}
                >
                  #{t}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-72 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="blueprint-card p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-technical text-primary uppercase tracking-wider">Filters</h3>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear all
                  </Button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.slice(1).map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                      <Checkbox
                        checked={selectedCategories.includes(cat)}
                        onCheckedChange={() => toggleCategory(cat)}
                      />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Price Range</h4>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100}
                  step={1}
                  className="mb-2"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Promotions Only */}
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={onlyPromotions}
                    onCheckedChange={(checked) => setOnlyPromotions(checked as boolean)}
                  />
                  <span className="text-sm">Only show promotions</span>
                </label>
              </div>

              <Button variant="blueprint" className="w-full" onClick={() => setShowFilters(false)}>
                Apply Filters
              </Button>
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-technical text-xl text-primary uppercase tracking-wider">
                  {query || tag ? `Results for "${query || tag}"` : "All Products"}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {SearchedProducts.length} products found
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-border rounded-md overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategories.length > 0 || onlyPromotions) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map((cat) => (
                  <Badge key={cat} variant="outline" className="gap-1">
                    {cat}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => toggleCategory(cat)}
                    />
                  </Badge>
                ))}
                {onlyPromotions && (
                  <Badge variant="outline" className="gap-1">
                    Promotions only
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => setOnlyPromotions(false)}
                    />
                  </Badge>
                )}
              </div>
            )}

            {/* Results Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {SearchedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <Link to={`/product/${product.id}`}>
                    <ProductCard {...product} />
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-12">
              <Button variant="outline" size="icon" disabled>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {[1, 2, 3, 4, 5].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? "blueprint" : "outline"}
                  size="icon"
                >
                  {page}
                </Button>
              ))}
              <Button variant="outline" size="icon">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default SearchResults;
