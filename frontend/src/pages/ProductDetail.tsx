import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Download,
  Share2,
  Star,
  Eye,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Printer,
  Box,
  Ruler,
  FileType,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { FullProduct } from "@/Mockdata/Mockdatatypes";

// Mock product data
const mockProduct = {
  id: "1",
  name: "Articulated Dragon - Flexible Print",
  description:
    "This stunning articulated dragon features smooth, flowing movement thanks to its carefully designed ball joints. Perfect for display or as a gift, this print-in-place model requires no assembly and demonstrates the amazing capabilities of 3D printing.",
  price: 12.99,
  originalPrice: 18.99,
  images: [
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=800&fit=crop",
  ],
  creator: {
    name: "DragonForge",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop",
    followers: 12400,
    designs: 89,
  },
  category: "Figurines",
  tags: ["Dragon", "Articulated", "Print-in-Place", "Fantasy", "Decoration"],
  stats: {
    downloads: 4521,
    likes: 892,
    views: 18420,
    comments: 156,
  },
  rating: 4.8,
  reviews: 234,
  specifications: {
    printTime: "8-12 hours",
    material: "PLA / PETG recommended",
    supports: "Not required",
    infill: "15-20%",
    resolution: "0.2mm recommended",
    dimensions: "200mm x 80mm x 60mm",
    fileFormats: ["STL", "OBJ", "3MF"],
  },
  isPromotion: true,
  discount: 32,
};

const relatedProducts = [
  {
    id: "r1",
    name: "Phoenix Rising Sculpture",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    creator: "DragonForge",
  },
  {
    id: "r2",
    name: "Crystal Dragon Egg",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    creator: "DragonForge",
  },
  {
    id: "r3",
    name: "Medieval Castle Display",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    creator: "PropMaster3D",
  },
];

const ProductDetail = ({mockdata}: {mockdata: FullProduct}) => {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const product = mockProduct; // In real app, fetch by id

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/categories" className="hover:text-primary transition-colors">Categories</Link>
          <span>/</span>
          <Link to={`/categories/${product.category.toLowerCase()}`} className="hover:text-primary transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative blueprint-card overflow-hidden aspect-square">
              {product.isPromotion && product.discount && (
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-success text-success-foreground text-sm font-bold uppercase tracking-wider">
                  -{product.discount}% OFF
                </div>
              )}
              <img
                src={product.images[currentImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 border border-border rounded-full flex items-center justify-center hover:bg-primary/20 hover:border-primary transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 border border-border rounded-full flex items-center justify-center hover:bg-primary/20 hover:border-primary transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Technical corners */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary/50" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary/50" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary/50" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary/50" />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`w-20 h-20 border-2 overflow-hidden transition-all ${
                    currentImage === idx ? "border-primary" : "border-border hover:border-primary/50"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="blueprint-annotation">{product.category}</span>
                {product.isPromotion && (
                  <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                    SALE
                  </Badge>
                )}
              </div>
              <h1 className="font-technical text-3xl text-primary uppercase tracking-wider mb-4">
                {product.name}
              </h1>

              {/* Creator */}
              <Link to={`/creator/${product.creator.name.toLowerCase()}`} className="flex items-center gap-3 group mb-4">
                <img
                  src={product.creator.avatar}
                  alt={product.creator.name}
                  className="w-10 h-10 rounded-full border-2 border-border group-hover:border-primary transition-colors"
                />
                <div>
                  <span className="text-foreground group-hover:text-primary transition-colors">
                    {product.creator.name}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {product.creator.followers.toLocaleString()} followers • {product.creator.designs} designs
                  </p>
                </div>
              </Link>

              {/* Rating */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-warning text-warning" />
                  <span className="font-bold text-foreground">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 py-4 border-y border-dashed border-border">
              <div className="text-center">
                <Download className="w-5 h-5 text-primary mx-auto mb-1" />
                <div className="font-technical text-lg">{product.stats.downloads.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Downloads</div>
              </div>
              <div className="text-center">
                <Heart className="w-5 h-5 text-primary mx-auto mb-1" />
                <div className="font-technical text-lg">{product.stats.likes.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Likes</div>
              </div>
              <div className="text-center">
                <Eye className="w-5 h-5 text-primary mx-auto mb-1" />
                <div className="font-technical text-lg">{product.stats.views.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Views</div>
              </div>
              <div className="text-center">
                <MessageSquare className="w-5 h-5 text-primary mx-auto mb-1" />
                <div className="font-technical text-lg">{product.stats.comments}</div>
                <div className="text-xs text-muted-foreground">Comments</div>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="blueprint-card p-6">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-technical text-4xl text-primary">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="blueprint" size="lg" className="flex-1">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={isFavorited ? "text-destructive border-destructive/50" : ""}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Link key={tag} to={`/search?tag=${tag.toLowerCase()}`}>
                  <Badge variant="secondary" className="hover:bg-primary/20 cursor-pointer">
                    #{tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="w-full justify-start bg-card border border-border p-1 h-auto flex-wrap">
            <TabsTrigger value="description" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Description
            </TabsTrigger>
            <TabsTrigger value="specifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Specifications
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Reviews ({product.reviews})
            </TabsTrigger>
            <TabsTrigger value="comments" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Comments ({product.stats.comments})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="blueprint-card p-6 mt-4">
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            <div className="mt-6 pt-6 border-t border-dashed border-border">
              <h4 className="font-technical text-primary mb-3">WHAT'S INCLUDED</h4>
              <ul className="space-y-2">
                {product.specifications.fileFormats.map((format) => (
                  <li key={format} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-success" />
                    {format} file format
                  </li>
                ))}
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Print instructions PDF
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Lifetime updates
                </li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="blueprint-card p-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Printer className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Print Time</div>
                    <div className="font-medium">{product.specifications.printTime}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Box className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Material</div>
                    <div className="font-medium">{product.specifications.material}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Ruler className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Dimensions</div>
                    <div className="font-medium">{product.specifications.dimensions}</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FileType className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">File Formats</div>
                    <div className="font-medium">{product.specifications.fileFormats.join(", ")}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Supports Required</div>
                  <div className="font-medium">{product.specifications.supports}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Recommended Infill</div>
                  <div className="font-medium">{product.specifications.infill}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Layer Resolution</div>
                  <div className="font-medium">{product.specifications.resolution}</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="blueprint-card p-6 mt-4">
            <p className="text-muted-foreground text-center py-8">Reviews coming soon...</p>
          </TabsContent>

          <TabsContent value="comments" className="blueprint-card p-6 mt-4">
            <p className="text-muted-foreground text-center py-8">Comments coming soon...</p>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <section>
          <h2 className="font-technical text-xl text-primary uppercase tracking-wider mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <Link key={item.id} to={`/product/${item.id}`} className="group blueprint-card overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">by {item.creator}</p>
                  <p className="font-technical text-primary mt-2">${item.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProductDetail;
