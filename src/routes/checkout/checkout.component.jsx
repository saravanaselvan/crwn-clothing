import { Link } from "react-router-dom";
import CartItem from "../../components/cart-item/cart-item.component";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CartState } from "../../contexts/cart.context";
import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, cartTotal } = CartState();
  return (
    <div className="checkout-container">
      {cartItems.length ? (
        <>
          <div className="header">
            <div>Product</div>
            <div>Description</div>
            <div>Quantity</div>
            <div>Price</div>
            <div>Remove</div>
          </div>
          {cartItems.map((cartItem) => (
            <CheckoutItem key={cartItem.id} product={cartItem} />
          ))}
          <div className="total">Total: $ {cartTotal}</div>
        </>
      ) : (
        <div className="empty-message">
          Your cart is empty
          <div className="go-to-shop">
            <Link to="/shop">Go To Shop</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
