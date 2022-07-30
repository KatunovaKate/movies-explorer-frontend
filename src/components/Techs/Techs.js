import "./Techs.css";

function Techs() {
  return (
    <div className="techs">
      <div className="techs__container">
        <h2 className="techs__title">Технологии</h2>
        <h3 className="techs__text-title">7 технологий</h3>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__list-of-techs">
          <li className="techs__tech">HTML</li>
          <li className="techs__tech">CSS</li>
          <li className="techs__tech">JS</li>
          <li className="techs__tech">React</li>
          <li className="techs__tech">Git</li>
          <li className="techs__tech">Express.js</li>
          <li className="techs__tech">mongoDB</li>
        </ul>
      </div>
    </div>
  );
}

export default Techs;
