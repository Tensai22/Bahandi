import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/props/Card";
import "./CardCSS.css";
import Loader from "../components/loader/loader";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function BurgersPage() {
  const [burgers, setBurgers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
        if (!isAuthenticated) {
            navigate('/register');
        }
    }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchBurgers = async () => {
      try {
        const res = await axios.get("https://a8b7ddd6558fddf5.mokky.dev/burgers");
        setBurgers(res.data);
      } catch (err) {
        console.error("Ошибка загрузки бургеров:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBurgers();
  }, []);

  if (loading) return <Loader text="Загрузка бургеров..." />;

  if (!isAuthenticated) {
        return null; 
    }

  return (
    <>
      <div className="drink-list">
        {burgers.map((burger, index) => (
          <Card key={index} {...burger} />
        ))}
      </div>
    </>
  );
}

export default BurgersPage;
