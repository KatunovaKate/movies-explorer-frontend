import "./AboutProject.css";

function AboutProject() {
  return (
    <div className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__text-block">
        <div className="about-project__text-block-column">
          <h3 className="about-project__text-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__text-block-column">
          <h3 className="about-project__text-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__timeline-schema">
        <p className="about-project__timeline-schema-element about-project__timeline-schema-element_type_white">
          1 неделя
        </p>
        <p className="about-project__timeline-schema-element">4 недели</p>
        <p className="about-project__timeline-schema-caption">Back-end</p>
        <p className="about-project__timeline-schema-caption">Front-end</p>
      </div>
    </div>
  );
}

export default AboutProject;
