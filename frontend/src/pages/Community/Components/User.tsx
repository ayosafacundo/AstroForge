import { SuggestedUser } from "@/Mockdata/Mockdatatypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";


export default function User({ user }: { user: SuggestedUser }) {
    return (
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
    )
}