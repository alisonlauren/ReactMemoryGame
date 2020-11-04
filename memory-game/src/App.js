import React, { useEffect, useState } from 'react';
import './App.css';

import MemoryCard from './components/MemoryCard';

function generateDeck() {
  const symbols = ['∆', 'ß', '£', '§', '•', '$', '+', 'ø'];
  const deck = [];
  for (let i = 0; i < 16; i++) {
    deck.push({
      isFlipped: false,
      symbol: symbols[i % 8],
    })
  }
  return shuffle(deck);
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function App() {
  const [ deck, setDeck ] = useState(generateDeck());
  const [ pickedCards, setPickedCards ] = useState([])
    
  const pickCard = (cardIndex) => {
    if (deck[cardIndex].isFlipped) {
      return;
    }
    
    const cardToFlip = {...deck[cardIndex]};
    cardToFlip.isFlipped = true;

    const newDeck = deck.map((card, index) => {
      if (cardIndex === index) {
        return cardToFlip;
      }
      return card;
    });
    let newPickedCards = pickedCards.concat(cardIndex);

    setDeck(newDeck)
    setPickedCards(newPickedCards);
  }

  useEffect(() => {
    const unflipCards = (card1Index, card2Index) => {
      const card1 =  {...deck[card1Index]};
      const card2 =  {...deck[card2Index]};
      card1.isFlipped = false;
      card2.isFlipped = false;

      setDeck((currDeck) => {
        return currDeck.map((card, index) => {
          if (card1Index === index) {
            return card1;
          }
          if (card2Index === index) {
            return card2;
          }
          return card;
        })
      })
    }
    
    if (pickedCards.length === 2) {
      const card1Index = pickedCards[0];
      const card2Index = pickedCards[1];
      if (deck[card1Index].symbol !== deck[card2Index].symbol) {
        setTimeout(() => {
          unflipCards(card1Index, card2Index);
        }, 750);
      }
      setPickedCards([]);
    }
  }, [pickedCards, deck]);

  const cardsJSX = deck.map((card, index) => {
    return <MemoryCard
      key={index}
      symbol={card.symbol}
      isFlipped={card.isFlipped}
      pickCard={() => { pickCard(index) }}
    />
  });



  return (
    <div className="App">
      <header className="App-header">
        <h1>Memory Game</h1>
        <h3>Match Two Cards With The Same Symbol To Win!</h3>
      </header>
      <div className="App-cards">
        <div>
        {cardsJSX.slice(0,4)}
        </div>
        <div>
        {cardsJSX.slice(4,8)}
        </div>
        <div>
        {cardsJSX.slice(8,12)}
        </div>
        <div>
        {cardsJSX.slice(12,16)}
        </div>
      </div>
    </div>
  );
}

export default App;