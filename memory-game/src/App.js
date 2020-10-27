import React from 'react';
import './App.css';
import MemoryCard from './components/MemoryCard';
function generateDeck(){
  const symbols = ['∆', 'ß', '£', '§', '•', '$', '+', 'ø']
  let deck = [];
  for (let index = 0; index < 16; index++) {
    deck.push({
      isFlipped: false,
      symbol: symbols[index%8],
    })
  }
  return shuffle(deck)
}
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      deck: generateDeck(),
      pickedCards: []
    }
  }

  unflipCards = (card1Index, card2Index) => {
    const card1 = {...this.state.deck[card1Index]}
    const card2 = {...this.state.deck[card2Index]}
    card1.isFlipped = false;
    card2.isFlipped = false;

    const newDeck = this.state.deck.map((card, index)=>{
      if (index === card1Index){
        return card1
      }
      if (index === card2Index) {
        return card2
      }
      return card
    })
    
    this.setState({deck:newDeck})
  }

  pickedCard = (cardIndex) => {
    if (this.state.deck[cardIndex].isFlipped){
      return 
    }
    const cardToFlip = {...this.state.deck[cardIndex]};
    cardToFlip.isFlipped = true;

    let newPickedCards = this.state.pickedCards.concat(cardIndex)

    let newDeck = this.state.deck.map((card, index) => {
      if (cardIndex ===  index) {
        return cardToFlip
      }
      return card  
  })

    if (newPickedCards.length === 2) {
      const card1Index = newPickedCards[0]
      const card2Index = newPickedCards[1]

      if(newDeck[card1Index].symbol !== newDeck[card2Index].symbol) {
        setTimeout(() => {this.unflipCards(card1Index, card2Index)}, 1000)
      }
      newPickedCards = []
    }

      this.setState({
        deck: newDeck,
        pickedCards: newPickedCards
      })
    };

    resetGame = () => {
      this.setState({
        deck: generateDeck(),
        pickedCards: []
    })
  }
    

  render(){
    const cardsJSX = this.state.deck.map((card, index)=>{
      return <MemoryCard key={index} symbol={card.symbol} isFlipped={card.isFlipped}
      pickCard={this.pickedCard.bind(this, index)} />
    })
    return (
  <div className="App">
    <header className="App-header">
    Memory Game
    <p>Match Cards to win</p>
    </header>
    <div className='grid'>   
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
    <button onClick={this.resetGame}>Reset Game</button>
  </div>
);
}
}
export default App;