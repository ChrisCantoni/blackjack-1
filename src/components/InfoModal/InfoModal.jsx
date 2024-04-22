import { Stack } from '@mui/material'

function InfoModal({closeModal}) {

    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === 'modal-container') closeModal();
        }}>
            <div className="modal">
                <h3>How to Play</h3>
                <p>To start, there are no cards. To create the decks for playing, click <em>"Shuffle the Shoe."</em>
                    The Shoe contains <strong>two</strong> full decks, so it's possible you will encounter the same card. 
                    This isn't a bug, it's part of the fun!
                </p>
                <p>At any time you can hover over the Shuffle button to see how many cards are left in the Shoe.
                    But if the Shoe gets too low it will automatically reshuffle.
                </p>

                <p>
                    If you're unfamiliar with Blackjack, it's very simple. You receive cards trying to get as
                    close to 21 as possible without going over. Each card is worth its number except for face cards: K, Q, J which are all worth 10.
                    Aces can be worth 11 or 1. So getting an ace and a 7 would be worth 18, but if you put a five with it, the Ace becomes
                    a 1 and you end up with 13.</p> <p>You receive 2 cards to start and from there you can either receive another card, <strong>hit</strong>, or stop with the hand you have, <strong>stay</strong>.
                </p>

                <p>Only one of the dealer's cards is revealed to start, however the dealer will immediately let you know if they have <strong>Blackjack</strong> and you will simply lose
                    that hand, unless you have Blackjack yourself, in which case you will receive your bet back.
                    Once you decide to stay, the dealer will reveal their hand and hit until they reach <strong>17</strong> or higher. Whoever is closest to 21 without going over wins.
                </p>

                <p>You can also <strong>Double Down</strong>. If your initial cards equal <strong>9, 10, or 11</strong>, you can choose to double your bet and receive one additional card.
                    With any luck your additional card will be a 10 and you'll be in a good position to beat the dealer.
                </p>


            </div>
        </div>
    )
}

export default InfoModal;