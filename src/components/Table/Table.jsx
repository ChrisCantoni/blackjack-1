import React from 'react';
import PlantForm from '../PlantForm/PlantForm.jsx';
import PlantList from '../PlantList/PlantList.jsx';

function Table() {



        // TODO: Here will be the shuffle dispatch
    // Shuffle itself will happen on the back end, yes?

    // First build the shuffle here.
    // Deal out two cards to both dealer and player
    // If dealer has 21, game over.

    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
    const allCards = ['A', 'K', 'Q', 'J', 10, 9, 8, 7, 6, 5, 4, 3, 2]

    const shuffle = (cards) => {
        console.log('clicked')
        let currentOrder = allCards.length, randomShuffle;

        while (currentOrder > 0) {
            randomShuffle = Math.floor(Math.random() * currentOrder);
            currentOrder--;

            [cards[currentOrder], cards[randomShuffle]] = [cards[randomShuffle], cards[currentOrder]]
        }
        console.log('Shuffled cards', cards)
        return cards;
    }



  return(
    <div>
      <h2>This is the Table!</h2>
      {/* Redux State isn't needed in the garden, it is just a parent component */}
      {/* Thanks to redux, there is no need to pass along props! */}
      <p>{suits.join(', ')}</p>
      <p>{allCards.join(', ')}</p>
      <button onClick={() => shuffle(allCards)}>Click me to shuffle</button>
        <p></p>
        <p>{cards}</p>

      <PlantForm />
      <PlantList />
    </div>
  )
}

export default Table;
