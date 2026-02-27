import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Appearance() {
  return (
    <TabsContent value="appearance">
      <div className="blueprint-card p-6 space-y-6">
        <h3 className="font-technical text-primary uppercase tracking-wider">
          Theme
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Color Theme</Label>
            <Select defaultValue="blueprint">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blueprint">Blueprint (Default)</SelectItem>
                <SelectItem value="dark">Dark Mode</SelectItem>
                <SelectItem value="light">Light Mode</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Accent Color</Label>
            <Select defaultValue="cyan">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cyan">Cyan</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="purple">Purple</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="blueprint-card p-6 space-y-6 mt-6">
        <h3 className="font-technical text-primary uppercase tracking-wider">
          Display
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-medium">Animations</div>
              <div className="text-sm text-muted-foreground">Enable interface animations</div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-medium">Grid Lines</div>
              <div className="text-sm text-muted-foreground">Show blueprint grid overlay</div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-medium">Technical Annotations</div>
              <div className="text-sm text-muted-foreground">Show blueprint annotations</div>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
    </TabsContent>
  )
}