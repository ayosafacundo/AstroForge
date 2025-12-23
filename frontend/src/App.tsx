import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index/Index";
import Categories from "./pages/Categories";
import Promotions from "./pages/Promotions";
import Community from "./pages/Community";
import Discover from "./pages/Discover";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import SearchResults from "./pages/SearchResults";
import Settings from "./pages/Settings";
import ImportProject from "./pages/ImportProject";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import * as mockdata from "./Mockdata/index";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* <Toaster />
      <Sonner /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/categories" element={<Categories categories={mockdata.Categories}/>} />
          <Route path="/categories/:category" element={<Categories categories={mockdata.Categories}/>} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/promotions/:promotion" element={<Promotions />} />
          <Route path="/community" element={<Community />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/discover/:theme" element={<Discover />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/import" element={<ImportProject />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
