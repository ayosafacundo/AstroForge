import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  MoreHorizontal,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Post as TPost } from "@/Mockdata/Mockdatatypes";


export default function Post({post, index, toggleLike}: {post: TPost, index: number, toggleLike: (id:number) => void}) {
    return (
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
    )
}