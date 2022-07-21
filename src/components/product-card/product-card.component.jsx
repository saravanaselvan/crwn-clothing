import { useReducer } from "react";
import {
  ACTION_TYPES,
  CartReducer,
  CartState,
} from "../../contexts/cart.context";
import { createAction } from "../../utils/reducer.utils";
import Button from "../button/button.component";
import "./product-card.styles.scss";

const ProductCard = (product) => {
  const { name, price, imageUrl } = product;
  const { cartDispatch } = CartState();
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        buttonType="inverted"
        onClick={() =>
          cartDispatch(createAction(ACTION_TYPES.ADD_TO_CART, product))
        }
      >
        ADD TO CART
      </Button>
    </div>
  );
};

export default ProductCard;
