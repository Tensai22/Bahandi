import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProductPage.css";

function ProductPage() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get(`https://a8b7ddd6558fddf5.mokky.dev/burgers/${id}`).then((res) => {
      setProduct(res.data);
    });

    axios.get(`https://a8b7ddd6558fddf5.mokky.dev/comments?productId=${id}`).then((res) => {
      setComments(res.data);
    });
  }, [id]);

  const handleSend = async () => {
    if (!text.trim()) return;

    const newComment = {
      productId: id,
      text,
      date: new Date().toISOString(),
    };

    const res = await axios.post(
      "https://a8b7ddd6558fddf5.mokky.dev/comments",
      newComment
    );

    setComments((prev) => [...prev, res.data]); 
    setText("");
  };

  if (!product) return <h2>Загрузка...</h2>;

  return (
    <div className="product-page">
      <img src={product.image} alt={product.name} className="product-img" />

      <h1>{product.name}</h1>
      <h2>{product.price} ₸</h2>

      <h3>Комментарии</h3>

      <textarea
        placeholder="Напишите комментарий..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <button onClick={handleSend}>Отправить</button>

      <div className="comments">
        {comments.map((c) => (
          <div key={c.id} className="comment">
            <p>{c.text}</p>
            <span>{new Date(c.date).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
