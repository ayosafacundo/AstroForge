import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  MoreHorizontal,
  Image as ImageIcon,
  Send,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Post {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  reposts: number;
  timestamp: string;
  isLiked: boolean;
}

const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "DragonForge",
      username: "@dragonforge",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
      verified: true,
    },
    content: "Just finished my latest articulated dragon design! 🐉 45 segments of pure printable awesomeness. Link in bio. #3Dprinting #ArtDesign",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    likes: 342,
    comments: 56,
    reposts: 89,
    timestamp: "2h",
    isLiked: false,
  },
  {
    id: "2",
    author: {
      name: "MechLab Studio",
      username: "@mechlab",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop",
      verified: true,
    },
    content: "Pro tip: When printing mechanical parts, use 0.12mm layer height for smoother gear action. Your mechanisms will thank you! 🔧⚙️",
    likes: 567,
    comments: 123,
    reposts: 234,
    timestamp: "4h",
    isLiked: true,
  },
  {
    id: "3",
    author: {
      name: "PrintNewbie",
      username: "@printnewbie",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      verified: false,
    },
    content: "My first successful print! It's not perfect but I'm so happy it worked 😭 Thanks to this amazing community for all the help!",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
    likes: 1243,
    comments: 245,
    reposts: 45,
    timestamp: "6h",
    isLiked: false,
  },
  {
    id: "4",
    author: {
      name: "RoboBuilder",
      username: "@robobuilder",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      verified: true,
    },
    content: "Working on a new hexapod robot chassis. 18 servos, fully 3D printed joints. Who wants to see the design files? 🤖",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
    likes: 892,
    comments: 178,
    reposts: 312,
    timestamp: "8h",
    isLiked: false,
  },
];

const trendingTopics = [
  { tag: "#ArticulatedPrints", posts: "12.4K" },
  { tag: "#MechanicalMarvels", posts: "8.7K" },
  { tag: "#ResinLife", posts: "6.2K" },
  { tag: "#PrintFails", posts: "5.1K" },
  { tag: "#NewDesigner", posts: "4.3K" },
];

const suggestedUsers = [
  { name: "CosplayMaster", username: "@cosplaymaster", avatar: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=100&h=100&fit=crop" },
  { name: "TechPrints", username: "@techprints", avatar: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=100&h=100&fit=crop" },
  { name: "ArtisticMolds", username: "@artisticmolds", avatar: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop" },
];

const Community = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPost, setNewPost] = useState("");

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Stats Card */}
              <div className="blueprint-card p-4">
                <h3 className="font-technical text-sm text-primary uppercase tracking-wider mb-4">
                  Community Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" /> Members
                    </span>
                    <span className="text-primary font-mono">124.5K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MessageCircle className="w-4 h-4" /> Posts Today
                    </span>
                    <span className="text-primary font-mono">3,421</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Award className="w-4 h-4" /> Top Creators
                    </span>
                    <span className="text-primary font-mono">892</span>
                  </div>
                </div>
              </div>

              {/* Trending */}
              <div className="blueprint-card p-4">
                <h3 className="font-technical text-sm text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Trending
                </h3>
                <div className="space-y-3">
                  {trendingTopics.map((topic) => (
                    <a
                      key={topic.tag}
                      href="#"
                      className="block hover:bg-primary/5 p-2 -mx-2 rounded transition-colors"
                    >
                      <div className="text-primary text-sm">{topic.tag}</div>
                      <div className="text-xs text-muted-foreground">{topic.posts} posts</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Feed */}
          <main className="lg:col-span-6">
            {/* Header */}
            <div className="mb-6">
              <h1 className="font-technical text-3xl text-primary uppercase tracking-wider blueprint-glow">
                Community
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Share your prints, get inspired, connect with creators
              </p>
            </div>

            {/* New Post */}
            <div className="blueprint-card p-4 mb-6">
              <div className="flex gap-3">
                <Avatar className="w-10 h-10 border border-primary/30">
                  <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Share your latest print..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="bg-input border-border min-h-[80px] resize-none"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <Button variant="ghost" size="sm">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Add Image
                    </Button>
                    <Button variant="default" size="sm" disabled={!newPost.trim()}>
                      <Send className="w-4 h-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.map((post, index) => (
                <article
                  key={post.id}
                  className="blueprint-card p-4 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Author */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 border border-primary/30">
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-foreground">
                            {post.author.name}
                          </span>
                          {post.author.verified && (
                            <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                              <span className="text-[10px] text-primary-foreground">✓</span>
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {post.author.username} · {post.timestamp}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Content */}
                  <p className="text-foreground mb-3 whitespace-pre-wrap">
                    {post.content}
                  </p>

                  {/* Image */}
                  {post.image && (
                    <div className="relative mb-3 rounded overflow-hidden border border-border">
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full h-auto"
                      />
                      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-dashed border-border">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        post.isLiked ? "text-destructive" : "text-muted-foreground hover:text-destructive"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </button>
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-success transition-colors">
                      <Repeat2 className="w-4 h-4" />
                      {post.reposts}
                    </button>
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Share className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Suggested Users */}
              <div className="blueprint-card p-4">
                <h3 className="font-technical text-sm text-primary uppercase tracking-wider mb-4">
                  Who to Follow
                </h3>
                <div className="space-y-4">
                  {suggestedUsers.map((user) => (
                    <div key={user.username} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 border border-primary/30">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium text-foreground">
                            {user.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {user.username}
                          </div>
                        </div>
                      </div>
                      <Button variant="blueprint" size="sm">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guidelines */}
              <div className="blueprint-card p-4">
                <h3 className="font-technical text-sm text-primary uppercase tracking-wider mb-4">
                  Community Guidelines
                </h3>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Be respectful to all members
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Share original content only
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Credit original designers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    No spam or self-promotion
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
