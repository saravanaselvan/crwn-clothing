import { CartState } from "../../contexts/cart.context";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ product }) => {
  const { id, name, price, quantity, imageUrl } = product;
  const { removeItemFromCart, decreaseQuantity, increaseQuantity } =
    CartState();
  const deleteItem = () => {
    removeItemFromCart(product);
  };

  const decreaseItemQuantity = () => decreaseQuantity(product);
  const increaseItemQuantity = () => increaseQuantity(product);
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
