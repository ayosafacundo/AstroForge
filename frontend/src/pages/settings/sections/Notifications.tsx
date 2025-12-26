import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";

export default function Notifications() {
  return (
    <TabsContent value="notifications">
            <div className="blueprint-card p-6 space-y-6">
              <h3 className="font-technical text-primary uppercase tracking-wider">
                Email Notifications
              </h3>

              <div className="space-y-4">
                {[
                  { id: "newFollower", label: "New followers", desc: "When someone follows your profile" },
                  { id: "newComment", label: "New comments", desc: "When someone comments on your designs" },
                  { id: "newLike", label: "Likes", desc: "When someone likes your designs" },
                  { id: "salesAlert", label: "Sales alerts", desc: "When your designs are purchased" },
                  { id: "promotions", label: "Promotions", desc: "Special offers and discounts" },
                  { id: "newsletter", label: "Newsletter", desc: "Weekly digest of trending designs" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.desc}</div>
                    </div>
                    <Switch defaultChecked={item.id !== "newsletter"} />
                  </div>
                ))}
              </div>
            </div>

            <div className="blueprint-card p-6 space-y-6 mt-6">
              <h3 className="font-technical text-primary uppercase tracking-wider">
                Push Notifications
              </h3>

              <div className="space-y-4">
                {[
                  { id: "pushAll", label: "Enable push notifications", desc: "Receive notifications in your browser" },
                  { id: "pushSales", label: "Sales only", desc: "Only notify for sales and purchases" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.desc}</div>
                    </div>
                    <Switch />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
  )
}