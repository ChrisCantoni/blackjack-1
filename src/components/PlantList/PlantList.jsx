import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();

    const reduxState = useSelector(store => store);

    useEffect(() => {
        // dispatch an action to request the plantList from the API
    }, []); 


    // TODO: Here will be the shuffle dispatch
    // Shuffle itself will happen on the back end, yes?

    // First build the shuffle here.
    // Deal out two cards to both dealer and player
    // If dealer has 21, game over.

    return (
        <div>
            <h3>This is the cards you've been dealt</h3>
            <pre>{JSON.stringify(reduxState)}</pre>
        </div>
    );
}

export default PlantList;
