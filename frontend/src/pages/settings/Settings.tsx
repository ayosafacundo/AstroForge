import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Palette,
  ChevronLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import Account from "./Sections/Account";
import Notifications from "./Sections/Notifications";
import Privacy from "./Sections/Privacy";
import Billing from "./Sections/Billing";
import Appearance from "./Sections/Appearance";

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
          <Account />

          {/* Notifications */}
          <Notifications />

          {/* Privacy */}
          <Privacy />

          {/* Billing */}
          <Billing />

          {/* Appearance */}
          <Appearance />
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
