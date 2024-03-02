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



  return(
    <div>
      <h2>This is the Table!</h2>
      {/* Redux State isn't needed in the garden, it is just a parent component */}
      {/* Thanks to redux, there is no need to pass along props! */}
      <p>{suits}</p>
      <p>{allCards}</p>
      <PlantForm />
      <PlantList />
    </div>
  )
}

export default Table;
