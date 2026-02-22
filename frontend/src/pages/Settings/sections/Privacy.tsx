import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import {
  Download,
  Trash2
} from "lucide-react";


export default function Privacy() {
  return (
    <TabsContent value="privacy">
      <div className="blueprint-card p-6 space-y-6">
        <h3 className="font-technical text-primary uppercase tracking-wider">
          Privacy Settings
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-medium">Public Profile</div>
              <div className="text-sm text-muted-foreground">Allow anyone to see your profile</div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-medium">Show Email</div>
              <div className="text-sm text-muted-foreground">Display email on your public profile</div>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-medium">Show Purchase History</div>
              <div className="text-sm text-muted-foreground">Let others see what you've purchased</div>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-medium">Allow Messages</div>
              <div className="text-sm text-muted-foreground">Receive direct messages from other users</div>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      <div className="blueprint-card p-6 space-y-6 mt-6">
        <h3 className="font-technical text-primary uppercase tracking-wider">
          Data & Downloads
        </h3>

        <div className="space-y-4">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download My Data
          </Button>
          <p className="text-sm text-muted-foreground">
            Download a copy of all your data, including purchases, designs, and account information.
          </p>
        </div>
      </div>

      <div className="blueprint-card p-6 space-y-6 mt-6 border-destructive/30">
        <h3 className="font-technical text-destructive uppercase tracking-wider">
          Danger Zone
        </h3>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
        </div>
      </div>
    </TabsContent>
  )
}