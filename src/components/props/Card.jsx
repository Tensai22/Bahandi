import React from "react";
import "./Card.css";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

function Card({ id, name, price, volume, image }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const openCard = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container">
      <div className="card" onClick={openCard}>
        <div className="image-container">
          <img src={image} alt={name} className="image" />
        </div>
        <div className="info">
          <h3 className="price">{price} ₸</h3>
          <p className="name">
            {name} {volume}
          </p>
        </div>
      </div>

      <button className="add-to-cart" onClick={() => addToCart({ id, name, price, volume, image })}>
        В корзину
      </button>
    </div>
  );
}

export default Card;
