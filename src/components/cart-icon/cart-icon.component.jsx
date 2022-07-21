import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { ACTION_TYPES, CartState } from "../../contexts/cart.context";
import { createAction } from "../../utils/reducer.utils";
import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { cartItemCount, cartDispatch } = CartState();

  const toggleIsCartOpen = () => {
    cartDispatch(createAction(ACTION_TYPES.TOGGLE_CART_OPEN));
  };

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartItemCount}</span>
    </div>
  );
};

export default CartIcon;
