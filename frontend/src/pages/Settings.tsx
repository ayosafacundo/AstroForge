import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Palette,
  Download,
  Trash2,
  Save,
  ChevronLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-technical text-2xl text-primary uppercase tracking-wider">
              Settings
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your account preferences
            </p>
          </div>
        </div>

        <Tabs defaultValue="account" className="space-y-8">
          <TabsList className="w-full justify-start bg-card border border-border p-1 h-auto flex-wrap">
            <TabsTrigger value="account" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <User className="w-4 h-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Shield className="w-4 h-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <CreditCard className="w-4 h-4" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Palette className="w-4 h-4" />
              Appearance
            </TabsTrigger>
          </TabsList>

          {/* Account Settings */}
          <TabsContent value="account">
            <div className="blueprint-card p-6 space-y-6">
              <h3 className="font-technical text-primary uppercase tracking-wider">
                Profile Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Alex" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Designer" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="alexdesigner" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="alex@designer.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  defaultValue="3D printing enthusiast | Mechanical designs | Open source advocate"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" type="url" placeholder="https://your-website.com" />
              </div>

              <div className="pt-4 border-t border-dashed border-border">
                <Button variant="blueprint">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>

            {/* Password Change */}
            <div className="blueprint-card p-6 space-y-6 mt-6">
              <h3 className="font-technical text-primary uppercase tracking-wider">
                Change Password
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>

              <Button variant="outline">Update Password</Button>
            </div>
          </TabsContent>

          {/* Notifications */}
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

          {/* Privacy */}
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

          {/* Billing */}
          <TabsContent value="billing">
            <div className="blueprint-card p-6 space-y-6">
              <h3 className="font-technical text-primary uppercase tracking-wider">
                Current Plan
              </h3>

              <div className="p-4 border border-primary/30 rounded-lg bg-primary/5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-technical text-lg text-primary">PRO MEMBER</div>
                    <div className="text-sm text-muted-foreground">$9.99/month</div>
                  </div>
                  <Button variant="outline">Upgrade</Button>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                Your next billing date is <strong>January 15, 2025</strong>
              </div>
            </div>

            <div className="blueprint-card p-6 space-y-6 mt-6">
              <h3 className="font-technical text-primary uppercase tracking-wider">
                Payment Method
              </h3>

              <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">
                  VISA
                </div>
                <div>
                  <div className="font-medium">•••• •••• •••• 4242</div>
                  <div className="text-sm text-muted-foreground">Expires 12/26</div>
                </div>
                <Button variant="ghost" size="sm" className="ml-auto">
                  Edit
                </Button>
              </div>

              <Button variant="outline">Add Payment Method</Button>
            </div>

            <div className="blueprint-card p-6 space-y-6 mt-6">
              <h3 className="font-technical text-primary uppercase tracking-wider">
                Billing History
              </h3>

              <div className="space-y-2">
                {[
                  { date: "Dec 15, 2024", amount: "$9.99", status: "Paid" },
                  { date: "Nov 15, 2024", amount: "$9.99", status: "Paid" },
                  { date: "Oct 15, 2024", amount: "$9.99", status: "Paid" },
                ].map((invoice, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-dashed border-border last:border-0">
                    <span className="text-sm">{invoice.date}</span>
                    <span className="text-sm font-medium">{invoice.amount}</span>
                    <span className="text-xs text-success">{invoice.status}</span>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Appearance */}
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
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
