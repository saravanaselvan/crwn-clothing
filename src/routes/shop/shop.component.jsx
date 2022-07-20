import ProductCard from "../../components/product-card/product-card.component";
import { ProductsState } from "../../contexts/products.context";
import "./shop.styles.scss";

const Shop = () => {
  const { products } = ProductsState();

  return (
    <div>
      <h2>Buy my products</h2>
      <div className="products-container">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
