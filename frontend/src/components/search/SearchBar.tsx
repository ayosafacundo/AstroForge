import { useState } from "react";
import { Search, SlidersHorizontal, X, Tag, DollarSign, Percent, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";

const popularTags = [
  "Figurines",
  "Mechanical",
  "Art",
  "Functional",
  "Gaming",
  "Decor",
  "Tools",
  "Jewelry",
];

export const SearchBar = () => {
  const priceRangeMax = 500
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, priceRangeMax]);
  const [onlyPromotions, setOnlyPromotions] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      onSubmit();
    }
  }

  const onSubmit = () => {
    let query:{
      q?: string,
      tag?: string,
      pr?: string,
      prom?: string,
    } = {};

    if (searchQuery) {
      query["q"] = "q=" + searchQuery;
    }
    if (selectedTags.length > 0) {
      query["tag"] = "tag=" + selectedTags.join(",");
    }
    if (priceRange[0] != 0 && priceRange[1] != priceRangeMax) {
      query["pr"] = "pr=" + priceRange.join("~");
    }
    if (onlyPromotions) {
      query["prom"] = "prom=" + onlyPromotions;
    }
    let queryString = "?";
    for (const key in query) {
      queryString += query[key] + "&";
    }
    navigate("/search" + queryString);
  }

  const clearFilters = () => {
    setSelectedTags([]);
    setPriceRange([0, 500]);
    setOnlyPromotions(false);
  };

  const hasFilters = selectedTags.length > 0 || priceRange[0] > 0 || priceRange[1] < 500 || onlyPromotions;

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Main Search Bar */}
      <div className="relative group">
        <div className="absolute inset-0 bg-primary/5 rounded blur-xl group-hover:bg-primary/10 transition-all duration-500" />
        <div className="relative flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border rounded p-2 blueprint-box-glow">
          <Search className="w-5 h-5 text-muted-foreground ml-2" 
          />
          <Input
            type="text"
            placeholder="Search 3D models, creators, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e)}
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
          />
          
          {/* Advanced Search Toggle */}
          <Popover open={showAdvanced} onOpenChange={setShowAdvanced}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`relative ${hasFilters ? "text-primary" : "text-muted-foreground"}`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                {hasFilters && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-card border-border" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-technical text-sm text-primary uppercase tracking-wider">
                    Advanced Filters
                  </h4>
                  {hasFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs text-muted-foreground hover:text-primary"
                    >
                      <X className="w-3 h-3 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Tag className="w-3 h-3" />
                    <span className="uppercase tracking-wider">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`blueprint-tag ${
                          selectedTags.includes(tag)
                            ? "bg-primary/20 border-primary text-primary"
                            : ""
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <DollarSign className="w-3 h-3" />
                    <span className="uppercase tracking-wider">
                      Price: ${priceRange[0]} - ${priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={priceRangeMax}
                    step={10}
                    className="py-2"
                  />
                </div>

                {/* Promotions Only */}
                <div className="space-y-2">
                  <button
                    onClick={() => setOnlyPromotions(!onlyPromotions)}
                    className={`w-full flex items-center gap-2 p-2 rounded border transition-all ${
                      onlyPromotions
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    <Percent className="w-4 h-4" />
                    <span className="text-sm">Show only promotions</span>
                  </button>
                </div>

                {/* Apply Button */}
                <Button variant="blueprint" className="w-full">
                  <Layers className="w-4 h-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Button variant="default" size="sm"
            onClick={onSubmit}
          >
            Search
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2 mt-3 animate-fade-in">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Active:
          </span>
          {selectedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className="blueprint-tag group"
            >
              {tag}
              <X className="w-3 h-3 ml-1 opacity-50 group-hover:opacity-100" />
            </button>
          ))}
          {(priceRange[0] > 0 || priceRange[1] < 500) && (
            <span className="blueprint-tag">
              ${priceRange[0]} - ${priceRange[1]}
            </span>
          )}
          {onlyPromotions && (
            <span className="blueprint-tag bg-success/10 border-success/50 text-success">
              <Percent className="w-3 h-3 mr-1" />
              Promos
            </span>
          )}
        </div>
      )}
    </div>
  );
};
