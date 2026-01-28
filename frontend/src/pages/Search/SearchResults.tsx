import { Layout } from "@/components/layout/Layout";
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
import { useLocation } from "react-router-dom";
import { useQueryState, parseAsArrayOf, parseAsString, Options, createParser, parseAsInteger } from 'nuqs';
import {
  Search,
  SlidersHorizontal,
  X,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SearchedProducts } from '@/Mockdata';
import SearchResult from "./Components/SearchResult";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/Mockdata/Mockdatatypes";
import { min } from "date-fns";

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

const parseAsFromTo = createParser({
  parse: value => {
    const [min = null, max = null] = value.split('~').map(parseAsInteger.parse)
    if (min === 0) return null
    if (max === min) return { eq: min }
    return { gte: min, lte: max }
  },
  serialize: value => {
    return value.eq !== undefined ? String(value.eq) : `${value.gte}~${value.lte}`
  }
})

const SearchResults = () => {
  const pathname = useLocation().pathname.toLowerCase().slice(1).split("/");
  const [category, setCategory] = useQueryState('cat', parseAsArrayOf(parseAsString).withOptions({ shallow: false, limitUrlUpdates: {method: "debounce", timeMs: 500 }}));
  const [tag, setTag] = useQueryState('tag', parseAsArrayOf(parseAsString).withOptions({ shallow: false, limitUrlUpdates: {method: "debounce", timeMs: 500 } }));
  const [priceRange, setPriceRange] = useQueryState('pr', parseAsFromTo.withOptions({ shallow: false, limitUrlUpdates: {method: "debounce", timeMs: 500 } }));
  const [query, setQuery] = useQueryState('q', parseAsString.withOptions({ shallow: false }));
  const [promotion, setPromotion] = useQueryState('prom', parseAsString.withOptions({ shallow: false, limitUrlUpdates: {method: "debounce", timeMs: 500 } }));
  const [theme, setTheme] = useQueryState('theme', parseAsString.withOptions({ shallow: false }));
  
  useEffect(() => {
    const pathcategory = pathname[0] == "discover" ? pathname[1].charAt(0).toUpperCase() + pathname[1].slice(1) : ""; // make first character of pathname (/discover/<robotics>) uppercase
    if (pathcategory != "" && categories.indexOf(pathcategory) != -1) addToQuery(categories[categories.indexOf(pathcategory)]?.toLowerCase(), setCategory);
  }, [])
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const data = useQuery({
    queryKey: ['searchResults', { category, tag, priceRange, query, promotion, theme, onlyPromotions: promotion, sortBy }],
    queryFn: async () => {
      // Simulate fetching data from an API based on the filters
      let results: Product[] = SearchedProducts;
      console.log("Fetching!");
      if (category && category.length > 0) {
        results = results.filter(product => category.includes(product.category.toLowerCase()));
      }

      if (tag && tag.length > 0) {
        results = results.filter(product => tag.some(t => product.tags?.map(pt => pt.toLowerCase()).includes(t)));
      }
      if (priceRange) {
        results = results.filter(product => {
          const price = product.price;
          if (priceRange.gte !== undefined && price < priceRange.gte) return false;
          if (priceRange.lte !== undefined && price > priceRange.lte) return false;
          return true;
        });
      }
      if (query) {
        results = results.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
      }
      if (promotion) {
        results = results.filter(product => product.isPromotion);
      }
      // Sorting
      switch (sortBy) {
        case "price-low":
          results = results.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          results = results.sort((a, b) => b.price - a.price);
          break;
        case "newest":
          results = results.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
          break;
        case "popular":
          results = results.sort((a, b) => b.popularity - a.popularity);
          break;
        // 'relevance' sorting can be customized as needed
      }

      return results;
    }});


  const addToQuery = (item: string, query: (value: string[] | ((old: string[]) => string[]), options?: Options) => Promise<URLSearchParams>) => {
    let nitem = item.toLowerCase();
    query((prev) => {
      if (prev == null) {
        return [nitem]
      } else if (prev.includes(nitem)) {
        let ret = prev.filter((c) => c !== nitem);
        if (ret.length == 0) return null
        return ret;
      } else {
        return [...prev, nitem]
      }
    })
  }

  const setSearch = (search: string) => {
    const searchQuery = search.trim().split(" ")
    for (let i = 0; i < searchQuery.length; i++) {
      switch (searchQuery[i].charAt(0)) {
        case "#":
          let tagValue = searchQuery[i].slice(1).toLowerCase();
          addToQuery(tagValue, setTag);
          break;
        case "$":
          let priceValue = searchQuery[i].slice(1).split("-");
          if (priceValue.length == 2) {
            let gte = parseInt(priceValue[0]);
            let lte = parseInt(priceValue[1]);
            if (!isNaN(gte) && !isNaN(lte)) {
              setPriceRange({ gte, lte });
            }
          } else if (priceValue.length == 1) {
            let lte = parseInt(priceValue[0]);
            if (!isNaN(lte)) {
              setPriceRange({ lte, gte: 0 });
            }
          }
        default:
          // normal search term
          break;
      }
    }

    if (search.trim() === "") { 
      setQuery(null); 
      return;
    } 
    setQuery(search);
  }

  const clearFilters = () => {
    setCategory(null);
    setTag(null);
    setPriceRange(null);
    setQuery(null);
    setPromotion(null);
    setTheme(null);
  };

  const activeFiltersCount =
    (category ? category.length : 0) + (promotion == "true" ? 1 : 0) + (priceRange ? (priceRange.lte > 0 || priceRange.gte < 100 ? 1 : 0) : 0);
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
                value={query || ""}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-12 bg-background border-border"
              />
            </div>
            <Button variant="blueprint" size="lg">
              <Search className="w-5 h-5 mr-2"/>
              Search
            </Button>
          </div>

          {/* Quick Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-sm text-muted-foreground mr-2">Popular:</span>
            {popularTags.map((t) => (
              <span key={t} onClick={() => addToQuery(t, setTag)}>
                <Badge
                  variant="secondary"
                  className={`cursor-pointer hover:bg-primary/20 ${
                    tag?.includes(t.toLowerCase()) ? "bg-primary/20 border-primary" : ""
                  }`}
                >
                  #{t}
                </Badge>
              </span>
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
              
              {/* Tags */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Tags</h4>
                <div className="space-y-2">
                  {tag && tag.map((cat) => (
                  <Badge key={cat} variant="outline" className="gap-1">
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => addToQuery(cat.toLowerCase(), setTag)}
                    />
                  </Badge>))}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.slice(1).map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                      <Checkbox
                        checked={category != null ? category.includes(cat.toLowerCase()) : false}
                        onCheckedChange={() => addToQuery(cat, setCategory)}
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
                  value={priceRange ? [priceRange.gte,priceRange.lte] : [0, 500]}
                  onValueChange={([min, max]) => {setPriceRange({gte:min, lte:max})}}
                  max={500}
                  step={1}
                  className="mb-2"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>${priceRange ? priceRange.gte : 0}</span>
                  <span>${priceRange ? priceRange.lte : 500}</span>
                </div>
              </div>

              {/* Promotions Only */}
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={promotion == "true"}
                    onCheckedChange={(checked) => checked ? setPromotion(""+checked) : setPromotion(null)}
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

            {/* Results Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {data?.data?.map((product, index) => (
                <SearchResult product={product} index={index} addToQuery={addToQuery} setCategory={setCategory}/>
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
