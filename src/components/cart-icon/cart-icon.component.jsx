import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartState } from "../../contexts/cart.context";
import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItemCount } = CartState();

  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartItemCount}</span>
    </div>
  );
};

export default CartIcon;
