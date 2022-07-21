import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CategoriesState } from "../../contexts/categories.context";
import ProductCard from "../product-card/product-card.component";
import "./products.styles.scss";

const Products = () => {
  const { category } = useParams();

  const { categoriesMap } = CategoriesState();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]);

  return (
    <>
      <h1 style={{ textTransform: "capitalize", textAlign: "center" }}>
        {category}
      </h1>
      <div className="products-container">
        {products &&
          products.map((product) => {
            console.log(product);
            return <ProductCard key={product.id} {...product} />;
          })}
      </div>
    </>
  );
};

export default Products;
