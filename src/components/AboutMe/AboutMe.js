import "./AboutMe.css";
import avatar from "../../images/pic__COLOR_pic.png";

function AboutMe() {
  return (
    <div className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__info">
        <div className="aboit-me__info-text">
          <h3 className="about-me__text-title">Виталий</h3>
          <p className="about-me__text-personal-info">
            Фронтенд-разработчик, 30 лет
          </p>
          <p className="about-me__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a className="about-me__link" target="_blank" href="https://vk.com/icannotdoitanymore" rel="noreferrer">
            Facebook
          </a>
          <a className="about-me__link" target="_blank" href="https://github.com/KatunovaKate" rel="noreferrer">
            Github
          </a>
        </div>
        <img className="about-me__avatar" src={avatar} alt='avatar' />
      </div>
    </div>
  );
}

export default AboutMe;
