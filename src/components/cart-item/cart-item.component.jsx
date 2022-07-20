import "./cart-item.styles.scss";

const CartItem = ({ imageUrl, quantity, price, name }) => {
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="cart-item__product-details">
        <span>{name}</span>
        <span>
          {quantity} x {price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
