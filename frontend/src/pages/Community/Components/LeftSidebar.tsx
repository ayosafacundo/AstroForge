import { TrendingTopic } from "@/Mockdata/Mockdatatypes";
import {   
    TrendingUp,
    MessageCircle,
    Users,
    Award,
} from "lucide-react";


export default function LeftSidebar({trendingTopics}:{trendingTopics: TrendingTopic[]}) {
    return (
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
    )
}