import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import {
  CreditCard,
  Lock,
  ChevronLeft,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

const orderItems = [
  {
    id: "1",
    name: "Articulated Dragon - Flexible Print",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    name: "Mechanical Gear Clock",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=100&h=100&fit=crop",
  },
];

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };

  if (isComplete) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <div className="blueprint-card p-12 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h2 className="font-technical text-2xl text-primary uppercase tracking-wider mb-4">
              Order Complete!
            </h2>
            <p className="text-muted-foreground mb-2">
              Thank you for your purchase. Your files are ready for download.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Order #PF-2024-78432
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/profile">
                <Button variant="blueprint" size="lg">
                  Download Files
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/cart">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="font-technical text-2xl text-primary uppercase tracking-wider">
            Checkout
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Details */}
            <div className="space-y-6">
              <div className="blueprint-card p-6">
                <h3 className="font-technical text-primary uppercase tracking-wider mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" required />
                  </div>
                </div>
              </div>

              <div className="blueprint-card p-6">
                <h3 className="font-technical text-primary uppercase tracking-wider mb-6">
                  Payment Method
                </h3>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-lg has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Credit / Debit Card
                      </div>
                    </Label>
                    <div className="flex gap-1">
                      <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-800 rounded text-[8px] text-white flex items-center justify-center font-bold">
                        VISA
                      </div>
                      <div className="w-8 h-5 bg-gradient-to-r from-red-500 to-orange-500 rounded text-[8px] text-white flex items-center justify-center font-bold">
                        MC
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border border-border rounded-lg has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                      PayPal
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="John Doe" required />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-start gap-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="blueprint-card p-6 sticky top-24">
                <h3 className="font-technical text-primary uppercase tracking-wider mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded border border-border"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium line-clamp-2">{item.name}</h4>
                        <p className="text-sm text-primary font-technical mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-sm border-t border-dashed border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-dashed border-border text-lg font-medium">
                    <span>Total</span>
                    <span className="text-primary font-technical">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="blueprint"
                  size="lg"
                  className="w-full mt-6"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Pay ${total.toFixed(2)}
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                  <ShieldCheck className="w-4 h-4" />
                  Secure checkout powered by Stripe
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
