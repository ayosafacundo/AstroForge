import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import {
  Image as ImageIcon,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SuggestedUser, Post as TPost, TrendingTopic } from "@/Mockdata/Mockdatatypes";
import Post from "./Components/Post";
import LeftSidebar from "./Components/LeftSidebar";
import RightSidebar from "./Components/RightSidebar";

export default function Community( { mockPosts, trendingTopics, suggestedUsers }: {mockPosts: TPost[], trendingTopics:TrendingTopic[], suggestedUsers:SuggestedUser[]}) {
  const [posts, setPosts] = useState<TPost[]>(mockPosts);
  const [newPost, setNewPost] = useState("");

  const toggleLike = (postId: number) => {
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
          <LeftSidebar trendingTopics={trendingTopics} />
          {/* Main Feed */}
          <main className="lg:col-span-6">
            {/* Header */}
            <div className="mb-6">
              <h1 className="font-technical text-3xl text-primary uppercase tracking-wider blueprint-glow">
                For you
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
                <Post post={post} index={index} toggleLike={toggleLike}/>
              ))}
            </div>
          </main>

          {/* Right Sidebar */}
          <RightSidebar suggestedUsers={suggestedUsers} />
        </div>
      </div>
    </Layout>
  );
};
