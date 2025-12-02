import './Footer.css'

const Footer = () => (
    <>
<footer>
  <div className="footer-inner">
    <div className="footer-left">
      <span className="logo">BAHANDI</span>
      <p>© 2025 TOO BAHANDI. Все права защищены.</p>
    </div>

<div className="footer-center">
  <nav>
    <ul>
      <li><h3>Компания</h3></li>
      <li><a href="#">Франшиза</a></li>
      <li><a href="#">Вакансии</a></li>
      <li><a href="#">Оферта</a></li>
      <li><a href="#">Политика конфиденциальности</a></li>
      <li><a href="#">Карта сайта</a></li>
    </ul>
  </nav>
</div>


    <div className="footer-right"></div>
  </div>
</footer>

    </>
);

export default Footer;