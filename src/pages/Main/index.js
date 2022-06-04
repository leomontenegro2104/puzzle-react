import './style.css';
import logo from '../../assets/Logo.svg';
import { useState } from 'react';
import cardsData from '../../cards'
import cardBack from '../../assets/card-back.png'

function Main() {

  const [cards, setCards] = useState(cardsData);
  let [turnedCard, setTurnedCard] = useState(0);
  const [comparedCards, setComparedCards] = useState([]);

  function handleClick(turned, id, card) {
    const localCards = [...cards];
    let localComparedCards = [...comparedCards];
    const indexCards = localCards.findIndex(card => card.id === id);
    const indexComparedCard = localComparedCards.findIndex(card => card.id === id)
    if (!turned && turnedCard < 2) {
      localCards[indexCards].turned = true;
      setTurnedCard(turnedCard + 1);
      localComparedCards.push(card);
      setComparedCards(localComparedCards)
    } else if (turned) {
      localCards[indexCards].turned = false;
      setTurnedCard(turnedCard - 1);
      localComparedCards.splice(indexComparedCard, 1);
      setComparedCards(localComparedCards)
    }
    setCards(localCards);

    if (localComparedCards.length >= 2) {
      const sameName = localComparedCards.every(cardCompared => cardCompared.slug === card.slug);
      if (sameName) {
        console.log('Acertou');
        const tempArray = localCards.filter(card => card.slug !== localComparedCards[0].slug)
        setTimeout(() => {
          setCards(tempArray);
        }, 1000);
      } else {
        console.log('Errou');
        console.log(localCards);
        setTimeout(() => {
          const tempArray = localCards.map(card => {
            if (card.turned) {
              return { ...card, turned: false }
            } else {
              return card
            }
          });
          setCards(tempArray);
        }, 1000);
      }
      setComparedCards([]);
      setTurnedCard(0);
    }
  }

  function handleResetClick() {
    document.location.reload(true);
  }

  return (
    <div className='container'>
      <div className='container__sidebar'>
        <img src={logo} alt='Logo' />
        <button
          className='container__btn-reset'
          onClick={() => handleResetClick()}
        >
          Reset
        </button>
      </div>
      <div className='container__cards'>
        {cards.length !== 0 ?
          (cards.map(card => (
            <div key={card.id}>
              <img
                src={card.turned ? card.image : cardBack}
                alt={card.slug}
                className='card'
                onClick={() => handleClick(card.turned, card.id, card)}
              />
            </div>
          ))) :
          <div className='congrats'></div>
        }
      </div>
    </div>
  );
}

export default Main;
