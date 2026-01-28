import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import featuredProducts from "@/Mockdata/data/Products.json";
import featuredPromotions from "@/Mockdata/data/Promotions.json";
import categoryPromotions from "@/Mockdata/data/CategoryPromotions.json"
import Dashscreen from "./Components/Dashscreen";
import Featured from "./Components/Featured";
import Product from "./Components/Products";
import Category from "./Components/Category";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <Dashscreen />

      {/* Featured Promotions */}
      <Featured promotions={featuredPromotions} />

      {/* Featured Products */}
      <Product featuredProducts={featuredProducts}/>

      {/* Category Promotions */}
      <Category categoryPromotions={categoryPromotions} />

      {/* Footer */}
      <Footer />
    </Layout>
  );
};

export default Index;
