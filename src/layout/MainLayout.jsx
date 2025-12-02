import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./MainLayout.css";
import { useEffect, useState } from "react";

function MainLayout() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    console.log("Текущий путь:", location.pathname);

    if (location.pathname.includes("burgers")) setPageTitle("Бургеры");
    else if (location.pathname.includes("drinks")) setPageTitle("Напитки");
    else if (location.pathname.includes("combo")) setPageTitle("Комбо");
    else if (location.pathname.includes("cart")) setPageTitle("Корзина");
    else setPageTitle("");
  }, [location.pathname]);

  return (
    <div className="app-layout">
      <Header />

      {pageTitle && (
        <h1 className="page-title">{pageTitle}</h1>
      )}

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;