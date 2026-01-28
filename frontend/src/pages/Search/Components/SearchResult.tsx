import { Product } from "@/Mockdata/Mockdatatypes";
import { ProductCard } from "./ProductCard";
import { Link } from "react-router-dom";
import React from "react";

interface props {
  product: Product,
  index: number,
  addToQuery:  any,
  setCategory: any,
}


function SearchResult({ product, index, addToQuery, setCategory }: props) {
  return (
    <div
      key={product.id}
      className="animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <Link to={`/product/${product.id}`}>
        <ProductCard {...product} key={index} addToQuery={addToQuery} setCategory={setCategory} />
      </Link>
    </div>
  );
}

export default React.memo(SearchResult);