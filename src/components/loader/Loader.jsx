import "./Loader.css";

export default function Loader({ text = "Загрузка..." }) {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p className="loading-text">{text}</p>
    </div>
  );
}
