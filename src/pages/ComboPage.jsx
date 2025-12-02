import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/props/Card";
import Loader from "../components/loader/loader";
import "./CardCSS.css";

function ComboPage() {
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCombos = async () => {
      try {
        const res = await axios.get("https://a8b7ddd6558fddf5.mokky.dev/combo");
        setCombos(res.data);
      } catch (err) {
        console.error("Ошибка при загрузке комбо:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCombos();
  }, []);

  if (loading) return <Loader text="Загрузка комбо..." />;

  return (
    <>
      <div className="drink-list">
        {combos.map((combo, index) => (
          <Card key={index} {...combo} />
        ))}
      </div>
    </>
  );
}

export default ComboPage;
