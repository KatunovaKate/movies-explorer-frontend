import './Portfolio.css'
import arrow from '../../images/text__COLOR_font-main.svg'

function Portfolio() {
    return (
      <div className='portfolio'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__list'>
          <li className='portfolio__list-item'>
            <a className='portfolio__list-item-src' target="_blank" href="https://github.com/KatunovaKate/how-to-learn" rel="noreferrer">
              <p className='portfolio__list-item-text'>Статичный сайт</p>
              <img className='portfolio__list-item-image' src={arrow} alt='arrow-link' />
            </a>
          </li>
          <li className='portfolio__list-item'>
            <a className='portfolio__list-item-src' target="_blank" href="https://github.com/KatunovaKate/russian_travel" rel="noreferrer">
              <p className='portfolio__list-item-text'>Адаптивный сайт</p>
              <img className='portfolio__list-item-image' src={arrow} alt='arrow-link' />
            </a>
          </li>
          <li className='portfolio__list-item'>
            <a className='portfolio__list-item-src' target="_blank" href="https://github.com/KatunovaKate/react-mesto-auth" rel="noreferrer">
              <p className='portfolio__list-item-text'>Одностраничное приложение</p>
              <img className='portfolio__list-item-image' src={arrow} alt='arrow-link' />
            </a>
          </li>
        </ul>
      </div>
    );
  }
  
  export default Portfolio;
  