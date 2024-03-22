import React from 'react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import PlantForm from '../PlantForm/PlantForm.jsx';
import PlantList from '../PlantList/PlantList.jsx';

function Table() {


    // const [shuffledCards, setShuffledCards] = useState([])
    const [deck, setDeck] = useState([])
    const [showCards, setShowCards] = useState(false)
    const [dealerHand, setDealerHand] = useState([])
    const [playerHand, setPlayerHand] = useState([])
    const [playerStatus, setPlayerStatus] = useState(true)
    const [revealDealer, setRevealDealer] = useState(false);
    const [gameStatus, setGameStatus] = useState(false)

    const [cardCount, setCardCount] = useState(0);
        // TODO: Here will be the shuffle dispatch
    // Shuffle itself will happen on the back end, yes?

    // Instead of building a shuffle deck, just draw random cards from the deck, which is the same thing.

    // First build the shuffle here.
    // Deal out two cards to both dealer and player
    // If dealer has 21, game over.



    const createDeck = () => {
        if (gameStatus) {
            Swal.fire('You already have a game in progress')
            return;
        }
        let tempDeck = [];
        let i = 0;
        while (i < 2) {
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
        const cards = ['A', 'K', 'Q', 'J', 10, 9, 8, 7, 6, 5, 4, 3, 2]
        console.log('clicked')
        for (let card in cards) {
            for (let suit in suits) {
                tempDeck.push({suit: suits[suit], value: cards[card]})                
            }
        }
        i++;
    }
        setCardCount(0);
        console.log('Deck is', tempDeck)
        setDeck(tempDeck);
    }

    const dealRandomCards = () => {
        const randomIndex = Math.floor(Math.random() * deck.length);
        const dealtCard = deck[randomIndex];
    
        setDeck((prevDeck) => prevDeck.filter((card) => card !== dealtCard));
    
        return dealtCard;
    };
    
    const dealCards = async () => {
        if (deck.length != 0 && gameStatus) {
            Swal.fire('You already have a game in progress');
            return;
        }
        else if (deck.length == 0) {
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
                  setGameStatus(true)
                  Swal.fire({
                    title: "Shuffled!",
                    text: "Now try dealing those cards again.",
                    icon: "success"
                  });
                }
              });
        } else {
            setGameStatus(true);
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

    const newGame = () => {
        setGameStatus(false);
        setPlayerStatus(true);
        setPlayerHand([])
        setDealerHand([])
    }

    const hitCard = () => {
        setPlayerHand(prevHand => [...prevHand, dealRandomCards()])
    }

    const playerStay = () => {
        // trigger dealer actions to hit or stay and determine winner
        // Separate dealer and player totals into their own states?
        // Move to next player?
        console.log('reveal dealer')
        setRevealDealer(true);
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
                }}}
        return total;
    }

    const calculateDealer = (hand) => {
        let total = 0;
        if (typeof hand[0].value == 'string') {
            total += 10;
        } else {
            total = hand[0].value;
        }
    }

    const updatePlayerStatus = () => {
        if (calculateValue(playerHand) > 21) {
            setPlayerStatus(!playerStatus)
        }
    }

    const updateDealerStatus = () => {

    }

    const countCard = () => {
        let count = cardCount;
        for (let card of playerHand) {
            if (typeof card.value != 'string' && card.value < 10) {
                count +=1;
            } else {
                count -=1;
            }
        }
        setCardCount(count);
    }


    useEffect(() => {
        updatePlayerStatus()
        countCard()
        calculateDealer(dealerHand)
    },[playerHand])

  return(
    <div>
      <h2>This is the Table!</h2>
      {/* <p>{suits.join(', ')}</p>
      <p>{cards.join(', ')}</p> */}
      <button onClick={() => createDeck()}>Shuffle the deck</button>
      <button onClick={() => dealCards()}>Deal Cards</button>
      
      <div>
        <p>Dealer hand: {JSON.stringify(dealerHand)}.</p>
        <p>Dealer hand: {dealerHand.length > 0 && revealDealer ? dealerHand.map((card, index) => (
                        <>{card.value} of {card.suit}{index < dealerHand.length - 1 ? ', ' : ''} </>
                    ))  : dealerHand.length > 0 ? `${dealerHand[0].value} of ${dealerHand[0].suit}` : ''}
                    <h3>Total: {dealerHand.length > 0 && revealDealer ? calculateValue(dealerHand) : dealerHand.length > 0 ? calculateDealer(dealerHand) : ''}</h3>
                    </p>

        <p>Player hand: {playerHand.length > 0 ? playerHand.map((card) => {
            return (
                <>{card.value} of {card.suit} </>)}) : ''}
                Total: {calculateValue(playerHand)}
                {playerStatus ? <>
                    <button onClick={() => hitCard()}>Hit</button>
                    <button onClick={() => playerStay()}>Stay</button>
                </> :
                <>
                    <h2>You Lose!</h2>
                    <button onClick={() => newGame()}>New Game</button>
                </>
                }
        </p>
        <h3>Current Card Count: {cardCount}</h3>
        </div>
      
    </div>
  )
}

export default Table;
