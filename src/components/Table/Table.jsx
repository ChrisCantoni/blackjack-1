import React from 'react';
import { useEffect, useState } from 'react';
import PlantForm from '../PlantForm/PlantForm.jsx';
import PlantList from '../PlantList/PlantList.jsx';

function Table() {


    const [shuffledCards, setShuffledCards] = useState([])
    const [deck, setDeck] = useState([])
    const [showCards, setShowCards] = useState(false)
    const [playerOneHand, setPlayerOneHand] = useState([{suit: 'farts', value: 'Joker'}])
    const [playerTwoHand, setPlayerTwoHand] = useState([])
    const [welcome, setWelcome] = useState('Welcome!')
        // TODO: Here will be the shuffle dispatch
    // Shuffle itself will happen on the back end, yes?

    // First build the shuffle here.
    // Deal out two cards to both dealer and player
    // If dealer has 21, game over.
   const refreshPage = () => {
    console.log('refreshing page')
    console.log('player one hand', playerOneHand)
    console.log('player two hand', playerTwoHand);
   }
    
    useEffect(() => {
        refreshPage();
    }, [])


    const createDeck = () => {
        let tempDeck = [];
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
        const cards = ['A', 'K', 'Q', 'J', 10, 9, 8, 7, 6, 5, 4, 3, 2]
        console.log('clicked')
        for (let card in cards) {
            for (let suit in suits) {
                tempDeck.push({suit: suits[suit], value: cards[card]})                
            }
        }
        setDeck(tempDeck);
    }

    const dealRandomCards = () => {
        return deck[Math.floor(Math.random() * (deck.length - 1))]
    }
    
    
    const shuffleDeck = (shuffled) => {   
        console.log('deck', shuffled)
        for (let i = shuffled.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        console.log('Shuffled cards', shuffled)
        setShuffledCards(shuffled);
    }

    const dealCards = (deck) => {
        let hand;
        let i = 0
        while(i < 2) {
            hand = deck.shift();
            console.log('card 1', hand, 'round i', i);
            setPlayerOneHand([...playerOneHand, hand]);
            hand = deck.shift();
            console.log('card 2', hand)
            setPlayerTwoHand([...playerTwoHand, hand]);
            i++;
        }
        console.log('Player one hand', playerOneHand)
    }

    const checkHands = () => {
        setShowCards(!showCards)
        console.log('Player One Hand', playerOneHand)
        console.log('Player Two Hand', playerTwoHand)
    }



  return(
    <div>
      <h2>This is the Table!</h2>
      {/* Redux State isn't needed in the garden, it is just a parent component */}
      {/* Thanks to redux, there is no need to pass along props! */}
      {/* <p>{suits.join(', ')}</p>
      <p>{cards.join(', ')}</p> */}
      <h3>{welcome}</h3>
      <button onClick={() => createDeck()}>Click me to create deck</button>
      <button onClick={() => shuffleDeck(deck)}>Click me to shuffle</button>
      <button onClick={() => dealCards(shuffledCards)}>Click to deal</button>
      <button onClick={() => checkHands()}>Check Hands</button>
      <button onClick={() => setPlayerOneHand([...playerOneHand, dealRandomCards()])}>Deal Random Card</button>
      {showCards ? 
      <>
        <p>Player One hand: {JSON.stringify(playerOneHand)}.</p>
        <p>Player One hand: {playerOneHand.map(card => `${card.value} of ${card.suit}`)}</p>
        <p>Are we missing any?</p>
        </>
        : ' '}
      
    </div>
  )
}

export default Table;
