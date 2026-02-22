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



export default function Billing() {
  return (
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
  )
}