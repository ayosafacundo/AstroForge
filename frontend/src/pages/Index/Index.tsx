import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import featuredProducts from "@/Mockdata/data/Products.json";
import featuredPromotions from "@/Mockdata/data/Promotions.json";
import categoryPromotions from "@/Mockdata/data/CategoryPromotions.json"
import Dashscreen from "./UI/Dashscreen";
import Featured from "./UI/Featured";
import Product from "./UI/Products";
import Category from "./UI/Category";
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
