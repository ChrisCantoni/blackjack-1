import React from 'react';
import { useEffect, useState } from 'react';
import PlantForm from '../PlantForm/PlantForm.jsx';
import PlantList from '../PlantList/PlantList.jsx';

function Table() {


    const [shuffledCards, setShuffledCards] = useState([])
    const [deck, setDeck] = useState([])
    const [playerOneHand, setPlayerOneHand] = useState([])
    const [playerTwoHand, setPlayerTwoHand] = useState([])
        // TODO: Here will be the shuffle dispatch
    // Shuffle itself will happen on the back end, yes?

    // First build the shuffle here.
    // Deal out two cards to both dealer and player
    // If dealer has 21, game over.
   const refreshPage = () => {
    console.log('refreshing page')
   }
    
    useEffect(() => {
        refreshPage()
    }, [shuffledCards])


    const createDeck = () => {
        let tempDeck = [];
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
        const cards = ['A', 'K', 'Q', 'J', 10, 9, 8, 7, 6, 5, 4, 3, 2]
        console.log('clicked')
        for (let card in cards) {
            for (let suit in suits) {
                console.log('add to deck', cards[card], ' of ', suits[suit]);
                tempDeck.push(suits[suit] + ' ' + cards[card])                
            }
        }
        setDeck(...deck, tempDeck);
    }
        
    const shuffleDeck = (shuffleDeck) => {   
        console.log('deck', shuffleDeck) 
        for (let i = shuffleDeck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [shuffleDeck[i], shuffleDeck[j]] = [shuffleDeck[j], shuffleDeck[i]]
        }
        console.log('Shuffled cards', shuffleDeck)
        setShuffledCards(shuffleDeck);
    }

    const dealCards = (deck) => {
        let card1, card2;
        for (let i = 0; i < 2; i++) {
            card1 = deck.shift();
            console.log('card 1', card1)
            setPlayerOneHand([...playerOneHand, card1]);
            console.log(playerOneHand)
            card2 = deck.shift();
            setPlayerTwoHand([...playerTwoHand, card2])
            console.log(playerTwoHand)
        }

    }



  return(
    <div>
      <h2>This is the Table!</h2>
      {/* Redux State isn't needed in the garden, it is just a parent component */}
      {/* Thanks to redux, there is no need to pass along props! */}
      {/* <p>{suits.join(', ')}</p>
      <p>{cards.join(', ')}</p> */}
      <button onClick={() => createDeck()}>Click me to create deck</button>
      <button onClick={() => shuffleDeck(deck)}>Click me to shuffle</button>
      <button onClick={() => dealCards(shuffledCards)}>Click to deal</button>
        <p>{deck}</p>
        <p>{shuffledCards.join(', ')}</p>
        <p>Player One hand: {JSON.stringify(playerOneHand)}</p>
        <p>Player Two hand: {JSON.stringify(playerTwoHand)}</p>

      
    </div>
  )
}

export default Table;
