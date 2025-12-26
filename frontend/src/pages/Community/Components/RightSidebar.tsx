import { SuggestedUser } from "@/Mockdata/Mockdatatypes";
import User from "./User";

export default function RightSidebar({suggestedUsers}: {suggestedUsers: SuggestedUser[]}) {
    return (
        <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Suggested Users */}
              <div className="blueprint-card p-4">
                <h3 className="font-technical text-sm text-primary uppercase tracking-wider mb-4">
                  Who to Follow
                </h3>
                <div className="space-y-4">
                  {suggestedUsers.map((user) => (
                    <User user={user} />
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
                    No spam
                  </li>
                </ul>
              </div>
            </div>
          </aside>
    )
}