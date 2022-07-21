import { CartState } from "../../contexts/cart.context";
import Button from "../button/button.component";
import "./product-card.styles.scss";

const ProductCard = (product) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = CartState();

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={() => addItemToCart(product)}>
        ADD TO CART
      </Button>
    </div>
  );
};

export default ProductCard;
