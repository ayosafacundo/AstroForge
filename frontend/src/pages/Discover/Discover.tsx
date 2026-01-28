import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import discoverThemes from "@/Mockdata/data/DiscoverThemes.json";
import DiscoverItem from "./Components/DiscoverItem";

const Discover = () => {
  return (
    <Layout showGrid={false}>
      <div className="min-h-screen">
        {/* Header */}
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="inline-block px-4 py-1 border border-dashed border-primary/50 text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Thematic Exploration
          </div>
          <h1 className="font-technical text-4xl md:text-5xl text-primary uppercase tracking-wider mb-4 blueprint-glow">
            Discover
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Immerse yourself in curated thematic spaces. Each world offers a unique experience
            tailored to its craft and community.
          </p>
        </div>

        {/* Theme Cards */}
        <div className="space-y-0">
          {discoverThemes.map((theme, index) => <DiscoverItem theme={theme} index={index}/>)}
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="blueprint-card p-8 text-center">
            <h3 className="font-technical text-xl text-primary uppercase tracking-wider mb-2">
              Suggest a Theme
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Have an idea for a new thematic space? Let us know and help shape the future of discovery.
            </p>
            <Button variant="blueprint">
              Submit Idea
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Discover;
