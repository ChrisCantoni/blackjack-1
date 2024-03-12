import React from 'react';
import { useEffect, useState } from 'react';
import PlantForm from '../PlantForm/PlantForm.jsx';
import PlantList from '../PlantList/PlantList.jsx';

function Table() {


    const [shuffledCards, setShuffledCards] = useState([])
    const [deck, setDeck] = useState([])
    const [showCards, setShowCards] = useState(false)
    const [dealerHand, setDealerHand] = useState([])
    const [playerHand, setPlayerHand] = useState([])
    const [welcome, setWelcome] = useState('Welcome!')
        // TODO: Here will be the shuffle dispatch
    // Shuffle itself will happen on the back end, yes?

    // Instead of building a shuffle deck, just draw random cards from the deck, which is the same thing.

    // TODO: Add values to the face cards. Calculate value of hand.

    // First build the shuffle here.
    // Deal out two cards to both dealer and player
    // If dealer has 21, game over.
   const refreshPage = () => {
    console.log('refreshing page')
    console.log('player one hand', dealerHand)
    console.log('player two hand', playerHand);
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
        console.log('Deck is', tempDeck)
        setDeck(tempDeck);
    }

    const dealRandomCards = () => {
        const randomIndex = Math.floor(Math.random() * deck.length);
        const dealtCard = deck[randomIndex];
    
        setDeck((prevDeck) => prevDeck.filter((card) => card !== dealtCard));
    
        return dealtCard;
    };
    
    
    
    const shuffleDeck = (shuffled) => {   
        console.log('deck', shuffled)
        for (let i = shuffled.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        console.log('Shuffled cards', shuffled)
        setShuffledCards(shuffled);
    }

    const dealCards = async () => {
        for (let i = 0; i < 2; i++) {
            await new Promise(resolve => {
                setTimeout(() => {
                    setPlayerHand(prevHand => [...prevHand, dealRandomCards()]);
                    setDealerHand(prevHand => [...prevHand, dealRandomCards()]);
                    resolve();
                }, 500);
            });
        }
    };

    const calculateValue = (hand) => {
        console.log('HAND IS', hand)
        let total = 0;
        for (let card of hand) {
            console.log('CARD is', card.value)
            if (typeof card.value != 'string') {
                total += card.value
            }
            else {
                if (card.value !== 'A') {
                    total += 10
                }
                else {
                    total += 11
                    if (total > 21) {
                        total -= 11;
                        total += 1;
                    }
                }
            }
        }
        return total;
    }
    

    const checkHands = () => {
        setShowCards(!showCards)
        console.log('Player One Hand', dealerHand)
        console.log('Player Two Hand', playerHand)
    }



  return(
    <div>
      <h2>This is the Table!</h2>
      {/* <p>{suits.join(', ')}</p>
      <p>{cards.join(', ')}</p> */}
      <h3>{welcome}</h3>
      <button onClick={() => createDeck()}>Click me to create deck</button>
      <button onClick={() => shuffleDeck(deck)}>Click me to shuffle</button>
      <button onClick={() => dealCards()}>Click to deal</button>
      <button onClick={() => checkHands()}>Check Hands</button>
      <button onClick={() => setDealerHand([...dealerHand, dealRandomCards()])}>Deal Random Card</button>
      {showCards ? 
      <>
        <p>Dealer hand: {JSON.stringify(dealerHand)}.</p>
        <p>Dealer hand: {dealerHand.map((card) => {
            return (
                <p>{card.value} of {card.suit}</p>)})}
        Total: {calculateValue(dealerHand)}
        </p>
        <p>Player hand: {JSON.stringify(playerHand)}</p>
        <p>Player hand: {playerHand.map((card) => {
            return (
                <p>{card.value} of {card.suit}</p>)})}
                Total: {calculateValue(playerHand)}
        </p>
        </>
        : ' '}
      
    </div>
  )
}

export default Table;
