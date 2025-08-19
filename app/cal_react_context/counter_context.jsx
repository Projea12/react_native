import React, { createContext, useState, useContext } from "react";
const CounterContext = createContext();
export const useCounter = () => useContext(CounterContext);

export function CounterProvider ({children}) {
    const [count, setCount] = useState(0);
    const increment = () => setCount(c => c+1);
    const decrement = () => setCount(c => c-1);
    const reset = () => setCount(c=> c = 0);

    return (
      <CounterContext.Provider value = {{count,increment,decrement,reset}}>
        {children}
      </CounterContext.Provider>
    );
}
