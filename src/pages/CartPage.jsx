import { useCart } from "../context/CartContext";

function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: "20px", color: "black" }}>
      {cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cartItems.map((item, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <img
                src={item.image}
                alt={item.name}
                width={80}
                style={{ borderRadius: 8 }}
              />
              <span style={{ marginLeft: 10 }}>
                {item.name} — {item.price} ₸ × {item.quantity}
              </span>
              <button
                onClick={() => removeFromCart(item.name)}
                style={{ marginLeft: 10 }}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
      <h3>Итого: {total} ₸</h3>
    </div>
  );
}

export default CartPage;
