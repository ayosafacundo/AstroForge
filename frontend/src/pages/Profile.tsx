import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/pages/Search/Components/ProductCard";
import {
  Settings,
  ShoppingBag,
  Heart,
  Download,
  Star,
  Edit,
  Camera,
  LogOut,
  MessageSquare,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

// Mock user data
const userData = {
  name: "Alex Designer",
  username: "@alexdesigner",
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop",
  bio: "3D printing enthusiast | Mechanical designs | Open source advocate",
  stats: {
    designs: 47,
    downloads: 12400,
    followers: 892,
    following: 234,
  },
  joinDate: "March 2023",
};

const userPurchases = [
  {
    id: "p1",
    name: "Articulated Dragon XL",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    creator: "DragonForge",
    category: "Figurines",
  },
  {
    id: "p2",
    name: "Mechanical Spider Bot",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop",
    creator: "MechLab",
    category: "Robotics",
  },
];

const userFavorites = [
  {
    id: "f1",
    name: "Crystal Lamp Design",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    creator: "LightWorks",
    category: "Decor",
  },
  {
    id: "f2",
    name: "Gear Clock Mechanism",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400&h=400&fit=crop",
    creator: "ClockWorks",
    category: "Mechanical",
  },
];

const userDesigns = [
  {
    id: "d1",
    name: "Modular Phone Stand",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop",
    creator: "Alex Designer",
    category: "Functional",
  },
];

const userPosts = [
  {
    id: "post1",
    content: "Just finished my new articulated dragon design! 🐉 Print time: 8 hours. What do you think?",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    likes: 234,
    comments: 45,
    timestamp: "2 hours ago",
  },
  {
    id: "post2",
    content: "Pro tip: Use PETG for mechanical parts that need flexibility. The gear clock project turned out amazing!",
    likes: 156,
    comments: 23,
    timestamp: "1 day ago",
  },
  {
    id: "post3",
    content: "New tutorial coming soon: How to design print-in-place mechanisms. Stay tuned! 🔧",
    likes: 89,
    comments: 12,
    timestamp: "3 days ago",
  },
];

const Profile = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="blueprint-card p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative mx-auto md:mx-0">
              <Avatar className="w-32 h-32 border-2 border-primary blueprint-box-glow">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback className="text-2xl">{userData.name[0]}</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                <h1 className="font-technical text-2xl text-primary uppercase tracking-wider">
                  {userData.name}
                </h1>
                <span className="text-muted-foreground">{userData.username}</span>
              </div>
              <p className="text-muted-foreground mb-4">{userData.bio}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-4">
                <div className="text-center">
                  <div className="font-technical text-xl text-primary">{userData.stats.designs}</div>
                  <div className="text-xs text-muted-foreground">Designs</div>
                </div>
                <div className="text-center">
                  <div className="font-technical text-xl text-primary">{userData.stats.downloads.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Downloads</div>
                </div>
                <div className="text-center">
                  <div className="font-technical text-xl text-primary">{userData.stats.followers}</div>
                  <div className="text-xs text-muted-foreground">Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-technical text-xl text-primary">{userData.stats.following}</div>
                  <div className="text-xs text-muted-foreground">Following</div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <Button variant="blueprint" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Link to="/settings">
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-dashed border-border">
            <p className="text-xs text-muted-foreground text-center md:text-left">
              Member since {userData.joinDate} • <Star className="w-3 h-3 inline text-warning" /> Pro Member
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="purchases" className="w-full">
          <TabsList className="w-full justify-start bg-card border border-border mb-8 p-1 h-auto flex-wrap">
            <TabsTrigger value="purchases" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ShoppingBag className="w-4 h-4" />
              Purchases
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Heart className="w-4 h-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="designs" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Download className="w-4 h-4" />
              My Designs
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MessageSquare className="w-4 h-4" />
              Posts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="purchases">
            <div className="mb-4">
              <h2 className="font-technical text-xl text-primary uppercase tracking-wider">
                Your Purchases
              </h2>
              <p className="text-sm text-muted-foreground">
                Models you've purchased and can download anytime
              </p>
            </div>
            {userPurchases.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {userPurchases.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="blueprint-card p-8 text-center">
                <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No purchases yet</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites">
            <div className="mb-4">
              <h2 className="font-technical text-xl text-primary uppercase tracking-wider">
                Your Favorites
              </h2>
              <p className="text-sm text-muted-foreground">
                Models you've saved for later
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {userFavorites.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="designs">
            <div className="mb-4">
              <h2 className="font-technical text-xl text-primary uppercase tracking-wider">
                Your Designs
              </h2>
              <p className="text-sm text-muted-foreground">
                Models you've created and shared with the community
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {userDesigns.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard {...product} />
                </div>
              ))}
              {/* Add New Design Card */}
              <Link to="/import" className="blueprint-card border-dashed flex flex-col items-center justify-center min-h-[280px] hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="w-16 h-16 border border-primary/30 rounded-full flex items-center justify-center mb-4 group-hover:border-primary group-hover:bg-primary/10 transition-all">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <span className="text-muted-foreground group-hover:text-primary transition-colors">
                  Upload New Design
                </span>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="posts">
            <div className="mb-4">
              <h2 className="font-technical text-xl text-primary uppercase tracking-wider">
                Your Posts
              </h2>
              <p className="text-sm text-muted-foreground">
                Posts you've shared with the community
              </p>
            </div>
            <div className="space-y-4">
              {userPosts.map((post) => (
                <div key={post.id} className="blueprint-card p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={userData.avatar} />
                      <AvatarFallback>{userData.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{userData.name}</span>
                        <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                      </div>
                      <p className="text-sm mb-3">{post.content}</p>
                      {post.image && (
                        <img src={post.image} alt="" className="rounded-lg border border-border mb-3 max-h-64 object-cover" />
                      )}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" /> {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" /> {post.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
