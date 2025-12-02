// src/components/Header.jsx

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; 
import "./Header.css";

const Header = () => {
  const { cartItems } = useCart();
  const { isAuthenticated, userName, logout } = useAuth(); 

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
      logout();
  };

  const displayUserName = userName; 

  return (
    <header>
      <div className="header-inner">
        <div className="logo"><Link to="/all-products">BAHANDI</Link></div>
        
        <div className="main-nav-group">
          
          <nav>
            <ul>
              <li><Link to="/foods/burgers">Бургеры</Link></li>
              <li><Link to="/foods/drinks">Напитки</Link></li>
              <li><Link to="/foods/combo">Комбо</Link></li>
              <li className="cart">
                <Link to="/cart">Корзина{" "}
                  {totalCount > 0 && <span className="cart-count">{totalCount}</span>}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="auth-controls">
            {isAuthenticated ? (
  <>
    <span className="user-greeting">
      <span className="highlight-name">{displayUserName}</span>
    </span>
    <button onClick={handleLogout} className="auth-button logout-button">
      Выйти
    </button>
  </>
) : (
  <>
    <Link to="/login" className="auth-button login-button">
      Войти
    </Link>
    <Link to="/register" className="auth-button register-button">
      Регистрация
    </Link>
  </>
)}

          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Header;