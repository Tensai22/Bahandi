import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/props/Card";
import Loader from "../components/loader/Loader";
import "./CardCSS.css";

function DrinksPage() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const res = await axios.get("https://a8b7ddd6558fddf5.mokky.dev/drinks");
        setDrinks(res.data);
      } catch (err) {
        console.error("Ошибка загрузки напитков:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrinks();
  }, []);

  if (loading) return <Loader text="Загрузка напитков..." />;

  return (
    <>
      <div className="drink-list">
        {drinks.map((drink, index) => (
          <Card key={index} {...drink} />
        ))}
      </div>
    </>
  );
}

export default DrinksPage;
