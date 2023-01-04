import React, { useState } from 'react';
import GlobalStateContext from './GlobalStateContext';


function GlobalState({ children }) {
    const [shorty, setShorty] = useState([]);


    const requests = {}
    const states = { shorty }
    const setters = { setShorty }

    return (
        <GlobalStateContext.Provider value={{ requests, states, setters }}>
            {children}
        </GlobalStateContext.Provider>
    )

}

export default GlobalState