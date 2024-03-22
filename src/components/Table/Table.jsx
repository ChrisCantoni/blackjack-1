import React from 'react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
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
        if (deck.length == 0) {
            Swal.fire({
                title: "You haven't shuffled the deck!",
                text: "You need to click the button that says shuffle the deck",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "I'm lazy, shuffle it for me."
              }).then((result) => {
                if (result.isConfirmed) {
                  createDeck();
                  Swal.fire({
                    title: "Shuffled!",
                    text: "Now try dealing those cards again.",
                    icon: "success"
                  });
                }
              });
        } else {
        for (let i = 0; i < 2; i++) {
            await new Promise(resolve => {
                setTimeout(() => {
                    setPlayerHand(prevHand => [...prevHand, dealRandomCards()]);
                    setDealerHand(prevHand => [...prevHand, dealRandomCards()]);
                    resolve();
                }, 500);
            });
        }}
    };

    const hitCard = () => {
        setPlayerHand(prevHand => [...prevHand, dealRandomCards()])
    }

    const playerStay = () => {
        // trigger dealer actions to hit or stay and determine winner
        // Separate dealer and player totals into their own states?
    }

    const calculateValue = (hand) => {
        let total = 0;
        for (let card of hand) {

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

    // TODO: Add logic for dealer to hit or stay


  return(
    <div>
      <h2>This is the Table!</h2>
      {/* <p>{suits.join(', ')}</p>
      <p>{cards.join(', ')}</p> */}
      <h3>{welcome}</h3>
      <button onClick={() => createDeck()}>Click me to create deck</button>
      <button onClick={() => shuffleDeck(deck)}>Click me to shuffle</button>
      <button onClick={() => dealCards()}>Click to deal</button>
      
      <div>
        <p>Dealer hand: {JSON.stringify(dealerHand)}.</p>
        <p>Dealer hand: {dealerHand.length > 0 ? `${dealerHand[0].value} of ${dealerHand[0].suit}` : ''}
        {dealerHand.length > 0 && dealerHand[0].value == 'A' && calculateValue(dealerHand) == 21 ? <h2>Blackjack! Dealer wins!</h2> : ''}
        </p>
        <p>Player hand: {JSON.stringify(playerHand)}</p>
        <p>Player hand: {playerHand.length > 0 ? playerHand.map((card) => {
            return (
                <p>{card.value} of {card.suit}</p>)}) : ''}
                Total: {calculateValue(playerHand)}
                {calculateValue(playerHand) > 21 ? <h2>You lose!</h2> : 
                <>
                    <button onClick={() => hitCard()}>Hit</button>
                    <button onClick={() => playerStay()}>Stay</button>
                </>}
        </p>
        </div>
      
    </div>
  )
}

export default Table;
