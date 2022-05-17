import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__contacts">
        <p className="footer__data">&copy; 2020</p>
        <ul className="footer__links">
          <li className="footer__link">
            <a className='footer__link-src' target="_blank" href="https://practicum.yandex.ru/profile/web/" rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li className="footer__link">
            <a className='footer__link-src' target="_blank" href="https://github.com/" rel="noreferrer">Github</a>
          </li>
          <li className="footer__link">
            <a className='footer__link-src' target="_blank" href="https://facebook.com/" rel="noreferrer">Facebook</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
