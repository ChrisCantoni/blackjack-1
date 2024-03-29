import React from 'react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import PlantForm from '../PlantForm/PlantForm.jsx';
import PlantList from '../PlantList/PlantList.jsx';

function Table() {


    // const [shuffledCards, setShuffledCards] = useState([])
    const [deck, setDeck] = useState([])
    const [dealerHand, setDealerHand] = useState([])
    const [playerHand, setPlayerHand] = useState([])
    const [playerStatus, setPlayerStatus] = useState(false)
    const [revealDealer, setRevealDealer] = useState(false);
    const [gameStatus, setGameStatus] = useState(false)
    const [winner, setWinner] = useState('');
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
        let count = cardCount;
        console.log('Count at start', count)
        console.log('Card Count at start', cardCount)
        const randomIndex = Math.floor(Math.random() * deck.length);
        const dealtCard = deck[randomIndex];
    
        setDeck((prevDeck) => prevDeck.filter((card) => card !== dealtCard));
    
        if (typeof dealtCard.value != 'string' && dealtCard.value < 10) {
                 count +=1;
                 console.log('number card count', count)
            } else {
                count -=1;
                console.log('Face card count', count)
            }
        console.log('Dealt card', dealtCard, count)
        setCardCount(count);

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
            newGame();
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

    // This is what happens when a new game is initiated after an existing game is completed.
    const newGame = () => {
        setGameStatus(false);
        setPlayerStatus(true);
        setRevealDealer(false);
        setWinner('');
        setPlayerHand([])
        setDealerHand([])
    }

    // Add a new card to your hand.
    const hitCard = () => {
        setPlayerHand(prevHand => [...prevHand, dealRandomCards()])
    }

    const playerStay = () => {
        // trigger dealer actions to hit or stay and determine winner
        // Separate dealer and player totals into their own states?
        // Move to next player?
        console.log('reveal dealer')
        setRevealDealer(true);
        if (calculateValue(dealerHand) < 17) {
            // If so, keep drawing cards until the hand value is 17 or higher
            setTimeout(() => {
                let updatedDealerHand = [...dealerHand];
                while (calculateValue(updatedDealerHand) < 17) {
                    updatedDealerHand.push(dealRandomCards());
                    setDealerHand(updatedDealerHand);
                }
            }, 500); // Adjust delay as needed
            
        }
        setTimeout(() => {
            calculateWinner()}, 1500);
        }

        const calculateWinner = () => {
            const playerTotal = calculateValue(playerHand);
            const dealerTotal = calculateValue(dealerHand);
        
            if (playerTotal > 21) {
                console.log('player total', playerTotal)
                console.log('dealer total', dealerTotal)
                setWinner('Dealer wins! Player busts.');
            } else if (dealerTotal > 21) {
                console.log('player total', playerTotal)
                console.log('dealer total', dealerTotal)
                setWinner('Player wins! Dealer busts.');
            } else if (playerTotal > dealerTotal) {
                console.log('player total', playerTotal)
                console.log('dealer total', dealerTotal)
                setWinner('Player wins!');
            } else if (playerTotal === dealerTotal) {
                console.log('player total', playerTotal)
                console.log('dealer total', dealerTotal)
                setWinner("It's a push. No winner.");
            } else {
                console.log('player total', playerTotal)
                console.log('dealer total', dealerTotal)
                setWinner('Dealer wins!');
            }
        }
        

    const calculateValue = (hand) => {
        let total = 0;
        let ace = hand.find((card) => card.value === 'A')
        for (let card of hand) {
            if (typeof card.value != 'string') {
                total += card.value
            }
            else {
                if (ace) {
                    total += 11
                }
                else {
                    total += 10;
                }}}
            if (total > 21 && ace) {
                console.log('Ace check', total)
                total -= 10;
            }
        return total;
    }

    const updatePlayerStatus = () => {
        if (calculateValue(playerHand) > 21) {
            setPlayerStatus(!playerStatus)
        }
    }

    const cardSuit = (suit) => {
        switch (suit) {
            case 'Hearts' :
                return String.fromCharCode(9829);
            case 'Diamonds' :
                return String.fromCharCode(9830);
            case 'Spades' :
                return String.fromCharCode(9824);
            case 'Clubs' :
                return String.fromCharCode(9827);
        }
    }

    // const countCard = () => {
    //     let count = cardCount;
    //     for (let card of playerHand) {
            
    //         if (typeof card.value != 'string' && card.value < 10) {
    //             count +=1;
    //         } else {
    //             count -=1;
    //         }
    //         console.log('Counting player hand', card, count)
    //     }

    //     if (revealDealer) {
    //         for (let card of dealerHand) {
                
    //             if (typeof card.value != 'string' && card.value < 10) {
    //                 count +=1;
    //             } else {
    //                 count -=1;
    //             }
    //             console.log('Counting dealer hand', card, count)
    //         }
    //     }
    //     console.log('Count is', count)
    //     setCardCount(count);
    // }
    

    useEffect(() => {
        const dealerTotal = calculateValue(dealerHand);
        console.log('dealer total', dealerTotal);
        if (revealDealer && dealerHand.length > 0) {
            setTimeout(() => calculateWinner(), 1500);
        }
    }, [dealerHand, revealDealer]);

    useEffect(() => {
        const count = cardCount;
        setTimeout(() => {
            console.log('updated card count:', count)
        }, 0)
    }, [cardCount])


    useEffect(() => {
        updatePlayerStatus()
        // countCard()
    },[playerHand, dealerHand])

  return(
    <div>
      <h2>This is the Table!</h2>
      <h3>{winner}</h3>
      <button onClick={() => createDeck()}>Shuffle the deck</button>
      <button onClick={() => dealCards()}>Deal Cards</button>
      
      <div>
        <p>Dealer hand: {JSON.stringify(dealerHand)}.</p>
        <p>Dealer hand: <br></br> {dealerHand.length > 0 && revealDealer ? dealerHand.map((card, index) => (
                        <>{card.value}{cardSuit(card.suit)}{index < dealerHand.length - 1 ? ', ' : ''} </>
                    ))  : dealerHand.length > 0 ? `${dealerHand[0].value} of ${cardSuit(dealerHand[0].suit)}` : ''}
                    </p>

        <p>Player hand: {playerHand.length > 0 ? playerHand.map((card) => {
            return (
                <h4>{card.value}{cardSuit(card.suit)} </h4>)}) : ''}
                Total: {calculateValue(playerHand)}
                {calculateValue(playerHand) > 21 ? <h4>BUST!</h4> : ''}
                {playerStatus ? <>
                    <button onClick={() => hitCard()}>Hit</button>
                    <button onClick={() => playerStay()}>Stay</button>
                </> : ''
                }
        </p>
        <h3>Current Card Count: {cardCount}</h3>
        </div>
      
    </div>
  )
}

export default Table;
