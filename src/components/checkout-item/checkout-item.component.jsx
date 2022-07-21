import { CartState, ACTION_TYPES } from "../../contexts/cart.context";
import { createAction } from "../../utils/reducer.utils";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ product }) => {
  const { name, price, quantity, imageUrl } = product;
  const { cartDispatch } = CartState();
  const deleteItem = () => {
    cartDispatch(createAction(ACTION_TYPES.REMOVE_FROM_CART, product));
  };

  const decreaseItemQuantity = () =>
    cartDispatch(createAction(ACTION_TYPES.DECREASE_QUANTITY, product));
  const increaseItemQuantity = () =>
    cartDispatch(createAction(ACTION_TYPES.INCREASE_QUANTITY, product));
  return (
    <div className="checkout-item-container">
      <div>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <div className="name">{name}</div>
      <div className="quantity">
        <span onClick={decreaseItemQuantity}>&#10094;</span>
        <span>{quantity}</span>
        <span onClick={increaseItemQuantity}>&#10095;</span>
      </div>
      <div className="price">{price}</div>
      <div className="remove-icon" onClick={deleteItem}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
