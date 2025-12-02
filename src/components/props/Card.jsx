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
    <div className="card">
      <div className="image-container" onClick={openCard}>
        <img src={image} alt={name} className="image" />
      </div>
      <div className="info" onClick={openCard}>
        <h3 className="price">{price} ₸</h3>
        <p className="name">
          {name} {volume}
        </p>
      </div>
      <button
        className="add-to-cart"
        onClick={(e) => {
          e.stopPropagation(); 
          addToCart({ id, name, price, volume, image });
        }}
      >
        В корзину
      </button>
    </div>
  );
}


export default Card;
