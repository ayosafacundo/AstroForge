import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

export default function Step3({setUploadStep}) {
  const [selected, setSelected  ] = useState< 1 | 2 | 3 >(1);
  const selectedPricing = "border-primary bg-primary/5";
  const unselectedPricing = "border-border hover:border-primary/50 transition-colors"

  return (
    <div className="space-y-6">
      <div className="blueprint-card p-8 space-y-6">
        <h3 className="font-technical text-primary uppercase tracking-wider">
          Pricing
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className={`p-6 border-2 ${selected == 1 ? selectedPricing : unselectedPricing} rounded-lg cursor-pointer `}
            onClick={() => {setSelected(1)}}
          >
            <div className="font-technical text-lg mb-2">FREE</div>
            <p className="text-sm text-muted-foreground">
              Share your design for free with the community
            </p>
          </div>

          <div className={`p-6 border-2 ${selected == 2 ? selectedPricing : unselectedPricing} rounded-lg cursor-pointer`}
            onClick={() => {setSelected(2)}}>
            <div className="font-technical text-lg mb-2">PAID</div>
            <p className="text-sm text-muted-foreground">
              Set your own price and earn from downloads
            </p>
          </div>

          <div className={`p-6 border-2 ${selected == 3 ? selectedPricing : unselectedPricing} rounded-lg cursor-pointer`}
            onClick={() => {setSelected(3)}}>
            <div className="font-technical text-lg mb-2">PAY WHAT YOU WANT</div>
            <p className="text-sm text-muted-foreground">
              Let buyers choose how much to pay
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-dashed border-border">
          <div className="flex items-start gap-3 p-4 bg-warning/10 border border-warning/30 rounded-lg">
            <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-warning">Pricing Tips</p>
              <p className="text-muted-foreground mt-1">
                Consider the complexity, uniqueness, and time invested in your design. Cheaper designs tend to sell more.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setUploadStep(2)}>
          Back
        </Button>
        <Button variant="blueprint" size="lg" onClick={() => setUploadStep(4)}>
          Continue
        </Button>
      </div>
    </div>
  )
}